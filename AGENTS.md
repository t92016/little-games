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
├── shmup-1945/              ← 飛機射擊（第 2 個遊戲）⚠️ 開發中
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/              ← Draw 技能生圖輸出
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

## 遊戲 2：SHMUP-1945 飛機射擊 ⚠️ 開發中

### 核心玩法
- **類型**：垂直捲軸 2D 射擊（Canvas 繪製）
- **關卡**：3 關（空中 → 海上 → 太空，第 3 關有變形 BOSS）
- **生命**：每玩家 3 條命，受傷 1.5 秒無敵 + 閃爍
- **武器**：Lv1~Lv5 升級路線（單發 → 散射 → 雷射 + 導彈）

### 武器升級路線
| 等級 | 主武器 | 副武器 |
|------|--------|--------|
| Lv1 | 單發子彈 | 無 |
| Lv2 | 雙發子彈 | 無 |
| Lv3 | 三發散射 | 小型導彈 ×1 |
| Lv4 | 五發扇形 | 導彈 ×2 |
| Lv5 | 雷射光束 | 導彈 ×4 + 護盾 |

### 掉落道具
- 🔴 紅色 P：武器升一級
- 🔵 藍色 M：導彈補充
- 🟡 黃色 B：全螢幕炸彈（清場 + 子彈時間）
- 🟢 綠色 S：暫時護盾（擋 3 次傷害）
- ⚡ 金色星星：分數 ×2，持續 10 秒

### 排行榜（Firebase）
- `game` 欄位：`"shmup-1945"`
- 紀錄欄位：`playerName`, `score`, `stage`, `enemiesKilled`, `time`, `createdAt`

### 視覺特效
- 雙層視差滾動背景
- 粒子爆炸效果
- BOSS 登場 / 炸彈清場螢幕震動
- 玩家引擎尾焰
- 道具旋轉 + 脈衝光暈
- 分數飄浮文字、COMBO 連擊提示
- BOSS 血條（多階段變色）

### UI / 操作
- 鍵盤：↑↓←→ 移動，Z / 空白鍵射擊（自動連發），X 放大絕
- 手機：拖曳移動 + 自動射擊 + 雙擊大絕
- ESC 暫停選單（繼續 / 重新開始 / 回大廳）
- 過場畫面「STAGE CLEAR」+ 擊殺統計
- 自訂機體顏色（紅 / 藍 / 綠）

### Draw 生圖任務清單（用 `draw.py` 產生）
| 資產 | 用途 | 描述範例 |
|------|------|---------|
| 玩家機體（紅/藍/綠） | 可選機體 | "pixel art fighter jet, top-down view, 2D game sprite" |
| 敵機 A（小型） | 第 1 關小兵 | "pixel art enemy plane, top-down, simple design" |
| 敵機 B（俯衝型） | 第 2 關小兵 | "pixel art dive bomber, top-down, aggressive" |
| 中魔王（轟炸機） | 第 1 關尾 | "pixel art large bomber boss, detailed" |
| 中魔王（戰艦） | 第 2 關尾 | "pixel art battleship boss, turrets visible" |
| 大魔王（變形機甲） | 第 3 關尾 | "pixel art transforming mecha boss, sci-fi, intimidating" |
| 道具圖標 ×5 | P/M/B/S/星 | "pixel art power-up icon, glowing, game item" |
| 背景層（天空） | 第 1 關 | "pixel art scrolling sky background, clouds" |
| 背景層（海洋） | 第 2 關 | "pixel art ocean scrolling background, waves" |
| 背景層（太空） | 第 3 關 | "pixel art space scrolling background, stars nebula" |
| 生命心形圖標 | HUD | "pixel art heart icon, game UI" |
| 炸彈圖標 | HUD | "pixel art bomb icon, game UI" |

> Draw 指令格式：`python draw.py "描述" --name 檔名 --quality low`
> 輸出目錄：`shmup-1945/assets/`

### 開發階段
| 階段 | 內容 | 狀態 |
|------|------|------|
| 1 | Canvas 框架：遊戲迴圈 + 玩家移動 + 自動射擊 | ⬜ 待開發 |
| 2 | 敵人生成系統 + 碰撞偵測 + 生命系統 | ⬜ 待開發 |
| 3 | 道具掉落 + 武器升級 | ⬜ 待開發 |
| 4 | 關卡流程 + BOSS 戰 | ⬜ 待開發 |
| 5 | 視覺特效 + UI（血條、combo、分數飄浮） | ⬜ 待開發 |
| 6 | Firebase 排行榜 + 暫停/過場畫面 | ⬜ 待開發 |
| A | Draw 生圖：所有遊戲素材 | ⬜ 待開發 |

**下一步：從階段 A（Draw 生圖）或階段 1（Canvas 框架）開始。**

## 同步對照表

| 本地路徑 | GitHub | Obsidian |
|---------|--------|----------|
| `little-games/` | `t92016/little-games` | `創作庫/Little Games/` |
