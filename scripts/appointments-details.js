import { supabase } from  './supabase-client.js'

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

  appointments = data
  console.log(appointments)
}
