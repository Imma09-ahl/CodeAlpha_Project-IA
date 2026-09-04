// ===========================
// ELEMENTS DU DOM
// ===========================
const sourceText    = document.getElementById('sourceText');
const translatedText= document.getElementById('translatedText');
const sourceLang    = document.getElementById('sourceLang');
const targetLang    = document.getElementById('targetLang');
const translateBtn  = document.getElementById('translateBtn');
const btnText       = document.getElementById('btnText');
const btnLoader     = document.getElementById('btnLoader');
const swapBtn       = document.getElementById('swapBtn');
const copyBtn       = document.getElementById('copyBtn');
const clearBtn      = document.getElementById('clearBtn');
const charCount     = document.getElementById('charCount');
const speakSourceBtn= document.getElementById('speakSourceBtn');
const speakTargetBtn= document.getElementById('speakTargetBtn');
const historyList   = document.getElementById('historyList');
const translationInfo = document.getElementById('translationInfo');

// Cache des langues disponibles
let availableLanguages = [];

/**
 * Helper de traduction sécurisé avec fallback.
 */
function translateMsg(key, params = {}) {
    if (window.i18n && typeof window.i18n.t === 'function') {
        return window.i18n.t(key, params);
    }
    return key;
}

/**
 * Obtient le nom localisé d'une langue selon la langue d'interface active.
 */
function getLocalizedLangName(code, defaultName) {
    if (code === 'auto') {
        return translateMsg('translate.auto_detect');
    }
    const locName = translateMsg('languages.' + code);
    return (locName && locName !== ('languages.' + code)) ? locName : defaultName;
}

// ===========================
// CHARGER LES LANGUES
// ===========================
async function loadLanguages() {
    try {
        const response = await fetch('/api/languages');
        availableLanguages = await response.json();

        renderLanguageDropdowns();

        // Valeurs par défaut initiales
        if (!sourceLang.value) sourceLang.value = 'fr';
        if (!targetLang.value) targetLang.value = 'en';
    } catch (error) {
        console.error('Erreur chargement langues:', error);
    }
}

/**
 * Re-génère les libellés des dropdowns tout en conservant scrupuleusement
 * les sélections sourceLang et targetLang de l'utilisateur.
 */
function renderLanguageDropdowns() {
    const currentSrc = sourceLang.value || 'fr';
    const currentTgt = targetLang.value || 'en';

    // 1. Source Language
    sourceLang.innerHTML = '';
    const autoOpt = new Option(getLocalizedLangName('auto', 'Detect Language'), 'auto');
    autoOpt.setAttribute('data-i18n', 'translate.auto_detect');
    sourceLang.appendChild(autoOpt);

    availableLanguages.forEach(lang => {
        const label = getLocalizedLangName(lang.code, lang.name);
        sourceLang.appendChild(new Option(label, lang.code));
    });
    sourceLang.value = currentSrc;

    // 2. Target Language
    targetLang.innerHTML = '';
    availableLanguages.forEach(lang => {
        const label = getLocalizedLangName(lang.code, lang.name);
        targetLang.appendChild(new Option(label, lang.code));
    });
    targetLang.value = currentTgt;
}

// ===========================
// COMPTER LES CARACTERES
// ===========================
sourceText.addEventListener('input', () => {
    const count = sourceText.value.length;
    charCount.textContent = `${count} / 500`;
    if (count > 400) {
        charCount.style.color = '#dc2626';
    } else {
        charCount.style.color = 'var(--text3)';
    }
});

// ===========================
// TRADUIRE
// ===========================
translateBtn.addEventListener('click', async () => {
    const text = sourceText.value.trim();
    if (!text) {
        alert(translateMsg('translate.alert_enter_text'));
        return;
    }

    // Afficher le loader
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    translateBtn.disabled = true;

    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source_text: text,
                source_lang: sourceLang.value,
                target_lang: targetLang.value
            })
        });

        const data = await response.json();

        if (data.success) {
            translatedText.value = data.translated_text;

            const srcLabel = sourceLang.options[sourceLang.selectedIndex] ? sourceLang.options[sourceLang.selectedIndex].text : sourceLang.value;
            const tgtLabel = targetLang.options[targetLang.selectedIndex] ? targetLang.options[targetLang.selectedIndex].text : targetLang.value;

            translationInfo.textContent = translateMsg('translate.translated_info', {
                src: srcLabel,
                tgt: tgtLabel
            });

            loadHistory();
        } else {
            alert(translateMsg('translate.alert_error') + data.error);
        }
    } catch (error) {
        alert(translateMsg('translate.alert_network'));
    } finally {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        translateBtn.disabled = false;
    }
});

