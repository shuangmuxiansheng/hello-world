// partners-logic.js - 增强版 (解决大屏空白问题)

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('partnersGrid');
    const totalPartners = 31; 
    const totalRows = 4;      
    const imageBaseUrl = 'assets/images/partners/'; 

    // 生成一个 1 到 31 的数组
    const allIndices = Array.from({ length: totalPartners }, (_, i) => i + 1);

    // 洗牌算法：用于打乱数组顺序，让每行看起来不一样
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    for (let row = 1; row <= totalRows; row++) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('partner-row', `row-${row}`);
        
        const logoList = document.createElement('div');
        logoList.classList.add('logo-list');
        
        // 关键点：每一行都获取一份被打乱顺序的完整 Logo 列表
        const shuffledLogos = shuffleArray(allIndices);

        const generateLogoBlock = (indices) => {
            const logoFragment = document.createDocumentFragment();
            indices.forEach(num => {
                const fileName = `partner (${num}).PNG`;
                const imagePath = imageBaseUrl + fileName;

                const card = document.createElement('div');
                card.classList.add('partner-card');
                
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `合作伙伴 ${num} Logo`;
                // 懒加载优化（可选）
                img.loading = "lazy";
                
                card.appendChild(img);
                logoFragment.appendChild(card);
            });
            return logoFragment;
        };

        // 将打乱后的 31 个 Logo 添加两次，确保无缝循环
        logoList.appendChild(generateLogoBlock(shuffledLogos)); 
        logoList.appendChild(generateLogoBlock(shuffledLogos)); 
        
        rowContainer.appendChild(logoList);
        gridContainer.appendChild(rowContainer);
    }
});