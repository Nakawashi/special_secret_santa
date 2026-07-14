// ---- State ----------------------------------------------------------------
// The single in-memory store. Everything is derived from this; there is no
// persistence beyond the (optional) language choice in localStorage.
const state = {
  people: [],        // array of names (strings, unique)
  exceptions: {},    // { person -> array of names that person must NOT gift }
  selected: null,    // person currently selected in the exclusions dropdown
  lastDraw: null,    // last assignment map { giver -> receiver }, for copying
  reveal: null,      // { g, r, revealed } when opened via a personal link
};
