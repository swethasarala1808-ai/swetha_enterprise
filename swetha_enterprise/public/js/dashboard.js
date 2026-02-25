// SWETHA ENTERPRISE - TOTAL UI HIJACK ENGINE
// This script ensures the user is ALWAYS in the Boutique Lobby unless they click "Desk"

class SwethaDashboard {
  constructor(wrapper) {
    this.wrapper = $(wrapper).find('.page-container');
    if (this.wrapper.length === 0) this.wrapper = $('.page-container'); // Fallback

    this.state = { practitioner: null };
    this.init();
  }

  async init() {
    // 1. Force Boutique Mode ON
    document.body.setAttribute('data-boutique-mode', 'true');

    // 2. Hide standard Desk UI immediately
    $('.navbar, .desk-sidebar, .layout-side-section, .page-head').hide();

    // 3. Check for Healthcare Practitioner profile
    await this.run_discovery();

    // 4. Render the Lobby
    this.render_lobby();
  }

  async run_discovery() {
    try {
      const res = await this.callApi('Healthcare Practitioner', {
        filters: [['user_id', '=', frappe.session.user]],
        fields: ['name', 'practitioner_name', 'department']
      });
      if (res?.length) {
        this.state.practitioner = res[0];
      }
    } catch (e) {
      console.warn("HC Discovery failed", e);
    }
  }

  async callApi(resource, params = {}) {
    return new Promise((resolve, reject) => {
      let args = {
        doctype: resource,
        filters: params.filters || [],
        fields: params.fields || ['name'],
        limit_page_length: params.limit || 100,
        order_by: params.order_by || 'creation desc'
      };
      frappe.call({
        method: 'frappe.client.get_list',
        args: args,
        callback: (r) => r.message ? resolve(r.message) : resolve([]),
        error: (e) => reject(e)
      });
    });
  }

  render_lobby() {
    const apps = [
      { name: 'Selling', icon: '🛒', desc: 'Shop & Marketplace' },
      { name: 'Accounting', icon: '💰', desc: 'Finance & Payments' },
      { name: 'Stock', icon: '📦', desc: 'Warehouse & Items' },
      { name: 'HR', icon: '👔', desc: 'Internal Personnel' },
      { name: 'Healthcare', icon: '🏥', desc: 'Patient Care' }
    ];

    const grid = apps.map(app => `
      <div class="se-app-card" onclick="window.swetha_instance.handle_app_click('${app.name}')">
        <div class="ico">${app.icon}</div>
        <div style="font-family:'League Spartan'; font-size:2rem; font-weight:800;">${app.name}</div>
        <div style="color:#666; font-size:1.1rem; margin-top:10px;">${app.desc}</div>
      </div>
    `).join('');

    this.wrapper.html(`
      <div class="se-lobby">
        <div class="se-hero">
          <h1>Swetha<br>Enterprise</h1>
          <p style="font-size:1.8rem; margin-top:20px; opacity:0.8;">The Boutique Experience.</p>
          <button onclick="window.swetha_instance.show_desk()" style="background:#ff9900; color:#111; border:none; padding:12px 30px; border-radius:100px; font-weight:800; cursor:pointer; margin-top:30px;">Open Standard Desk</button>
        </div>
        <div class="se-app-grid">${grid}</div>
      </div>
      <div id="se-modal-root"></div>
    `);
  }

  handle_app_click(name) {
    if (name === 'Healthcare') {
      this.render_healthcare_dashboard();
    } else {
      this.go_to(name);
    }
  }

  async render_healthcare_dashboard() {
    const p = this.state.practitioner;
    let welcome = p ? `Welcome, Dr. ${p.practitioner_name}` : "Healthcare Dashboard";

    this.wrapper.html(`
      <div class="se-hc-container">
        <div class="se-section-head">
          <h2 style="font-family:'Fraunces'">${welcome}</h2>
          <div class="se-view-all" onclick="window.swetha_instance.render_lobby()">← Back to Lobby</div>
        </div>

        <div class="se-glance-stats">
            <div class="se-glance-box"><span class="val" id="stat-appts">...</span><span class="lab">Today's Appts</span></div>
            <div class="se-glance-box"><span class="val" id="stat-patients">...</span><span class="lab">Total Patients</span></div>
        </div>

        <div class="se-hc-grid">
           <div class="se-hc-card">
              <h3 style="margin-bottom:20px; font-family:'League Spartan'">My Patients</h3>
              <div id="hc-patient-list">Loading patients...</div>
           </div>
           <div class="se-hc-card">
              <h3 style="margin-bottom:20px; font-family:'League Spartan'">Service Requests</h3>
              <div id="hc-sr-list">Loading requests...</div>
           </div>
        </div>
      </div>
      <div id="se-modal-root"></div>
    `);

    this.load_hc_data();
  }

