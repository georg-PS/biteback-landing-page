// Kontaktdaten stehen nicht als Text im HTML (Schutz vor automatischem Auslesen durch Spam-Bots):
// Nummern und Adressen sind Bilder, das Link-Ziel steht kodiert in data-h und wird erst beim Klick gebildet.
document.addEventListener('click', (e) => {
    const a = e.target.closest('a.obf');
    if (!a || !a.dataset.h) return;
    e.preventDefault();
    try { window.location.href = atob(a.dataset.h); } catch (err) { /* ignore */ }
});
