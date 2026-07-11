# Little Games — 多款網頁小遊戲專案

> AI Agent 主題記憶翻牌 ＋ 更多小遊戲持續開發中

## 專案資訊

- **本地路徑**：`J:\我的雲端硬碟\AI\AI Agents\OpenCode\Little games_20260711`
- **GitHub Repo**：`t92016/little-games`
- **技術栈**：HTML / CSS / JavaScript + Firebase
- **部署方式**：GitHub Pages（線上玩）
- **打包 EXE**：Electron（可選）

## 資料夾結構

```
little-games/
├── index.html              ← 遊戲大廳（選單頁面）
├── shared/                 ← 共用資源
│   ├── css/
│   │   └── global.css
│   ├── js/
│   │   ├── firebase.js     ← Firebase 初始化
│   │   └── utils.js
│   └── assets/
├── memory-match/           ← 記憶翻牌（第 1 個遊戲）
│   ├── index.html
│   ├── style.css
│   └── script.js
├── AGENTS.md               ← 本文件
└── .gitignore
```

## Firebase 架構

- **服務**：Firestore Database
- **Collection**：`leaderboard`
- **Document 欄位**：`playerName`, `score`, `time`, `game`, `createdAt`

## 開發流程

1. 開工 → 說「開工」
2. 開發 → 我幫你寫
3. 收工 → 說「收工」（自動 commit + push + 備份）

## 同步對照表

| 本地路徑 | GitHub | Obsidian |
|---------|--------|----------|
| `little-games/` | `t92016/little-games` | `創作庫/Little Games/` |
