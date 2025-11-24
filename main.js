{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Jahr im Footer setzen\
document.addEventListener("DOMContentLoaded", () => \{\
  const yearEl = document.getElementById("year");\
  if (yearEl) \{\
    yearEl.textContent = new Date().getFullYear();\
  \}\
\
  const WEBHOOK_URL =\
    "https://hook.eu1.make.com/2x2s61ejxqs26t2lunl5vs43uonvhc3m";\
  const THANKYOU_URL = "danke.html"; // liegt im gleichen Ordner wie index.html\
\
  const forms = document.querySelectorAll(".foova-form");\
\
  forms.forEach((form) => \{\
    form.addEventListener("submit", async (event) => \{\
      event.preventDefault();\
\
      const formData = new FormData(form);\
\
      // Fallback: Rolle aus data-role, falls im Formular etwas fehlt\
      const roleFromData = form.getAttribute("data-role");\
      if (roleFromData && !formData.get("role")) \{\
        formData.set("role", roleFromData);\
      \}\
\
      try \{\
        await fetch(WEBHOOK_URL, \{\
          method: "POST",\
          body: formData,\
          mode: "no-cors" // wichtig, damit Browser nicht wegen CORS meckert\
        \});\
      \} catch (err) \{\
        console.error("Webhook Error:", err);\
        // selbst wenn Fehler im JS kommt, leiten wir weiter\
      \}\
\
      // Weiterleitung auf Danke-Seite\
      window.location.href = THANKYOU_URL;\
    \});\
  \});\
\});}