// ---- Utils ----------------------------------------------------------------
// Small, dependency-free helpers shared across the app. Loaded first so every
// other script can rely on these.

const $ = (id) => document.getElementById(id);

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

// Fisher–Yates in-place shuffle.
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for browsers/contexts without the async clipboard API
    // (e.g. pages opened over file:// in some browsers).
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* ignore — nothing more we can do */
    }
    document.body.removeChild(ta);
  }
}

// Briefly swap a button's contents (e.g. to a checkmark) after an action.
function flash(btn, html, ms = 1500) {
  if (btn.dataset.flashing === "true") return;
  const original = btn.innerHTML;
  btn.dataset.flashing = "true";
  btn.innerHTML = html;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.dataset.flashing = "false";
  }, ms);
}
