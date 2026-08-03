// 国际化支持：默认中文，其次英文，根据浏览器语言自动选择，并支持手动切换
(function () {
    'use strict';

    var DEFAULT_LANG = 'zh';      // 默认语言：中文
    var STORAGE_KEY = 'lang';     // 用户选择存储键

    // 语言词典
    var translations = {
        zh: {
            'hello': "Hello I'm",
            'desc.job': '👦 <span class="purpleText">Java、Go</span> 开发者',
            'desc.quote': '📝 Build what you believe in. Create what matters.',
            'location': '湖南',
            'free': 'Free',
            'tag.work': '打工',
            'tag.frontend': '前端',
            'tag.crawler': '爬虫',
            'tag.movie': '电影',
            'time.website': '网站创建',
            'time.powell': '谁是鲍威尔？',
            'time.crawler': 'Web Crawler 开发者',
            'time.java': 'Java 开发者',
            'tip.juejin': '稀土掘金',
            'tip.wechat': '微信',
            'title.site': '网站',
            'title.project': '项目',
            'title.skills': '技能',
            'blog': '博客',
            'blog.desc': '记录摆烂日常',
            'notes': '笔记分享',
            'notes.desc': '适合新手',
            'tools.desc': '在线工具集合',
            'template.desc': '技术相关集合😼',
            'validator.desc': 'Java 参数校验工具',
            'crawler.desc': '网络爬虫-自动渲染'
        },
        en: {
            'hello': "Hello I'm",
            'desc.job': '👦 <span class="purpleText">Java、Go</span> Developer',
            'desc.quote': '📝 Build what you believe in. Create what matters.',
            'location': 'Hunan',
            'free': 'Free',
            'tag.work': 'Work',
            'tag.frontend': 'Frontend',
            'tag.crawler': 'Crawler',
            'tag.movie': 'Movie',
            'time.website': 'Website created',
            'time.powell': "Who's Powell?",
            'time.crawler': 'Web Crawler Developer',
            'time.java': 'Java Developer',
            'tip.juejin': 'Juejin',
            'tip.wechat': 'WeChat',
            'title.site': 'Site',
            'title.project': 'Projects',
            'title.skills': 'Skills',
            'blog': 'Blog',
            'blog.desc': 'Documenting daily life',
            'notes': 'Notes Sharing',
            'notes.desc': 'Beginner-friendly',
            'tools.desc': 'Online tool collection',
            'template.desc': 'Tech-related collection 😼',
            'validator.desc': 'Java parameter validation tool',
            'crawler.desc': 'Web crawler - auto rendering'
        }
    };

    // 安全读写 localStorage（隐私模式下可能不可用）
    function storageGet(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }
    function storageSet(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* 忽略 */ }
    }

    // 根据浏览器语言判断语种，默认中文
    function detectLanguage() {
        var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browserLang.indexOf('zh') === 0) {
            return 'zh';
        }
        if (browserLang.indexOf('en') === 0) {
            return 'en';
        }
        return DEFAULT_LANG;
    }

    // 当前语言：优先用户手动选择，其次浏览器语言
    function getCurrentLang() {
        var saved = storageGet(STORAGE_KEY);
        return (saved === 'zh' || saved === 'en') ? saved : detectLanguage();
    }

    // 应用指定语言到页面
    function applyLanguage(lang) {
        var dict = translations[lang] || translations[DEFAULT_LANG];

        // 纯文本元素
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        // 带 HTML 标记的元素（如高亮 span）
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        // 更新 html 的 lang 属性
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

        // 更新切换按钮文案与提示
        var switchBtn = document.getElementById('langSwitch');
        if (switchBtn) {
            switchBtn.textContent = lang === 'zh' ? '中' : 'EN';
            switchBtn.title = lang === 'zh' ? 'Switch to English' : '切换到中文';
        }

        // 记住用户选择
        storageSet(STORAGE_KEY, lang);
    }

    // 手动切换语言（供按钮 onclick 调用）
    window.toggleLanguage = function () {
        applyLanguage(getCurrentLang() === 'zh' ? 'en' : 'zh');
    };

    // 页面加载后初始化
    document.addEventListener('DOMContentLoaded', function () {
        applyLanguage(getCurrentLang());
    });
})();