  async load_hc_data() {
    const p = this.state.practitioner?.name;
    if (!p) {
      $('#hc-patient-list').html('<div style="color:red; padding:10px;">No Practitioner Profile Linked. <br><small>Please link your user to a Healthcare Practitioner record.</small></div>');
      return;
    }

    // 1. Stats
    const today = frappe.datetime.nowdate();
    const appts = await this.callApi('Patient Appointment', { filters: [['practitioner', '=', p], ['appointment_date', '=', today]] });
    $('#stat-appts').text(appts.length);

    const all_pts = await this.callApi('Patient Appointment', { filters: [['practitioner', '=', p]], fields: ['patient'] });
    $('#stat-patients').text(new Set(all_pts.map(x => x.patient)).size);

    // 2. Patients List
    const all_appts = await this.callApi('Patient Appointment', {
      filters: [['practitioner', '=', p]],
      fields: ['patient', 'patient_name', 'status', 'appointment_date']
    });

    const seen = new Set(); const unique = []; const counts = {};
    all_appts.forEach(a => {
      counts[a.patient] = (counts[a.patient] || 0) + 1;
      if (!seen.has(a.patient)) { seen.add(a.patient); unique.push(a); }
    });

    $('#hc-patient-list').html(unique.slice(0, 10).map(a => `
        <div class="hc-data-row" onclick="window.swetha_instance.show_patient_details('${a.patient}')">
            <div>
                <div style="font-weight:700">${a.patient_name}</div>
                <div style="font-size:0.8rem; color:#666">Visits: ${counts[a.patient]} · Last: ${a.appointment_date}</div>
            </div>
            <span class="hc-badge hc-badge-info">${a.status}</span>
        </div>
    `).join(''));

    // 3. Service Requests
    const srs = await this.callApi('Service Request', {
      filters: [['ordered_by', '=', this.state.practitioner.practitioner_name]],
      fields: ['name', 'patient', 'status', 'order_template_type', 'referred_practitioner']
    });

    if (srs.length) {
      $('#hc-sr-list').html(srs.slice(0, 10).map(s => `
            <div class="hc-data-row" onclick="frappe.set_route('Form', 'Service Request', '${s.name}')">
                <div>
                    <div style="font-weight:700">${s.patient}</div>
                    <div style="font-size:0.8rem; color:#666">${s.order_template_type || 'General'} · Ref: ${s.referred_practitioner || '—'}</div>
                </div>
                <span class="hc-badge hc-badge-success">${s.status}</span>
            </div>
        `).join(''));
    } else {
      $('#hc-sr-list').html('<div style="color:#94a3b8; padding:10px;">No requests found.</div>');
    }
  }

  async show_patient_details(patient_id) {
    const p = await frappe.db.get_doc('Patient', patient_id);
    const encounters = await this.callApi('Patient Encounter', { filters: [['patient', '=', patient_id]], fields: ['name', 'encounter_date', 'practitioner'] });

    let encounters_html = encounters.map(e => `
        <div style="padding:10px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <b>${e.encounter_date}</b><br>
                <small>Dr. ${e.practitioner}</small>
            </div>
            <a href="/app/patient-encounter/${e.name}" target="_blank" style="font-size:0.8rem; background:#eff6ff; color:#6366f1; padding:4px 8px; border-radius:4px; text-decoration:none;">View Report ↗</a>
        </div>
    `).join('');

    $('#se-modal-root').html(`
        <div class="se-modal active">
            <div class="se-modal-content">
                <button class="se-modal-close" onclick="$('.se-modal').removeClass('active')">×</button>
                <h2 style="font-family:'Fraunces'; margin-bottom:5px;">${p.patient_name}</h2>
                <p style="color:#64748b; font-weight:600; margin-bottom:20px;">${p.name} · ${p.gender} · ${p.blood_group || 'N/A'}</p>
                
                <h4 style="margin-bottom:15px; border-bottom:2px solid #6366f1; display:inline-block; font-family:'League Spartan'">Clinical History</h4>
                <div style="margin-top:10px; max-height:300px; overflow-y:auto; border:1px solid #f1f5f9; border-radius:12px;">
                    ${encounters_html || '<p style="padding:20px; color:#94a3b8;">No previous encounters found.</p>'}
                </div>

                <div style="margin-top:30px; display:flex; gap:12px;">
                    <button class="btn btn-primary" onclick="frappe.set_route('Form', 'Patient', '${p.name}')">Full Patient Profile</button>
                    <button class="btn btn-default" onclick="$('.se-modal').removeClass('active')">Close</button>
                </div>
            </div>
        </div>
    `);
  }

  go_to(workspace) {
    document.body.removeAttribute('data-boutique-mode');
    frappe.set_route('Workspaces', workspace);
    setTimeout(() => location.reload(), 100);
  }

  show_desk() {
    document.body.removeAttribute('data-boutique-mode');
    $('.navbar, .desk-sidebar, .layout-side-section, .page-head').show();
    frappe.set_route('Workspaces', 'Home');
    location.reload();
  }
}

// THE HIJACKER
frappe.ready(() => {
  const route = frappe.get_route();
  // We initialize the dashboard if we are on the home or custom role page
  if (!route[0] || route[0] === 'home' || route[0] === 'role_dashboard') {
    window.swetha_instance = new SwethaDashboard();
  }
});
