import pandas as pd
from sqlalchemy import create_engine, text
from sklearn.metrics.pairwise import cosine_similarity
import json
import sys

# ======= Nhận username từ dòng lệnh =======
if len(sys.argv) < 2:
    print(json.dumps({"error": "Không có username truyền vào"}))
    sys.exit(1)

username = sys.argv[1]

# ======= Kết nối MySQL =======
engine = create_engine('mysql+pymysql://root:root@localhost:3306/beauty_db')

try:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
except Exception as e:
    print(json.dumps({"error": f"Kết nối database thất bại: {str(e)}"}))
    sys.exit(1)

# ======= Đọc dữ liệu từ bảng =======
try:
    df_users = pd.read_sql('SELECT * FROM users', engine)
    df_products = pd.read_sql('SELECT * FROM products', engine)
except Exception as e:
    print(json.dumps({"error": f"Lỗi khi đọc dữ liệu từ DB: {str(e)}"}))
    sys.exit(1)

# ======= Các cột đặc trưng =======
skin_problem_cols = ['acne_prone', 'dull_skin', 'large_pores', 'uneven',
                     'dark_spot', 'redness', 'dehydrated', 'wrinkles']
skincare_goal_cols = ['hydration', 'acne_control', 'anti_aging', 'brightening',
                      'oil_control', 'smooth_and_repair']

# ======= Tiền xử lý skin_types =======
# Chuyển skin_types từ chuỗi JSON thành list nếu cần
df_products['skin_types'] = df_products['skin_types'].apply(
    lambda x: json.loads(x) if isinstance(x, str) else x
)

# ======= Lấy user skin_type =======
user_row = df_users[df_users['username'] == username]
if user_row.empty:
    print(json.dumps({"error": f"Không tìm thấy user '{username}'"}))
    sys.exit(1)

user_skin_type = user_row.iloc[0]['skin_type']  # single value

# ======= Lọc product theo skin_type phù hợp =======
df_products = df_products[df_products['skin_types'].apply(
    lambda lst: isinstance(lst, list) and user_skin_type in lst
)]

# ======= Hàm gợi ý sản phẩm =======
def recommend_products(user_profile_df, product_df, username, top_n=5):
    user_vector = user_profile_df[user_profile_df['username'] == username]
    if user_vector.empty:
        raise ValueError(f"Username '{username}' không tồn tại.")

    user_vector = user_vector.drop(columns=['user_id', 'username', 'skin_type']).reset_index(drop=True)

    user_skin_problem = user_vector[skin_problem_cols].fillna(0)
    user_skincare_goal = user_vector[skincare_goal_cols].fillna(0)

    product_skin_problem = product_df[skin_problem_cols].fillna(0)
    product_skincare_goal = product_df[skincare_goal_cols].fillna(0)

    sim_skin_problem = cosine_similarity(user_skin_problem, product_skin_problem)[0]
    sim_skincare_goal = cosine_similarity(user_skincare_goal, product_skincare_goal)[0]

    total_score = 0.7 * sim_skin_problem + 0.3 * sim_skincare_goal

    product_df = product_df.copy()
    product_df['score'] = total_score

    product_df = product_df[product_df['score'] >= 0.5]
    recommendations = product_df.sort_values(by='score', ascending=False).head(top_n)
    return recommendations[['product_id', 'product_name', 'score']]

# ======= Gọi hàm và trả kết quả JSON =======
try:
    result = recommend_products(df_users, df_products, username=username, top_n=12)
    result_json = result.to_dict(orient='records')
    print(json.dumps(result_json))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
