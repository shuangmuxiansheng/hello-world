/**
 * assets/js/pages/about.js
 * 负责加载和插入共享的 header.html 和 footer.html 内容
 */

/**
 * 通用函数：通过 Fetch API 加载 HTML 片段并插入到指定的占位符中
 * @param {string} url - HTML 片段的路径
 * @param {string} placeholderId - 目标占位符元素的 ID
 * @returns {Promise<HTMLElement | null>} - 成功加载并插入的元素（如果存在）
 */
async function loadComponent(url, placeholderId) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        console.error(`占位符元素未找到: ID=${placeholderId}`);
        return null;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP 错误! 状态码: ${response.status} (加载 ${url})`);
        }
        const htmlContent = await response.text();
        // 将内容直接插入到占位符中
        placeholder.innerHTML = htmlContent;
        
        // 返回插入的内容，以便后续处理（例如 Header 激活）
        return placeholder; 

    } catch (error) {
        console.error(`加载组件失败 (${url}):`, error);
        placeholder.innerHTML = `<p style="color: red;">无法加载组件内容: ${url}</p>`;
        return null;
    }
}


/**
 * 激活 Header 导航栏中当前页面的链接
 * @param {HTMLElement} headerElement - 包含导航栏的元素
 */
function setActiveNav(headerElement) {
    const navLinks = headerElement.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop(); // 获取文件名 (e.g., 'about.html')
    
    // 确保没有链接被设置 'active' (通常在 Header 文件中预置 active 类是不好的做法)
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 找到当前页面的链接并添加 'active' 状态
    navLinks.forEach(link => {
        // 使用 link.getAttribute('href') 来安全比较
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}


document.addEventListener('DOMContentLoaded', async function() {
    
    // 1. 加载 Header
    const headerPath = 'assets/components/header.html';
    const headerPlaceholder = await loadComponent(headerPath, 'header-placeholder');
    
    // Header 加载成功后，设置导航激活状态
    if (headerPlaceholder) {
        setActiveNav(headerPlaceholder);
        // 如果 global.js 中的移动菜单初始化需要 Header 元素存在，可以在这里手动调用初始化函数
        // (取决于 global.js 的实现)
    }

    // 2. 加载 Footer
    const footerPath = 'assets/components/footer.html';
    await loadComponent(footerPath, 'footer-placeholder');

    // 提示：若需在组件加载后执行其他 DOM 操作（例如修改页脚年份），
    // 可以在相应的 loadComponent 调用完成后继续操作。
});