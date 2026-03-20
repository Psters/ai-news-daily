// AI News Daily - Interactive Features
// Date: 2026-03-20

document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 AI News Daily loaded');
    
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有新闻项
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // 添加点击跟踪
    const links = document.querySelectorAll('.news-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const source = link.closest('.news-item').querySelector('.news-source').textContent;
            const title = link.closest('.news-item').querySelector('.news-title').textContent;
            console.log(`📊 News clicked: ${source} - ${title}`);
        });
    });
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            const nextItem = document.querySelector('.news-item:hover + .news-item');
            if (nextItem) {
                nextItem.focus();
            }
        } else if (e.key === 'ArrowUp') {
            const prevItem = document.querySelector('.news-item:hover');
            if (prevItem && prevItem.previousElementSibling) {
                prevItem.previousElementSibling.focus();
            }
        }
    });
    
    // 添加打印时间
    const footer = document.querySelector('.footer');
    if (footer) {
        const timestamp = new Date().toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const timeElement = document.createElement('p');
        timeElement.textContent = `页面加载时间: ${timestamp}`;
        timeElement.style.marginTop = '0.5rem';
        timeElement.style.fontSize = '0.75rem';
        timeElement.style.color = 'var(--color-text-muted)';
        footer.appendChild(timeElement);
    }
    
    // 性能监控
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`⚡ Page load time: ${loadTime.toFixed(2)}ms`);
    }
});

// 添加暗色模式切换（可选功能）
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDark);
    console.log(`🎨 Dark mode: ${isDark ? 'enabled' : 'disabled'}`);
}

// 初始化暗色模式
(function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'false') {
        document.body.classList.add('light-mode');
    }
})();
