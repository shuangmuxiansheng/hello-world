/* assets/js/global.js */

document.addEventListener('DOMContentLoaded', function() {
    
    /* --- 1. 导航栏滚动收缩效果 --- */
    const header = document.querySelector('.header');
    const scrollThreshold = 50; 

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- 2. 移动端菜单切换 --- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.querySelector('body');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // 切换图标
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden'; 
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = 'auto';
            }
        });
        
        // 点击菜单项后自动关闭菜单
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    mobileToggle.click();
                }
            });
        });
    }

    /* --- 3. 回到顶部按钮 --- */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --- 4. 平滑滚动到锚点 --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- 5. 热线弹窗 (Modal) 逻辑 --- */
    const modal = document.getElementById('hotlineModal');
    const btn = document.getElementById('hotlineBtn');
    const span = document.querySelector('.close-modal');
    const callNowBtn = document.getElementById('callNowBtn');

    // 打开弹窗
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });
    }

    // 点击 x 关闭
    if (span) {
        span.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    // 点击窗口外部关闭
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
    
    /* --- 6. 复制号码功能 --- */
    const phoneNumber = "0898-6678-1105";

    if (callNowBtn) {
        callNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 复制逻辑：去除连字符，复制纯数字
            navigator.clipboard.writeText(phoneNumber.replace(/-/g, '')).then(() => {
                // 成功反馈
                const originalText = callNowBtn.textContent;
                
                callNowBtn.textContent = '号码已复制';
                callNowBtn.style.backgroundColor = '#28a745'; // 绿色表示成功
                
                // 1.5秒后恢复
                setTimeout(() => {
                    callNowBtn.textContent = originalText;
                    // 清除内联样式，恢复 CSS 中定义的 var(--primary-color)
                    callNowBtn.style.backgroundColor = ''; 
                }, 1500);
            }).catch(err => {
                console.error('无法复制文本: ', err);
                alert('复制失败，请手动拨打: ' + phoneNumber);
            });
        });
    }

});