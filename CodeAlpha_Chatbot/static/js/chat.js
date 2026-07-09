// ===========================
// ELEMENTS DU DOM
// ===========================
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const messages = document.getElementById('messages');
const themeBtn = document.getElementById('themeBtn');
const clearBtn = document.getElementById('clearBtn');
const newConvBtn = document.getElementById('newConvBtn');
const recentList = document.getElementById('recentList');

// ===========================
// THEME SOMBRE / CLAIR
// ===========================
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeBtn(savedTheme);

function updateThemeBtn(theme) {
    themeBtn.innerHTML = theme === 'dark' 
        ? '<i class="ti ti-moon"></i>' 
        : '<i class="ti ti-sun"></i>';
}

themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeBtn(next);
});

// ===========================
// ENVOYER UN MESSAGE
// ===========================
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Supprimer le message de bienvenue
    const welcome = document.querySelector('.welcome-msg');
    if (welcome) welcome.remove();

    // Afficher le message utilisateur
    appendUserMessage(text);
    userInput.value = '';

    // Afficher l'indicateur de frappe
    const typingId = showTyping();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
        removeTyping(typingId);

        if (data.success) {
            appendBotMessage(data.answer, data.score);
            addToRecent(text);
        } else {
            appendBotMessage("Désolé, une erreur s'est produite. Veuillez réessayer.", 0);
        }
    } catch (error) {
        removeTyping(typingId);
        appendBotMessage("Impossible de contacter le serveur. Vérifiez votre connexion.", 0);
    }
}

// ===========================
// AFFICHER MESSAGE UTILISATEUR
// ===========================
function appendUserMessage(text) {
    const time = getCurrentTime();
    const div = document.createElement('div');
    div.className = 'msg-user';
    div.innerHTML = `
        <div class="msg-user-content">
            <div class="msg-user-bubble">${escapeHtml(text)}</div>
            <div class="msg-user-time">${time} ✓✓</div>
        </div>
    `;
    messages.appendChild(div);
    scrollToBottom();
}

// ===========================
// AFFICHER MESSAGE BOT
// ===========================
function appendBotMessage(text, score) {
    const time = getCurrentTime();
    const scorePercent = Math.round(score * 100);
    const div = document.createElement('div');
    div.className = 'msg-bot';
    div.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div class="msg-bot-content">
            <div class="msg-bot-bubble">${escapeHtml(text)}</div>
            <div class="msg-bot-time">${time}</div>
            ${score > 0 ? `<div class="msg-score">Pertinence : ${scorePercent}%</div>` : ''}
        </div>
    `;
    messages.appendChild(div);
    scrollToBottom();
}

// ===========================
// INDICATEUR DE FRAPPE
// ===========================
function showTyping() {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'msg-bot';
    div.id = id;
    div.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div class="msg-bot-content">
            <div class="msg-bot-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    messages.appendChild(div);
    scrollToBottom();
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// ===========================
// SUGGESTIONS
// ===========================
function sendSuggestion(btn) {
    userInput.value = btn.textContent;
    sendMessage();
}

// ===========================
// CONVERSATIONS RECENTES
// ===========================
function addToRecent(text) {
    const noRecent = recentList.querySelector('.no-recent');
    if (noRecent) noRecent.remove();

    const time = getCurrentTime();
    const div = document.createElement('div');
    div.className = 'recent-item';
    div.innerHTML = `
        <span>${escapeHtml(text.substring(0, 25))}${text.length > 25 ? '...' : ''}</span>
        <time>${time}</time>
    `;
    recentList.insertBefore(div, recentList.firstChild);

    // Garder max 5 items
    const items = recentList.querySelectorAll('.recent-item');
    if (items.length > 5) items[items.length - 1].remove();
}

// ===========================
// NOUVELLE CONVERSATION
// ===========================
newConvBtn.addEventListener('click', () => {
    messages.innerHTML = `
        <div class="welcome-msg">
            <div class="welcome-icon">🤖</div>
            <h3>Bonjour ! Je suis AIBot FAQ</h3>
            <p>Posez-moi vos questions sur l'Intelligence Artificielle, le Machine Learning, le Deep Learning et bien plus encore !</p>
            <div class="suggestions">
                <button class="suggestion-btn" onclick="sendSuggestion(this)">C'est quoi l'IA ?</button>
                <button class="suggestion-btn" onclick="sendSuggestion(this)">C'est quoi le machine learning ?</button>
                <button class="suggestion-btn" onclick="sendSuggestion(this)">C'est quoi ChatGPT ?</button>
                <button class="suggestion-btn" onclick="sendSuggestion(this)">Comment apprendre l'IA ?</button>
            </div>
        </div>
    `;
});

// ===========================
// EFFACER LA CONVERSATION
// ===========================
clearBtn.addEventListener('click', async () => {
    if (!confirm('Voulez-vous effacer toute la conversation ?')) return;
    
    try {
        await fetch('/api/history/clear', { method: 'DELETE' });
        newConvBtn.click();
    } catch (error) {
        console.error('Erreur effacement:', error);
    }
});

// ===========================
// UTILITAIRES
// ===========================
function getCurrentTime() {
    return new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}