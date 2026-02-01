import { supabase } from  './supabase-client.js'


let appointment = {
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

  appointment = {
    ...appointment,
    [name]: value
  };

  console.log(appointment);
}

document.querySelectorAll("input, textarea, select")
  .forEach(el => {
    el.addEventListener("input", handleInput);
    el.addEventListener("change", handleInput);
});


document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("Final appointment data:", appointment);
  handleSubmit()
});


const handleSubmit = async (e) => {
  const {error} = await supabase.from('appointments').insert(appointment).single()

  if (error) {
    console.error("Error adding appointment", error.message)
  }

  // appointment = {
  //   name: "",
  //   email: "",
  //   phone: "",
  //   department: "",
  //   date: "",
  //   doctor: "",
  //   message: ""
  // };

}