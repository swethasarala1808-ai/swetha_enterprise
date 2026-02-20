app_name = "swetha_enterprise"
app_title = "Swetha Enterprise"
app_publisher = "Swetha"
app_description = "Custom Theme"
app_email = "swethasarala1808@gmail.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "swetha_enterprise",
# 		"logo": "/assets/swetha_enterprise/logo.png",
# 		"title": "Swetha Enterprise",
# 		"route": "/swetha_enterprise",
# 		"has_permission": "swetha_enterprise.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/swetha_enterprise/css/swetha_enterprise.css"
# app_include_js = "/assets/swetha_enterprise/js/swetha_enterprise.js"

# include js, css files in header of web template
# web_include_css = "/assets/swetha_enterprise/css/swetha_enterprise.css"
# web_include_js = "/assets/swetha_enterprise/js/swetha_enterprise.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "swetha_enterprise/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "swetha_enterprise/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "swetha_enterprise.utils.jinja_methods",
# 	"filters": "swetha_enterprise.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "swetha_enterprise.install.before_install"
# after_install = "swetha_enterprise.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "swetha_enterprise.uninstall.before_uninstall"
# after_uninstall = "swetha_enterprise.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "swetha_enterprise.utils.before_app_install"
# after_app_install = "swetha_enterprise.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "swetha_enterprise.utils.before_app_uninstall"
# after_app_uninstall = "swetha_enterprise.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "swetha_enterprise.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"swetha_enterprise.tasks.all"
# 	],
# 	"daily": [
# 		"swetha_enterprise.tasks.daily"
# 	],
# 	"hourly": [
# 		"swetha_enterprise.tasks.hourly"
# 	],
# 	"weekly": [
# 		"swetha_enterprise.tasks.weekly"
# 	],
# 	"monthly": [
# 		"swetha_enterprise.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "swetha_enterprise.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "swetha_enterprise.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "swetha_enterprise.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["swetha_enterprise.utils.before_request"]
# after_request = ["swetha_enterprise.utils.after_request"]

# Job Events
# ----------
# before_job = ["swetha_enterprise.utils.before_job"]
# after_job = ["swetha_enterprise.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"swetha_enterprise.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

# Translation
# ------------
# List of apps whose translatable strings should be excluded from this app's translations.
# ignore_translatable_strings_from = []

