# CapiEngine
# facebook-server-side-tracking-setup-if-enable-data-layer


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


