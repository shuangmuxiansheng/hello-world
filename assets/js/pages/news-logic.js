/**
 * assets/js/pages/news-logic.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-render-target');
    
    // 新闻配图列表
    const newsImages = [
        'assets/images/news/image1.png',
        'assets/images/news/image2.png',
        'assets/images/news/image3.png',
        'assets/images/news/image4.png',
        'assets/images/news/image5.png',
        'assets/images/news/image6.png'
    ];
    
    // 从图片库中随机选择一张图片
    function getRandomNewsImage() {
        const randomIndex = Math.floor(Math.random() * newsImages.length);
        return newsImages[randomIndex];
    }

    function renderNews() {
        if (!window.newsData || window.newsData.length === 0) {
            newsContainer.innerHTML = `<div class="loading"><i class="fas fa-newspaper"></i><h3>暂无新闻动态</h3></div>`;
            return;
        }

        // 为每条新闻分配随机图片
        const newsWithImages = window.newsData.map(news => {
            return {
                ...news,
                image: getRandomNewsImage()
            };
        });

        const sortedNews = [...newsWithImages].sort((a, b) => new Date(b.date) - new Date(a.date));
        newsContainer.innerHTML = sortedNews.map(news => buildNewsCardHTML(news)).join('');
    }

    function buildNewsCardHTML(news) {
        const tagsHTML = news.tags.map(tag => `<span class="news-tag">${tag}</span>`).join('');
        const dateParts = news.date.split('-'); 
        const coverImg = news.image;

        return `
            <a href="${news.link}" class="news-card" target="_blank">
                <div class="news-image">
                    <img src="${coverImg}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/400x250?text=News'">
                </div>
                <div class="news-content">
                    <div class="news-top-row">
                        <div class="news-date-badge">
                            <span class="day">${dateParts[2]}</span>
                            <span class="month">${dateParts[0]}/${dateParts[1]}</span>
                        </div>
                        <h3 class="news-title">${news.title}</h3>
                    </div>
                    <p class="news-description">${news.description}</p>
                    <div class="news-footer">
                        <div class="news-tags">${tagsHTML}</div>
                        <span class="read-more-btn">详情介绍 <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </a>
        `;
    }

    renderNews();
});