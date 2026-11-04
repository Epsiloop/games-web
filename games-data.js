/* =========================================================
   Epsiloop Games — catalog data
   Each game is its own separate project (own repo / own subdomain).
   To add a game: append an entry below. Nothing else to change.

   id        unique slug (also the default subdomain: <id>.games.epsiloop.io)
   title     display name
   tagline   one-line pitch (shown on the card)
   genres    array of strings — they become the filter chips
   status    "live" | "beta" | "soon"
   url       where the game project is hosted (omit while status is "soon")
   cover     optional image path, e.g. "covers/my-game.png"
   hue       optional 0–360, tints the generated cover when there is no image
   year      optional release year
   privacy   per-game privacy info shown on privacy.html:
             { url:  "https://<game>.games.epsiloop.io/privacy",  // the game's full policy (optional)
               data: ["What the game collects, one short line each"],  // plain-language summary
               updated: "2026-11-04" }
             Leave it out (or data empty) while the game is "soon" — the page says so.
   ========================================================= */
window.GAMES = [
  {
    id: "game-one",
    title: "Game One",
    tagline: "Placeholder — replace with your first game.",
    genres: ["Puzzle"],
    status: "soon",
    hue: 345,
    privacy: { data: [], updated: "2026-11-04" }
  },
  {
    id: "game-two",
    title: "Game Two",
    tagline: "Placeholder — replace with your second game.",
    genres: ["Arcade"],
    status: "soon",
    hue: 15,
    privacy: { data: [], updated: "2026-11-04" }
  }
];
