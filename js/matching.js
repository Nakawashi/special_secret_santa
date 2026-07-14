// ---- Matching -------------------------------------------------------------
// The draw core: assign each giver a receiver, honoring the forbidden pairs.

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
