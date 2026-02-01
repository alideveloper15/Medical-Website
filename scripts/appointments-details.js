import { supabase } from  './supabase-client.js'

let appointments = []

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
      <div class="row gy-4"  style="border: 2px solid gray; border-radius: 15px; padding-left: 5px; margin-bottom: 35px;">
        <div class="col-12">
          <h2 style="text-align: center;">Appointment Details</h2>
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

  document.querySelector('.appointments-details').innerHTML = appointmentsDetails;
}

// This runs once when the page is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  fetchAppointments();
});



