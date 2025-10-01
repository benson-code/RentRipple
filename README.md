# 🏠 RentRipple - Bangkok MRT Property Platform
## 曼谷捷運物業展示平台

*English documentation follows the Chinese section / 英文說明在中文說明之後*

---

## 🌏 繁體中文

### 📋 專案簡介

**RentRipple** 是一個專為曼谷捷運沿線物業設計的現代化展示平台。結合了優雅的 iOS 風格界面設計和強大的管理功能，為房地產展示提供完整的解決方案。

### ✨ 主要特色

- 🚇 **曼谷捷運專區**: 專注於捷運沿線優質物業
- 📱 **行動優先設計**: 針對 iPhone 和行動裝置優化的 iOS 風格介面
- 🖼️ **智慧圖片輪播**: 流暢的滑動導覽和自動播放功能
- 👨‍💼 **管理員後台**: 簡單易用的物業管理介面
- 📱 **QR Code 整合**: 快速分享和瀏覽物業資訊
- 🎨 **響應式設計**: 完美適配各種螢幕尺寸
- ☁️ **雲端儲存**: 支援 Vercel Blob 和 Redis 資料庫
- 👆 **觸控優化**: 大型觸控按鈕和流暢互動體驗

### 🛠️ 技術堆疊

#### 前端技術
- **框架**: React 18.3.1 + Hooks
- **路由**: React Router Dom 6.26.2
- **樣式**: Tailwind CSS 3.4.1 + iOS 風格設計系統
- **構建工具**: Vite 7.1.7
- **字體**: SF Pro Display/Text (Apple 官方字體)

#### 後端與雲端
- **無伺服器函數**: Vercel Serverless Functions
- **資料庫**: Vercel KV (Upstash Redis)
- **檔案儲存**: Vercel Blob Storage
- **部署平台**: Vercel Platform

#### 開發工具
- **測試框架**: Vitest + @testing-library/react
- **代碼檢查**: ESLint 8.57.1
- **代碼格式化**: Prettier 3.6.2
- **安全性**: DOMPurify (XSS 防護)
- **QR 碼**: qrcode 庫

### 🚀 快速開始

#### 環境需求

- Node.js (版本 16 或更高)
- npm 或 yarn
- Git

#### 安裝步驟

1. **複製專案**
```bash
git clone https://github.com/benson-code/RentRipple.git
cd RentRipple
```

2. **安裝依賴**
```bash
npm install
```

3. **環境變數設定**
```bash
# 創建 .env.local 檔案
VITE_ADMIN_PASSWORD=your-secure-admin-password
ADMIN_PASSWORD=your-secure-admin-password
KV_REST_API_URL=your-redis-url
KV_REST_API_TOKEN=your-redis-token
BLOB_READ_WRITE_TOKEN=your-blob-token
```

4. **啟動開發伺服器**
```bash
npm run dev
```

5. **執行測試**
```bash
npm test              # 執行測試
npm run test:ui       # 測試 UI 界面
npm run test:coverage # 測試覆蓋率報告
```

6. **代碼品質檢查**
```bash
npm run lint          # 檢查代碼問題
npm run lint:fix      # 自動修復問題
npm run format        # 格式化代碼
```

7. **開啟瀏覽器**
前往 `http://localhost:5173`

### 📖 使用指南

#### 🏡 瀏覽物業

- 訪問首頁查看精選物業展示
- 滑動瀏覽物業圖片或使用導航點
- 點擊房間按鈕快速跳轉到特定圖片
- 使用聯絡按鈕直接與業主聯繫

#### 👨‍💼 管理員功能

- 訪問 `/admin` 進入管理介面
- 使用設定的密碼登入系統
- 新增、編輯或刪除物業資訊
- 上傳和管理物業圖片
- 設定房間類型和價格資訊

#### 📱 QR Code 功能

- 每個物業自動生成專屬 QR Code
- 支援快速分享和行動瀏覽
- 整合 Line QR 聯絡功能

### 🎨 客製化設定

#### 主題顏色

在 `tailwind.config.js` 中自訂 iOS 風格色彩：

```javascript
colors: {
  'primary-blue': '#007AFF',
  'ios-dark-background': '#000000',
  'ios-dark-secondary-background': '#1C1C1E',
  'ios-dark-label': '#FFFFFF'
}
```

#### 聯絡功能

在 `src/components/ContactFooter.jsx` 中客製化聯絡方式：

