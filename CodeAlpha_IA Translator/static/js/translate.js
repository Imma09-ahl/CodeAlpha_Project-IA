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

// ===========================
// CHARGER LES LANGUES
// ===========================
async function loadLanguages() {
    try {
        const response = await fetch('/api/languages');
        const languages = await response.json();

        languages.forEach(lang => {
            const option1 = new Option(lang.name, lang.code);
            const option2 = new Option(lang.name, lang.code);
            sourceLang.appendChild(option1);
            targetLang.appendChild(option2);
        });

        // Valeurs par défaut
        sourceLang.value = 'fr';
        targetLang.value = 'en';
    } catch (error) {
        console.error('Erreur chargement langues:', error);
    }
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
        alert('Veuillez entrer un texte à traduire.');
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
            translationInfo.textContent = `Traduit de ${sourceLang.options[sourceLang.selectedIndex].text} vers ${targetLang.options[targetLang.selectedIndex].text}`;
            loadHistory();
        } else {
            alert('Erreur lors de la traduction : ' + data.error);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur.');
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
    copyBtn.textContent = '✅ Copié !';
    setTimeout(() => {
        copyBtn.textContent = '📋 Copier';
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
    utterance.lang = lang;
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

        if (history.length === 0) {
            historyList.innerHTML = '<p class="no-history">Aucune traduction pour le moment.</p>';
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
// INITIALISATION
// ===========================
loadLanguages();
loadHistory();