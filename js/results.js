// ---- Draw & results -------------------------------------------------------
// Step 3: run the draw, render the assignment rows (with per-person links and
// tap-to-reveal), and copy all personal links at once.

const drawBtn = $("draw-btn");
const drawError = $("draw-error");
const results = $("results");
const resultsList = $("results-list");
const revealBtn = $("reveal-btn");
const copyLinksBtn = $("copy-links-btn");

drawBtn.addEventListener("click", () => {
  drawError.hidden = true;
  results.hidden = true;

  if (state.people.length < 2) {
    showError(t("err_need2"));
    return;
  }

  const assignment = drawAssignments(state.people, state.exceptions);
  if (!assignment) {
    showError(t("err_no_match"));
    return;
  }

  renderResults(assignment);
});

function showError(msg) {
  drawError.textContent = msg;
  drawError.hidden = false;
}

function renderResults(assignment, scroll = true) {
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
    r.textContent = t("tap_reveal");
    r.dataset.name = receiver;
    r.dataset.revealed = "false";
    r.title = t("click_reveal");
    r.addEventListener("click", () => toggleReveal(r));

    // Per-person link: lets the organizer distribute without revealing names.
    const link = document.createElement("button");
    link.className = "ghost copy-link";
    link.type = "button";
    link.innerHTML = '<span class="material-icons">link</span>';
    link.title = t("copy_link_title", { name: giver });
    link.addEventListener("click", () => {
      copyText(personalLink(giver, receiver));
      flash(link, '<span class="material-icons">check</span>');
    });

    li.append(g, r, link);
    resultsList.appendChild(li);
  }
  revealBtn.textContent = t("reveal_all");
  results.hidden = false;
  if (scroll) results.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function toggleReveal(el) {
  const revealed = el.dataset.revealed === "true";
  if (revealed) {
    el.textContent = t("tap_reveal");
    el.classList.add("hidden-name");
    el.dataset.revealed = "false";
  } else {
    el.innerHTML =
      '<span class="material-icons">card_giftcard</span> ' +
      escapeHtml(el.dataset.name);
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
  revealBtn.textContent = anyHidden ? t("hide_all") : t("reveal_all");
});

// One "Name: <link>" line per person. Intended for the organizer to send
// each person their OWN line privately — the links don't spoil on their own.
function allLinksAsText() {
  return state.people
    .map((g) => `${g} : ${personalLink(g, state.lastDraw[g])}`)
    .join("\n");
}

copyLinksBtn.addEventListener("click", () => {
  if (!state.lastDraw) return;
  copyText(allLinksAsText());
  flash(copyLinksBtn, `<span class="material-icons">check</span> ${t("copied")}`);
});
