// import { supabase } from  './supabase-client.js'

// const fetchAppointments = async () => { 
//   let appointmentsDetails = '';

//   const { error, data } = await supabase
//     .from('appointments')
//     .select("*")
//     .order('created_at', { ascending: true });

//   if (error) {
//     console.error("Error reading appointment", error.message);
//     return;
//   }

//   const appointments = data;
//   console.log(appointments);

//   appointments.forEach((appointment) => {
//     appointmentsDetails += `
//       <div class="row gy-4"  style="border: 2px solid gray; border-radius: 15px; padding-left: 5px; margin-bottom: 40px;">
//         <div class="col-12 row" style="padding-top: 10px">
//           <h2 style="text-align: center; font-weight: bolder">Appointment Details</h2>
//           <div class="d-flex justify-content-between align-items-center">
//             <button type="button" class="edit-btn ad-btn">Edit</button>
//             <button type="button" class="delete-btn ad-btn" data-id="${appointment.id}">Delete</button>
//           </div>
//         </div>
//         <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
//           <p>Name</p>
//         </div>
//         <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
//           <p>Email</p>
//         </div>
//         <div class="col-md-6" style="color: grey;">  
//           <p>${appointment.name}</p>
//         </div>
//         <div class="col-md-6" style="color: grey;">
//           <p>${appointment.email}</p>
//         </div>
//         <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
//           <p>Phone Number</p>
//         </div>
//         <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
//           <p>Department</p>
//         </div>
//         <div class="col-md-6" style="color: grey;">
//           <p>${appointment.phone}</p>
//         </div>
//         <div class="col-md-6" style="color: grey;">
//           <p>${appointment.department}</p>
//         </div>
//         <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
//           <p>Appointment Date</p>
//         </div>
//         <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">  
//           <p>Doctor</p>
//         </div>
//         <div class="col-md-6" style="color: grey;">
//           <p>${appointment.date}</p>
//         </div>
//         <div class="col-md-6" style="color: grey;">
//           <p>${appointment.doctor}</p>
//         </div>
//         <div class="col-12" style="margin-bottom: -35px; font-weight: bold;">
//           <p>Description/Message</p>
//         </div>
//         <div class="col-12" style="color: grey;">
//           <p>${appointment.message}</p>
//         </div>
//         <div class="col-12">
//         </div>
//       </div>
//     `;
//   });

//   const container = document.querySelector('.appointments-details');
//   if (!container) return;

//   container.innerHTML = appointmentsDetails;


//   document.querySelectorAll('.delete-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = parseInt(btn.getAttribute('data-id'));
//       deleteAppointment(id);
//     });
//   });

  
// }




// const deleteAppointment = async (id) => {
//   const { error } = await supabase.from('appointments').delete().eq("id", id);

//   if (error) {
//     console.error("Error deleting appointment", error.message);
//     return;
//   }

//   fetchAppointments()
// }



// window.addEventListener('DOMContentLoaded', () => {
//   fetchAppointments();
// });



import { supabase } from './supabase-client.js';

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

  appointments.forEach((appointment) => {
    appointmentsDetails += `
      <div class="row gy-4 appointment-row" data-id="${appointment.id}" style="border: 2px solid gray; border-radius: 15px; padding-left: 5px; margin-bottom: 40px;">
        <div class="col-12 row" style="padding-top: 10px">
          <h2 style="text-align: center; font-weight: bolder">Appointment Details</h2>
          <div class="d-flex justify-content-between align-items-center">
            <button type="button" class="edit-btn ad-btn">Edit</button>
            <button type="button" class="delete-btn ad-btn" data-id="${appointment.id}">Delete</button>
          </div>
        </div>

        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">Name</div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">Email</div>
        <div class="col-md-6 color-grey"><p class="name">${appointment.name}</p></div>
        <div class="col-md-6 color-grey"><p class="email">${appointment.email}</p></div>

        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">Phone Number</div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">Department</div>
        <div class="col-md-6 color-grey"><p class="phone">${appointment.phone}</p></div>
        <div class="col-md-6 color-grey"><p class="department">${appointment.department}</p></div>

        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">Appointment Date</div>
        <div class="col-md-6" style="margin-bottom: -35px; font-weight: bold;">Doctor</div>
        <div class="col-md-6 color-grey"><p class="date">${appointment.date}</p></div>
        <div class="col-md-6 color-grey"><p class="doctor">${appointment.doctor}</p></div>

        <div class="col-12" style="margin-bottom: -35px; font-weight: bold;">Description/Message</div>
        <div class="col-12 color-grey"><p class="message">${appointment.message}</p></div>
      </div>
    `;
  });

  const container = document.querySelector('.appointments-details');
  if (!container) return;

  container.innerHTML = appointmentsDetails;

  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      deleteAppointment(id);
    });
  });

  // Edit buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.appointment-row');
      toggleEdit(row, btn);
    });
  });
}

// Delete function (already exists)
const deleteAppointment = async (id) => {
  const { error } = await supabase.from('appointments').delete().eq("id", id);

  if (error) {
    console.error("Error deleting appointment", error.message);
    return;
  }

  fetchAppointments()
}

// Toggle edit/save mode
const toggleEdit = (row, btn) => {
  if (btn.textContent === "Edit") {
    // Turn fields into input fields
    ['name','email','phone','department','date','doctor','message'].forEach(field => {
      const p = row.querySelector(`.${field}`);
      const value = p.textContent;
      p.innerHTML = `<input type="text" class="edit-${field}" value="${value}" />`;
    });
    btn.textContent = "Save";
  } else {
    // Collect values
    const updatedData = {};
    ['name','email','phone','department','date','doctor','message'].forEach(field => {
      const input = row.querySelector(`.edit-${field}`);
      updatedData[field] = input.value;
    });

    // Update Supabase
    const id = parseInt(row.getAttribute('data-id'));
    updateAppointment(id, updatedData, btn);
  }
}

// Update appointment in Supabase
const updateAppointment = async (id, data, btn) => {
  const { error } = await supabase.from('appointments').update(data).eq('id', id);

  if (error) {
    console.error("Error updating appointment", error.message);
    alert("Failed to update appointment.");
    return;
  }

  // Refresh the appointments
  fetchAppointments();
}

window.addEventListener('DOMContentLoaded', () => {
  fetchAppointments();
});
