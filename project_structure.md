# 📁 flashcard-app - Project Structure

*Generated on: 7/12/2026, 11:08:26 PM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 37 |
| 📁 Total Folders | 18 |
| 🌳 Max Depth | 5 levels |
| 🛠️ Tech Stack | React, Next.js, TypeScript, CSS, Node.js |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔵 🔍 **eslint.config.mjs** - ESLint config
- 🟡 ▲ **next.config.ts** - Next.js config
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🔴 📖 **README.md** - Project documentation
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- 🔷 **.ts** (TypeScript files): 14 files (37.8%)
- ⚙️ **.json** (JSON files): 6 files (16.2%)
- 🎨 **.svg** (SVG images): 5 files (13.5%)
- 📖 **.md** (Markdown files): 3 files (8.1%)
- ⚛️ **.tsx** (React TypeScript files): 3 files (8.1%)
- 📄 **.mjs** (Other files): 2 files (5.4%)
- 🚫 **.gitignore** (Git ignore): 1 files (2.7%)
- 🖼️ **.png** (PNG images): 1 files (2.7%)
- 🖼️ **.ico** (Icon files): 1 files (2.7%)
- 🎨 **.css** (Stylesheets): 1 files (2.7%)

### By Category

- **TypeScript**: 14 files (37.8%)
- **Assets**: 7 files (18.9%)
- **Config**: 6 files (16.2%)
- **Docs**: 3 files (8.1%)
- **React**: 3 files (8.1%)
- **Other**: 2 files (5.4%)
- **DevOps**: 1 files (2.7%)
- **Styles**: 1 files (2.7%)

### 📁 Largest Directories

- **root**: 37 files
- **src**: 17 files
- **src\types**: 8 files
- **public**: 5 files
- **decks**: 4 files

## 🌳 Directory Structure

```
flashcard-app/
├── 🟡 🚫 **.gitignore**
├── 📖 ARCHTECTURE.md
├── 📂 decks/
│   ├── 📂 custom/
│   ├── 📂 lets-go/
│   │   ├── 📂 LG1/
│   │   │   ├── 📦 assets/
│   │   │   │   ├── 📂 audio/
│   │   │   │   └── 🖼️ images/
│   │   │   │   │   └── 🖼️ dog.png
│   │   │   ├── 📂 EN-JP_vocab/
│   │   │   │   └── ⚙️ deck.json
│   │   │   └── 📂 JP-EN_vocab/
│   │   │   │   └── ⚙️ deck.json
│   │   └── 📂 LG2/
│   ├── ⚙️ manifest.json
│   └── 📂 shared/
├── 🔵 🔍 **eslint.config.mjs**
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🟡 🔒 **package-lock.json**
├── 🔴 📦 **package.json**
├── 📄 postcss.config.mjs
├── 📖 project_structure.md
├── 🌐 public/
│   ├── 🎨 file.svg
│   ├── 🎨 globe.svg
│   ├── 🎨 next.svg
│   ├── 🎨 vercel.svg
│   └── 🎨 window.svg
├── 🔴 📖 **README.md**
├── 📁 src/
│   ├── 🚀 app/
│   │   ├── 🖼️ favicon.ico
│   │   ├── 🎨 globals.css
│   │   ├── ⚛️ layout.tsx
│   │   └── ⚛️ page.tsx
│   ├── 🧩 components/
│   │   └── ⚛️ DeckSelection.tsx
│   ├── 📚 lib/
│   │   ├── 🔷 constants.ts
│   │   ├── 🔷 deckLoader.ts
│   │   ├── 🔷 test.ts
│   │   └── 📂 validators/
│   │   │   └── 🔷 deckValidator.ts
│   └── 📂 types/
│   │   ├── 🔷 AcceptedAnswer.ts
│   │   ├── 🔷 Card.ts
│   │   ├── 🔷 Deck.ts
│   │   ├── 🔷 LoadedDeck.ts
│   │   ├── 🔷 Manifest.ts
│   │   ├── 🔷 Side.ts
│   │   ├── 🔷 User.ts
│   │   └── 🔷 ValidationResult.ts
└── 🟡 🔷 **tsconfig.json**
```

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- 📖 Docs: Markdown files
- 🖼️ Assets: PNG images
- ⚙️ Config: JSON files
- 📄 Other: Other files
- 🔷 TypeScript: TypeScript files
- 🎨 Assets: SVG images
- 🖼️ Assets: Icon files
- 🎨 Styles: Stylesheets
- ⚛️ React: React TypeScript files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
