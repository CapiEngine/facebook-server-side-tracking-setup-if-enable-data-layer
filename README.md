# CapiEngine
# facebook-server-side-tracking-setup-if-enable-data-layer

# Event Collection API Documentation

This document explains how to use the Event Collection API.  
The process is always the same for all events — only the **domain** needs to be changed.

---

## 🔗 Base URL

- Replace `<your-domain>` with your own domain.  
- Example:
  - `https://capi9.pimainba.com/api/collect.php`
  - `https://capi10.yourdomain.com/api/collect.php`

---

## 📌 Events
All events follow the same request format.  
You only need to update the `event` name depending on what you want to track.

### Common events include:
- `page_view`
- `view_item`
- `add_to_cart`
- `purchase`
- `sign_up`
- `login`
- `search`

---

## ⚡ Domain Change
The only change required is the **domain**.  
For example:  
- From `https://capi9.pimainba.com/api/collect.php`  
- To `https://capi10.yourdomain.com/api/collect.php`  

Everything else remains the same.

---

## ✅ Summary
- The API endpoint always ends with `/api/collect.php`.
- Only the domain should be replaced.
- The event structure remains identical for all events.
- By changing the `event` parameter, you can track different actions.

## 📌 Events (সব event এর জন্য format একই)

API তে event পাঠানোর জন্য নিচের মতো request পাঠাতে হবে।  

### Example Request

# Data-layer-setup

## DataLayer to Variable Mapping

| DataLayer Field              | Variable Name                   | Example Usage                         |
|-------------------------------|---------------------------------|---------------------------------------|
| `item_category`              | `capi_cat1` / `capi_cat`        | Use `capi_cat` if you need comma-separated list |
| `item_name`                  | `capi_item_name`                | Use `capi_item_name` if you need comma-separated list |
| `item_id`                    | `capi_id`                       | Returns numeric IDs, comma-separated  |
| `sku`                        | `capi_sku`                      | Returns numeric SKUs, comma-separated |
| `quantity`                   | `capi_quantity`                 | Returns numeric quantity, comma-separated |
| `transaction_id`             | `capi_order_id`                 | Returns numeric quantity, comma-separated |
| `stocklevel`                 | `capi_stocklevel`               | Returns stock level values            |
| `stockstatus` (same source)  | `capi_stockstatus`              | Returns stock status values           |
| `google_business_vertical`   | `capi_google_business_vertical` | Returns Google Business Vertical(s)   |
| `value`                      | `capi_value`                    | Returns total value                   |
| `currency`                   | `capi_currency`                 | Returns currency (e.g. `USD`, `BDT`)  |


## Requirements for `all_page_data_layer.js`

To make sure the `all_page_data_layer.js` file works correctly on **all pages** and the **dataLayer is always enabled**, follow these requirements:

1. **Always define dataLayer globally**  
   At the very beginning of `all_page_data_layer.js`


## Step 2: Setup in <head> (Direct Include) `all_page_data_layer.js`
<head>
<script src="/js/all_page_data_layer.js"></script>
</head>


