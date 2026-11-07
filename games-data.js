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
    id: "party-games",
    title: "Party Games",
    tagline: "One phone, six party games: Crocodile, Who Am I?, Mafia, Spy, Taboo and Two Truths and a Lie.",
    genres: ["Party"],
    status: "soon",
    cover: "covers/party-games.png",
    confetti: true,
    hue: 345,
    year: 2026,
    privacy: {
      data: [
        "No account, sign-in or profile is needed.",
        "Player names, settings and custom words stay on your device for the session only; nothing is saved or sent to us, and we run no servers or database.",
        "Ads are shown through Google AdMob. Google may collect technical data such as your advertising ID, IP address, approximate location, app usage and ad interactions, under Google's own privacy policy.",
        "Where required (for example the EU and UK) a Google consent form asks for your choice before ads load; on iOS, Apple's App Tracking Transparency prompt asks before your advertising ID is used. If you decline, ads are not personalized.",
        "You can reset your advertising ID or opt out of ad personalization in your device's ad settings.",
        "The only permissions requested are internet access (to load ads) and, on iOS, the tracking permission above. No contacts, camera, microphone, location or storage access.",
        "Not directed at children under 13; we do not knowingly collect their personal information."
      ],
      updated: "2026-11-06"
    }
  }
];