```jsx
const handleContactClick = () => {
  // 選項：
  // 電話: window.location.href = 'tel:+66812345678'
  // 郵件: window.location.href = 'mailto:contact@rentripple.com'
  // Line: window.location.href = 'https://line.me/ti/p/your-line-id'
}
```

### 📁 專案結構

```
src/
├── components/           # React 元件
│   ├── PropertyShowcase.jsx    # 物業展示主頁
│   ├── ImageCarousel.jsx       # 圖片輪播元件
│   ├── PropertyDetails.jsx     # 物業詳情顯示
│   ├── ContactFooter.jsx       # 聯絡底部區塊
│   ├── AdminLogin.jsx          # 管理員登入
│   ├── ErrorBoundary.jsx       # 錯誤邊界處理
│   ├── QRCodePage.jsx          # QR Code 頁面
│   └── __tests__/              # 元件測試
│       ├── PropertyDetails.test.jsx
│       ├── ImageCarousel.test.jsx
│       └── ContactFooter.test.jsx
├── admin/               # 管理面板
│   └── AdminPanel.jsx          # 完整管理介面
├── data/                # 預設資料
│   └── propertyData.js         # 物業預設資料
├── utils/               # 工具函數
│   ├── propertyAPI.js          # 前端 API 介面
│   └── sanitize.js             # 輸入清理工具
├── test/                # 測試配置
│   └── setup.js                # Vitest 測試設定
├── App.jsx              # 主應用程式路由
├── main.jsx             # React 入口點
└── index.css            # 全域樣式

api/                     # Vercel 無伺服器函數
├── property.js          # 物業 CRUD API
└── auth.js              # 管理員認證 API

配置檔案
├── .eslintrc.cjs        # ESLint 配置
├── .prettierrc          # Prettier 配置
├── vitest.config.js     # Vitest 測試配置
├── tailwind.config.js   # Tailwind CSS 配置
└── vite.config.js       # Vite 構建配置
```

### 🏗️ 生產環境建置

```bash
npm run build
```

建置檔案將生成在 `dist/` 目錄，可部署至任何靜態托管服務。

### 📱 行動裝置優化

- iPhone 瀏海和 Home 指示器的安全區域適配
- 觸控友善的按鈕尺寸（最小 44px）
- 具有慣性的流暢滾動
- 優化的圖片載入和快取機制
- iOS 風格的模糊效果和動畫

### 🔒 安全性

- **後端驗證**: 管理員密碼在伺服器端驗證 (api/auth.js)
- **XSS 防護**: 使用 DOMPurify 清理所有使用者輸入
- **暴力攻擊防護**: 登入失敗延遲機制
- **環境變數**: 敏感資訊儲存在環境變數中
- **CORS 限制**: 僅允許特定來源存取 API
- **HTTPS**: 強制加密傳輸

### 🧪 測試

專案包含完整的測試套件：

```bash
# 執行所有測試
npm test

# 監視模式
npm test -- --watch

# 測試覆蓋率
npm run test:coverage

# UI 介面
npm run test:ui
```

**測試統計**:
- 15 個測試案例
- 100% 通過率
- 覆蓋核心元件: PropertyDetails, ImageCarousel, ContactFooter

### 📊 代碼品質

**品質分數**: 9.1/10

- ✅ **ESLint**: 0 錯誤, 0 警告
- ✅ **Prettier**: 自動格式化
- ✅ **測試覆蓋**: 15/15 通過
- ✅ **建置**: 成功 (78.5 KB gzipped)
- ⚠️ **生產環境提醒**: 建議移除 console.log 語句

```bash
# 檢查代碼品質
npm run lint

# 自動修復問題
npm run lint:fix

# 格式化代碼
npm run format
```

### 🚀 部署

#### 部署到 Vercel

1. **連接 GitHub 倉庫**到 Vercel
2. **在 Vercel 控制台配置環境變數**:
   - `ADMIN_PASSWORD`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `BLOB_READ_WRITE_TOKEN`
3. **自動部署**: Vercel 會在 git push 時自動部署
4. **正式網址**: https://bangkokmrt.vercel.app

