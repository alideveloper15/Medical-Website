import { supabase } from "./supabase-client.js";

export function initAuth(container) {
  // Prevent injecting the form multiple times
  if (container.querySelector("#auth-form")) return;

  container.innerHTML = `
    <h2 id="auth-title">Sign In</h2>
    <form id="auth-form">
      <input type="email" id="email" placeholder="Email" required
        style="width:100%;margin-bottom:0.5rem;padding:0.5rem;" />
      <input type="password" id="password" placeholder="Password" required
        style="width:100%;margin-bottom:0.5rem;padding:0.5rem;" />
      <button type="submit" id="submit-btn" style="padding:0.5rem 1rem;margin-right:0.5rem;">Sign In</button>
    </form>
    <button type="button" id="toggle-btn" style="padding:0.5rem 1rem;margin-top:0.5rem;">Switch to Sign Up</button>
  `;

  let isSignUp = false;

  const title = container.querySelector("#auth-title");
  const form = container.querySelector("#auth-form");
  const emailInput = container.querySelector("#email");
  const passwordInput = container.querySelector("#password");
  const submitBtn = container.querySelector("#submit-btn");
  const toggleBtn = container.querySelector("#toggle-btn");

  function updateUI() {
    title.textContent = isSignUp ? "Sign Up" : "Sign In";
    submitBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
    toggleBtn.textContent = isSignUp ? "Switch to Sign In" : "Switch to Sign Up";
    emailInput.value = "";
    passwordInput.value = "";
  }

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Error signing up:", error.message);
        alert("Sign Up failed: " + error.message);
      } else {
        alert("Sign Up successful! Check your email.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Error signing in:", error.message);
        alert("Sign In failed: " + error.message);
      } else {
        alert("Signed in successfully!");
      }
    }
  });

  // Toggle between Sign In / Sign Up
  toggleBtn.addEventListener("click", () => {
    isSignUp = !isSignUp;
    updateUI();
  });

  updateUI();
}
