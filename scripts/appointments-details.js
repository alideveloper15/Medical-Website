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
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return console.error("Error reading appointments", error.message);

  const container = document.querySelector('.appointments-details');
  if (!container) return;

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

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      deleteAppointment(parseInt(btn.dataset.id));
    });
  });

  container.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleEdit(btn.closest('.appointment-row'), btn);
    });
  });
};

const deleteAppointment = async (id) => {
  const { error } = await supabase.from('appointments').delete().eq('id', id);
  if (error) return console.error("Error deleting appointment", error.message);
  fetchAppointments();
};

const toggleEdit = (row, btn) => {
  if (btn.textContent === "Edit") {
    fields.forEach(f => {
      const p = row.querySelector(`.${f.key}`);
      p.innerHTML = `<input type="text" class="edit-${f.key}" value="${p.textContent}" />`;
    });
    btn.textContent = "Save";
  } else {
    const updatedData = {};
    fields.forEach(f => {
      updatedData[f.key] = row.querySelector(`.edit-${f.key}`).value;
    });
    updateAppointment(parseInt(row.dataset.id), updatedData);
  }
};

const updateAppointment = async (id, data) => {
  const { error } = await supabase.from('appointments').update(data).eq('id', id);
  if (error) return console.error("Error updating appointment", error.message);
  fetchAppointments();
};

window.addEventListener('DOMContentLoaded', fetchAppointments);