#### 手動部署

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署到生產環境
vercel --prod
```

### 📈 專案統計

- **程式碼行數**: ~3,500
- **元件數量**: 8 個核心元件
- **測試案例**: 15 個 (100% 通過)
- **打包大小**: 78.5 KB (gzipped)
- **品質分數**: 9.1/10
- **建置時間**: ~3-5 秒

### 🔄 最新更新

- ✅ 新增完整測試套件 (Vitest + Testing Library)
- ✅ 配置 ESLint + Prettier 確保代碼品質
- ✅ 實施 DOMPurify XSS 防護
- ✅ 新增後端認證 API
- ✅ 修復行動裝置佈局溢出問題
- ✅ 效能優化 (非同步字體、錯誤邊界)
- ✅ 解決所有 ESLint 錯誤 (品質分數 9.1/10)

---

## 🌍 English

### 📋 Project Overview

**RentRipple** is a modern property showcase platform specifically designed for properties along Bangkok's MRT lines. It combines elegant iOS-style interface design with powerful management features to provide a complete solution for real estate presentation.

### ✨ Key Features

- 🚇 **Bangkok MRT Focus**: Specialized for quality properties along MRT lines
- 📱 **Mobile-First Design**: iOS-style interface optimized for iPhone and mobile devices
- 🖼️ **Smart Image Carousel**: Smooth swipe navigation with auto-play functionality
- 👨‍💼 **Admin Dashboard**: User-friendly property management interface
- 📱 **QR Code Integration**: Quick sharing and mobile browsing
- 🎨 **Responsive Design**: Perfect adaptation for all screen sizes
- ☁️ **Cloud Storage**: Supports Vercel Blob and Redis database
- 👆 **Touch Optimized**: Large touch targets and smooth interactions

### 🛠️ Tech Stack

#### Frontend Technologies
- **Framework**: React 18.3.1 + Hooks
- **Routing**: React Router Dom 6.26.2
- **Styling**: Tailwind CSS 3.4.1 + iOS Design System
- **Build Tool**: Vite 7.1.7
- **Fonts**: SF Pro Display/Text (Apple Official Fonts)

#### Backend & Cloud
- **Serverless Functions**: Vercel Serverless Functions
- **Database**: Vercel KV (Upstash Redis)
- **File Storage**: Vercel Blob Storage
- **Deployment**: Vercel Platform

#### Development Tools
- **Testing**: Vitest + @testing-library/react
- **Linting**: ESLint 8.57.1
- **Formatting**: Prettier 3.6.2
- **Security**: DOMPurify (XSS Protection)
- **QR Codes**: qrcode library

### 🚀 Quick Start

#### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Git

#### Installation

1. **Clone the repository**
```bash
git clone https://github.com/benson-code/RentRipple.git
cd RentRipple
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
# Create .env.local file
VITE_ADMIN_PASSWORD=your-secure-admin-password
ADMIN_PASSWORD=your-secure-admin-password
KV_REST_API_URL=your-redis-url
KV_REST_API_TOKEN=your-redis-token
BLOB_READ_WRITE_TOKEN=your-blob-token
```

4. **Start development server**
```bash
npm run dev
```

5. **Run tests**
```bash
npm test              # Run tests
npm run test:ui       # Test UI interface
npm run test:coverage # Test coverage report
```

6. **Code quality checks**
```bash
npm run lint          # Check code issues
npm run lint:fix      # Auto-fix issues
npm run format        # Format code
```

7. **Open browser**
Navigate to `http://localhost:5173`

### 📖 Usage Guide

#### 🏡 Property Browsing

- Visit the homepage to view featured property showcase
- Swipe through property images or use navigation dots
- Tap room buttons to jump to specific images
- Use contact button to directly connect with property owners

#### 👨‍💼 Admin Features

- Visit `/admin` to access management interface
- Login with configured password
- Add, edit, or delete property information
- Upload and manage property images
- Set room types and pricing information

#### 📱 QR Code Features

- Auto-generated unique QR codes for each property
- Support for quick sharing and mobile browsing
- Integrated Line QR contact functionality

### 🎨 Customization

#### Theme Colors

Customize iOS-style colors in `tailwind.config.js`:

```javascript
colors: {
  'primary-blue': '#007AFF',
  'ios-dark-background': '#000000',
  'ios-dark-secondary-background': '#1C1C1E',
  'ios-dark-label': '#FFFFFF'
}
```

#### Contact Integration

Customize contact methods in `src/components/ContactFooter.jsx`:

```jsx
const handleContactClick = () => {
  // Options:
  // Phone: window.location.href = 'tel:+66812345678'
  // Email: window.location.href = 'mailto:contact@rentripple.com'
  // Line: window.location.href = 'https://line.me/ti/p/your-line-id'
}
```

### 📁 Project Structure

