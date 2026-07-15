# Simple RPG Game

A compact browser RPG built with HTML, CSS, and JavaScript. Train in the cave, clear the forest, climb the mountain, upgrade your weapon, and defeat the dragon that is trapping the town.

## Features

- Three-button adventure flow with keyboard shortcuts (`1`, `2`, and `3`).
- Player HUD for XP, health, gold, current weapon, and inventory.
- Expanded enemy progression across cave, forest, and mountain areas.
- Quest log that tracks training, mid-game progress, and the final dragon objective.
- Responsive fantasy-themed interface for desktop and mobile browsers.

## Enemy levels

| Enemy | Level | Health | Area |
| --- | ---: | ---: | --- |
| Slime | 2 | 15 | Cave |
| Goblin scout | 5 | 35 | Cave |
| Fanged beast | 8 | 60 | Forest |
| Orc marauder | 12 | 100 | Forest |
| Shadow wraith | 16 | 180 | Mountain |
| Dragon | 24 | 340 | Mountain |

## Run locally

Open `index.html` directly in your browser, or serve the folder with a local static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
