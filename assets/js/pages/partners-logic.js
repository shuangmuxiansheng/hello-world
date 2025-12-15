// partners.js - 动态滚动版本 (最终优化版)

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('partnersGrid');
    const totalPartners = 31; // 您的图片总数量
    const totalRows = 4;      // 滚动行数
    const imageBaseUrl = 'assets/images/partners/'; 

    // 计算每行分配的 Logo 数量 (31 / 4 = 9, 31 % 4 = 1)
    const baseLogos = Math.floor(totalPartners / totalRows); // 9
    const remainingLogos = totalPartners % totalRows;         // 1 (分配给最后一行)
    
    // 定义每行 Logo 数量和起始索引
    let logoPerRows = [];
    for (let i = 0; i < totalRows; i++) {
        logoPerRows[i] = baseLogos + (i === totalRows - 1 ? remainingLogos : 0);
    }
    // 结果: logoPerRows = [9, 9, 9, 10]

    let currentLogoIndex = 1; // 从 partner (1).PNG 开始

    for (let row = 1; row <= totalRows; row++) {
        // 1. 创建行容器 (.partner-row)
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('partner-row', `row-${row}`);
        
        // 2. 创建 Flex 容器 (.logo-list)
        const logoList = document.createElement('div');
        logoList.classList.add('logo-list');
        
        // 获取当前行的 Logo 数量
        const logosToDisplay = logoPerRows[row - 1]; 

        // 3. 生成 Logo HTML 结构 (需要双倍内容)
        // 这一步确保了每行只显示分配给它的 Logo 块
        
        const generateLogoBlock = () => {
            const logoFragment = document.createDocumentFragment();
            // 记录当前块的起始索引
            const start = currentLogoIndex; 
            const end = start + logosToDisplay; 
            
            for (let i = start; i < end; i++) {
                // 确保索引循环回到 1 (i % totalPartners + 1)
                const logoNumber = (i - 1) % totalPartners + 1; 
                
                const fileName = `partner (${logoNumber}).PNG`;
                const imagePath = imageBaseUrl + fileName;

                const card = document.createElement('div');
                card.classList.add('partner-card');
                
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `合作伙伴 ${logoNumber} Logo`;
                
                card.appendChild(img);
                logoFragment.appendChild(card);
            }
            return logoFragment;
        };

        // 4. 将 Logo 结构添加到 logoList 中两次 (生成双倍内容，实现无缝循环)
        logoList.appendChild(generateLogoBlock()); // 第一次内容
        logoList.appendChild(generateLogoBlock()); // 第二次内容 (副本)
        
        // 5. 组装行并添加到主容器
        rowContainer.appendChild(logoList);
        gridContainer.appendChild(rowContainer);
        
        // 更新下一行的起始 Logo 索引
        currentLogoIndex += logosToDisplay;
    }
});