import { supabase } from  './supabase-client.js'


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
  handleSubmit()
});


const handleSubmit = async () => {
  const {error} = await supabase.from('appointments').insert(newAppointment).single()

  if (error) {
    console.error("Error adding appointment", error.message)
    return
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

}

let appointments = []

// This runs once when the page is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  fetchAppointments();
});

const fetchAppointments = async () => {
  const {error, data} = await supabase
    .from('appointments')
    .select("*")
    .order('created_at', { ascending: true })

  if (error) {
    console.error("Error reading appointment", error.message)
    return
  }

  console.log('data', data)

  appointments = data
  console.log(appointments)
}

console.log('app', appointments)

