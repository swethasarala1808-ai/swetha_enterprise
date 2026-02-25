from . import __version__ as app_version

app_name = "swetha_enterprise"
app_title = "Swetha Enterprise"
app_publisher = "Swetha"
app_description = "Professional Custom Theme and Role-Based Dashboards for ERPNext"
app_email = "swethasarala1808@gmail.com"
app_license = "MIT"

# Include CSS and JS on all pages
app_include_css = [
    "/assets/swetha_enterprise/css/theme.css",
    "/assets/swetha_enterprise/css/dashboard.css"
]

app_include_js = [
    "/assets/swetha_enterprise/js/dashboard.js"
]

# Include in web pages
web_include_css = []
web_include_js = []

# Home pages
role_home_page = {
    "Administrator": "role_dashboard",
    "System Manager": "role_dashboard",
    "HR Manager": "role_dashboard",
    "HR User": "role_dashboard",
    "Sales Manager": "role_dashboard",
    "Sales User": "role_dashboard",
    "Purchase Manager": "role_dashboard",
    "Purchase User": "role_dashboard",
    "Healthcare Practitioner": "role_dashboard",
    "Physician": "role_dashboard",
    "Nurse": "role_dashboard",
}

# Default homepage for all users
default_homepage = "role_dashboard"
