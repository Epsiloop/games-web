/* =========================================================
   Epsiloop Games — catalog data
   Each game is its own separate project (own repo / own subdomain).
   To add a game: append an entry below. Nothing else to change.

   id        unique slug (also the default subdomain: <id>.games.epsiloop.io)
   title     display name
   tagline   one-line pitch (shown on the card)
   genres    array of strings — they become the filter chips
   status    "live" | "beta" | "processing" (submitted, in store review; card is clickable) | "soon"
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
    tagline: "One phone, six party games: Crocodile, Who Am I?, Mafia, Spy, Forbidden Words and Two Truths and a Lie.",
    genres: ["Party"],
    status: "processing",
    cover: "covers/party-games.png",
    confetti: true,
    hue: 345,
    year: 2026,
    privacy: {
      data: [
        "No account, sign-in or profile is needed.",
        "Player names, settings and custom words stay on your device for the session only; nothing is saved or sent to us, and we run no servers or database.",
        "Ads are shown through Google AdMob (Google Mobile Ads SDK): banner ads and occasional full-screen ads between rounds. The app is free and ads are its only source of revenue. There are no in-app purchases.",
        "To serve and measure ads, Google may collect and use your advertising identifier (IDFA / Android advertising ID), IP address, approximate location, device and app information, and ad interactions. This data is processed by Google under Google's own privacy policy (policies.google.com/privacy). We receive no personal data from it and do not link it to you.",
        "Tracking: on iOS, Apple's App Tracking Transparency prompt asks for your permission before your advertising ID is used. Where required (for example the EU, UK and some US states), a Google consent form (Google UMP) asks for your choice before ads load. If you decline, ads are still shown but are not personalized, and your advertising ID is not used for tracking. The game works the same whichever you choose.",
        "Changing your mind: use the Privacy options button in the app's main menu (shown where consent is required) to reopen the consent form at any time. On iOS you can also change it in Settings > Privacy & Security > Tracking, and on Android in Settings > Google > Ads. You can reset your advertising ID there too.",
        "Reporting an ad: every ad has Google's ad information (i) / AdChoices control, where you can see why you were shown the ad and report it as inappropriate.",
        "Retention and deletion: we hold no personal data, so there is nothing for us to delete. Data held by Google is governed by its policy; you can manage or delete it at myadcenter.google.com.",
        "The only permissions requested are internet access (to load ads) and, on iOS, the tracking permission above. No contacts, camera, microphone, location or storage access.",
        "Not directed at children under 13; we do not knowingly collect their personal information."
      ],
      updated: "2026-11-09"
    }
  }
];
