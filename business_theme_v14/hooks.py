from . import __version__ as app_version
import time

app_name = "business_theme_v14"
app_title = "Business Theme V14"
app_publisher = "Midocean Technologies Pvt Ltd"
app_description = "Business Theme for ERPNext / Frappe"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "sagar@midocean.tech"
app_license = "MIT"

# -----------------------------
# Version (auto timestamp)
# -----------------------------
app_version = str(int(time.time()))

# -----------------------------
# Include JS and CSS
# -----------------------------

app_include_js = [
    "/assets/business_theme_v14/js/Horizontal.js"
]

app_include_css = [
    f"/assets/business_theme_v14/css/custom_theme.css?v={app_version}"
]

# -----------------------------
# Website context
# -----------------------------
website_context = {
    "favicon": "/assets/business_theme_v14/images/favicon.png",
}

# -----------------------------
# (Optional) Other Hooks
# -----------------------------

# None for now — can be extended later
