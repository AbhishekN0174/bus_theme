from . import __version__ as app_version
import time

app_name = "business_theme_v14"
app_title = "Business Theme V14"
app_publisher = "Midocean Technologies Pvt Ltd"
app_description = "Business Theme for ERPNext / Frappe"
app_email = "sagar@midocean.tech"
app_license = "MIT"

# Include files
app_include_js = ["/assets/business_theme_v14/js/Horizontal.js"]
app_include_css = [f"/assets/business_theme_v14/css/custom_theme.css?v={int(time.time())}"]

# Whitelisted methods
override_whitelisted_methods = {
    "business_theme_v14.api.chatbot_ai.get_reply": "business_theme_v14.api.chatbot_ai.get_reply"
}
