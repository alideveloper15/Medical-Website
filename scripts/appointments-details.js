import { supabase } from './supabase-client.js';

const fields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'department', label: 'Department' },
  { key: 'date', label: 'Appointment Date' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'message', label: 'Description/Message' },
];

const fetchAppointments = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error.message);
    return;
  }

  const container = document.querySelector('.appointments-details');
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `<h2 style="text-align: center" class="no-appointments">No Appointment Yet :(</h2>`;
    return;
  }


  container.innerHTML = data.map(appointment => {
    const gridItems = fields.map(f => `
      <div class="label">${f.label}</div>
      <div class="value ${f.key}">${appointment[f.key]}</div>
    `).join('');

    return `
      <div class="appointment-row" data-id="${appointment.id}">
        <h2>Appointment Details</h2>
        <div class="appointment-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn" data-id="${appointment.id}">Delete</button>
        </div>
        <div class="appointment-grid">
          ${gridItems}
        </div>
      </div>
    `;
  }).join('');

  attachHandlers(container);
};

const attachHandlers = (container) => {
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      deleteAppointment(parseInt(btn.dataset.id));
    });
  });

  container.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      toggleEdit(btn.closest('.appointment-row'), btn);
    });
  });
};

const deleteAppointment = async (id) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }

  fetchAppointments();
};

const toggleEdit = (row, btn) => {
  if (btn.textContent === 'Edit') {
    fields.forEach(f => {
      const el = row.querySelector(`.${f.key}`);
      el.innerHTML = `<input type="text" class="edit-${f.key}" value="${el.textContent}" />`;
    });
    btn.textContent = 'Save';
  } else {
    const updatedData = {};
    fields.forEach(f => {
      updatedData[f.key] = row.querySelector(`.edit-${f.key}`).value;
    });
    updateAppointment(parseInt(row.dataset.id), updatedData);
  }
};

const updateAppointment = async (id, data) => {
  const { error } = await supabase
    .from('appointments')
    .update(data)
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }

  fetchAppointments();
};

window.addEventListener('DOMContentLoaded', fetchAppointments);
