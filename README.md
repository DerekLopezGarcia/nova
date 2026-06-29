# 🌿 Prompt Meadow

> **A cozy pixel-art interface to manage your AI agents.**  
> Stardew Valley meets OpenCode. Free. Open source. Pixel-perfect.

![Prompt Meadow screenshot](https://raw.githubusercontent.com/DerekLopezGarcia/prompt-meadow/main/public/og-image.png)

## ✨ Concept

**Prompt Meadow** is a dashboard where your AI agents are like crops or farm animals in a cozy pixel-art meadow. Each agent is a little creature you plant, nurture, and harvest results from.

| Stardew Valley → | Prompt Meadow |
|---|---|
| 🌱 Crops / Animals | 🤖 AI Agents |
| ❤️ Health bar | 📊 Agent status |
| 🧰 Inventory | 📋 Task queue |
| 🌰 Seed → Harvest | 📝 Task → Result |
| 💬 NPC dialogs | 📜 Agent logs |
| 🟫 Farm plot | 🟩 Agent grid |

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173/prompt-meadow/](http://localhost:5173/prompt-meadow/)

## 🛠️ Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Style:** Custom CSS pixel-art (Press Start 2P font)
- **Assets:** Free CC0 game assets from [Kenney](https://kenney.nl) & [OpenGameArt](https://opengameart.org)
- **AI Backend:** Connects to [OpenCode](https://opencode.ai) via MCP protocol
- **Deploy:** GitHub Pages (free)

## 🎨 Design

Inspired by **Stardew Valley**'s cozy pixel art aesthetic:

- `Press Start 2P` pixel font
- 2px hard borders, no border-radius
- 3px drop shadows without blur
- `image-rendering: pixelated` everywhere
- Stardew Valley color palette (Lospec)

## 🗺️ Roadmap

- [x] Design system & component library
- [x] Agent dashboard (grid of "farm plots")
- [x] Agent creation ("plant a seed")
- [ ] Status monitoring (health/energy bars)
- [ ] OpenCode MCP Bridge
- [ ] Real-time agent logs
- [ ] Task assignment & harvesting

## 📝 License

MIT — free to use, modify, and share.

---

*Built in public. Follow the journey on [LinkedIn](https://linkedin.com/in/dereklopezgarcia).*
