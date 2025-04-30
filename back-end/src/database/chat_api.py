from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load dữ liệu
chat_data = pd.read_csv("chatData.csv")

# Load model
encoder = SentenceTransformer('all-MiniLM-L6-v2')
question_embeddings = encoder.encode(chat_data["Question"].tolist())

# Khởi tạo FastAPI
app = FastAPI()

# Cho phép CORS (React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Đổi thành ["http://localhost:3000"] nếu muốn chặt hơn
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

@app.post("/chat")
def chat(query: Query):
    user_embedding = encoder.encode([query.message])
    similarities = cosine_similarity(user_embedding, question_embeddings)
    best_idx = similarities.argmax()
    return {"reply": chat_data.loc[best_idx, "Answer"]}
