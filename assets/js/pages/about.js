document.addEventListener('DOMContentLoaded', function() {
    const config = {
        culture: { count: 16, path: 'assets/images/company_culture/', target: 'culture-grid' },
        care: { count: 10, path: 'assets/images/staff_care/', target: 'care-grid' }
    };

    function renderGallery() {
        Object.keys(config).forEach(type => {
            const data = config[type];
            const container = document.getElementById(data.target);
            if (!container) return;

            let html = '';
            for (let i = 1; i <= data.count; i++) {
                // 生成随机旋转角度 (-4 到 4 度)
                const randomRotate = (Math.random() * 8 - 4).toFixed(2);
                // 随机上下偏移量，让排列更自然
                const randomY = (Math.random() * 20 - 10).toFixed(0);

                html += `
                    <div class="gallery-item-new" style="transform: rotate(${randomRotate}deg) translateY(${randomY}px)">
                        <img src="${data.path}${i}.PNG" alt="Gallery" loading="lazy">
                    </div>
                `;
            }
            container.innerHTML = html;
        });
    }

    // 选项卡切换
    const tabs = document.querySelectorAll('.gallery-tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const target = tab.dataset.target + '-grid';
            document.querySelectorAll('.gallery-wrap').forEach(w => {
                w.classList.toggle('active', w.id === target);
            });
        });
    });

    renderGallery();
});