# DESIGN.md — Neon Cyber Portfolio

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 「Cyber-Sophisticated」（サイバー・ソフィスティケート）。現在のネオン感を活かしつつ、余白と構造を整理した洗練されたダークテーマ。
- **密度**: ゆったりとしたポートフォリオ/メディア型。視覚的なインパクトを重視。
- **キーワード**: 漆黒(Neon Dark), 発光(Glow), 近未来(Futuristic), 信頼感(Professional), グラスモーフィズム(Glassmorphism)

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Primary** (`#87CEEB`): スカイブルー。ネオン発光効果、ボタン、強調要素に使用。
- **Primary Dark** (`#4682B4`): プレス時のプライマリカラー。

### Semantic（意味的な色）

- **Danger** (`#FF4B4B`): 警告、エラー。
- **Warning** (`#FFD700`): 注意。
- **Success** (`#00FA9A`): 完了、ポジティブなステータス。

### Neutral（ニュートラル）

- **Text Primary** (`#FFFFFF`): 本文・見出しのメインテキスト。
- **Text Secondary** (`#A0A0A0`): 補足テキスト、ラベル、説明。
- **Text Disabled** (`#4D4D4D`): 無効状態。
- **Border** (`#333333`): 区切り線（半透明のホワイト `rgba(255,255,255,0.1)` を推奨）。
- **Background** (`#0B0F10`): ページ全体の背景。
- **Surface** (`#191C1E`): カード、セクション、モーダル。グラスモーフィズムを適用。

---

## 3. Typography Rules

### 3.1 和文フォント
- **ゴシック体**: Noto Sans JP, 游ゴシック, ヒラギノ角ゴ ProN

### 3.2 欧文フォント
- **サンセリフ**: Space Grotesk, Inter

### 3.3 font-family 指定
```css
/* 本文・見出し共通 */
font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
```

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | Space Grotesk | 64px | 900 | 1.1 | -0.02em | ヒーロータイトル |
| Heading 1 | Space Grotesk | 40px | 700 | 1.2 | 0.05em | セクション見出し |
| Heading 2 | Space Grotesk | 24px | 700 | 1.3 | 0.05em | サブ見出し |
| Body | Noto Sans JP | 16px | 400 | 1.8 | 0.04em | 本文 |
| Caption | Noto Sans JP | 14px | 400 | 1.6 | 0.02em | 補足、タグ |

---

## 4. Component Stylings

### Buttons
**Primary (Neon)**
- Background: `#87CEEB`
- Text: `#0B0F10` (Dark Contrast)
- Border Radius: 8px
- Shadow: `0 0 15px rgba(135, 206, 235, 0.4)` (Glow effect)

### Cards (Glassmorphism)
- Background: `rgba(255, 255, 255, 0.03)`
- Backdrop-filter: `blur(12px)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Border Radius: 16px

---

## 5. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | ページ背景 |
| 1 | `0 4px 20px rgba(0,0,0,0.5)` | プロジェクトカード |
| 2 | `0 0 30px rgba(135,206,235,0.15)` | 強調要素、モーダル |

---

## 6. Do's and Don'ts

### Do
- 背景は漆黒に近い暗色を使用し、コンテンツのコントラストを高く保つ。
- ネオンブルーのアクセントには常に僅かな外光（Glow）を付与する。
- 英語の見出しと日本語の本文を組み合わせ、テック感を出す。

### Don't
- 明るすぎるグレーを背景に使わない（サイバー感が損なわれる）。
- 純粋な `#000000` ではなく、僅かに青みや深みのある暗色（`#0B0F10`等）をベースにする。
- ネオン色を多用しすぎない（視認性が低下するため、要所に絞る）。