// ===========================
// SWAP LANGUES
// ===========================
swapBtn.addEventListener('click', () => {
    // Si la langue source est 'auto', ne pas la mettre dans la cible
    if (sourceLang.value === 'auto') {
        alert('Impossible d\'inverser lorsque la langue source est automatique.');
        return;
    }

    const tempLang = sourceLang.value;
    const tempText = sourceText.value;

    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;
    sourceText.value = translatedText.value;
    translatedText.value = tempText;

    charCount.textContent = `${sourceText.value.length} / 500`;
});

// ===========================
// COPIER LA TRADUCTION
// ===========================
copyBtn.addEventListener('click', () => {
    if (!translatedText.value) return;
    navigator.clipboard.writeText(translatedText.value);

    const originalText = translateMsg('translate.btn_copy');
    copyBtn.textContent = translateMsg('translate.btn_copied');
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
});

// ===========================
// EFFACER
// ===========================
clearBtn.addEventListener('click', () => {
    sourceText.value = '';
    translatedText.value = '';
    charCount.textContent = '0 / 500';
    translationInfo.textContent = '';
});

// ===========================
// TEXT-TO-SPEECH
// ===========================
function speak(text, lang) {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    // Si la langue est 'auto', utiliser la langue de l'interface ou détecter
    utterance.lang = (lang === 'auto') ? (window.i18n ? window.i18n.getLanguage() : 'en') : lang;
    window.speechSynthesis.speak(utterance);
}

speakSourceBtn.addEventListener('click', () => {
    speak(sourceText.value, sourceLang.value);
});

speakTargetBtn.addEventListener('click', () => {
    speak(translatedText.value, targetLang.value);
});

// ===========================
// HISTORIQUE
// ===========================
async function loadHistory() {
    try {
        const response = await fetch('/api/history');
        const history = await response.json();

        if (!Array.isArray(history) || history.length === 0) {
            historyList.innerHTML = `<p class="no-history" data-i18n="translate.history_empty">${translateMsg('translate.history_empty')}</p>`;
            return;
        }

        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <div class="history-texts">
                    <span class="history-source">${item.source_text}</span>
                    <span class="history-arrow">→</span>
                    <span class="history-target">${item.translated_text}</span>
                </div>
                <span class="history-langs">${item.source_language} → ${item.target_language}</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erreur chargement historique:', error);
    }
}

// ===========================
// EFFACER L'HISTORIQUE
// ===========================
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

clearHistoryBtn.addEventListener('click', async () => {
    if (!confirm(translateMsg('translate.history_confirm'))) return;
    
    try {
        const response = await fetch('/api/history/clear', {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
            historyList.innerHTML = `<p class="no-history" data-i18n="translate.history_empty">${translateMsg('translate.history_empty')}</p>`;
        }
    } catch (error) {
        console.error('Erreur suppression historique:', error);
    }
});

// ===========================
// ECOUTER LE CHANGEMENT DE LANGUE D'INTERFACE
// ===========================
window.addEventListener('interfaceLanguageChanged', () => {
    // 1. Mettre à jour les labels des langues dans les sélecteurs
    renderLanguageDropdowns();

    // 2. Mettre à jour les boutons qui pourraient afficher un texte dynamique
    if (copyBtn && !copyBtn.textContent.includes('✅')) {
        copyBtn.textContent = translateMsg('translate.btn_copy');
    }

    // 3. Mettre à jour l'historique si vide
    const noHistEl = historyList.querySelector('.no-history');
    if (noHistEl) {
        noHistEl.textContent = translateMsg('translate.history_empty');
    }
});

// ===========================
// INITIALISATION
// ===========================
loadLanguages();
loadHistory();