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



