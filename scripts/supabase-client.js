import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jmtcaldstjvnaxgojkkr.supabase.co",
  "sb_publishable_OHE3jRwu2msedg5wATP7bg_Hmj8MstZ"
)


// async function loginUser({email, password}) {
//   const {data, error} = await supabase
//     .auth
//     .signInWithPassword({email, password})
// }

// async function getData() {
//   const {data, error} = await supabase
//     .from()
//     .select()
//     .eq()

// }