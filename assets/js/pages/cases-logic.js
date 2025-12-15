/**
 * assets/js/cases-logic.js
 * 负责案例卡片的渲染和交互逻辑 (使用 case-data.js 中提供的图片路径)
 */

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('cases-render-target');
    const autoPlayIntervals = {}; 
    const AUTO_SCROLL_INTERVAL = 5000; // 自动轮播时间间隔 5 秒

    // 1. 渲染主函数
    function render() {
        if (!window.caseData || window.caseData.length === 0) {
            gridContainer.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:40px; width:100%;">暂无数据</div>';
            return;
        }

        const renderedCards = window.caseData.map(item => buildCardHTML(item)).join('');
        gridContainer.innerHTML = renderedCards;
        
        // 渲染完成后，启动所有轮播
        window.caseData.forEach(item => initCarousel(item.id));
    }

    // 2. 生成单个卡片 HTML (使用 item.images 数组)
    function buildCardHTML(item) {
        const images = item.images || [];
        const totalImages = images.length;
        
        // 构建图片列表
        let imagesHTML = '';
        if (totalImages > 0) {
            imagesHTML = images.map((src, index) => `
                <img src="${src}" 
                     class="gallery-img ${index === 0 ? 'active' : ''}" 
                     alt="${item.title}" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/640x360?text=No+Image'">
            `).join('');
        } else {
            // 无图占位
            imagesHTML = '<img src="https://via.placeholder.com/640x360?text=Haozhong+HR" class="gallery-img active">';
        }

        // 只有多张图片才显示导航按钮
        const navHTML = (totalImages > 1) ? `
            <div class="gallery-nav">
                <button class="nav-btn prev" onclick="changeSlide('${item.id}', -1)"><i class="fas fa-chevron-left"></i></button>
                <button class="nav-btn next" onclick="changeSlide('${item.id}', 1)"><i class="fas fa-chevron-right"></i></button>
            </div>
        ` : '';

        return `
            <article class="case-card" id="card-${item.id}">
                <div class="card-gallery" 
                     onmouseenter="pauseSlide('${item.id}')" 
                     onmouseleave="startSlide('${item.id}')">
                    <div class="gallery-track" id="track-${item.id}" data-index="0" data-count="${totalImages}">
                        ${imagesHTML}
                    </div>
                    ${navHTML}
                </div>
                <div class="card-content">
                    <span class="case-tag">${item.serviceType}</span>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.description}</p>
                </div>
            </article>
        `;
    }

    // 3. 轮播控制逻辑 (淡入淡出，保持不变)
    window.changeSlide = function(id, direction) {
        const track = document.getElementById(`track-${id}`);
        if (!track) return;

        const count = parseInt(track.dataset.count);
        if (count <= 1) return;

        let currentIndex = parseInt(track.dataset.index);
        let nextIndex = currentIndex + direction;

        if (nextIndex >= count) nextIndex = 0;
        if (nextIndex < 0) nextIndex = count - 1;

        const images = track.querySelectorAll('.gallery-img');
        images.forEach(img => img.classList.remove('active'));
        images[nextIndex].classList.add('active');

        track.dataset.index = nextIndex;
    };

    // 4. 自动播放逻辑 (保持不变)
    window.startSlide = function(id) {
        const track = document.getElementById(`track-${id}`);
        if (!track || parseInt(track.dataset.count) <= 1) return;

        if (autoPlayIntervals[id]) clearInterval(autoPlayIntervals[id]);

        autoPlayIntervals[id] = setInterval(() => {
            window.changeSlide(id, 1);
        }, AUTO_SCROLL_INTERVAL);
    };

    window.pauseSlide = function(id) {
        if (autoPlayIntervals[id]) {
            clearInterval(autoPlayIntervals[id]);
            autoPlayIntervals[id] = null;
        }
    };

    // 内部初始化辅助函数
    function initCarousel(id) {
        window.startSlide(id);
    }

    // 启动
    render();
});