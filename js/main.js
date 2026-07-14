// ---- Main -----------------------------------------------------------------
// Orchestration + startup. Loaded last, once every other module is defined.

// Re-render the parts built in JS so their text picks up the current language.
function rerenderDynamic() {
  if (state.reveal) {
    renderReveal();
    return;
  }
  renderPeople();
  renderExclusions();
  if (state.lastDraw && !results.hidden) renderResults(state.lastDraw, false);
}

// ---- Init -----------------------------------------------------------------
lang = detectLang();
document.querySelectorAll("#lang-switch button").forEach((b) => {
  b.addEventListener("click", () => setLanguage(b.dataset.lang));
});
tryRevealMode(); // sets state.reveal + hides setup when opened via a link
setLanguage(lang); // applies static translations and renders the dynamic parts
