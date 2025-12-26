document.addEventListener('DOMContentLoaded', () => {
    const certGrid = document.getElementById('certGrid');
    
    // 从 OCR 文档中提取的完整证书列表
    const allCertificates = [
        { name: "人力资源服务许可证", type: "准入" },
        { name: "劳务派遣经营资质", type: "准入" },
        { name: "增值电信业务经营许可证", type: "准入" },
        { name: "ISO 9001 质量管理体系认证", type: "体系" },
        { name: "ISO 14001 环境管理体系认证", type: "体系" },
        { name: "ISO 45001 职业健康安全管理体系认证", type: "体系" },
        { name: "ISO 27001 信息安全管理体系认证", type: "体系" },
        { name: "ISO 20000 信息技术服务管理体系认证", type: "体系" },
        { name: "企业信用评价 AAA 级信用企业", type: "荣誉" },
        { name: "企业资信等级 AAA 级单位", type: "荣誉" },
        { name: "质量服务诚信 AAA 级单位", type: "荣誉" },
        { name: "重合同守信用 AAA 级企业", type: "荣誉" },
        { name: "诚信经营示范 AAA 级单位", type: "荣誉" },
        { name: "中国诚信供应商", type: "荣誉" },
        { name: "海南省人力资源服务行业协会会员单位", type: "荣誉" },
        { name: "海口市人力资源服务协会理事单位", type: "荣誉" },
        { name: "人力资源诚信服务领军人物", type: "荣誉" },
        { name: "A级人力资源服务机构", type: "荣誉" }
    ];

    allCertificates.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-static-card';
        
        // 重点修改：精准判断“准入”类型并赋予图标
        // 使用 fa-shield-alt (兼容性最高) 或 fa-gavel (法律准入感强)
        let iconClass = "fa-award"; // 默认图标
        if (cert.type === "准入") {
            iconClass = "fa-shield-alt"; 
        } else if (cert.type === "体系") {
            iconClass = "fa-check-double";
        } else if (cert.type === "技术") {
            iconClass = "fa-code";
        }

        card.innerHTML = `
            <div class="cert-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="cert-info">
                <span class="cert-type-tag">${cert.type}</span>
                <h3 class="cert-name">${cert.name}</h3>
            </div>
        `;
        certGrid.appendChild(card);
    });
});