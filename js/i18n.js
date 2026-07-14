// ---- i18n -----------------------------------------------------------------
// Translation dictionary + language switching. Static markup is translated via
// data-i18n* attributes; JS-built text goes through t(). Changing the language
// re-applies static translations and asks main.js to re-render dynamic parts.

const translations = {
  en: {
    title: "Secret Santa for problematic families",
    h1: "Secret Santa for problematic families",
    tagline: "Add everyone, set who <em>can't</em> gift whom, then draw the names.",
    reveal_h2: "Your Secret Santa",
    reveal_open: "Reveal my person",
    reveal_note: "Keep this name secret until Christmas.",
    reveal_greeting: "Hi {name}! Ready to find out who you're gifting?",
    reveal_name: "You're gifting {name}",
    step1_h2: "1. People",
    add_placeholder: "Add a name, or a list: Alice, Bob, Carol",
    add_btn: "Add",
    people_need2: "You need at least 2 people.",
    people_count: "{n} people added.",
    remove_title: "Remove {name}",
    step2_h2: '2. Exclusions <span class="subtle">(optional)</span>',
    excl_hint: "Pick a person, then check everyone they must NOT gift.",
    add_first: "Add at least 2 people first.",
    step3_h2: "3. Draw",
    draw_btn: "Draw names",
    err_need2: "Add at least 2 people before drawing.",
    err_no_match:
      "Couldn't find a valid match with these rules — the exclusions are too restrictive. Try removing some.",
    results_h3: "Results",
    copy_links_btn: "Copy all links",
    reveal_all: "Reveal all",
    hide_all: "Hide all",
    results_hint:
      'Send each person <strong>their link</strong> (the ' +
      '<span class="material-icons">link</span> button on their row). When they ' +
      "open it, they'll only see who to gift — the surprise stays intact, even for you.",
    tap_reveal: "tap to reveal",
    click_reveal: "Click to reveal",
    copy_link_title: "Copy {name}'s link",
    copied: "Copied",
    footer_privacy: "Everything stays in your browser — nothing is sent anywhere.",
    footer_thanks:
      'Thank you to <a href="https://chr15m.github.io/DoodleCSS/" target="_blank" ' +
      'rel="noopener">Doodle CSS</a> for the hand-drawn style. 💛',
    credits: "Made with fun by Nakawashi and Claude",
  },
  fr: {
    title: "Secret Santa pour familles compliquées",
    h1: "Secret Santa pour familles compliquées",
    tagline: "Ajoutez tout le monde, indiquez qui ne <em>peut pas</em> offrir à qui, puis tirez au sort.",
    reveal_h2: "Ton Secret Santa",
    reveal_open: "Révéler ma personne",
    reveal_note: "Garde ce nom secret jusqu'à Noël.",
    reveal_greeting: "Bonjour {name} ! Clique pour découvrir à qui tu offres un cadeau !",
    reveal_name: "Tu offres un cadeau à {name}",
    step1_h2: "1. Participants",
    add_placeholder: "Ajoute un nom, ou une liste : Alice, Bob, Carol",
    add_btn: "Ajouter",
    people_need2: "Il faut au moins 2 personnes.",
    people_count: "{n} personnes ajoutées.",
    remove_title: "Retirer {name}",
    step2_h2: '2. Exclusions <span class="subtle">(optionnel)</span>',
    excl_hint: "Choisis une personne, puis coche tous ceux à qui elle ne doit PAS offrir.",
    add_first: "Ajoute d'abord au moins 2 personnes.",
    step3_h2: "3. Tirage",
    draw_btn: "Tirer au sort",
    err_need2: "Ajoute au moins 2 personnes avant de tirer.",
    err_no_match:
      "Impossible de trouver une répartition valide avec ces règles — les exclusions sont trop restrictives. Essaie d'en retirer.",
    results_h3: "Résultats",
    copy_links_btn: "Copier tous les liens",
    reveal_all: "Tout révéler",
    hide_all: "Tout masquer",
    results_hint:
      'Envoie à chaque personne <strong>son lien</strong> (bouton ' +
      '<span class="material-icons">link</span> sur sa ligne). En l\'ouvrant, ' +
      "elle ne verra que la personne à qui offrir — la surprise reste intacte, même pour toi.",
    tap_reveal: "touche pour révéler",
    click_reveal: "Cliquer pour révéler",
    copy_link_title: "Copier le lien de {name}",
    copied: "Copié",
    footer_privacy: "Tout reste dans ton navigateur — rien n'est envoyé nulle part.",
    footer_thanks:
      'Merci à <a href="https://chr15m.github.io/DoodleCSS/" target="_blank" ' +
      'rel="noopener">Doodle CSS</a> pour le style dessiné à la main. 💛',
    credits: "Fait pour le fun par Nakawashi et Claude",
  },
};

const LANGS = ["en", "fr"];
let lang = "en";

// Translate `key`, substituting {placeholders} from `params`. Falls back to
// English, then to the raw key.
function t(key, params) {
  let s = translations[lang]?.[key] ?? translations.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{${k}}`, v);
  }
  return s;
}

function getSavedLang() {
  try {
    return localStorage.getItem("ss-lang");
  } catch {
    return null;
  }
}
function saveLang(l) {
  try {
    localStorage.setItem("ss-lang", l);
  } catch {
    /* storage unavailable (private mode / some file:// contexts) — ignore */
  }
}
function detectLang() {
  const saved = getSavedLang();
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : "en";
}

// Fill in every element tagged with a data-i18n* attribute.
function applyStaticTranslations() {
  document.documentElement.lang = lang;
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

function setLanguage(l) {
  if (!LANGS.includes(l)) l = "en";
  lang = l;
  saveLang(l);
  document.querySelectorAll("#lang-switch button").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === l);
    b.setAttribute("aria-pressed", String(b.dataset.lang === l));
  });
  applyStaticTranslations();
  rerenderDynamic(); // defined in main.js — orchestrates the JS-built views
}
