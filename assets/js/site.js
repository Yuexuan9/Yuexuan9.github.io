(() => {
    const languageKey = 's1-project-language';
    const selectedKey = 'portfolio-selected-project';
    const textNodes = [...document.querySelectorAll('[data-zh]')];
    const originalText = new Map(textNodes.map(node => [node, node.textContent]));
    const translatedAttributes = ['aria-label', 'alt'];
    const originalAttributes = new Map();
    translatedAttributes.forEach(attribute => {
        document.querySelectorAll('[data-zh-' + attribute + ']').forEach(node => {
            originalAttributes.set(node, {...originalAttributes.get(node), [attribute]: node.getAttribute(attribute)});
        });
    });
    const readStorage = (storage, key) => { try { return window[storage].getItem(key); } catch { return null; } };
    const writeStorage = (storage, key, value) => { try { window[storage].setItem(key, value); } catch {} };
    const buttons = [...document.querySelectorAll('[data-language]')];
    function setLanguage(language, updateUrl = false) {
        const lang = language === 'zh' ? 'zh' : 'en';
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.documentElement.dataset.lang = lang;
        textNodes.forEach(node => { node.textContent = lang === 'zh' ? node.dataset.zh : originalText.get(node); });
        originalAttributes.forEach((attributes, node) => {
            Object.keys(attributes).forEach(attribute => {
                node.setAttribute(attribute, lang === 'zh' ? node.getAttribute('data-zh-' + attribute) : attributes[attribute]);
            });
        });
        buttons.forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === lang)); });
        document.querySelectorAll('[data-project-link]').forEach(link => {
            const destination = new URL(link.getAttribute('href'), location.href);
            destination.searchParams.set('lang', lang);
            link.setAttribute('href', destination.pathname + destination.search + destination.hash);
        });
        writeStorage('localStorage', languageKey, lang);
        if (updateUrl) {
            const url = new URL(location.href);
            url.searchParams.set('lang', lang);
            history.replaceState(null, '', url);
        }
        document.dispatchEvent(new CustomEvent('languagechange', {detail: {language: lang}}));
    }
    const cards = [...document.querySelectorAll('a.project-card')];
    function selectCard(card) {
        cards.forEach(item => item.classList.toggle('is-selected', item === card));
        writeStorage('sessionStorage', selectedKey, card.dataset.project);
    }
    cards.forEach(card => {
        card.addEventListener('pointerdown', event => { if (event.button === 0) selectCard(card); });
        card.addEventListener('click', () => selectCard(card));
    });
    const selected = readStorage('sessionStorage', selectedKey);
    cards.forEach(card => card.classList.toggle('is-selected', card.dataset.project === selected));
    buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
    const requested = new URLSearchParams(location.search).get('lang');
    setLanguage(['en', 'zh'].includes(requested) ? requested : readStorage('localStorage', languageKey));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('video').forEach(video => {
            video.autoplay = false;
            video.pause();
            video.controls = !video.closest('a.project-card');
        });
    }
})();
