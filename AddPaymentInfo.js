<script>
  
function PurchaseTracker() {
    this.api = 'https://capi9.pimainba.com/api/collect.php';
}

PurchaseTracker.prototype.trackPurchase = function(eventData) {
    eventData = eventData || {};

    // Generate stronger unique event ID (ES5-compatible)
    function generateEventId() {
        var array = new Uint32Array(4);
        crypto.getRandomValues(array);
        var arrStr = [];
        for (var i = 0; i < array.length; i++) { arrStr.push(array[i]); }
        return 'evt_' + arrStr.join('_') + '_' + Date.now();
       // return 'evt_' + arrStr.join('_') + '_' + Date.now();
    }

    // Helper function to get cookie value
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Helper function to get URL parameter
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Auto-detect Facebook parameters
    function getFacebookParameters() {
        return {
            // Facebook Click ID (from cookie or URL parameter)
            fbc: getCookie('_fbc') || getUrlParameter('fbclid'),
            
            // Facebook Browser ID (from cookie)
            fbp: getCookie('_fbp'),
            
            // Subscription ID (from URL parameter)
            subscription_id: getUrlParameter('subscription_id'),
            
            // Lead ID (from URL parameter)
            lead_id: getUrlParameter('lead_id'),
            
            // Page ID (from URL parameter)
            page_id: getUrlParameter('page_id'),
            
            // Page scoped user ID (from URL parameter)
            page_scoped_user_id: getUrlParameter('page_scoped_user_id'),
            
            // Click to WhatsApp ID (from URL parameter)
            ctwa_clid: getUrlParameter('ctwa_clid'),
            
            // Instagram account ID (from URL parameter)
            ig_account_id: getUrlParameter('ig_account_id'),
            
            // Click to Instagram ID (from URL parameter)
            ig_sid: getUrlParameter('ig_sid'),
            
            // Facebook Login ID (from URL parameter)
            fb_login_id: getUrlParameter('fb_login_id'),
            
            // Install ID (for app events)
            anon_id: getUrlParameter('anon_id'),
            
            // Mobile Advertiser ID (for app events)
            madid: getUrlParameter('madid')
        };
    }

    var eventId = generateEventId();

    // Get auto-detected Facebook parameters
    var facebookParams = getFacebookParameters();

    // Merge user data and event data, include event_id as top-level
    var payload = {
        event_id: eventId, // top-level for server recognition
        event_name: 'Purchase100',
        timestamp: new Date().toISOString(),
        user_data: { 
            user_agent: navigator.userAgent,
            
            // Add all Facebook tracking parameters
            fbc: facebookParams.fbc,
            fbp: facebookParams.fbp,
            subscription_id: facebookParams.subscription_id,
            lead_id: facebookParams.lead_id,
            page_id: facebookParams.page_id,
            page_scoped_user_id: facebookParams.page_scoped_user_id,
            ctwa_clid: facebookParams.ctwa_clid,
            ig_account_id: facebookParams.ig_account_id,
            ig_sid: facebookParams.ig_sid,
            fb_login_id: facebookParams.fb_login_id,
            anon_id: facebookParams.anon_id,
            madid: facebookParams.madid
        },
        event_data: {}
    };

    // Manually copy fields from eventData
    for (var key in eventData) {
        if (eventData.hasOwnProperty(key)) {
            payload.event_data[key] = eventData[key];
        }
    }

    if (!payload.event_data.order_id) {
        payload.event_data.order_id = 'order_' + Date.now();
    }

    console.log('📤 Sending Purchase Event:', payload);

    return fetch(this.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(d) { console.log('✅ API Response:', d); })
    .catch(function(e) { console.error('❌ API Error:', e); });
};

// Global access
window.purchaseTracker = new PurchaseTracker();

// Demo usage with all parameters
window.purchaseTracker.trackPurchase({
  value: window.capi_value,
  currency: window._dl_currency,
  content_ids: window.capi_id,
  contents: window.item_name,
  item_category: window.capi_cat
});

</script>
