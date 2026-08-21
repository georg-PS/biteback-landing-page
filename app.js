const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;
const navBottom = parseFloat(window.getComputedStyle(nav).getPropertyValue('bottom'));
const logo = document.querySelector('.logo');
const navCtaButton = document.querySelector('#nav-cta-button');
const instagramLogo = document.querySelector('#instagram');
const copyrightAnnotation = document.querySelector('.copyright');

const hideDistance = navHeight + navBottom;
let prevPos = window.scrollY;

let navTimeout;

function expandNav() {
    nav.classList.toggle('full-width');

    clearTimeout(navTimeout);
    if (nav.classList.contains('full-width')) {
        navTimeout = setTimeout(() => {
            expandNav();
        }, 5000);
    }
}

function hideNavBar() {
    let currentPos = window.scrollY;
    if (prevPos < currentPos) {
        nav.style.transform = `translateY(${hideDistance}px)`
    } else {
        nav.style.transform = 'translateY(0)';
    }
    prevPos = currentPos;
}

window.addEventListener('scroll', hideNavBar);
logo.addEventListener('click', expandNav);

copyrightAnnotation.innerText = `© ${new Date().getFullYear()} BiteBack Inc.`;

// ─── Mehrsprachigkeit (DE / EN) ────────────────────────────────────────────
// Jeder übersetzbare Text im HTML trägt ein data-i18n="key". Werte dürfen HTML
// enthalten (z.B. <br>, <span>) — sie werden über innerHTML gesetzt.
const translations = {
    de: {
        nav_cta: "Jetzt herunterladen",
        hero_title: 'Essen gehen.<br>Beleg scannen.<br><span class="highlight">Belohnt werden.</span>',
        hero_desc: "Die Treue-App, die sich für dich auszahlt. Verbinde dich mit deinen Lieblingslokalen, sammle sofort Punkte und löse exklusive Rewards ein.",
        dl_appstore: "Laden im<br>App Store",
        dl_googleplay: "Jetzt bei<br>Google Play",
        b2b: "Du bist ein Restaurant und interessiert dich dafür in unserer App angezeigt zu werden?",
        partner_desc: "Sie wollen BiteBack als Gastronom nutzen? Laden Sie <strong>BiteBack for Partners</strong> herunter.",
        hiw_title: "So funktioniert's",
        hiw_sub: "Drei einfache Schritte, um deine täglichen Mahlzeiten in spannende Rewards zu verwandeln.",
        step1_title: "Beleg scannen",
        step1_desc: "Mach mit unserer smarten Kamera einfach ein Foto deiner Rechnung von einem Partner-Restaurant.",
        step2_title: "Punkte sammeln",
        step2_desc: "Nach der Prüfung werden die Punkte automatisch deinem Guthaben gutgeschrieben.",
        step3_title: "Rewards einlösen",
        step3_desc: "Löse deine Punkte für Gratis-Gerichte, Getränke oder exklusive Rabatte in jedem Lokal ein.",
        mission_title: "Unsere Mission",
        mission_quote: "„Wir glauben, dass jede Mahlzeit geteilt werden und eine Gemeinschaft stärken sollte.“",
        role_founder: "Gründer",
        meet_title: "Lerne die Gründer kennen",
        cta_title: 'Bereit zum <span class="dark-text-shadow highlight">Sammeln?</span>',
        cta_button: "Jetzt herunterladen & Mitglied werden",
        footer_privacy: "Datenschutz",
        footer_terms: "AGB",
        footer_support: "Support",
        footer_contact: "Kontakt:&nbsp;",
    },
    en: {
        nav_cta: "Download now",
        hero_title: 'Eat out.<br>Scan receipt.<br><span class="highlight">Get rewarded.</span>',
        hero_desc: "The loyalty app that pays you back. Connect with your favorite local spots, collect points instantly, and redeem exclusive rewards.",
        dl_appstore: "Download on<br>App Store",
        dl_googleplay: "Download on<br>Google Play",
        b2b: "Are you a restaurant interested in being featured in our app?",
        partner_desc: "Want to use BiteBack as a restaurateur? Download <strong>BiteBack for Partners</strong>.",
        hiw_title: "How it Works",
        hiw_sub: "Three simple steps to turn your daily meals into exciting rewards.",
        step1_title: "Scan Receipt",
        step1_desc: "Simply snap a photo of your bill from any partner restaurant using our smart camera.",
        step2_title: "Earn Points",
        step2_desc: "Points are automatically added to your wallet after verification.",
        step3_title: "Redeem Rewards",
        step3_desc: "Spend your points on free meals, drinks or exclusive discounts at any location.",
        mission_title: "Our Mission",
        mission_quote: '"We believe that every meal should be shared and support a community."',
        role_founder: "Founder",
        meet_title: "Meet the Founders",
        cta_title: 'Ready to start <span class="dark-text-shadow highlight">earning?</span>',
        cta_button: "Download Now & Become a Member",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms & Conditions",
        footer_support: "Support",
        footer_contact: "Contact us:&nbsp;",
    },
};

const langButtons = document.querySelectorAll('.lang-btn');

function setLanguage(lang) {
    if (!translations[lang]) lang = 'de';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });
    langButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('biteback_lang', lang); } catch (e) { /* ignore */ }
}

langButtons.forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Startsprache: gespeicherte Wahl → sonst Browsersprache → sonst Deutsch.
let initialLang = 'de';
try {
    const stored = localStorage.getItem('biteback_lang');
    if (stored && translations[stored]) {
        initialLang = stored;
    } else if ((navigator.language || '').toLowerCase().startsWith('en')) {
        initialLang = 'en';
    }
} catch (e) { /* ignore */ }
setLanguage(initialLang);
