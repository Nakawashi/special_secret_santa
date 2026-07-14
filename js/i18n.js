// ---- i18n -----------------------------------------------------------------
// Translation dictionary + language switching. Static markup is translated via
// data-i18n* attributes; JS-built text goes through t(). Changing the language
// re-applies static translations and asks main.js to re-render dynamic parts.

const translations = {
  en: {
    title: "Secret Santa with Exclusions — Draw names for problematic families",
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
    name_too_long: "Names must be {max} characters or fewer.",
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
    title: "Secret Santa avec exclusions — Tirage au sort pour familles compliquées",
    h1: "Secret Santa pour familles compliquées",
    tagline: "Ajoute tout le monde, indique qui ne <em>peut pas</em> offrir à qui, puis tire au sort.",
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
    name_too_long: "Les prénoms doivent faire au maximum {max} caractères.",
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
  de: {
    title: "Secret Santa mit Ausschlüssen — Wichteln für schwierige Familien",
    h1: "Secret Santa für schwierige Familien",
    tagline: "Füge alle hinzu, lege fest, wer wem <em>nicht</em> schenken darf, und lose dann aus.",
    reveal_h2: "Dein Secret Santa",
    reveal_open: "Meine Person anzeigen",
    reveal_note: "Halte diesen Namen bis Weihnachten geheim.",
    reveal_greeting: "Hallo {name}! Klicke, um zu sehen, wen du beschenkst.",
    reveal_name: "Du beschenkst {name}",
    step1_h2: "1. Teilnehmer",
    add_placeholder: "Füge einen Namen hinzu, oder eine Liste: Alice, Bob, Carol",
    add_btn: "Hinzufügen",
    people_need2: "Du brauchst mindestens 2 Personen.",
    people_count: "{n} Personen hinzugefügt.",
    name_too_long: "Namen dürfen höchstens {max} Zeichen lang sein.",
    remove_title: "{name} entfernen",
    step2_h2: '2. Ausschlüsse <span class="subtle">(optional)</span>',
    excl_hint: "Wähle eine Person und markiere alle, denen sie NICHT schenken darf.",
    add_first: "Füge zuerst mindestens 2 Personen hinzu.",
    step3_h2: "3. Auslosen",
    draw_btn: "Namen auslosen",
    err_need2: "Füge mindestens 2 Personen hinzu, bevor du auslost.",
    err_no_match:
      "Mit diesen Regeln ist keine gültige Zuordnung möglich — die Ausschlüsse sind zu streng. Entferne einige.",
    results_h3: "Ergebnisse",
    copy_links_btn: "Alle Links kopieren",
    reveal_all: "Alle anzeigen",
    hide_all: "Alle verbergen",
    results_hint:
      'Schicke jeder Person <strong>ihren Link</strong> (Schaltfläche ' +
      '<span class="material-icons">link</span> in ihrer Zeile). Beim Öffnen ' +
      "sieht sie nur, wen sie beschenkt — die Überraschung bleibt erhalten, auch für dich.",
    tap_reveal: "tippen zum Anzeigen",
    click_reveal: "Zum Anzeigen klicken",
    copy_link_title: "Link von {name} kopieren",
    copied: "Kopiert",
    footer_privacy: "Alles bleibt in deinem Browser — nichts wird irgendwohin gesendet.",
    footer_thanks:
      'Danke an <a href="https://chr15m.github.io/DoodleCSS/" target="_blank" ' +
      'rel="noopener">Doodle CSS</a> für den handgezeichneten Stil. 💛',
    credits: "Mit Freude gemacht von Nakawashi und Claude",
  },
  rm: {
    title: "Secret Santa cun exclusiuns — Tratga da nums per famiglias problematicas",
    h1: "Secret Santa per famiglias problematicas",
    tagline: "Agiuntai tuts, definì tgi che <em>na dastga betg</em> far in regal a tgi, e traite lura ils nums.",
    reveal_h2: "Tes Secret Santa",
    reveal_open: "Mussar mia persuna",
    reveal_note: "Mantegna quest num secret enfin Nadal.",
    reveal_greeting: "Bun di {name}! Clicca per vesair a tgi che ti fas in regal.",
    reveal_name: "Ti fas in regal a {name}",
    step1_h2: "1. Participants",
    add_placeholder: "Agiunta in num, u ina glista: Alice, Bob, Carol",
    add_btn: "Agiuntar",
    people_need2: "Ti dovras almain 2 persunas.",
    people_count: "{n} persunas agiuntadas.",
    name_too_long: "Ils nums dastgan avair maximalmain {max} caracters.",
    remove_title: "Allontanar {name}",
    step2_h2: '2. Exclusiuns <span class="subtle">(opziunal)</span>',
    excl_hint: "Tscherna ina persuna e marca tuts a tgi ch'ella NA dastga BETG far in regal.",
    add_first: "Agiunta l'emprim almain 2 persunas.",
    step3_h2: "3. Trair a la sort",
    draw_btn: "Trair ils nums",
    err_need2: "Agiunta almain 2 persunas avant che trair.",
    err_no_match:
      "Impussibel da chattar ina repartiziun valida cun questas reglas — las exclusiuns èn memia strictas. Emprova d'allontanar intginas.",
    results_h3: "Resultats",
    copy_links_btn: "Copiar tut ils links",
    reveal_all: "Mussar tut",
    hide_all: "Zuppentar tut",
    results_hint:
      'Trametta a mintga persuna <strong>ses link</strong> (buttun ' +
      '<span class="material-icons">link</span> en sia lingia). Cur ch\'ella al avra, ' +
      "vesa ella mo a tgi ch'ella fa in regal — la surpraisa resta intacta, era per tai.",
    tap_reveal: "tutgar per mussar",
    click_reveal: "Cliccar per mussar",
    copy_link_title: "Copiar il link da {name}",
    copied: "Copià",
    footer_privacy: "Tut resta en tes navigatur — nagut na vegn tramess.",
    footer_thanks:
      'Grazia a <a href="https://chr15m.github.io/DoodleCSS/" target="_blank" ' +
      'rel="noopener">Doodle CSS</a> per il stil dissegnà a maun. 💛',
    credits: "Fatg cun plaschair da Nakawashi e Claude",
  },
  it: {
    title: "Secret Santa con esclusioni — Sorteggio per famiglie problematiche",
    h1: "Secret Santa per famiglie problematiche",
    tagline: "Aggiungi tutti, indica chi <em>non può</em> fare un regalo a chi, poi estrai i nomi.",
    reveal_h2: "Il tuo Secret Santa",
    reveal_open: "Mostra la mia persona",
    reveal_note: "Tieni segreto questo nome fino a Natale.",
    reveal_greeting: "Ciao {name}! Clicca per scoprire a chi fai un regalo.",
    reveal_name: "Fai un regalo a {name}",
    step1_h2: "1. Partecipanti",
    add_placeholder: "Aggiungi un nome, o una lista: Alice, Bob, Carol",
    add_btn: "Aggiungi",
    people_need2: "Servono almeno 2 persone.",
    people_count: "{n} persone aggiunte.",
    name_too_long: "I nomi non possono superare i {max} caratteri.",
    remove_title: "Rimuovi {name}",
    step2_h2: '2. Esclusioni <span class="subtle">(facoltativo)</span>',
    excl_hint: "Scegli una persona, poi seleziona tutti quelli a cui NON deve fare un regalo.",
    add_first: "Aggiungi prima almeno 2 persone.",
    step3_h2: "3. Estrazione",
    draw_btn: "Estrai i nomi",
    err_need2: "Aggiungi almeno 2 persone prima di estrarre.",
    err_no_match:
      "Impossibile trovare un abbinamento valido con queste regole — le esclusioni sono troppo restrittive. Prova a rimuoverne alcune.",
    results_h3: "Risultati",
    copy_links_btn: "Copia tutti i link",
    reveal_all: "Mostra tutti",
    hide_all: "Nascondi tutti",
    results_hint:
      'Invia a ogni persona <strong>il suo link</strong> (pulsante ' +
      '<span class="material-icons">link</span> sulla sua riga). Aprendolo, ' +
      "vedrà solo a chi fare il regalo — la sorpresa resta intatta, anche per te.",
    tap_reveal: "tocca per rivelare",
    click_reveal: "Clicca per rivelare",
    copy_link_title: "Copia il link di {name}",
    copied: "Copiato",
    footer_privacy: "Tutto resta nel tuo browser — niente viene inviato da nessuna parte.",
    footer_thanks:
      'Grazie a <a href="https://chr15m.github.io/DoodleCSS/" target="_blank" ' +
      'rel="noopener">Doodle CSS</a> per lo stile disegnato a mano. 💛',
    credits: "Fatto con gioia da Nakawashi e Claude",
  },
};

const LANGS = ["en", "fr", "de", "rm", "it"];
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
