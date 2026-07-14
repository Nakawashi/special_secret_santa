// ---- Personal links -------------------------------------------------------
// A personal link carries { g: giver, r: receiver } base64url-encoded in the
// URL hash. The hash is never sent to any server, so the assignment stays
// private to whoever opens the link.

function encodePayload(obj) {
  const json = JSON.stringify(obj);
  // btoa only handles Latin-1; this round-trips arbitrary UTF-8 (accents, etc.).
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodePayload(str) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  b64 += "=".repeat((4 - (b64.length % 4)) % 4); // restore stripped padding
  const json = decodeURIComponent(escape(atob(b64)));
  return JSON.parse(json);
}

function personalLink(giver, receiver) {
  const base = location.href.split(/[?#]/)[0]; // strip any existing query/hash
  return `${base}#r=${encodePayload({ g: giver, r: receiver })}`;
}
