const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const navCtaButton = document.querySelector('#nav-cta-button');
const instagramLogo = document.querySelector('#instagram');
const copyrightAnnotation = document.querySelector('.copyright');

// Erst beim ersten Scrollen messen: offsetHeight beim Laden erzwingt sonst eine vorzeitige
// Layout-Berechnung (PageSpeed: „Erzwungener dynamischer Umbruch“). Bei Größenänderung neu messen.
let hideDistance = null;
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
    if (hideDistance === null) {
        hideDistance = nav.offsetHeight + parseFloat(window.getComputedStyle(nav).getPropertyValue('bottom'));
    }
    if (prevPos < currentPos) {
        nav.style.transform = `translateY(${hideDistance}px)`
    } else {
        nav.style.transform = 'translateY(0)';
    }
    prevPos = currentPos;
}

window.addEventListener('scroll', hideNavBar);

// Obere Leiste wie bei YouTube: sie wandert 1:1 mit dem Scrollen. Runter scrollen schiebt sie
// Pixel für Pixel aus dem Bild, rauf scrollen holt sie im gleichen Tempo zurück.
const topBar = document.querySelector('.top-bar');
let topBarOffset = 0;
let topBarLastY = Math.max(0, window.scrollY);
let topBarMaxOffset = null; // wie hideDistance erst beim ersten Scrollen messen

function moveTopBar() {
    const y = Math.max(0, window.scrollY); // iOS-Gummiband oben ignorieren
    // Ganz aus dem Bild: Abstand oben + Höhe + etwas Platz für den Schatten
    if (topBarMaxOffset === null) topBarMaxOffset = topBar.offsetTop + topBar.offsetHeight + 8;
    topBarOffset = Math.min(topBarMaxOffset, Math.max(0, topBarOffset + (y - topBarLastY)));
    topBarLastY = y;
    topBar.style.transform = topBarOffset ? `translateY(${-topBarOffset}px)` : '';
}

if (topBar) {
    window.addEventListener('scroll', moveTopBar, { passive: true });
}

window.addEventListener('resize', () => { hideDistance = null; topBarMaxOffset = null; });
logo.addEventListener('click', expandNav);

copyrightAnnotation.innerText = `© ${new Date().getFullYear()} BiteBack Technologies GmbH`;

