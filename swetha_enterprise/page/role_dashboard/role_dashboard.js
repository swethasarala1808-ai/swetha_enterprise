frappe.pages['role_dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Swetha Enterprise Portal',
		single_column: true
	});

	frappe.require([
		'/assets/swetha_enterprise/css/theme.css',
		'/assets/swetha_enterprise/css/dashboard.css',
		'/assets/swetha_enterprise/js/dashboard.js'
	], function() {
		new SwethaDashboard(wrapper);
	});
};
