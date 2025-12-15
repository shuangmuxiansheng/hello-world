// qualifications.js

document.addEventListener('DOMContentLoaded', () => {

    const imageBaseUrl = 'assets/images/qualifications/';
    const galleryGrid = document.getElementById('galleryGrid');

    // 定义所有证书的类别和数量
    const certificatesData = [
        { category: 'certification', name: '体系认证', count: 3 },
        { category: 'copyright', name: '软件著作', count: 11 },
        { category: 'honor', name: '企业荣誉', count: 17 },
        { category: 'patent', category: 'patent', count: 4 },
    ];
    
    // --- 动态生成证书卡片 ---
    
    certificatesData.forEach(data => {
        for (let i = 1; i <= data.count; i++) {
            // 构造文件名: category (i).PNG
            const fileName = `${data.category} (${i}).PNG`;
            const imagePath = imageBaseUrl + fileName;
            const certificateName = `${data.name} No.${i}`; // 显示名称

            const card = document.createElement('div');
            card.classList.add('cert-card');
            card.setAttribute('data-category', data.category);

            card.innerHTML = `
                <div class="cert-image">
                    <img src="${imagePath}" alt="${certificateName}">
                    <div class="overlay"><i class="fas fa-search-plus"></i></div>
                </div>
                <div class="cert-info">
                    <h3>${certificateName}</h3>
                </div>
            `;
            galleryGrid.appendChild(card);
        }
    });


    // --- 1. 筛选功能逻辑 ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                card.classList.remove('show');
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // 使用 setTimeout + display: block/none 来触发简单的动画
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 2. 模态框 (Lightbox) 逻辑 ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-btn');

    // 给所有证书图片区域添加点击事件 (使用事件委托以确保动态生成的元素也能触发)
    galleryGrid.addEventListener('click', (e) => {
        const cardImageWrapper = e.target.closest('.cert-image');
        if (cardImageWrapper) {
            const img = cardImageWrapper.querySelector('img');
            const title = cardImageWrapper.nextElementSibling.querySelector('h3').innerText;
            
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
            captionText.innerText = title;
            document.body.style.overflow = "hidden"; // 禁止背景滚动
        }
    });

    // 关闭模态框函数
    const closeLightbox = () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto"; // 恢复滚动
    };

    closeBtn.addEventListener('click', closeLightbox);

    // 点击背景和按 ESC 键关闭
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.style.display === "block") {
            closeLightbox();
        }
    });
});