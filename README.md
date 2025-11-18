# 🏠 RentRipple - Bangkok MRT Property Platform
## 曼谷捷運物業展示平台

**Live Demo: [https://bangkokmrt.vercel.app](https://bangkokmrt.vercel.app)**

*English documentation follows the Chinese section / 英文說明在中文說明之後*

---

RentRipple 是一個專為曼谷捷運沿線物業設計的現代化展示平台。它結合了優雅的 iOS 風格界面和強大的後台管理功能，為房地產展示提供了一個精緻、高效且完整的解決方案。

![RentRipple Showcase](https://raw.githubusercontent.com/benson-code/RentRipple/main/public/og-image.jpg)

---

## 🌏 繁體中文

### ✨ 主要特色

- 📱 **行動優先設計**: 針對 iPhone 和行動裝置優化的 iOS 風格介面，注重使用者體驗細節。
- 🖼️ **智慧圖片輪播**: 流暢的滑動導覽、自動播放及快速跳轉功能。
- 👨‍💼 **管理員後台**: 簡單易用的物業管理介面，支援 CRUD 操作和圖片上傳。
- 📱 **QR Code 整合**: 自動生成物業專屬 QR Code，方便線下推廣與分享。
- ☁️ **Serverless 架構**: 基於 Vercel Serverless Functions、KV (Redis) 和 Blob Storage，兼具彈性與低成本。
- 🔒 **企業級安全性**: 內建 XSS 防護、後端驗證和暴力攻擊防護機制。
- 🧪 **完整測試覆蓋**: 使用 Vitest 和 Testing Library 確保核心功能的穩定性。

### 🛠️ 技術堆疊

| 類別              | 技術                                                         |
| ----------------- | ------------------------------------------------------------ |
| **前端**          | `React 18.3` `React Router 6` `Tailwind CSS 3.4` `Vite`        |
| **後端 & 雲端**   | `Vercel Serverless` `Vercel KV (Redis)` `Vercel Blob Storage`  |
| **開發 & 測試**   | `Vitest` `React Testing Library` `ESLint` `Prettier` `jsdom`   |
| **安全性 & 其他** | `jsonwebtoken` `DOMPurify` `isomorphic-dompurify` `qrcode`     |

### 🚀 快速開始

#### 環境需求
- Node.js (v16 或更高)
- npm / yarn / pnpm
- Git

#### 安裝與設定

1.  **複製專案**
    ```bash
    git clone https://github.com/benson-code/RentRipple.git
    cd RentRipple
    ```

2.  **安裝依賴**
    ```bash
    npm install
    ```

3.  **設定環境變數**
    
    複製 `.env.example` (如果存在) 或手動建立 `.env.local` 檔案，並填入以下變數：

| 變數                      | 說明                                       |
| ------------------------- | ------------------------------------------ |
| `VITE_ADMIN_PASSWORD`     | 管理員登入密碼 (前端使用)                  |
| `ADMIN_PASSWORD`          | 管理員登入密碼 (後端 API 驗證使用)         |
| `KV_REST_API_URL`         | Vercel KV 資料庫的 API URL                 |
| `KV_REST_API_TOKEN`       | Vercel KV 資料庫的 Token                   |
| `BLOB_READ_WRITE_TOKEN`   | Vercel Blob Storage 的 Token               |


4.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```
    應用程式將在 `http://localhost:5173` 上運行。

### 🧪 測試與品質保證

本專案致力於高品質程式碼，並配置了完整的測試和 linting 工作流程。

- **執行單元測試**:
  ```bash
  npm test 
  ```
- **查看測試覆蓋率**:
  ```bash
  npm run test:coverage
  ```
- **執行程式碼檢查**:
  ```bash
  npm run lint
  ```
- **自動修正與格式化**:
  ```bash
  npm run format
  ```

### 部署

#### 部署到 Vercel (建議)
1.  **連接 GitHub 倉庫** 到您的 Vercel 帳戶。
2.  在 Vercel 專案設定中，**配置上述的環境變數**。
3.  Vercel 將在每次 `git push` 到主分支時自動進行部署。

#### 手動部署
```bash
# 安裝 Vercel CLI
npm install -g vercel

# 部署到生產環境
vercel --prod
```

### 📁 專案結構
```
rentripple/
├── api/                  # Vercel Serverless Functions
│   ├── auth.js           # 權限驗證 API
│   └── property.js       # 物業資料 CRUD API
├── public/               # 公共靜態資源
├── src/                  # 應用程式源碼
│   ├── admin/            # 後台管理元件
│   ├── components/       # 可重用 React 元件
│   ├── data/             # 靜態種子資料
│   ├── utils/            # 工具函數 (API, 清理)
│   ├── App.jsx           # 應用程式主路由
│   └── main.jsx          # React 入口點
├── .env.local            # 環境變數 (本地)
├── package.json          # 專案依賴與腳本
└── README.md             # 專案說明文件
```

---

## 🌍 English

### ✨ Key Features

- 📱 **Mobile-First Design**: iOS-style interface optimized for iPhone and mobile devices with meticulous attention to UX.
- 🖼️ **Smart Image Carousel**: Smooth swipe navigation, auto-play, and quick-jump features.
- 👨‍💼 **Admin Dashboard**: User-friendly property management interface with full CRUD functionality and image uploads.
- 📱 **QR Code Integration**: Auto-generates unique QR codes for each property, ideal for offline marketing and sharing.
- ☁️ **Serverless Architecture**: Built on Vercel Serverless Functions, KV (Redis), and Blob Storage for scalability and cost-efficiency.
- 🔒 **Enterprise-Grade Security**: Features built-in XSS protection, backend authentication, and brute-force prevention.
- 🧪 **Comprehensive Test Coverage**: Ensures the stability of core features using Vitest and Testing Library.

### 🛠️ Tech Stack

| Category            | Technologies                                                 |
| ------------------- | ------------------------------------------------------------ |
| **Frontend**        | `React 18.3` `React Router 6` `Tailwind CSS 3.4` `Vite`        |
| **Backend & Cloud** | `Vercel Serverless` `Vercel KV (Redis)` `Vercel Blob Storage`  |
| **Dev & Testing**   | `Vitest` `React Testing Library` `ESLint` `Prettier` `jsdom`   |
| **Security & Misc** | `jsonwebtoken` `DOMPurify` `isomorphic-dompurify` `qrcode`     |

### 🚀 Quick Start

#### Prerequisites
- Node.js (v16 or higher)
- npm / yarn / pnpm
- Git

#### Installation and Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/benson-code/RentRipple.git
    cd RentRipple
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    
    Create a `.env.local` file by copying `.env.example` (if it exists) and fill in the following variables:

| Variable                  | Description                                |
| ------------------------- | ------------------------------------------ |
| `VITE_ADMIN_PASSWORD`     | Admin login password (for frontend)        |
| `ADMIN_PASSWORD`          | Admin login password (for backend API auth)|
| `KV_REST_API_URL`         | API URL for your Vercel KV database        |
| `KV_REST_API_TOKEN`       | Token for your Vercel KV database          |
| `BLOB_READ_WRITE_TOKEN`   | Token for your Vercel Blob Storage         |


4.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### 🧪 Testing and Quality Assurance

This project is committed to high-quality code and comes with a complete testing and linting workflow.

- **Run Unit Tests**:
  ```bash
  npm test 
  ```
- **View Test Coverage**:
  ```bash
  npm run test:coverage
  ```
- **Lint Your Code**:
  ```bash
  npm run lint
  ```
- **Auto-fix and Format**:
  ```bash
  npm run format
  ```

### 🚀 Deployment

#### Deploying to Vercel (Recommended)
1.  **Connect your GitHub repository** to your Vercel account.
2.  **Configure the environment variables** listed above in your Vercel project settings.
3.  Vercel will automatically deploy the project upon each `git push` to the main branch.

#### Manual Deployment
```bash
# Install the Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### 🤝 Contributing
Contributions are welcome! Please fork the repository and open a pull request with your changes.

### 📄 License
This project is licensed under the MIT License.
