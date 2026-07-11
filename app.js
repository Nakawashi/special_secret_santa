// ---- State ----------------------------------------------------------------
const state = {
  people: [],        // array of names (strings, unique)
  exceptions: {},    // { person -> array of names that person must NOT gift }
  selected: null,    // person currently selected in the exclusions dropdown
  lastDraw: null,    // last assignment map { giver -> receiver }, for copying
};

// ---- DOM refs -------------------------------------------------------------
const $ = (id) => document.getElementById(id);

const personForm = $("person-form");
const personInput = $("person-input");
const peopleList = $("people-list");
const peopleHint = $("people-hint");

const exclPerson = $("excl-person");
const exclChecklist = $("excl-checklist");
const exclEmpty = $("excl-empty");

const drawBtn = $("draw-btn");
const drawError = $("draw-error");
const results = $("results");
const resultsList = $("results-list");
const revealBtn = $("reveal-btn");
const copyBtn = $("copy-btn");

// ---- People ---------------------------------------------------------------
personForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Accept a single name or a comma / newline separated list.
  const names = personInput.value
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!names.length) return;

  let added = 0;
  for (const name of names) {
    const exists = state.people.some(
      (p) => p.toLowerCase() === name.toLowerCase()
    );
    if (exists) continue; // skip duplicates (case-insensitive)
    state.people.push(name);
    added++;
  }

  if (added === 0) {
    personInput.select(); // everything was a duplicate — keep it for editing
    return;
  }
  personInput.value = "";
  personInput.focus();
  renderPeople();
  renderExclusions();
});

function removePerson(name) {
  state.people = state.people.filter((p) => p !== name);
  // Drop this person's own exception list, and remove them from everyone else's.
  delete state.exceptions[name];
  for (const giver of Object.keys(state.exceptions)) {
    state.exceptions[giver] = state.exceptions[giver].filter((n) => n !== name);
  }
  if (state.selected === name) state.selected = null;
  renderPeople();
  renderExclusions();
}

function renderPeople() {
  peopleList.innerHTML = "";
  for (const name of state.people) {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = name;
    const btn = document.createElement("button");
    btn.className = "remove";
    btn.type = "button";
    btn.textContent = "×";
    btn.title = `Remove ${name}`;
    btn.addEventListener("click", () => removePerson(name));
    li.append(label, btn);
    peopleList.appendChild(li);
  }
  peopleHint.textContent =
    state.people.length < 2
      ? "You need at least 2 people."
      : `${state.people.length} people added.`;
}

// ---- Exclusions (pick a person, check who they must not gift) -------------
exclPerson.addEventListener("change", () => {
  state.selected = exclPerson.value || null;
  renderChecklist();
});

// Toggle whether `selected` may gift `receiver`.
function toggleException(receiver, forbid) {
  const giver = state.selected;
  if (!giver) return;
  const list = state.exceptions[giver] || (state.exceptions[giver] = []);
  const idx = list.indexOf(receiver);
  if (forbid && idx === -1) list.push(receiver);
  if (!forbid && idx !== -1) list.splice(idx, 1);
  if (list.length === 0) delete state.exceptions[giver];
}

