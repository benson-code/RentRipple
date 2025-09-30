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

- **前端**: React 18 + Hooks
- **路由**: React Router Dom
- **樣式**: Tailwind CSS + iOS 風格設計
- **構建工具**: Vite
- **資料庫**: Vercel KV (Redis)
- **檔案儲存**: Vercel Blob Storage
- **部署**: Vercel Platform

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
KV_REST_API_URL=your-redis-url
KV_REST_API_TOKEN=your-redis-token
BLOB_READ_WRITE_TOKEN=your-blob-token
```

4. **啟動開發伺服器**
```bash
npm run dev
```

5. **開啟瀏覽器**
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
│   ├── PropertyShowcase.jsx    # 物業展示
│   ├── ImageCarousel.jsx       # 圖片輪播
│   ├── PropertyDetails.jsx     # 物業詳情
│   ├── ContactFooter.jsx       # 聯絡區塊
│   ├── AdminLogin.jsx          # 管理員登入
│   └── QRCodePage.jsx          # QR Code 頁面
├── admin/               # 管理面板
│   └── AdminPanel.jsx          # 管理介面
├── data/                # 預設資料
│   └── propertyData.js         # 物業資料
├── utils/               # 工具函數
│   └── propertyAPI.js          # API 介面
├── App.jsx              # 主應用程式
├── main.jsx             # React 入口點
└── index.css            # 全域樣式
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

- 環境變數保護敏感資訊
- 管理員登入驗證
- 檔案上傳安全檢查
- HTTPS 強制加密傳輸

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

- **Frontend**: React 18 + Hooks
- **Routing**: React Router Dom
- **Styling**: Tailwind CSS + iOS Design System
- **Build Tool**: Vite
- **Database**: Vercel KV (Redis)
- **File Storage**: Vercel Blob Storage
- **Deployment**: Vercel Platform

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
KV_REST_API_URL=your-redis-url
KV_REST_API_TOKEN=your-redis-token
BLOB_READ_WRITE_TOKEN=your-blob-token
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
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
│   ├── PropertyShowcase.jsx    # Property showcase
│   ├── ImageCarousel.jsx       # Image carousel
│   ├── PropertyDetails.jsx     # Property details
│   ├── ContactFooter.jsx       # Contact section
│   ├── AdminLogin.jsx          # Admin login
│   └── QRCodePage.jsx          # QR Code page
├── admin/               # Admin panel
│   └── AdminPanel.jsx          # Management interface
├── data/                # Default data
│   └── propertyData.js         # Property data
├── utils/               # Utility functions
│   └── propertyAPI.js          # API interface
├── App.jsx              # Main application
├── main.jsx             # React entry point
└── index.css            # Global styles
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

- Environment variables protect sensitive information
- Admin login authentication
- File upload security checks
- HTTPS enforced encryption

### 🌐 Browser Support

- Safari (iOS/macOS)
- Chrome (Android/Desktop)
- Firefox
- Edge

### 📄 License

This project is open source and available under the MIT License.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📞 Support

For support and inquiries, please contact: [Your Contact Information]

---

**Built with ❤️ for Bangkok's MRT property market**