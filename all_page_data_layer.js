<script>

(function() {
  window.dataLayer = window.dataLayer || [];

  // Allowlist event নাম
  var allowedEvents = ["begin_checkout", "add_to_cart", "purchase", "view_cart", "view_item"];

  function updateVars(dlObject) {
    if (!dlObject || !dlObject.event) return;

    // শুধুমাত্র allowed event হলে কাজ করবে
    if (allowedEvents.indexOf(dlObject.event) === -1) {
      return;
    }

    var ecommerce = dlObject.ecommerce || {};

    // --- Value detect ---
    var calcValue = null;
    if (ecommerce.value !== undefined && ecommerce.value !== null) {
      calcValue = ecommerce.value;
    } else if (Object.prototype.toString.call(ecommerce.items) === "[object Array]") {
      calcValue = 0;
      for (var i = 0; i < ecommerce.items.length; i++) {
        var it = ecommerce.items[i];
        var price = parseFloat(it.price) || 0;
        var qty   = it.quantity ? parseInt(it.quantity, 10) : 1;
        calcValue += price * qty;
      }
    }

    // --- Update variables ---
    if (calcValue) window._dl_value = calcValue;
    if (ecommerce.currency) window._dl_currency = ecommerce.currency;
    if (ecommerce.transaction_id) window._capi_transaction_id = ecommerce.transaction_id;
    if (ecommerce.items && ecommerce.items.length > 0) {
      window._dl_items = ecommerce.items;
    }
    window._dl_event = dlObject.event;

    // Console log (filtered data only)
    console.log("📢 Updated dataLayer variables (filtered):", {
      _dl_event: window._dl_event,
      _dl_currency: window._dl_currency,
      _dl_value: window._dl_value,
      _dl_items: window._dl_items
    });
  }

  // প্রথমে dataLayer এ থাকা পুরানো অবজেক্ট গুলো পড়া
  for (var j = 0; j < window.dataLayer.length; j++) {
    if (typeof window.dataLayer[j] === "object") updateVars(window.dataLayer[j]);
  }

  // পরবর্তীতে নতুন push হলে শুনবে
  var originalPush = window.dataLayer.push;
  window.dataLayer.push = function() {
    var args = Array.prototype.slice.call(arguments);
    for (var k = 0; k < args.length; k++) {
      if (typeof args[k] === "object") updateVars(args[k]);
    }
    return originalPush.apply(window.dataLayer, args);
  };
})();

  var capi_cat1 = window._dl_items.map(function(it){ return it.item_category; })
  var capi_cat = window._dl_items.map(function(it){ return it.item_category;  }).join(", ")
  var capi_item_name = window._dl_items.map(function(it){ return it.item_name;  }).join(", ");
  var capi_id = window._dl_items.map(function(it){ return Number(it.item_id); }).join(", ");
  var capi_sku = window._dl_items.map(function(it){ return Number(it.sku); }).join(", ");
  var capi_quantity = window._dl_items.map(function(it){ return Number(it.quantity); }).join(", ");
  var capi_stocklevel = window._dl_items.map(function(it){ return it.stocklevel;  }).join(", ");
  var capi_stockstatus = window._dl_items.map(function(it){ return it.stocklevel;  }).join(", ");
  var capi_google_business_vertical = window._dl_items.map(function(it){ return it.google_business_vertical;  }).join(", ");
  var capi_value = window._dl_value ;
  var capi_transaction_id = window._dl_value ;
  var capi_currency = window._dl_currency ;
  var capi_order_id = window._capi_transaction_id ;
  
  

  
</script>
