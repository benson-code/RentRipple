# 🔌 API Documentation / API 文件

*Bangkok MRT Property Platform - RentRipple*

**Version**: 1.0.0
**Base URL**: `https://bangkokmrt.vercel.app/api`
**Last Updated**: 2025-10-08

---

## 📑 Table of Contents

- [繁體中文](#繁體中文)
  - [認證](#認證)
  - [物業 API](#物業-api)
  - [圖片上傳 API](#圖片上傳-api)
- [English](#english)
  - [Authentication](#authentication)
  - [Property API](#property-api)
  - [Image Upload API](#image-upload-api)

---

## 🌏 繁體中文

### 認證

#### 登入

**端點**: `POST /api/auth/login`

**請求主體**:
```json
{
  "password": "your-admin-password"
}
```

**成功響應** (200 OK):
```json
{
  "success": true,
  "message": "Login successful"
}
```

---

### 物業 API

#### 獲取物業資料

**端點**: `GET /api/property`

**成功響應** (200 OK):
```json
{
  "title": "Cozy MRT Apartment",
  "price": 13000,
  "beds": 1,
  "images": [/*...*/]
}
```

---

## 🌍 English

### Authentication

**Endpoint**: `POST /api/auth/login`

### Property API

**Endpoint**: `GET /api/property`
