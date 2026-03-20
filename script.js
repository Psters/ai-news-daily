// AI News Daily - Dynamic News Loader
// Date: 2026-03-20

document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 AI News Daily loading...');
    
    // 更新当前日期
    const currentDate = new Date();
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = currentDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '.');
    }
    
    // 更新最后更新时间
    const updateTimeElement = document.getElementById('update-time');
    if (updateTimeElement) {
        updateTimeElement.textContent = currentDate.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // 加载新闻数据
    loadNews();
});

// 加载新闻数据
async function loadNews() {
    try {
        const response = await fetch('news.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const news = await response.json();
        displayNews(news);
        updateStats(news);
        
        console.log(`✅ Loaded ${news.length} news items`);
    } catch (error) {
        console.error('❌ Failed to load news:', error);
        displayError();
    }
}

// 显示新闻
function displayNews(news) {
    const container = document.getElementById('news-container');
    if (!container) return;
    
    // 清空加载提示
    container.innerHTML = '';
    
    // 按分类分组
    const categories = {};
    news.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    // 渲染新闻
    Object.keys(categories).forEach(category => {
        const categorySection = document.createElement('section');
        categorySection.className = 'news-category';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);
        
        const newsGrid = document.createElement('div');
        newsGrid.className = 'news-grid';
        
        categories[category].forEach((item, index) => {
            const newsItem = createNewsItem(item, index);
            newsGrid.appendChild(newsItem);
        });
        
        categorySection.appendChild(newsGrid);
        container.appendChild(categorySection);
    });
    
    // 添加滚动动画
    addScrollAnimation();
}

// 创建新闻项
function createNewsItem(item, index) {
    const article = document.createElement('article');
    article.className = 'news-item';
    article.style.animationDelay = `${index * 0.1}s`;
    
    article.innerHTML = `
        <div class="news-meta">
            <span class="news-source">${escapeHtml(item.source)}</span>
            <span class="news-date">${item.date}</span>
        </div>
        <h3 class="news-title">${escapeHtml(item.title)}</h3>
        <p class="news-excerpt">${escapeHtml(item.summary)}</p>
        <div class="news-tags">
            <span class="tag-item">${escapeHtml(item.category)}</span>
        </div>
        <a href="${escapeHtml(item.url)}" class="news-link" target="_blank" rel="noopener noreferrer">
            阅读全文 →
        </a>
    `;
    
    return article;
}

// 更新统计信息
function updateStats(news) {
    const newsCount = document.getElementById('news-count');
    const categoryCount = document.getElementById('category-count');
    
    if (newsCount) {
        newsCount.textContent = news.length;
    }
    
    if (categoryCount) {
        const categories = new Set(news.map(item => item.category));
        categoryCount.textContent = categories.size;
    }
}

// 显示错误
function displayError() {
    const container = document.getElementById('news-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="error">
            <p>❌ 加载新闻失败</p>
            <p>请稍后刷新页面重试</p>
        </div>
    `;
}

// 添加滚动动画
function addScrollAnimation() {
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
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Page load time: ${loadTime.toFixed(2)}ms`);
    });
}
