// Jahr im Footer setzen
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const WEBHOOK_URL =
    "https://hook.eu1.make.com/2x2s61ejxqs26t2lunl5vs43uonvhc3m";
  const THANKYOU_URL = "danke.html"; // liegt im gleichen Ordner wie index.html

  const forms = document.querySelectorAll(".foova-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      // Fallback: Rolle aus data-role, falls im Formular etwas fehlt
      const roleFromData = form.getAttribute("data-role");
      if (roleFromData && !formData.get("role")) {
        formData.set("role", roleFromData);
      }

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          body: formData,
          mode: "no-cors" // wichtig, damit Browser nicht wegen CORS meckert
        });
      } catch (err) {
        console.error("Webhook Error:", err);
        // selbst wenn Fehler im JS kommt, leiten wir weiter
      }

      // Weiterleitung auf Danke-Seite
      window.location.href = THANKYOU_URL;
    });
  });
});