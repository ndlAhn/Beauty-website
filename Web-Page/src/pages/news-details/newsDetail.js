import './newsDetail.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
function NewsDetail() {
    return(
        <div>
            <Header />
            <div className='news-wrap'>
                <div className='new-content-wrap'>
                    <div className ='news-detail-title'>
                            <h3>News Title</h3>
                    </div>
                    <div id="news"></div>
                    
                </div>     
            </div>   
            <Footer />
        </div>
    )

}
export default NewsDetail;