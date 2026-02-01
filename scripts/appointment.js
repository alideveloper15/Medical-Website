import { supabase } from './supabase-client.js'

let newAppointment = {
  name: "",
  email: "",
  phone: "",
  department: "",
  date: "",
  doctor: "",
  message: ""
};

function handleInput(e) {
  const { name, value } = e.target;
  newAppointment = {
    ...newAppointment,
    [name]: value
  };
}

document.querySelectorAll("input, textarea, select")
  .forEach(el => {
    el.addEventListener("input", handleInput);
    el.addEventListener("change", handleInput);
});

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

const handleSubmit = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const appointmentToInsert = {
    ...newAppointment,
    user_id: user.id
  };

  const { error } = await supabase.from('appointments').insert(appointmentToInsert);
  if (error) {
    console.error("Error adding appointment", error.message);
    return;
  }

  newAppointment = {
    name: "",
    email: "",
    phone: "",
    department: "",
    date: "",
    doctor: "",
    message: ""
  };

  document.querySelector(".form").reset();
  window.location.href = 'appointments-details.html';
};
