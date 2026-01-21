# 🧠 Neurocortex - Premium Digital Agency Website

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.27.0-ff0055?style=for-the-badge&logo=framer)

**Sitio web corporativo de alta gama para Neurocortex**, una agencia digital especializada en desarrollo web, aplicaciones móviles, plataformas SaaS y diseño de experiencia de usuario.

🌐 **Live Demo:** [neurocortex.com.ar](https://neurocortex.com.ar)

---

## ✨ Características Principales

### 🎨 **Diseño Premium**
- **Animaciones fluidas** con Framer Motion
- **Transiciones de página** con efecto de obturador escalonado
- **Efectos visuales high-tech**: scanlines, glitch effects, gradientes animados
- **Cursor personalizado** y micro-interacciones
- **Modo oscuro** futurista con paleta cyan/purple

### 🌍 **Internacionalización (i18n)**
- Soporte multiidioma: **Español**, **English**, **Português**
- Rutas dinámicas por idioma (`/es`, `/en`, `/pt`)
- Cambio de idioma sin recargar la página
- Diccionarios completos por sección

### 🤖 **Asistente AI Integrado**
- Chat inteligente con Google Gemini 2.0 Flash
- System prompt personalizado con conocimiento de Neurocortex
- Rate limiting (20 mensajes/minuto por IP)
- Safety settings configurados

### 📧 **Formulario de Contacto Funcional**
- Integración con **Resend** para envío de emails
- Validación client-side y server-side
- Rate limiting (5 emails/hora por IP)
- Protección anti-spam
- Templates HTML profesionales

### 🚀 **Rendimiento y SEO**
- **Server-Side Rendering (SSR)** con Next.js 16
- Turbopack para builds ultra-rápidos
- Content Security Policy (CSP) completo
- Optimización de imágenes con Next/Image
- Meta tags dinámicos por página

### 🔒 **Seguridad**
- API keys en headers (no en URLs)
- Rate limiting en todas las APIs
- Input validation con regex
- CORS configurado
- Headers de seguridad (CSP, HSTS, X-Frame-Options)

---

## 🛠️ Tech Stack

| Categoría | Tecnologías |
|-----------|------------|
| **Framework** | Next.js 16, React 19, TypeScript 5.9 |
| **Styling** | Tailwind CSS 4, CSS Modules, Vanilla CSS |
| **Animaciones** | Framer Motion, Lottie React |
| **AI** | Google Gemini AI (Generative AI SDK) |
| **Email** | Resend |
| **Deployment** | Vercel |
| **Linting** | ESLint 9, TypeScript ESLint |
| **Package Manager** | npm |

---

## 📁 Estructura del Proyecto

```
neurocortex-web/
├── src/
│   ├── app/
│   │   ├── [lang]/              # Rutas dinámicas por idioma
│   │   │   ├── page.tsx         # Dashboard principal
│   │   │   ├── web-development/ # Desarrollo Web
│   │   │   ├── mobile-apps/     # Apps Móviles
│   │   │   ├── platforms/       # Plataformas SaaS
│   │   │   ├── design/          # Diseño & UX
│   │   │   └── template.tsx     # Template para transiciones
│   │   ├── api/
│   │   │   ├── chat/            # Endpoint del chat AI
│   │   │   └── contact/         # Endpoint del formulario
│   │   └── layout.tsx           # Layout raíz
│   ├── components/              # Componentes reutilizables
│   │   ├── AnimatedBotIcon.tsx
│   │   ├── BentoCard.tsx
│   │   ├── ContactForm.tsx
│   │   ├── FloatingAssistant.tsx
│   │   ├── HeroBackground.tsx
│   │   ├── Logo.tsx
│   │   ├── NeuralCore.tsx
│   │   ├── PageTransition.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── ...
│   ├── dictionaries/            # Traducciones
│   │   ├── es.json             # Español
│   │   ├── en.json             # English
│   │   └── pt.json             # Português
│   ├── get-dictionary.ts        # Helper i18n
│   ├── i18n-config.ts          # Configuración i18n
│   └── middleware.ts            # Middleware Next.js
├── public/                      # Assets estáticos
├── .env.local                   # Variables de entorno (no en git)
├── next.config.ts              # Configuración Next.js
├── tailwind.config.ts          # Configuración Tailwind
├── tsconfig.json               # Configuración TypeScript
└── package.json
```

---

## 🚀 Instalación y Desarrollo

### **Prerrequisitos**
- Node.js 20.x o superior
- npm o yarn
- Cuenta en [Google AI Studio](https://aistudio.google.com/) (para Gemini API)
- Cuenta en [Resend](https://resend.com/) (para emails)

### **1. Clonar el repositorio**
```bash
git clone https://github.com/Dario775/Neurocortex-web.git
cd Neurocortex-web
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz:

```env
# API Key de Google Gemini
GEMINI_API_KEY=AIzaSy...

# API Key de Resend (para formulario de contacto)
RESEND_API_KEY=re_...
```

### **4. Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### **5. Build de producción**
```bash
npm run build
npm start
```

---

## 🌐 Deployment en Vercel

### **Deploy automático**

1. **Fork o clona** este repositorio
2. Ve a [Vercel](https://vercel.com/new)
3. Importa el repositorio
4. Configura las **variables de entorno**:
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
5. Click en **Deploy**

### **Configurar dominio custom**

1. En Vercel → Settings → Domains
2. Agrega: `neurocortex.com.ar`
3. Sigue las instrucciones de DNS de Vercel
4. En NIC.ar (o tu proveedor):
   - Agrega registro A: `76.76.21.21`
   - O CNAME: `cname.vercel-dns.com`

---

## 📧 Configuración de Emails (Resend)

### **1. Crear cuenta en Resend**
- Ve a [resend.com/signup](https://resend.com/signup)

### **2. Agregar dominio**
- Domains → Add Domain → `neurocortex.com.ar`
- Copia los registros DNS (SPF, DKIM, DMARC)

### **3. Configurar DNS en NIC.ar**

Agrega estos registros TXT:

```
Tipo: TXT
Nombre: @
Valor: v=spf1 include:_spf.resend.com ~all

Tipo: TXT
Nombre: resend._domainkey
Valor: [tu_clave_dkim]

Tipo: TXT
Nombre: _dmarc
Valor: v=DMARC1; p=quarantine
```

### **4. Obtener API Key**
- API Keys → Create API Key → Copia la key
- Agrégala a `.env.local` y a Vercel

---

## 🔐 Seguridad

Este proyecto implementa las siguientes medidas de seguridad:

✅ **Content Security Policy (CSP)** completo  
✅ **HSTS** con preload  
✅ **X-Frame-Options**: SAMEORIGIN  
✅ **X-Content-Type-Options**: nosniff  
✅ **Rate Limiting** en APIs  
✅ **Input Validation** (client + server)  
✅ **API Keys en headers** (no en URLs)  
✅ **Safety Settings** en Gemini AI  

Ver [SECURITY_AUDIT_REPORT.md](./SECURITY_AUDIT_REPORT.md) para más detalles.

---

## 📚 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Ejecutar ESLint
```

---

## 🎨 Personalización

### **Cambiar colores**
Edita `src/app/globals.css`:
```css
--color-primary: #06b6d4;   /* Cyan */
--color-secondary: #a855f7; /* Purple */
```

### **Agregar idiomas**
1. Crea `src/dictionaries/fr.json` (ejemplo: francés)
2. Actualiza `src/i18n-config.ts`:
```typescript
export const locales = ['es', 'en', 'pt', 'fr'] as const;
```

### **Modificar servicios**
Edita las páginas en `src/app/[lang]/`:
- `web-development/page.tsx`
- `mobile-apps/page.tsx`
- `platforms/page.tsx`
- `design/page.tsx`

---

## 🐛 Troubleshooting

### **El chat no funciona**
- ✅ Verifica que `GEMINI_API_KEY` esté configurada
- ✅ Revisa la consola del navegador
- ✅ Chequea que la API key sea válida en [Google AI Studio](https://aistudio.google.com/)

### **No llegan los emails**
- ✅ Verifica que `RESEND_API_KEY` esté configurada
- ✅ Revisa que el dominio esté verificado en Resend
- ✅ Chequea los registros DNS (SPF, DKIM, DMARC)

### **Errores de CSP en consola**
- ✅ Reinicia el servidor (`npm run dev`)
- ✅ Verifica `next.config.ts` → headers

---

## 📄 Licencia

Este proyecto es propiedad de **Neurocortex** y está protegido por derechos de autor.

---

## 👨‍💻 Autor

**Neurocortex Team**  
🌐 [neurocortex.com.ar](https://neurocortex.com.ar)  
📧 contacto@neurocortex.com.ar

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React increíble
- [Vercel](https://vercel.com/) - Hosting y deployment
- [Framer Motion](https://www.framer.com/motion/) - Animaciones fluidas
- [Google AI](https://ai.google.dev/) - Gemini API
- [Resend](https://resend.com/) - Email transaccional
- [Unsplash](https://unsplash.com/) - Imágenes de alta calidad

---

<div align="center">
  <strong>Desarrollado con 💜 por Neurocortex</strong>
  <br><br>
  <sub>Built with Next.js 16 • TypeScript • Tailwind CSS • Framer Motion</sub>
</div>
