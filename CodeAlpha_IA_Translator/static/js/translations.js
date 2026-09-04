/**
 * Dictionnaires centralisés d'internationalisation (i18n).
 * Contient l'ensemble des traductions visibles de l'interface utilisateur.
 * Facilement extensible : pour ajouter une nouvelle langue, ajouter une entrée sous translations[code].
 */
const translations = {
    en: {
        meta: {
            title_home: "AI Translator - Translate Any Language Instantly",
            title_translate: "AI Translator - Instant Translation"
        },
        nav: {
            home: "Home",
            translate: "Translation",
            features: "Features",
            about: "About",
            contact: "Contact",
            start_btn: "Get Started"
        },
        hero: {
            badge: "✨ Powered by Artificial Intelligence",
            title_prefix: "Translate Any Language",
            title_highlight: "Instantly",
            desc: "Powered by Artificial Intelligence, our platform helps you communicate with people around the world in seconds.",
            start_btn: "↗ Start Translating",
            learn_more_btn: "▶ Learn More"
        },
        features: {
            instant_title: "Instant Translation",
            instant_desc: "Get fast translations in a matter of seconds.",
            ai_title: "Artificial Intelligence",
            ai_desc: "Smart, contextual and accurate translations.",
            languages_title: "100+ Languages",
            languages_desc: "Communicate seamlessly across the globe.",
            tts_title: "Text-to-Speech",
            tts_desc: "Listen to natural pronunciations of your translations."
        },
        how: {
            title: "How does it work?",
            step1_title: "Enter your text",
            step1_desc: "Type or paste the text you want to translate.",
            step2_title: "Choose languages",
            step2_desc: "Select source and target translation languages.",
            step3_title: "Get your translation",
            step3_desc: "AI produces high-accuracy translations instantly."
        },
        reviews: {
            title: "What our users say",
            review1_text: "\"This app helped me communicate with international clients easily and effortlessly.\"",
            review1_role: "Business Owner",
            review2_text: "\"Fast, accurate and very intuitive to use. Highly recommended!\"",
            review2_role: "Entrepreneur"
        },
        footer: {
            tagline: "Break down language barriers with Artificial Intelligence.",
            quick_links: "Quick Links",
            resources: "Resources",
            blog: "Blog",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            faq: "FAQ",
            stay_connected: "Stay Connected",
            newsletter_desc: "Subscribe to receive our latest updates.",
            email_placeholder: "Your email address",
            rights: "© 2026 AI Language Translator. All rights reserved."
        },
        translate: {
            header_title: "Instant",
            header_highlight: "Translation",
            header_desc: "Translate text across 100+ languages powered by Artificial Intelligence",
            auto_detect: "Detect Language",
            source_placeholder: "Enter your text here...",
            target_placeholder: "Translation will appear here...",
            btn_clear: "🗑️ Clear",
            btn_listen: "🔊 Listen",
            btn_swap_title: "Swap languages",
            btn_copy: "📋 Copy",
            btn_copied: "✅ Copied!",
            btn_translate: "✨ Translate",
            btn_translating: "⏳ Translating...",
            history_title: "📋 Translation History",
            history_clear: "🗑️ Clear History",
            history_empty: "No translations yet.",
            history_confirm: "Do you really want to clear the entire translation history?",
            alert_enter_text: "Please enter text to translate.",
            alert_error: "Error during translation: ",
            alert_network: "Server connection error.",
            translated_info: "Translated from {src} to {tgt}"
        },
        languages: {
            auto: "Detect Language",
            fr: "French",
            en: "English",
            es: "Spanish",
            de: "German",
            it: "Italian",
            pt: "Portuguese",
            ar: "Arabic",
            zh: "Chinese",
            ja: "Japanese",
            ru: "Russian",
            nl: "Dutch",
            pl: "Polish",
            tr: "Turkish",
            ko: "Korean",
            sv: "Swedish",
            da: "Danish",
            fi: "Finnish",
            el: "Greek",
            he: "Hebrew",
            hi: "Hindi"
        }
    },

    fr: {
        meta: {
            title_home: "AI Translator - Traduire instantanément",
            title_translate: "AI Translator - Traduction instantanée"
        },
        nav: {
            home: "Accueil",
            translate: "Traduction",
            features: "Fonctionnalités",
            about: "À propos",
            contact: "Contact",
            start_btn: "Commencer"
        },
        hero: {
            badge: "✨ Propulsé par l'Intelligence Artificielle",
            title_prefix: "Traduisez n'importe quelle langue",
            title_highlight: "instantanément",
            desc: "Propulsée par l'Intelligence Artificielle, notre plateforme vous aide à communiquer avec le monde entier en quelques secondes.",
            start_btn: "↗ Commencer la traduction",
            learn_more_btn: "▶ En savoir plus"
        },
        features: {
            instant_title: "Traduction instantanée",
            instant_desc: "Obtenez des traductions en quelques secondes.",
            ai_title: "Intelligence Artificielle",
            ai_desc: "Des traductions intelligentes et contextuelles.",
            languages_title: "Plus de 100 langues",
            languages_desc: "Communiquez partout dans le monde.",
            tts_title: "Synthèse vocale",
            tts_desc: "Écoutez la prononciation des traductions."
        },
        how: {
            title: "Comment ça fonctionne ?",
            step1_title: "Entrez votre texte",
            step1_desc: "Saisissez le texte que vous souhaitez traduire.",
            step2_title: "Choisissez les langues",
            step2_desc: "Sélectionnez la langue source et la langue cible.",
            step3_title: "Obtenez le résultat",
            step3_desc: "L'IA génère immédiatement la traduction."
        },
        reviews: {
            title: "Ce que disent nos utilisateurs",
            review1_text: "\"Cette application m'a permis de communiquer facilement avec des clients internationaux.\"",
            review1_role: "Cheffe d'entreprise",
            review2_text: "\"Rapide, précis et très simple d'utilisation. Fortement recommandé !\"",
            review2_role: "Entrepreneur"
        },
        footer: {
            tagline: "Brisez les barrières linguistiques grâce à l'Intelligence Artificielle.",
            quick_links: "Liens rapides",
            resources: "Ressources",
            blog: "Blog",
            privacy: "Politique de confidentialité",
            terms: "Conditions d'utilisation",
            faq: "FAQ",
            stay_connected: "Restez connecté",
            newsletter_desc: "Abonnez-vous pour recevoir nos mises à jour.",
            email_placeholder: "Votre email",
            rights: "© 2026 AI Language Translator. Tous droits réservés."
        },
        translate: {
            header_title: "Traduction",
            header_highlight: "Instantanée",
            header_desc: "Traduisez du texte dans plus de 100 langues grâce à l'Intelligence Artificielle",
            auto_detect: "Détecter la langue",
            source_placeholder: "Entrez votre texte ici...",
            target_placeholder: "La traduction apparaîtra ici...",
            btn_clear: "🗑️ Effacer",
            btn_listen: "🔊 Écouter",
            btn_swap_title: "Inverser les langues",
            btn_copy: "📋 Copier",
            btn_copied: "✅ Copié !",
            btn_translate: "✨ Traduire",
            btn_translating: "⏳ Traduction en cours...",
            history_title: "📋 Historique des traductions",
            history_clear: "🗑️ Effacer l'historique",
            history_empty: "Aucune traduction pour le moment.",
            history_confirm: "Voulez-vous vraiment effacer tout l'historique ?",
            alert_enter_text: "Veuillez entrer un texte à traduire.",
            alert_error: "Erreur lors de la traduction : ",
            alert_network: "Erreur de connexion au serveur.",
            translated_info: "Traduit de {src} vers {tgt}"
        },
        languages: {
            auto: "Détecter la langue",
            fr: "Français",
            en: "Anglais",
            es: "Espagnol",
            de: "Allemand",
            it: "Italien",
            pt: "Portugais",
            ar: "Arabe",
            zh: "Chinois",
            ja: "Japonais",
            ru: "Russe",
            nl: "Néerlandais",
            pl: "Polonais",
            tr: "Turc",
            ko: "Coréen",
            sv: "Suédois",
            da: "Danois",
            fi: "Finnois",
            el: "Grec",
            he: "Hébreu",
            hi: "Hindi"
        }
    },

    pt: {
        meta: {
            title_home: "AI Translator - Traduzir qualquer idioma instantaneamente",
            title_translate: "AI Translator - Tradução Instantânea"
        },
        nav: {
            home: "Início",
            translate: "Tradução",
            features: "Recursos",
            about: "Sobre",
            contact: "Contato",
            start_btn: "Começar"
        },
        hero: {
            badge: "✨ Desenvolvido por Inteligência Artificial",
            title_prefix: "Traduza qualquer idioma",
            title_highlight: "instantaneamente",
            desc: "Alimentada por Inteligência Artificial, nossa plataforma ajuda você a se comunicar com pessoas do mundo todo em segundos.",
            start_btn: "↗ Começar a tradução",
            learn_more_btn: "▶ Saiba mais"
        },
        features: {
            instant_title: "Tradução instantânea",
            instant_desc: "Obtenha traduções rápidas em poucos segundos.",
            ai_title: "Inteligência Artificial",
            ai_desc: "Traduções inteligentes, contextuais e precisas.",
            languages_title: "Mais de 100 idiomas",
            languages_desc: "Comunique-se facilmente em todo o mundo.",
            tts_title: "Texto para Fala",
            tts_desc: "Ouça a pronúncia natural de suas traduções."
        },
        how: {
            title: "Como funciona?",
            step1_title: "Digite seu texto",
            step1_desc: "Insira o texto que você deseja traduzir.",
            step2_title: "Escolha os idiomas",
            step2_desc: "Selecione o idioma de origem e o de destino.",
            step3_title: "Obtenha o resultado",
            step3_desc: "A IA gera imediatamente a tradução precisa."
        },
        reviews: {
            title: "O que dizem nossos usuários",
            review1_text: "\"Este aplicativo me ajudou a comunicar facilmente com clientes internacionais.\"",
            review1_role: "Proprietária de Empresa",
            review2_text: "\"Rápido, preciso e muito simples de usar. Altamente recomendado!\"",
            review2_role: "Empreendedor"
        },
        footer: {
            tagline: "Derrube as barreiras linguísticas com a Inteligência Artificial.",
            quick_links: "Links Rápidos",
            resources: "Recursos",
            blog: "Blog",
            privacy: "Política de Privacidade",
            terms: "Termos de Serviço",
            faq: "Perguntas Frequentes",
            stay_connected: "Fique Conectado",
            newsletter_desc: "Inscreva-se para receber nossas atualizações.",
            email_placeholder: "Seu e-mail",
            rights: "© 2026 AI Language Translator. Todos os direitos reservados."
        },
        translate: {
            header_title: "Tradução",
            header_highlight: "Instantânea",
            header_desc: "Traduza textos em mais de 100 idiomas alimentados por Inteligência Artificial",
            auto_detect: "Detectar idioma",
            source_placeholder: "Digite seu texto aqui...",
            target_placeholder: "A tradução aparecerá aqui...",
            btn_clear: "🗑️ Limpar",
            btn_listen: "🔊 Ouvir",
            btn_swap_title: "Inverter idiomas",
            btn_copy: "📋 Copiar",
            btn_copied: "✅ Copiado!",
            btn_translate: "✨ Traduzir",
            btn_translating: "⏳ Traduzindo...",
            history_title: "📋 Histórico de traduções",
            history_clear: "🗑️ Limpar histórico",
            history_empty: "Nenhuma tradução no momento.",
            history_confirm: "Tem certeza de que deseja limpar todo o histórico?",
            alert_enter_text: "Por favor, digite um texto para traduzir.",
            alert_error: "Erro durante a tradução: ",
            alert_network: "Erro de conexão com o servidor.",
            translated_info: "Traduzido de {src} para {tgt}"
        },
        languages: {
            auto: "Detectar idioma",
            fr: "Francês",
            en: "Inglês",
            es: "Espanhol",
            de: "Alemão",
            it: "Italiano",
            pt: "Português",
            ar: "Árabe",
            zh: "Chinês",
            ja: "Japonês",
            ru: "Russo",
            nl: "Holandês",
            pl: "Polonês",
            tr: "Turco",
            ko: "Coreano",
            sv: "Sueco",
            da: "Dinamarquês",
            fi: "Finlandês",
            el: "Grego",
            he: "Hebraico",
            hi: "Hindi"
        }
    },

    es: {
        meta: {
            title_home: "AI Translator - Traduce cualquier idioma al instante",
            title_translate: "AI Translator - Traducción Instantánea"
        },
        nav: {
            home: "Inicio",
            translate: "Traducción",
            features: "Características",
            about: "Acerca de",
            contact: "Contacto",
            start_btn: "Empezar"
        },
        hero: {
            badge: "✨ Impulsado por Inteligencia Artificial",
            title_prefix: "Traduce cualquier idioma",
            title_highlight: "al instante",
            desc: "Impulsada por Inteligencia Artificial, nuestra plataforma te ayuda a comunicarte con personas de todo el mundo en segundos.",
            start_btn: "↗ Empezar a traducir",
            learn_more_btn: "▶ Saber más"
        },
        features: {
            instant_title: "Traducción instantánea",
            instant_desc: "Obtén traducciones rápidas en cuestión de segundos.",
            ai_title: "Inteligencia Artificial",
            ai_desc: "Traducciones inteligentes, contextuales y precisas.",
            languages_title: "Más de 100 idiomas",
            languages_desc: "Comunícate sin fronteras en todo el mundo.",
            tts_title: "Texto a Voz",
            tts_desc: "Escucha la pronunciación natural de las traducciones."
        },
        how: {
            title: "¿Cómo funciona?",
            step1_title: "Introduce tu texto",
            step1_desc: "Escribe el texto que deseas traducir.",
            step2_title: "Elige los idiomas",
            step2_desc: "Selecciona el idioma de origen y el de destino.",
            step3_title: "Obtén el resultado",
            step3_desc: "La IA genera inmediatamente la traducción precisa."
        },
        reviews: {
            title: "Lo que dicen nuestros usuarios",
            review1_text: "\"Esta aplicación me ayudó a comunicarme con clientes internacionales de manera fluida.\"",
            review1_role: "Empresaria",
            review2_text: "\"Rápida, precisa y muy fácil de usar. ¡Totalmente recomendada!\"",
            review2_role: "Emprendedor"
        },
        footer: {
            tagline: "Rompe las barreras del idioma con Inteligencia Artificial.",
            quick_links: "Enlaces rápidos",
            resources: "Recursos",
            blog: "Blog",
            privacy: "Política de Privacidad",
            terms: "Términos de Servicio",
            faq: "Preguntas Frecuentes",
            stay_connected: "Mantente conectado",
            newsletter_desc: "Suscríbete para recibir nuestras novedades.",
            email_placeholder: "Tu correo electrónico",
            rights: "© 2026 AI Language Translator. Todos los derechos reservados."
        },
        translate: {
            header_title: "Traducción",
            header_highlight: "Instantánea",
            header_desc: "Traduce textos en más de 100 idiomas con Inteligencia Artificial",
            auto_detect: "Detectar idioma",
            source_placeholder: "Introduce tu texto aquí...",
            target_placeholder: "La traducción aparecerá aquí...",
            btn_clear: "🗑️ Borrar",
            btn_listen: "🔊 Escuchar",
            btn_swap_title: "Invertir idiomas",
            btn_copy: "📋 Copiar",
            btn_copied: "✅ ¡Copiado!",
            btn_translate: "✨ Traducir",
            btn_translating: "⏳ Traduciendo...",
            history_title: "📋 Historial de traducciones",
            history_clear: "🗑️ Borrar historial",
            history_empty: "No hay traducciones aún.",
            history_confirm: "¿Realmente deseas borrar todo el historial?",
            alert_enter_text: "Por favor, introduce un texto para traducir.",
            alert_error: "Error durante la traducción: ",
            alert_network: "Error de conexión con el servidor.",
            translated_info: "Traducido de {src} a {tgt}"
        },
        languages: {
            auto: "Detectar idioma",
            fr: "Francés",
            en: "Inglés",
            es: "Español",
            de: "Alemán",
            it: "Italiano",
            pt: "Portugués",
            ar: "Árabe",
            zh: "Chino",
            ja: "Japonés",
            ru: "Ruso",
            nl: "Neerlandés",
            pl: "Polaco",
            tr: "Turco",
            ko: "Coreano",
            sv: "Sueco",
            da: "Danés",
            fi: "Finés",
            el: "Griego",
            he: "Hebreo",
            hi: "Hindi"
        }
    },

    de: {
        meta: {
            title_home: "AI Translator - Beliebige Sprache sofort übersetzen",
            title_translate: "AI Translator - Sofortige Übersetzung"
        },
        nav: {
            home: "Startseite",
            translate: "Übersetzung",
            features: "Funktionen",
            about: "Über uns",
            contact: "Kontakt",
            start_btn: "Loslegen"
        },
        hero: {
            badge: "✨ Unterstützt durch Künstliche Intelligenz",
            title_prefix: "Jede Sprache übersetzen",
            title_highlight: "im Handumdrehen",
            desc: "Unterstützt durch Künstliche Intelligenz hilft Ihnen unsere Plattform, in Sekundenschnelle weltweit zu kommunizieren.",
            start_btn: "↗ Übersetzung starten",
            learn_more_btn: "▶ Mehr erfahren"
        },
        features: {
            instant_title: "Sofortige Übersetzung",
            instant_desc: "Erhalten Sie Übersetzungen in wenigen Sekunden.",
            ai_title: "Künstliche Intelligenz",
            ai_desc: "Intelligente und kontextbezogene Übersetzungen.",
            languages_title: "Über 100 Sprachen",
            languages_desc: "Kommunizieren Sie weltweit barrierefrei.",
            tts_title: "Sprachausgabe",
            tts_desc: "Hören Sie sich die Aussprache Ihrer Übersetzungen an."
        },
        how: {
            title: "Wie funktioniert es?",
            step1_title: "Text eingeben",
            step1_desc: "Geben Sie den zu übersetzenden Text ein.",
            step2_title: "Sprachen wählen",
            step2_desc: "Wählen Sie Ausgangs- und Zielsprache.",
            step3_title: "Ergebnis erhalten",
            step3_desc: "Die KI liefert sofort eine präzise Übersetzung."
        },
        reviews: {
            title: "Was unsere Nutzer sagen",
            review1_text: "\"Diese App hat mir geholfen, mühelos mit internationalen Kunden zu sprechen.\"",
            review1_role: "Geschäftsinhaberin",
            review2_text: "\"Schnell, präzise und extrem einfach zu bedienen. Sehr empfehlenswert!\"",
            review2_role: "Unternehmer"
        },
        footer: {
            tagline: "Sprachbarrieren mit Künstlicher Intelligenz überwinden.",
            quick_links: "Schnelllinks",
            resources: "Ressourcen",
            blog: "Blog",
            privacy: "Datenschutz",
            terms: "Nutzungsbedingungen",
            faq: "FAQ",
            stay_connected: "Verbunden bleiben",
            newsletter_desc: "Abonnieren Sie Updates.",
            email_placeholder: "Ihre E-Mail-Adresse",
            rights: "© 2026 AI Language Translator. Alle Rechte vorbehalten."
        },
        translate: {
            header_title: "Sofortige",
            header_highlight: "Übersetzung",
            header_desc: "Übersetzen Sie Texte in über 100 Sprachen mit Künstlicher Intelligenz",
            auto_detect: "Sprache erkennen",
            source_placeholder: "Geben Sie hier Ihren Text ein...",
            target_placeholder: "Die Übersetzung erscheint hier...",
            btn_clear: "🗑️ Löschen",
            btn_listen: "🔊 Vorlesen",
            btn_swap_title: "Sprachen tauschen",
            btn_copy: "📋 Kopieren",
            btn_copied: "✅ Kopiert!",
            btn_translate: "✨ Übersetzen",
            btn_translating: "⏳ Wird übersetzt...",
            history_title: "📋 Übersetzungsverlauf",
            history_clear: "🗑️ Verlauf löschen",
            history_empty: "Noch keine Übersetzungen vorhanden.",
            history_confirm: "Möchten Sie den Verlauf wirklich vollständig leeren?",
            alert_enter_text: "Bitte geben Sie einen Text zum Übersetzen ein.",
            alert_error: "Fehler bei der Übersetzung: ",
            alert_network: "Verbindungsfehler zum Server.",
            translated_info: "Übersetzt von {src} nach {tgt}"
        },
        languages: {
            auto: "Sprache erkennen",
            fr: "Französisch",
            en: "Englisch",
            es: "Spanisch",
            de: "Deutsch",
            it: "Italienisch",
            pt: "Portugiesisch",
            ar: "Arabisch",
            zh: "Chinesisch",
            ja: "Japanisch",
            ru: "Russisch",
            nl: "Niederländisch",
            pl: "Polnisch",
            tr: "Türkisch",
            ko: "Koreanisch",
            sv: "Schwedisch",
            da: "Dänisch",
            fi: "Finnisch",
            el: "Griechisch",
            he: "Hebräisch",
            hi: "Hindi"
        }
    },

    it: {
        meta: {
            title_home: "AI Translator - Traduci qualsiasi lingua istantaneamente",
            title_translate: "AI Translator - Traduzione Istantanea"
        },
        nav: {
            home: "Home",
            translate: "Traduzione",
            features: "Funzionalità",
            about: "Chi siamo",
            contact: "Contatti",
            start_btn: "Inizia"
        },
        hero: {
            badge: "✨ Alimentato da Intelligenza Artificiale",
            title_prefix: "Traduci qualsiasi lingua",
            title_highlight: "istantaneamente",
            desc: "Alimentata dall'Intelligenza Artificiale, la nostra piattaforma ti aiuta a comunicare con persone in tutto il mondo in pochi secondi.",
            start_btn: "↗ Inizia a tradurre",
            learn_more_btn: "▶ Scopri di più"
        },
        features: {
            instant_title: "Traduzione istantanea",
            instant_desc: "Ottieni traduzioni rapide in pochi secondi.",
            ai_title: "Intelligenza Artificiale",
            ai_desc: "Traduzioni intelligenti, contestuali e accurate.",
            languages_title: "Oltre 100 lingue",
            languages_desc: "Comunica senza barriere in tutto il mondo.",
            tts_title: "Sintesi vocale",
            tts_desc: "Ascolta la pronuncia naturale delle traduzioni."
        },
        how: {
            title: "Come funziona?",
            step1_title: "Inserisci il tuo testo",
            step1_desc: "Digita il testo che desideri tradurre.",
            step2_title: "Scegli le lingue",
            step2_desc: "Seleziona la lingua di partenza e di arrivo.",
            step3_title: "Ottieni il risultato",
            step3_desc: "L'IA genera istantaneamente la traduzione corretta."
        },
        reviews: {
            title: "Cosa dicono i nostri utenti",
            review1_text: "\"Questa app mi ha permesso di comunicare facilmente con clienti internazionali.\"",
            review1_role: "Titolare d'azienda",
            review2_text: "\"Veloce, precisa e facilissima da usare. Altamente raccomandata!\"",
            review2_role: "Imprenditore"
        },
        footer: {
            tagline: "Abbatti le barriere linguistiche con l'Intelligenza Artificiale.",
            quick_links: "Link rapidi",
            resources: "Risorse",
            blog: "Blog",
            privacy: "Informativa sulla Privacy",
            terms: "Termini di Servizio",
            faq: "FAQ",
            stay_connected: "Resta connesso",
            newsletter_desc: "Iscriviti per ricevere i nostri aggiornamenti.",
            email_placeholder: "La tua email",
            rights: "© 2026 AI Language Translator. Tutti i diritti riservati."
        },
        translate: {
            header_title: "Traduzione",
            header_highlight: "Istantanea",
            header_desc: "Traduci testi in oltre 100 lingue con l'Intelligenza Artificiale",
            auto_detect: "Rileva lingua",
            source_placeholder: "Inserisci qui il tuo testo...",
            target_placeholder: "La traduzione apparirà qui...",
            btn_clear: "🗑️ Cancella",
            btn_listen: "🔊 Ascolta",
            btn_swap_title: "Inverti lingue",
            btn_copy: "📋 Copia",
            btn_copied: "✅ Copiato!",
            btn_translate: "✨ Traduci",
            btn_translating: "⏳ Traduzione in corso...",
            history_title: "📋 Cronologia traduzioni",
            history_clear: "🗑️ Cancella cronologia",
            history_empty: "Nessuna traduzione presente.",
            history_confirm: "Vuoi davvero cancellare l'intera cronologia?",
            alert_enter_text: "Inserisci un testo da tradurre.",
            alert_error: "Errore durante la traduzione: ",
            alert_network: "Errore di connessione al server.",
            translated_info: "Tradotto da {src} a {tgt}"
        },
        languages: {
            auto: "Rileva lingua",
            fr: "Francese",
            en: "Inglese",
            es: "Spagnolo",
            de: "Tedesco",
            it: "Italiano",
            pt: "Portoghese",
            ar: "Arabo",
            zh: "Cinese",
            ja: "Giapponese",
            ru: "Russo",
            nl: "Olandese",
            pl: "Polacco",
            tr: "Turco",
            ko: "Coreano",
            sv: "Svedese",
            da: "Danese",
            fi: "Finlandese",
            el: "Greco",
            he: "Ebraico",
            hi: "Hindi"
        }
    },

    ar: {
        meta: {
            title_home: "مترجم الذكاء الاصطناعي - ترجم أي لغة فورياً",
            title_translate: "مترجم الذكاء الاصطناعي - ترجمة فورية"
        },
        nav: {
            home: "الرئيسية",
            translate: "الترجمة",
            features: "المميزات",
            about: "عنا",
            contact: "اتصل بنا",
            start_btn: "ابدأ الآن"
        },
        hero: {
            badge: "✨ مدعوم بالذكاء الاصطناعي",
            title_prefix: "ترجم أي لغة",
            title_highlight: "فورياً",
            desc: "مدعومة بالذكاء الاصطناعي، منصتنا تساعدك على التواصل مع العالم في ثوانٍ معدودة.",
            start_btn: "↗ بدء الترجمة",
            learn_more_btn: "▶ اكتشف المزيد"
        },
        features: {
            instant_title: "ترجمة فورية",
            instant_desc: "احصل على ترجمات سريعة في بضع ثوانٍ.",
            ai_title: "ذكاء اصطناعي",
            ai_desc: "ترجمات ذكية، دقيقة ومتناغمة مع السياق.",
            languages_title: "أكثر من 100 لغة",
            languages_desc: "تواصل في جميع أنحاء العالم بسهولة.",
            tts_title: "نطق صوتي",
            tts_desc: "استمع إلى النطق الطبيعي للترجمات."
        },
        how: {
            title: "كيف يعمل؟",
            step1_title: "أدخل النص",
            step1_desc: "اكتب النص الذي تريد ترجمته.",
            step2_title: "اختر اللغات",
            step2_desc: "حدد لغة المصدر واللغة المستهدفة.",
            step3_title: "احصل على النتيجة",
            step3_desc: "يقوم الذكاء الاصطناعي بإنشاء الترجمة على الفور."
        },
        reviews: {
            title: "ماذا يقول مستخدمونا",
            review1_text: "\"ساعدني هذا التطبيق على التواصل مع عملائي الدوليين بكل سلاسة.\"",
            review1_role: "صاحبة شركة",
            review2_text: "\"سريع، دقيق وسهل الاستخدام للغاية. أنصح به بشدة!\"",
            review2_role: "رائد أعمال"
        },
        footer: {
            tagline: "اكسر الحواجز اللغوية بفضل الذكاء الاصطناعي.",
            quick_links: "روابط سريعة",
            resources: "الموارد",
            blog: "المدونة",
            privacy: "سياسة الخصوصية",
            terms: "شروط الخدمة",
            faq: "الأسئلة الشائعة",
            stay_connected: "ابق على اتصال",
            newsletter_desc: "اشترك للحصول على آخر التحديثات.",
            email_placeholder: "بريدك الإلكتروني",
            rights: "© 2026 AI Language Translator. جميع الحقوق محفوظة."
        },
        translate: {
            header_title: "ترجمة",
            header_highlight: "فورية",
            header_desc: "ترجم النصوص في أكثر من 100 لغة بالذكاء الاصطناعي",
            auto_detect: "كشف اللغة تلقائياً",
            source_placeholder: "أدخل نصك هنا...",
            target_placeholder: "ستظهر الترجمة هنا...",
            btn_clear: "🗑️ مسح",
            btn_listen: "🔊 استماع",
            btn_swap_title: "تبديل اللغات",
            btn_copy: "📋 نسخ",
            btn_copied: "✅ تم النسخ!",
            btn_translate: "✨ ترجم الآن",
            btn_translating: "⏳ جارٍ الترجمة...",
            history_title: "📋 سجل الترجمات",
            history_clear: "🗑️ مسح السجل",
            history_empty: "لا توجد ترجمات حتى الآن.",
            history_confirm: "هل أنت متأكد من رغبتك في مسح السجل كاملاً؟",
            alert_enter_text: "يرجى كتابة نص للترجمة.",
            alert_error: "حدث خطأ أثناء الترجمة: ",
            alert_network: "خطأ في الاتصال بالخادم.",
            translated_info: "تمت الترجمة من {src} إلى {tgt}"
        },
        languages: {
            auto: "كشف اللغة تلقائياً",
            fr: "الفرنسية",
            en: "الإنجليزية",
            es: "الإسبانية",
            de: "الألمانية",
            it: "الإيطالية",
            pt: "البرتغالية",
            ar: "العربية",
            zh: "الصينية",
            ja: "اليابانية",
            ru: "الروسية",
            nl: "الهولندية",
            pl: "البولندية",
            tr: "التركية",
            ko: "الكورية",
            sv: "السويدية",
            da: "الدنماركية",
            fi: "الفنلندية",
            el: "اليونانية",
            he: "العبرية",
            hi: "الهندية"
        }
    },

    zh: {
        meta: {
            title_home: "AI Translator - 快速即时翻译任何语言",
            title_translate: "AI Translator - 即时翻译"
        },
        nav: {
            home: "首页",
            translate: "翻译",
            features: "功能",
            about: "关于",
            contact: "联系",
            start_btn: "立即开始"
        },
        hero: {
            badge: "✨ 人工智能驱动",
            title_prefix: "快速即时翻译",
            title_highlight: "全球语言",
            desc: "依托人工智能技术，助您在几秒钟内与全球各地的人群自由沟通。",
            start_btn: "↗ 开始翻译",
            learn_more_btn: "▶ 了解更多"
        },
        features: {
            instant_title: "即时翻译",
            instant_desc: "几秒钟内获取高质量翻译结果。",
            ai_title: "人工智能",
            ai_desc: "智能、准确且贴合语境的高质量翻译。",
            languages_title: "100+ 种语言",
            languages_desc: "跨越语言隔阂，畅通全球交流。",
            tts_title: "语音朗读",
            tts_desc: "自然流畅地朗读翻译文本。"
        },
        how: {
            title: "如何使用？",
            step1_title: "输入文本",
            step1_desc: "输入您想要翻译的任何文本。",
            step2_title: "选择语言",
            step2_desc: "选择源语言和目标翻译语言。",
            step3_title: "获取翻译",
            step3_desc: "人工智能即刻生成准确翻译结果。"
        },
        reviews: {
            title: "用户心声",
            review1_text: "“这款应用帮我轻松地与国际客户沟通交流。”",
            review1_role: "企业创始人",
            review2_text: "“快速、精准且非常易用，强烈推荐！”",
            review2_role: "创业者"
        },
        footer: {
            tagline: "利用人工智能打破语言壁垒。",
            quick_links: "快速链接",
            resources: "资源",
            blog: "博客",
            privacy: "隐私政策",
            terms: "服务条款",
            faq: "常见问题",
            stay_connected: "保持联系",
            newsletter_desc: "订阅以获取最新资讯。",
            email_placeholder: "您的邮箱地址",
            rights: "© 2026 AI Language Translator. 版权所有。"
        },
        translate: {
            header_title: "即时",
            header_highlight: "翻译",
            header_desc: "利用人工智能技术，支持全球 100 多种语言互译",
            auto_detect: "自动检测语言",
            source_placeholder: "在此输入您的文本...",
            target_placeholder: "翻译结果将显示在此...",
            btn_clear: "🗑️ 清空",
            btn_listen: "🔊 朗读",
            btn_swap_title: "交换语言",
            btn_copy: "📋 复制",
            btn_copied: "✅ 已复制！",
            btn_translate: "✨ 翻译",
            btn_translating: "⏳ 正在翻译...",
            history_title: "📋 翻译历史",
            history_clear: "🗑️ 清空历史",
            history_empty: "暂无翻译历史记录。",
            history_confirm: "您确定要清空全部翻译历史记录吗？",
            alert_enter_text: "请输入要翻译的文本。",
            alert_error: "翻译时出错：",
            alert_network: "服务器连接失败。",
            translated_info: "已从 {src} 翻译为 {tgt}"
        },
        languages: {
            auto: "自动检测语言",
            fr: "法语",
            en: "英语",
            es: "西班牙语",
            de: "德语",
            it: "意大利语",
            pt: "葡萄牙语",
            ar: "阿拉伯语",
            zh: "中文",
            ja: "日语",
            ru: "俄语",
            nl: "荷兰语",
            pl: "波兰语",
            tr: "土耳其语",
            ko: "韩语",
            sv: "瑞典语",
            da: "丹麦语",
            fi: "芬兰语",
            el: "希腊语",
            he: "希伯来语",
            hi: "印地语"
        }
    },

    ja: {
        meta: {
            title_home: "AI Translator - あらゆる言語を瞬時に翻訳",
            title_translate: "AI Translator - インスタント翻訳"
        },
        nav: {
            home: "ホーム",
            translate: "翻訳",
            features: "機能",
            about: "概要",
            contact: "お問い合わせ",
            start_btn: "今すぐ始める"
        },
        hero: {
            badge: "✨ 人工知能（AI）搭載",
            title_prefix: "あらゆる言語を",
            title_highlight: "瞬時に翻訳",
            desc: "人工知能の力で、世界中の人々と数秒でつながることができます。",
            start_btn: "↗ 翻訳を開始",
            learn_more_btn: "▶ 詳細を見る"
        },
        features: {
            instant_title: "高速インスタント翻訳",
            instant_desc: "わずか数秒で高精度の翻訳を取得できます。",
            ai_title: "人工知能",
            ai_desc: "文脈を捉えたスマートで正確な翻訳を提供します。",
            languages_title: "100以上の言語に対応",
            languages_desc: "世界中どこでもシームレスにコミュニケーション。",
            tts_title: "音声読み上げ",
            tts_desc: "翻訳結果を自然な音声で聞き取れます。"
        },
        how: {
            title: "使い方は？",
            step1_title: "テキストを入力",
            step1_desc: "翻訳したいテキストを入力または貼り付けます。",
            step2_title: "言語を選択",
            step2_desc: "翻訳元の言語と目的の言語を選択します。",
            step3_title: "結果を取得",
            step3_desc: "AIが瞬時に正確な翻訳テキストを生成します。"
        },
        reviews: {
            title: "ユーザーの声",
            review1_text: "「海外のクライアントとスムーズにやり取りできるようになりました。」",
            review1_role: "会社経営者",
            review2_text: "「高速で正確、そしてとても使いやすいです。本当におすすめ！」",
            review2_role: "起業家"
        },
        footer: {
            tagline: "人工知能であらゆる言葉の壁を乗り越える。",
            quick_links: "クイックリンク",
            resources: "リソース",
            blog: "ブログ",
            privacy: "プライバシーポリシー",
            terms: "利用規約",
            faq: "よくある質問",
            stay_connected: "最新情報",
            newsletter_desc: "最新情報を受け取るために購読してください。",
            email_placeholder: "メールアドレス",
            rights: "© 2026 AI Language Translator. 無断転載を禁じます。"
        },
        translate: {
            header_title: "インスタント",
            header_highlight: "翻訳",
            header_desc: "人工知能により100以上の言語間でテキストを素早く翻訳",
            auto_detect: "言語を自動検出",
            source_placeholder: "ここにテキストを入力...",
            target_placeholder: "ここに翻訳結果が表示されます...",
            btn_clear: "🗑️ クリア",
            btn_listen: "🔊 読み上げ",
            btn_swap_title: "言語を入れ替える",
            btn_copy: "📋 コピー",
            btn_copied: "✅ コピーしました！",
            btn_translate: "✨ 翻訳する",
            btn_translating: "⏳ 翻訳中...",
            history_title: "📋 翻訳履歴",
            history_clear: "🗑️ 履歴を消去",
            history_empty: "翻訳履歴はありません。",
            history_confirm: "本当にすべての翻訳履歴を消去しますか？",
            alert_enter_text: "翻訳するテキストを入力してください。",
            alert_error: "翻訳中にエラーが発生しました: ",
            alert_network: "サーバーへの接続エラーです。",
            translated_info: "{src} から {tgt} へ翻訳"
        },
        languages: {
            auto: "言語を自動検出",
            fr: "フランス語",
            en: "英語",
            es: "スペイン語",
            de: "ドイツ語",
            it: "イタリア語",
            pt: "ポルトガル語",
            ar: "アラビア語",
            zh: "中国語",
            ja: "日本語",
            ru: "ロシア語",
            nl: "オランダ語",
            pl: "ポーランド語",
            tr: "トルコ語",
            ko: "韓国語",
            sv: "スウェーデン語",
            da: "デンマーク語",
            fi: "フィンランド語",
            el: "ギリシャ語",
            he: "ヘブライ語",
            hi: "ヒンディー語"
        }
    },

    ru: {
        meta: {
            title_home: "AI Translator - Мгновенный перевод на любой язык",
            title_translate: "AI Translator - Мгновенный перевод"
        },
        nav: {
            home: "Главная",
            translate: "Перевод",
            features: "Возможности",
            about: "О нас",
            contact: "Контакты",
            start_btn: "Начать"
        },
        hero: {
            badge: "✨ На базе искусственного интеллекта",
            title_prefix: "Переводите на любой язык",
            title_highlight: "мгновенно",
            desc: "Платформа на базе искусственного интеллекта помогает общаться с людьми по всему миру за считанные секунды.",
            start_btn: "↗ Начать перевод",
            learn_more_btn: "▶ Подробнее"
        },
        features: {
            instant_title: "Мгновенный перевод",
            instant_desc: "Получайте точный перевод за считанные секунды.",
            ai_title: "Искусственный интеллект",
            ai_desc: "Умный, контекстуальный и точный машинный перевод.",
            languages_title: "Более 100 языков",
            languages_desc: "Свободно общайтесь по всему миру.",
            tts_title: "Озвучивание текста",
            tts_desc: "Слушайте естественное произношение переводов."
        },
        how: {
            title: "Как это работает?",
            step1_title: "Введите текст",
            step1_desc: "Введите текст, который хотите перевести.",
            step2_title: "Выберите языки",
            step2_desc: "Выберите исходный и целевой языки перевода.",
            step3_title: "Получите результат",
            step3_desc: "Искусственный интеллект мгновенно выдаст перевод."
        },
        reviews: {
            title: "Отзывы наших пользователей",
            review1_text: "«Это приложение помогло мне легко общаться с зарубежными партнерами.»",
            review1_role: "Владелица бизнеса",
            review2_text: "«Быстро, точно и невероятно удобно. Очень рекомендую!»",
            review2_role: "Предприниматель"
        },
        footer: {
            tagline: "Стираем языковые барьеры с помощью искусственного интеллекта.",
            quick_links: "Быстрые ссылки",
            resources: "Ресурсы",
            blog: "Блог",
            privacy: "Политика конфиденциальности",
            terms: "Условия использования",
            faq: "Частые вопросы",
            stay_connected: "Оставайтесь на связи",
            newsletter_desc: "Подпишитесь, чтобы получать обновления.",
            email_placeholder: "Ваш e-mail",
            rights: "© 2026 AI Language Translator. Все права защищены."
        },
        translate: {
            header_title: "Мгновенный",
            header_highlight: "перевод",
            header_desc: "Переводите текст на более чем 100 языков с помощью искусственного интеллекта",
            auto_detect: "Определить язык",
            source_placeholder: "Введите текст здесь...",
            target_placeholder: "Перевод появится здесь...",
            btn_clear: "🗑️ Очистить",
            btn_listen: "🔊 Озвучить",
            btn_swap_title: "Поменять языки местами",
            btn_copy: "📋 Копировать",
            btn_copied: "✅ Скопировано!",
            btn_translate: "✨ Перевести",
            btn_translating: "⏳ Перевод...",
            history_title: "📋 История переводов",
            history_clear: "🗑️ Очистить историю",
            history_empty: "История переводов пока пуста.",
            history_confirm: "Вы уверены, что хотите очистить всю историю переводов?",
            alert_enter_text: "Пожалуйста, введите текст для перевода.",
            alert_error: "Ошибка при переводе: ",
            alert_network: "Ошибка подключения к серверу.",
            translated_info: "Переведено с {src} на {tgt}"
        },
        languages: {
            auto: "Определить язык",
            fr: "Французский",
            en: "Английский",
            es: "Испанский",
            de: "Немецкий",
            it: "Итальянский",
            pt: "Португальский",
            ar: "Арабский",
            zh: "Китайский",
            ja: "Японский",
            ru: "Русский",
            nl: "Нидерландский",
            pl: "Польский",
            tr: "Турецкий",
            ko: "Корейский",
            sv: "Шведский",
            da: "Датский",
            fi: "Финский",
            el: "Греческий",
            he: "Иврит",
            hi: "Хинди"
        }
    }
};

// Exporter pour une utilisation globale
if (typeof window !== 'undefined') {
    window.translations = translations;
}
