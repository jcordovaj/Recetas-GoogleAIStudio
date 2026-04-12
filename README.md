<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🍳 AI Studio Lab – Ingeniería Reversa de Recetas

Aplicación web que utiliza modelos multimodales de **Google AI Studio (Gemini)** para generar recetas culinarias a partir de imágenes. Este proyecto forma parte de un laboratorio práctico orientado a la certificación como desarrollador de AI de Google.

---

## 🧠 Descripción

Esta aplicación permite realizar **ingeniería reversa de recetas** a partir de una imagen. El usuario puede subir una fotografía de un plato o preparación culinaria, y mediante el uso de modelos de inteligencia artificial, la app:

- 🧠 Análisis visual del plato
- 🧾 Identifica e infiere ingredientes
- 👨‍🍳 Generación de receta paso a paso
- 🔁 Sugiere variaciones según preferencias y necesidades alimentarias

---

## 🥗 Funcionalidades principales

- 📷 **Carga de imágenes** desde una interfaz web simple e intuitiva
- 🤖 **Análisis automático con IA** usando Google AI Studio (modelo Gemini)
- 📖 **Generación de recetas detalladas** (ingredientes + preparación)
- 🔄 **Alternativas personalizadas** , por ejemplo:
     - Opciones vegetarianas o veganas
     - Versiones sin gluten
     - Ajustes para dietas bajas en calorías
     - Variaciones según ingredientes disponibles

---

## 🖼️ Demo conceptual

<pre class="overflow-visible! px-0!" data-start="1095" data-end="1265"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="w-full overflow-x-hidden overflow-y-auto pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>[ Imagen del plato ] → [ Análisis con Gemini ] → [ Receta generada ]</span><br/><span>                                      ↓</span><br/><span>                         [ Variantes personalizadas ]</span></div></div></div></div></div></div></div></div></div></div></div></div></div></pre>

---

## 🧱 Arquitectura

<pre class="overflow-visible! px-0!" data-start="1613" data-end="1750"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="w-full overflow-x-hidden overflow-y-auto pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>Frontend (Web UI)</span><br/><span>   ↓</span><br/><span>Backend (Node.js)</span><br/><span>   ↓</span><br/><span>Google AI Studio (Gemini API)</span><br/><span>   ↓</span><br/><span>Respuesta generativa (JSON / texto estructurado)</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## 🌐 Tecnologías utilizadas

- **AI:** Google AI Studio (Gemini API)
- **Backend:** Node.js
- **Frontend web:** HTML / TS/JS / framework ligero (framework ligero o SPA)
- **Config:** dotenv (.env.local), variables de entorno para manejo de API keys

---

## 🎯 Objetivo del laboratorio

Este proyecto forma parte de un laboratorio práctico enfocado en:

- Aprender a integrar modelos generativos multimodales
- Experimentar con procesamiento de imágenes y texto
- Construir aplicaciones reales con IA
- Prepararse para certificaciones oficiales de Google AI

---

## 🧪 Use Cases

🍽️ Recrear platos de restaurantes

🧑‍🍳 Inspiración culinaria desde imágenes

🥦 Adaptar recetas a dietas específicas

📚 Educación en cocina asistida por IA

---

## 🚀 Desplegar y ejecutar en AI Studio

Iniciar sesión, conectar con repo de github, hacer build y ejecutar.

View the app in AI Studio: Not available, just local

---

## 💻 Ejecutar localmente

**Prerequisitos:** Node.js

1. Instalación de dependencias:

   <pre class="overflow-visible! px-0!" data-start="1950" data-end="1975"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="w-full overflow-x-hidden overflow-y-auto pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>npm install</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

2. configurar un archivo para guardar la `GEMINI_API_KEY`in en [.env.local](.env.local)
3. ejecutar la app:

   <pre class="overflow-visible! px-0!" data-start="2080" data-end="2105"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="w-full overflow-x-hidden overflow-y-auto pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>npm run dev</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## 📂 Project Structure

<pre class="overflow-visible! px-0!" data-start="1953" data-end="2082"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="w-full overflow-x-hidden overflow-y-auto pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>.</span><br/><span>├── src/</span><br/><span>│   ├── components/</span><br/><span>│   ├── services/</span><br/><span>│   └── utils/</span><br/><span>├── public/</span><br/><span>├── .env.local</span><br/><span>├── package.json</span><br/><span>└── README.md</span></div></div></div></div></div></div></div></div></div></div></div></div></div></pre>

---

## 📌 Notas adicionales

- Este proyecto es de carácter educativo y experimental
- Los resultados pueden variar dependiendo de la calidad de la imagen
- La app no garantiza exactitud culinaria profesional, pero ofrece buenas aproximaciones
