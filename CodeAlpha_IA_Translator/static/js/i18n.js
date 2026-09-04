/**
 * Moteur d'internationalisation (i18n) de l'interface utilisateur.
 * Gère la détection, la persistance locale (localStorage) et la mise à jour dynamique du DOM.
 */
(function () {
    const STORAGE_KEY = 'app_interface_lang';
    const DEFAULT_LANG = 'en';

    const SUPPORTED_LANGUAGES = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'pt', name: 'Português', flag: '🇵🇹' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' }
    ];

    let currentLang = DEFAULT_LANG;

    /**
     * Détection de la langue prioritaire :
     * 1. Choix explicite sauvegardé par l'utilisateur (localStorage)
     * 2. Langue du navigateur (navigator.language)
     * 3. Anglais par défaut
     */
    function detectLanguage() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && window.translations && window.translations[saved]) {
            return saved;
        }

        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        const baseLang = browserLang.split('-')[0];
        if (baseLang && window.translations && window.translations[baseLang]) {
            return baseLang;
        }

        return DEFAULT_LANG;
    }

    /**
     * Récupère la valeur d'une clé de traduction (supporte la notation pointée 'a.b.c').
     */
    function getTranslation(key, lang = currentLang) {
        if (!window.translations) return key;

        const langDict = window.translations[lang] || window.translations[DEFAULT_LANG];
        if (!langDict) return key;

        const keys = key.split('.');
        let val = langDict;
        for (const k of keys) {
            if (val && typeof val === 'object' && k in val) {
                val = val[k];
            } else {
                // Fallback vers l'anglais
                const fallbackDict = window.translations[DEFAULT_LANG];
                let fallbackVal = fallbackDict;
                for (const fk of keys) {
                    if (fallbackVal && typeof fallbackVal === 'object' && fk in fallbackVal) {
                        fallbackVal = fallbackVal[fk];
                    } else {
                        return key;
                    }
                }
                return fallbackVal;
            }
        }
        return val;
    }

    /**
     * Traduit une clé en remplaçant d'éventuels paramètres ({name}).
     */
    function t(key, params = {}) {
        let text = getTranslation(key, currentLang);
        if (typeof text !== 'string') return text;

        for (const [pKey, pVal] of Object.entries(params)) {
            text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
        }
        return text;
    }

    /**
     * Met à jour tous les éléments du DOM annotés avec des attributs data-i18n.
     */
    function updateDOM() {
        const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || {};

        // Mettre à jour l'élément <html>
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', langConfig.dir || 'ltr');

        // Mettre à jour le titre du document si spécifié
        const metaTitleKey = document.querySelector('meta[name="i18n-title"]');
        if (metaTitleKey) {
            const titleKey = metaTitleKey.getAttribute('content');
            if (titleKey) document.title = t(titleKey);
        }

        // Textes et HTML internes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (translation !== undefined) {
                // Si la traduction contient des balises HTML (ex: <span>), utiliser innerHTML
                if (typeof translation === 'string' && translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.setAttribute('placeholder', t(key));
        });

        // Titres d'éléments (tooltips)
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.setAttribute('title', t(key));
        });

        // Attributs aria-label
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            el.setAttribute('aria-label', t(key));
        });

        // Mettre à jour les sélecteurs de langue dans l'interface
        updateLanguageSelectorUI();
    }

    /**
     * Met à jour l'affichage visuel du sélecteur de langue.
     */
    function updateLanguageSelectorUI() {
        const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
        
        document.querySelectorAll('.lang-switcher-btn .lang-name').forEach(el => {
            el.textContent = currentLangObj.name;
        });

        document.querySelectorAll('.lang-switcher-dropdown .lang-option').forEach(opt => {
            const code = opt.getAttribute('data-lang');
            if (code === currentLang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    /**
     * Change la langue de l'interface et notifie l'application.
     */
    function setLanguage(langCode) {
        if (!window.translations || !window.translations[langCode]) {
            console.warn(`Langue [${langCode}] non supportée.`);
            return;
        }

        currentLang = langCode;
        localStorage.setItem(STORAGE_KEY, langCode);
        updateDOM();

        // Notifier les composants abonnés (ex: translate.js)
        window.dispatchEvent(new CustomEvent('interfaceLanguageChanged', {
            detail: { lang: langCode, t: t }
        }));
    }

    /**
     * Initialise le composant sélecteur de langue dans la barre de navigation.
     */
    function setupLanguageSwitcher() {
        const containers = document.querySelectorAll('.lang-switcher-container');
        if (!containers.length) return;

        containers.forEach(container => {
            container.innerHTML = `
                <div class="lang-switcher">
                    <button class="lang-switcher-btn" type="button" aria-haspopup="true" aria-expanded="false" title="Language / Langue">
                        <span class="lang-globe">🌐</span>
                        <span class="lang-name">English</span>
                        <span class="lang-arrow">▾</span>
                    </button>
                    <div class="lang-switcher-dropdown" role="menu">
                        ${SUPPORTED_LANGUAGES.map(lang => `
                            <button type="button" class="lang-option ${lang.code === currentLang ? 'active' : ''}" data-lang="${lang.code}" role="menuitem">
                                <span class="lang-flag">${lang.flag}</span>
                                <span class="lang-label">${lang.name}</span>
                                <span class="lang-check">✓</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;

            const btn = container.querySelector('.lang-switcher-btn');
            const dropdown = container.querySelector('.lang-switcher-dropdown');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdown.classList.toggle('show');
                btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            dropdown.querySelectorAll('.lang-option').forEach(opt => {
                opt.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const selectedCode = opt.getAttribute('data-lang');
                    setLanguage(selectedCode);
                    dropdown.classList.remove('show');
                    btn.setAttribute('aria-expanded', 'false');
                });
            });
        });

        // Fermer le dropdown lors d'un clic en dehors
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-switcher-dropdown.show').forEach(dd => {
                dd.classList.remove('show');
                const pBtn = dd.parentElement.querySelector('.lang-switcher-btn');
                if (pBtn) pBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /**
     * Initialisation globale
     */
    function init() {
        currentLang = detectLanguage();
        setupLanguageSwitcher();
        updateDOM();
    }

    // Exposer l'API globale i18n
    window.i18n = {
        init: init,
        t: t,
        setLanguage: setLanguage,
        getLanguage: () => currentLang,
        getSupportedLanguages: () => [...SUPPORTED_LANGUAGES]
    };

    // Auto-initialisation lorsque le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