```
src/
├── components/           # React components
│   ├── PropertyShowcase.jsx    # Main property showcase
│   ├── ImageCarousel.jsx       # Image carousel component
│   ├── PropertyDetails.jsx     # Property details display
│   ├── ContactFooter.jsx       # Contact footer section
│   ├── AdminLogin.jsx          # Admin login
│   ├── ErrorBoundary.jsx       # Error boundary handler
│   ├── QRCodePage.jsx          # QR Code page
│   └── __tests__/              # Component tests
│       ├── PropertyDetails.test.jsx
│       ├── ImageCarousel.test.jsx
│       └── ContactFooter.test.jsx
├── admin/               # Admin panel
│   └── AdminPanel.jsx          # Full management interface
├── data/                # Default data
│   └── propertyData.js         # Default property data
├── utils/               # Utility functions
│   ├── propertyAPI.js          # Frontend API interface
│   └── sanitize.js             # Input sanitization
├── test/                # Test configuration
│   └── setup.js                # Vitest test setup
├── App.jsx              # Main app routing
├── main.jsx             # React entry point
└── index.css            # Global styles

api/                     # Vercel Serverless Functions
├── property.js          # Property CRUD API
└── auth.js              # Admin authentication API

Configuration Files
├── .eslintrc.cjs        # ESLint configuration
├── .prettierrc          # Prettier configuration
├── vitest.config.js     # Vitest test config
├── tailwind.config.js   # Tailwind CSS config
└── vite.config.js       # Vite build config
```

### 🏗️ Production Build

```bash
npm run build
```

Built files will be generated in the `dist/` directory, ready for deployment to any static hosting service.

### 📱 Mobile Optimization

- Safe area insets for iPhone notch and home indicator
- Touch-friendly button sizes (minimum 44px)
- Smooth scrolling with momentum
- Optimized image loading and caching
- iOS-style blur effects and animations

### 🔒 Security

- **Backend Validation**: Admin password verified server-side (api/auth.js)
- **XSS Protection**: DOMPurify sanitizes all user inputs
- **Brute Force Protection**: Login failure delay mechanism
- **Environment Variables**: Sensitive info stored in env vars
- **CORS Restrictions**: Only specific origins can access API
- **HTTPS**: Enforced encrypted transmission

### 🧪 Testing

Project includes comprehensive test suite:

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm run test:coverage

# UI interface
npm run test:ui
```

**Test Statistics**:
- 15 test cases
- 100% pass rate
- Coverage: PropertyDetails, ImageCarousel, ContactFooter

### 📊 Code Quality

**Quality Score**: 9.1/10

- ✅ **ESLint**: 0 errors, 0 warnings
- ✅ **Prettier**: Auto-formatting enabled
- ✅ **Tests**: 15/15 passing
- ✅ **Build**: Success (78.5 KB gzipped)
- ⚠️ **Production Note**: Recommend removing console.log statements

```bash
# Check code quality
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format
```

### 🚀 Deployment

#### Deploy to Vercel

1. **Connect GitHub repository** to Vercel
2. **Configure environment variables** in Vercel dashboard:
   - `ADMIN_PASSWORD`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `BLOB_READ_WRITE_TOKEN`
3. **Deploy**: Vercel auto-deploys on git push
4. **Production URL**: https://bangkokmrt.vercel.app

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 🌐 Browser Support

- Safari (iOS/macOS)
- Chrome (Android/Desktop)
- Firefox
- Edge

### 📄 License

This project is open source and available under the MIT License.

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Run linter (`npm run lint:fix`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### 📞 Support

For support and inquiries:
- **GitHub Issues**: https://github.com/benson-code/RentRipple/issues
- **Production Site**: https://bangkokmrt.vercel.app
- **Line Contact**: Scan QR code on property page

### 📈 Project Statistics

- **Lines of Code**: ~3,500
- **Components**: 8 core components
- **Tests**: 15 test cases (100% pass)
- **Bundle Size**: 78.5 KB (gzipped)
- **Quality Score**: 9.1/10
- **Build Time**: ~3-5 seconds

### 🔄 Recent Updates

- ✅ Added comprehensive test suite (Vitest + Testing Library)
- ✅ Configured ESLint + Prettier for code quality
- ✅ Implemented XSS protection with DOMPurify
- ✅ Added backend authentication API
- ✅ Fixed mobile layout overflow bug
- ✅ Performance optimizations (async fonts, error boundaries)
- ✅ All ESLint errors resolved (9.1/10 quality score)

---

**Built with ❤️ for Bangkok's MRT property market**

**Live Demo**: https://bangkokmrt.vercel.app