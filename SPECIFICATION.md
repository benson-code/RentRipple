# 📘 RentRipple Specification Document / 規格說明書

## 🌏 繁體中文規格 (Chinese Specification)

### 1. 系統架構 (System Architecture)

RentRipple 採用現代化的無伺服器 (Serverless) 架構，確保高可用性與低維護成本。

```mermaid
graph TD
    User[使用者 Client] --> |HTTPS| CDN[Vercel Edge Network]
    CDN --> |Static Assets| Frontend[React Frontend]
    CDN --> |API Requests| API[Serverless Functions]
    
    subgraph Backend Services
        API --> |Read/Write| KV[Vercel KV (Redis)]
        API --> |Upload/Serve| Blob[Vercel Blob Storage]
    end
    
    Frontend --> |Direct Display| Blob
```

#### 核心組件
- **前端 (Frontend)**: React 18 Single Page Application (SPA)，使用 Vite 構建。
- **後端 (Backend)**: Vercel Serverless Functions (Node.js)，處理 API 請求。
- **資料庫 (Database)**: Vercel KV (基於 Upstash Redis)，儲存 JSON 格式的物業資料。
- **儲存 (Storage)**: Vercel Blob，用於儲存高解析度物業圖片。

### 2. 資料模型 (Data Model)

系統主要維護一個核心的 `Property` 物件，儲存於 Redis 的 `property` 鍵值中。

#### Property Object Structure
```json
{
  "title": "String (標題)",
  "address": "String (地址)",
  "price": "Number (價格)",
  "currency": "String (貨幣符號, e.g., '฿')",
  "priceUnit": "String (價格單位, e.g., 'month')",
  "beds": "Number (臥室數)",
  "baths": "Number (衛浴數)",
  "kitchens": "Number (廚房數)",
  "sqft": "Number (坪數/面積)",
  "qrCodeUrl": "String (Line QR Code 連結)",
  "buildingName": "String (建物名稱)",
  "description": {
    "roomInfo": "String (房間描述)",
    "location": "String (位置描述)",
    "highlights": "Array<String> (亮點列表)"
  },
  "amenities": [
    { "icon": "String (Material Icon Name)", "name": "String (設施名稱)" }
  ],
  "locationFeatures": "Array<String> (周邊特色列表)",
  "leaseTerms": "Array<String> (租賃條款列表)",
  "images": [
    {
      "id": "String (圖片ID)",
      "name": "String (圖片名稱)",
      "url": "String (圖片URL)"
    }
  ]
}
```

### 3. API 規格 (API Specification)

所有 API 位於 `/api` 路徑下，支援 CORS 與基本安全防護。

#### 3.1 物業管理 (Property Management)
**Endpoint**: `/api/property`

| Method | 描述 | Request Body | Response |
|--------|------|--------------|----------|
| `GET`  | 獲取物業資料 | 無 | `200 OK`: Property Object |
| `POST` | 更新物業資料 | Property Object | `200 OK`: `{ message, property }` |
| `PUT`  | 更新物業資料 | Property Object | `200 OK`: `{ message, property }` |
| `DELETE`| 重置為預設值 | 無 | `200 OK`: `{ message, property }` |

**驗證規則**:
- `title` 和 `price` 為必填欄位。
- `price` 必須為非負數值。
- 所有輸入欄位皆經過 `DOMPurify` 清理以防止 XSS。

#### 3.2 管理員認證 (Admin Authentication)
**Endpoint**: `/api/auth`

| Method | 描述 | Request Body | Response |
|--------|------|--------------|----------|
| `POST` | 驗證管理員密碼 | `{ "password": "..." }` | `200 OK`: `{ success: true, token }` |

**安全性**:
- 使用環境變數 `ADMIN_PASSWORD` 進行比對。
- 實作延遲回應 (Delay) 以防止暴力破解。
- 簡單 Token 機制 (建議生產環境升級為 JWT)。

### 4. 前端設計系統 (Frontend Design System)

採用 iOS 風格設計語言，強調流暢的互動與視覺層次。

- **色彩系統**:
  - Primary Blue: `#007AFF` (iOS 標準藍)
  - Background: `#000000` (純黑背景)
  - Secondary Background: `#1C1C1E` (卡片背景)
- **字體**:
  - 優先使用 Apple 系統字體 (SF Pro Display/Text)。
- **互動**:
  - 支援觸控滑動 (Swipe) 的圖片輪播。
  - 具有慣性的滾動效果。
  - 按鈕點擊的微互動 (Scale effect)。

---

## 🌍 English Specification

### 1. System Architecture

RentRipple utilizes a modern Serverless architecture to ensure high availability and low maintenance costs.

#### Core Components
- **Frontend**: React 18 Single Page Application (SPA), built with Vite.
- **Backend**: Vercel Serverless Functions (Node.js) handling API requests.
- **Database**: Vercel KV (powered by Upstash Redis) storing property data in JSON format.
- **Storage**: Vercel Blob for hosting high-resolution property images.

### 2. Data Model

The system maintains a core `Property` object, stored under the `property` key in Redis.

*(Refer to the JSON structure in the Chinese section above, as the schema is identical)*

### 3. API Specification

All APIs are located under the `/api` path, supporting CORS and basic security protections.

#### 3.1 Property Management
**Endpoint**: `/api/property`

| Method | Description | Request Body | Response |
|--------|-------------|--------------|----------|
| `GET`  | Fetch property data | None | `200 OK`: Property Object |
| `POST` | Update property data | Property Object | `200 OK`: `{ message, property }` |
| `PUT`  | Update property data | Property Object | `200 OK`: `{ message, property }` |
| `DELETE`| Reset to default | None | `200 OK`: `{ message, property }` |

**Validation Rules**:
- `title` and `price` are required fields.
- `price` must be a non-negative number.
- All input fields are sanitized via `DOMPurify` to prevent XSS.

#### 3.2 Admin Authentication
**Endpoint**: `/api/auth`

| Method | Description | Request Body | Response |
|--------|-------------|--------------|----------|
| `POST` | Verify admin password | `{ "password": "..." }` | `200 OK`: `{ success: true, token }` |

**Security**:
- Compares against `ADMIN_PASSWORD` environment variable.
- Implements response delay to mitigate brute-force attacks.
- Simple Token mechanism (JWT recommended for production).

### 4. Frontend Design System

Adopts iOS-style design language, emphasizing fluid interactions and visual hierarchy.

- **Color System**:
  - Primary Blue: `#007AFF` (Standard iOS Blue)
  - Background: `#000000` (Pure Black)
  - Secondary Background: `#1C1C1E` (Card Background)
- **Typography**:
  - Prioritizes Apple system fonts (SF Pro Display/Text).
- **Interactions**:
  - Touch-enabled swipe for image carousel.
  - Momentum scrolling.
  - Micro-interactions on button clicks (Scale effect).
