// ---- Reveal mode ----------------------------------------------------------
// When opened via a #r=... link, hide the whole setup UI and show only the
// recipient for that one person. The payload is stored in state.reveal so it
// can be re-rendered when the language changes; text is set in renderReveal.

function tryRevealMode() {
  const hash = location.hash;
  if (!hash.startsWith("#r=")) return false;

  let data;
  try {
    data = decodePayload(hash.slice(3));
  } catch {
    return false; // malformed link — fall back to the normal app
  }
  if (!data || !data.g || !data.r) return false;

  for (const el of document.querySelectorAll("main > .step")) el.hidden = true;
  const tagline = document.querySelector(".tagline");
  if (tagline) tagline.hidden = true;

  state.reveal = { g: data.g, r: data.r, revealed: false };
  $("reveal-open").addEventListener("click", () => {
    state.reveal.revealed = true;
    renderReveal();
  });
  $("reveal-card").hidden = false;
  return true;
}

function renderReveal() {
  const { g, r, revealed } = state.reveal;
  $("reveal-greeting").textContent = t("reveal_greeting", { name: g });

  const nameEl = $("reveal-name");
  const openBtn = $("reveal-open");
  const note = $("reveal-note");
  if (revealed) {
    nameEl.innerHTML =
      '<span class="material-icons">card_giftcard</span> ' +
      escapeHtml(t("reveal_name", { name: r }));
  }
  nameEl.hidden = !revealed;
  note.hidden = !revealed;
  openBtn.hidden = revealed;
}
