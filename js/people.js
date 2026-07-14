// ---- People & exclusions --------------------------------------------------
// Steps 1 & 2: managing the participant list and each person's forbidden
// receivers. Both sections are re-rendered together whenever the list changes.

const personForm = $("person-form");
const personInput = $("person-input");
const peopleList = $("people-list");
const peopleHint = $("people-hint");

const exclPerson = $("excl-person");
const exclChecklist = $("excl-checklist");
const exclEmpty = $("excl-empty");

const MAX_NAME_LEN = 35; // a participant name may not exceed this length

personForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Accept a single name or a comma / newline separated list.
  const names = personInput.value
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!names.length) return;

  let added = 0;
  let tooLong = 0;
  for (const name of names) {
    if (name.length > MAX_NAME_LEN) {
      tooLong++;
      continue; // skip names that are too long
    }
    const exists = state.people.some(
      (p) => p.toLowerCase() === name.toLowerCase()
    );
    if (exists) continue; // skip duplicates (case-insensitive)
    state.people.push(name);
    added++;
  }

  if (added > 0) {
    personInput.value = "";
    personInput.focus();
  } else {
    personInput.select(); // nothing added — keep the input for editing
  }

  renderPeople();
  renderExclusions();

  // renderPeople resets the hint, so show the warning after it.
  if (tooLong > 0) peopleHint.textContent = t("name_too_long", { max: MAX_NAME_LEN });
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
    btn.title = t("remove_title", { name });
    btn.addEventListener("click", () => removePerson(name));
    li.append(label, btn);
    peopleList.appendChild(li);
  }
  peopleHint.textContent =
    state.people.length < 2
      ? t("people_need2")
      : t("people_count", { n: state.people.length });
}

// Pick a person, check who they must not gift.
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
    exclEmpty.textContent = state.people.length < 2 ? t("add_first") : "";
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