// ─── Mehrsprachigkeit (DE / EN) ────────────────────────────────────────────
// Deutsch steht direkt im HTML (das sieht auch Google). Jeder übersetzbare Text trägt
// data-i18n="key"; hier steht nur die englische Fassung. Die deutschen Texte werden beim
// Laden aus der Seite gemerkt, damit „DE" nach „EN" wieder exakt den Originaltext zeigt.
// Werte dürfen HTML enthalten (z. B. <br>, <span>) – sie werden über innerHTML gesetzt.
const translations = {
    en: {
        nav_cta: "Download now",
        gastro_corner: 'For restaurants<span class="gc-long">, click here</span><span class="gc-arrow" aria-hidden="true">→</span>',
        hero_eyebrow: "The loyalty app for restaurants in Klosterneuburg",
        hero_title: 'Eat out.<br>Scan receipt.<br><span class="highlight">Get rewarded.</span>',
        hero_desc: "Visit your favourite places, collect one Bite for every euro on your bill and swap your Bites for Backs: free dishes and free drinks. BiteBack works like a digital stamp card that is valid at all partner venues at once. Instead of money you get food and drinks back, and the app is free for you.",
        dl_appstore: "Download on<br>App Store",
        dl_googleplay: "Get it on<br>Google Play",
        b2b: "Do you run a restaurant?",
        b2b_btn: "For restaurants →",
        how_title: "How BiteBack works",
        how1_t: "Scan your bill",
        how1_d: "Eat at one of our partner venues as usual, pay as normal and then scan the QR code on your bill with the BiteBack app.",
        how2_t: "Collect Bites",
        how2_d: "You get one Bite for every euro. All Bites from all partner venues end up in one shared account.",
        how3_t: "Redeem Backs",
        how3_d: "Pick a Back in the app, for example a free dish or a free drink, and have the staff confirm the redemption.",
        free_title: "Roughly every sixth dish for free",
        free_desc: "Each venue decides how many Bites a Back costs. We recommend five times the menu price to our partners. If you eat a 17 € dish five times, for example, you have collected 85 Bites and get the sixth dish for free.",
        free_label: "Example from the app",
        free_note: "Some Backs come with a condition, such as a minimum order. The venue shows it right on the Back in the app.",
        partners_title: "Partner venues in Klosterneuburg",
        partners_sub: "You can already collect and redeem Bites at these places. Just drop by!",
        partners_more: "New venues join all the time. You'll find every partner with opening hours and Backs in the app, new partners carry a \"New\" badge.",
        cat_italian: "Italian",
        cat_bakery: "Bakery &amp; patisserie",
        cat_austrian: "Austrian cuisine",
        cat_macedonian: "North Macedonian &amp; Austrian cuisine",
        cat_sportsbar: "Sports bar with Austrian cuisine",
        cat_icecream: "Ice cream parlour",
        card_title: "One digital stamp card for all venues",
        card1_t: "One account for all venues",
        card1_d: "Instead of lots of stamp cards you have a single Bite account that is valid at all partner venues at once.",
        card2_t: "Redeem anywhere",
        card2_d: "Bites from one venue can be redeemed at any other partner venue. Collect and redeem wherever you like.",
        card3_t: "Free of charge",
        card3_d: "The app costs you nothing, neither the download nor collecting.",
        card4_t: "Discover new places",
        card4_d: "With BiteBack you find new places in Klosterneuburg and have one more reason to visit your favourite spot.",
        card5_t: "Extra Bites",
        card5_d: "Promo codes give you extra Bites. Invite friends and they get 10 Bites while you get 5 Bites on top.",
        about_title: "About us: two founders from Klosterneuburg",
        about_text: "We are Georg and Philipp. We noticed that mostly big chains have their own loyalty apps, and we wanted to change that. We have been building BiteBack since May 2025 because we believe every meal should strengthen the local community. Small, independent venues deserve the reach and the regulars they have earned with hard work.",
        faq_title: "Frequently asked questions about BiteBack",
        faq_sub: "If anything is still unclear, here are the answers to the most common questions.",
        fqg0: "General",
        fq0_0q: "What is BiteBack?",
        fq0_0a: "BiteBack is the loyalty app for restaurants in Klosterneuburg. You collect one Bite for every euro on your bill and swap your Bites for free dishes and free drinks at our partner venues.",
        fq0_1q: "How much does the app cost?",
        fq0_1a: "Nothing. BiteBack is completely free for guests.",
        fq0_2q: "Where can I use BiteBack?",
        fq0_2a: "At all our partner venues in Klosterneuburg. You can collect and redeem Bites at each of them, no matter where you collected them.",
        fq0_3q: "How old do I have to be?",
        fq0_3a: "From 14 you can sign up yourself. For children from 7, parents create the account.",
        fqg1: "Collecting Bites",
        fq1_0q: "How do I collect Bites?",
        fq1_0a: "After eating and paying at a partner venue, scan the QR code on your bill with the BiteBack app. You get one Bite for every full euro. Tips don't count because they aren't on the receipt.",
        fq1_1q: "How often do I have to scan before I get something free?",
        fq1_1a: "Each venue decides how many Bites a Back costs. With our recommendation, roughly every sixth dish is free: eat a 17 € dish five times and you have 85 Bites and get the sixth one free.",
        fq1_2q: "Until when can I scan my receipt?",
        fq1_2a: "Up to 14 days after paying. The easiest way is to scan it right at the table.",
        fq1_3q: "Can I scan several receipts or my companion's receipt?",
        fq1_3a: "Each receipt counts only once, and you can scan one receipt per venue every three hours. If you pay separately, everyone scans their own receipt in their own app.",
        fq1_4q: "I didn't get a paper receipt. What now?",
        fq1_4a: "Since 1 October 2026 venues may also offer receipts digitally, for example via a QR code or a link. Open the digital receipt and scan the QR code on it. You can always ask for a paper receipt.",
        fq1_5q: "My receipt won't scan. What can I do?",
        fq1_5a: "Tap \"Receipt won't scan?\" in the app and send us a photo of the receipt. We check it and credit your Bites, usually within 24 hours.",
        fqg2: "Redeeming Backs",
        fq2_0q: "What are Backs?",
        fq2_0a: "Backs are the rewards in the app: dishes and drinks you swap for Bites. Each venue sets its own Backs. Some are only valid at certain times or with a condition such as a minimum order, which is shown right on the Back in the app.",
        fq2_1q: "How do I redeem a Back?",
        fq2_1a: "Let the staff know when ordering that you'd like to redeem a Back and select it in the app. The staff confirm the redemption with the venue's PIN.",
        fq2_2q: "Do my Bites expire?",
        fq2_2a: "Not as long as you use BiteBack. They only expire if you neither collect nor redeem Bites for 12 months.",
        fq2_3q: "Can I cash out or give away Bites?",
        fq2_3a: "No. Bites have no cash value and are only valid for your own account.",
        fqg3: "Account and codes",
        fq3_0q: "What is a BiteBack code?",
        fq3_0a: "Codes give you extra Bites. You have a personal invite code: if someone enters it in the app, the new person gets 10 Bites and you get 5 Bites. There are also promo codes for special occasions. To redeem codes you confirm your mobile number once.",
        fq3_1q: "How do I delete my account?",
        fq3_1a: "Any time, directly in the app under Profile.",
        faq_more: "Any more questions? Write to us at",
        gastro_title: "The loyalty programme for restaurants: BiteBack for Partners",
        gastro_text: "Do you run a venue? With BiteBack for Partners you get a ready-made loyalty programme for more customer loyalty in hospitality, without your own marketing budget. Our page for restaurants shows all the benefits and how to become a partner.",
        gastro_btn: "More for restaurants →",
        cta_title: 'Ready to start <span class="dark-text-shadow highlight">collecting?</span>',
        cta_text: "Download BiteBack for free now, on the App Store and Google Play.",
        footer_privacy: "Privacy Policy",
        footer_imprint: "Imprint",
        footer_terms: "Terms &amp; Conditions",
        footer_support: "Support",
        footer_contact: "Contact:&nbsp;",
        footer_gastro: "For restaurants",
    },
};

