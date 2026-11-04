# Epsiloop Games (catalog)

Static site, same stack as `main/`, `biovault/` and `motiveaction/`. Styled with the design system
(`css/tokens.css` + `css/components.css` are copies of `../design-system/`; re-copy them when the system changes).

## Structure

- Each **game is a separate project** (own repo, own hosting, own subdomain such as `<game>.games.epsiloop.io`).
- This folder is only the **catalog**: it lists games and links to them.

## Add a game

Append an entry to `games-data.js` (fields are documented at the top of that file):

```js
{ id: "my-game", title: "My Game", tagline: "One-line pitch.", genres: ["Puzzle"],
  status: "live", url: "https://my-game.games.epsiloop.io", cover: "covers/my-game.png", year: 2026 }
```

Put the cover image (16:10 works best) in `covers/`. Without one, a tinted cover with the title's first letter is generated (`hue` 0–360).
`status: "soon"` shows a non-clickable card.

## Run locally

Open `index.html` in a browser, or `python3 -m http.server` in this folder.
