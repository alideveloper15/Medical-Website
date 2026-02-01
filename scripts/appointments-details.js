import { supabase } from  './supabase-client.js'

const fetchAppointments = async () => { 
  let appointmentsDetails = '';

  const { error, data } = await supabase
    .from('appointments')
    .select("*")
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error reading appointment", error.message);
    return;
  }

  const appointments = data;
  console.log(appointments);

  appointments.forEach((appointment) => {
    appointmentsDetails += `
      <div class="row gy-4"  style="border: 2px solid gray; border-radius: 15px; padding-left: 5px; margin-bottom: 40px;">
        <div class="col-12 row" style="padding-top: 10px">
          <h2 style="text-align: center; font-weight: bolder">Appointment Details</h2>
          <div class="d-flex justify-content-between align-items-center">
            <button type="button" class="edit-btn ad-btn">Edit</button>
            <button type="button" class="delete-btn ad-btn" data-id="${appointment.id}">Delete</button>
          </div>
        </div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
          <p>Name</p>
        </div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
          <p>Email</p>
        </div>
        <div class="col-md-6" style="color: grey;">  
          <p>${appointment.name}</p>
        </div>
        <div class="col-md-6" style="color: grey;">
          <p>${appointment.email}</p>
        </div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
          <p>Phone Number</p>
        </div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
          <p>Department</p>
        </div>
        <div class="col-md-6" style="color: grey;">
          <p>${appointment.phone}</p>
        </div>
        <div class="col-md-6" style="color: grey;">
          <p>${appointment.department}</p>
        </div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
          <p>Appointment Date</p>
        </div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
          <p>Doctor</p>
        </div>
        <div class="col-md-6" style="color: grey;">
          <p>${appointment.date}</p>
        </div>
        <div class="col-md-6" style="color: grey;">
          <p>${appointment.doctor}</p>
        </div>
        <div class="col-12" style="margin-bottom: -35px; font-weight: bold;">
          <p>Description/Message</p>
        </div>
        <div class="col-12" style="color: grey;">
          <p>${appointment.message}</p>
        </div>
        <div class="col-12">
        </div>
      </div>
    `;
  });

  const container = document.querySelector('.appointments-details');
  if (!container) return;

  container.innerHTML = appointmentsDetails;


  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      deleteAppointment(id);
    });
  });

  
}




const deleteAppointment = async (id) => {
  const { error } = await supabase.from('appointments').delete().eq("id", id);

  if (error) {
    console.error("Error deleting appointment", error.message);
    return;
  }

  fetchAppointments()
}



window.addEventListener('DOMContentLoaded', () => {
  fetchAppointments();
});
