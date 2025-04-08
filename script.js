// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    initCarousel();
    
    // 语言切换功能
    initLanguageSwitcher();
});

// 初始化轮播图
function initCarousel() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !prevBtn || !nextBtn) return;
    
    // 显示指定的幻灯片
    function showSlide(n) {
        slideIndex = n;
        
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        
        slides.forEach(slide => slide.classList.remove('active'));
        slides[slideIndex].classList.add('active');
    }
    
    // 下一张幻灯片
    function nextSlide() {
        showSlide(slideIndex + 1);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        showSlide(slideIndex - 1);
    }
    
    // 添加按钮事件监听
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // 自动轮播（每5秒切换一次）
    setInterval(nextSlide, 5000);
}

// 初始化语言切换器
function initLanguageSwitcher() {
    const languageSelector = document.getElementById('language-selector');
    
    if (!languageSelector) return;
    
    // 从本地存储中获取用户之前选择的语言
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        languageSelector.value = savedLanguage;
        changeLanguage(savedLanguage);
    }
    
    // 监听语言选择更改
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
        localStorage.setItem('preferredLanguage', selectedLanguage);
    });
}

// 切换语言
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-zh], [data-lang-en]');
    
    elements.forEach(el => {
        if (lang === 'zh-CN' && el.hasAttribute('data-lang-zh')) {
            el.textContent = el.getAttribute('data-lang-zh');
        } else if (lang === 'en-US' && el.hasAttribute('data-lang-en')) {
            el.textContent = el.getAttribute('data-lang-en');
        }
    });
    
    // 更新页面语言
    document.documentElement.lang = lang;
    
    // 更新页面标题
    const titleElement = document.querySelector('title');
    if (titleElement) {
        if (lang === 'zh-CN') {
            titleElement.textContent = 'Draw Climber - 创意攀爬绘图游戏 | drawclimber.top';
        } else if (lang === 'en-US') {
            titleElement.textContent = 'Draw Climber - Creative Climbing Drawing Game | drawclimber.top';
        }
    }
}

// 检测用户浏览器语言
function detectBrowserLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage;
    if (browserLanguage.startsWith('zh')) {
        return 'zh-CN';
    } else {
        return 'en-US';
    }
}

// 添加触摸滑动支持（针对移动设备）
function initTouchSlide() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;
    
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    }, false);
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 50; // 最小滑动距离
        
        if (startX - endX > threshold) {
            // 向左滑动，显示下一张
            document.querySelector('.next-btn').click();
        } else if (endX - startX > threshold) {
            // 向右滑动，显示上一张
            document.querySelector('.prev-btn').click();
        }
    }
} 