// Renders the whole section: dropdown options + checklist for the selection.
function renderExclusions() {
  // Keep a valid selection: default to the first person if none/invalid.
  if (!state.people.includes(state.selected)) {
    state.selected = state.people[0] || null;
  }

  exclPerson.innerHTML = state.people
    .map((p) => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`)
    .join("");
  if (state.selected) exclPerson.value = state.selected;

  renderChecklist();
}

function renderChecklist() {
  exclChecklist.innerHTML = "";

  const canConfigure = state.people.length >= 2 && state.selected;
  exclPerson.hidden = state.people.length < 2;
  exclEmpty.hidden = canConfigure;
  if (!canConfigure) {
    exclEmpty.textContent =
      state.people.length < 2 ? "Add at least 2 people first." : "";
    return;
  }

  const forbidden = state.exceptions[state.selected] || [];
  for (const person of state.people) {
    if (person === state.selected) continue; // can't gift yourself anyway
    const li = document.createElement("li");
    const label = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = forbidden.includes(person);
    li.classList.toggle("checked", cb.checked);
    cb.addEventListener("change", () => {
      toggleException(person, cb.checked);
      li.classList.toggle("checked", cb.checked);
    });
    const span = document.createElement("span");
    span.textContent = person;
    label.append(cb, span);
    li.append(label);
    exclChecklist.appendChild(li);
  }
}

// ---- Matching -------------------------------------------------------------
// Returns a map { giver -> receiver } or null if no valid assignment found.
function drawAssignments(people, exceptions) {
  if (people.length < 2) return null;

  const forbidden = new Map(); // giver -> Set(receivers)
  for (const name of people) forbidden.set(name, new Set([name])); // no self-gift
  for (const [giver, receivers] of Object.entries(exceptions)) {
    if (!forbidden.has(giver)) continue;
    for (const receiver of receivers) forbidden.get(giver).add(receiver);
  }

  // Randomized backtracking. Retry a few times with reshuffled order so the
  // result is random rather than deterministic.
  for (let attempt = 0; attempt < 200; attempt++) {
    const givers = shuffle([...people]);
    const receivers = new Set(people);
    const assignment = {};
    if (assign(givers, 0, receivers, forbidden, assignment)) {
      return assignment;
    }
  }
  return null;
}

function assign(givers, i, available, forbidden, out) {
  if (i === givers.length) return true;
  const giver = givers[i];
  const candidates = shuffle(
    [...available].filter((r) => !forbidden.get(giver).has(r))
  );
  for (const receiver of candidates) {
    out[giver] = receiver;
    available.delete(receiver);
    if (assign(givers, i + 1, available, forbidden, out)) return true;
    available.add(receiver);
    delete out[giver];
  }
  return false;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---- Draw button ----------------------------------------------------------
drawBtn.addEventListener("click", () => {
  drawError.hidden = true;
  results.hidden = true;

  if (state.people.length < 2) {
    showError("Add at least 2 people before drawing.");
    return;
  }

  const assignment = drawAssignments(state.people, state.exceptions);
  if (!assignment) {
    showError(
      "Couldn't find a valid match with these rules — the exclusions are too restrictive. Try removing some."
    );
    return;
  }

  renderResults(assignment);
});

function showError(msg) {
  drawError.textContent = msg;
  drawError.hidden = false;
}

function renderResults(assignment) {
  state.lastDraw = assignment;
  resultsList.innerHTML = "";
  for (const giver of state.people) {
    const receiver = assignment[giver];
    const li = document.createElement("li");

    const g = document.createElement("span");
    g.className = "giver";
    g.textContent = giver;

    const r = document.createElement("span");
    r.className = "receiver hidden-name";
    r.textContent = "tap to reveal";
    r.dataset.name = receiver;
    r.dataset.revealed = "false";
    r.title = "Click to reveal";
    r.addEventListener("click", () => toggleReveal(r));

    li.append(g, r);
    resultsList.appendChild(li);
  }
  revealBtn.textContent = "Reveal all";
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function toggleReveal(el) {
  const revealed = el.dataset.revealed === "true";
  if (revealed) {
    el.textContent = "tap to reveal";
    el.classList.add("hidden-name");
    el.dataset.revealed = "false";
  } else {
    el.textContent = "🎁 " + el.dataset.name;
    el.classList.remove("hidden-name");
    el.dataset.revealed = "true";
  }
}

revealBtn.addEventListener("click", () => {
  const items = resultsList.querySelectorAll(".receiver");
  const anyHidden = [...items].some((el) => el.dataset.revealed !== "true");
  items.forEach((el) => {
    el.dataset.revealed = anyHidden ? "false" : "true"; // set opposite, then toggle
    toggleReveal(el);
  });
  revealBtn.textContent = anyHidden ? "Hide all" : "Reveal all";
});

// Plain-text version of the current draw, e.g. "Alice → Bob".
function resultsAsText() {
  return state.people.map((g) => `${g} → ${state.lastDraw[g]}`).join("\n");
}

// ---- Copy results ---------------------------------------------------------
copyBtn.addEventListener("click", async () => {
  if (!state.lastDraw) return;
  const text = resultsAsText();
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
  const original = copyBtn.textContent;
  copyBtn.textContent = "✓ Copied";
  setTimeout(() => {
    copyBtn.textContent = original;
  }, 1500);
});

// ---- Utils ----------------------------------------------------------------
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

// ---- Init -----------------------------------------------------------------
renderPeople();
renderExclusions();