// Unterseiten (z. B. gastronomen-en.js) bringen ihre englischen Texte selbst mit
if (window.BB_I18N_EN) Object.assign(translations.en, window.BB_I18N_EN);

const langButtons = document.querySelectorAll('.lang-btn');
const i18nEls = document.querySelectorAll('[data-i18n]');
const germanOriginal = new Map();
i18nEls.forEach((el) => germanOriginal.set(el, el.innerHTML));

function setLanguage(lang) {
    if (lang !== 'en') lang = 'de';
    document.documentElement.lang = lang;
    i18nEls.forEach((el) => {
        const en = translations.en[el.getAttribute('data-i18n')];
        el.innerHTML = lang === 'en' && en !== undefined ? en : germanOriginal.get(el);
    });
    langButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('biteback_lang', lang); } catch (e) { /* ignore */ }
}

// Nur auf Seiten mit Sprachumschalter (Startseite). Startsprache: immer Deutsch,
// Englisch nur nach Klick auf „EN" (Wahl wird gemerkt). Bewusst nicht nach Browsersprache:
// Googles Crawler und PageSpeed laufen mit englischem Browser und sollen Deutsch sehen.
if (langButtons.length) {
    langButtons.forEach((btn) => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    let initialLang = 'de';
    try {
        if (localStorage.getItem('biteback_lang') === 'en') initialLang = 'en';
    } catch (e) { /* ignore */ }
    if (initialLang === 'en') setLanguage('en');
    else langButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === 'de'));
}
