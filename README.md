# 🛒 Cloud Core Shop

A modern and minimal e-commerce frontend built with **React**, **Redux Toolkit**, and **Tailwind CSS**, supporting cart management and dynamic order placement via a live backend API.

---

## 🌐 Live Preview

**🔗 [View Live](https://cloud-shop-olive.vercel.app)**
*(Replace with your deployed URL if available)*

---

## 🚀 Features

* Product listing with real-time data from API
* Product detail view with quantity selector
* Cart system using Redux Toolkit
* Order placement via API:
  `https://admin.refabry.com/api/public/order/create`
* Validations for customer details before checkout
* Toast notifications for success/warning states
* Courier-specific delivery charge handling
* Persistent navigation with cart access

---

## 🧰 Tech Stack

* **React** – Component-based frontend library
* **Redux Toolkit** – Global state management
* **Tailwind CSS** – Utility-first styling
* **React Router** – Client-side routing
* **Axios** – HTTP client for API requests
* **React Hot Toast** – Lightweight toast notifications

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nasif28/CloudShop.git
   cd refabry-shop
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

---

## ✅ API Reference

Order Placement Endpoint:

```
POST https://admin.refabry.com/api/public/order/create
```

Payload format:

```json
{
  "product_ids": "1,2",
  "s_product_qty": "2,1",
  "c_phone": "01734252112",
  "c_name": "test",
  "courier": "steadfast",
  "address": "Mirpur 12",
  "advance": null,
  "cod_amount": "1250",
  "discount_amount": null,
  "delivery_charge": "70"
}
```

