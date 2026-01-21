# 🔒 REPORTE DE AUDITORÍA DE SEGURIDAD Y QA
## Proyecto: Neurocortex Web
## Fecha: 2026-01-20
## Auditor: QA Security Expert

---

## 📊 RESUMEN EJECUTIVO

**Estado General:** ⚠️ **REQUIERE ATENCIÓN INMEDIATA**

### Vulnerabilidades Encontradas:
- 🔴 **CRÍTICAS:** 3
- 🟡 **MEDIAS:** 5
- 🟢 **BAJAS:** 4

### Fortalezas del Proyecto:
✅ Headers de seguridad bien configurados (CSP, HSTS, X-Frame-Options)
✅ Rate limiting implementado en API de chat
✅ Safety settings de Gemini configurados
✅ No se encontró uso de `dangerouslySetInnerHTML`
✅ Validación básica de inputs en frontend

---

## 🔴 VULNERABILIDADES CRÍTICAS (Atención Inmediata)

### 1. **API Key Expuesta en URL Query String**
**Severidad:** 🔴 CRÍTICA  
**Archivo:** `src/app/api/chat/route.ts:122`  
**Riesgo:** La API key de Gemini se envía como parámetro en la URL, lo cual puede:
- Quedar registrada en logs del servidor
- Ser capturada por proxies intermedios
- Almacenarse en caché de navegador/CDN
- Exponerse en análisis de red

**Código Vulnerable:**
```typescript
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
```

**Solución Recomendada:**
```typescript
const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY || '',
    },
    body: JSON.stringify({...})
});
```

---

### 2. **Formulario de Contacto NO Funcional (Sin Backend)**
**Severidad:** 🔴 CRÍTICA  
**Archivo:** `src/components/ContactForm.tsx:10-24`  
**Riesgo:** 
- Pérdida de leads/clientes potenciales
- Mala experiencia de usuario (creen que enviaron un mensaje pero no llega)
- No hay validación del lado del servidor
- No hay protección anti-spam

**Código Actual:**
```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulated delay for tech feel
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    form.reset();
};
```

**Solución Recomendada:**
Implementar un endpoint real que envíe emails. Opciones:
1. **Next.js API Route + Nodemailer**
2. **Servicio de Email (Resend, SendGrid, AWS SES)**
3. **Integración con CRM (HubSpot, Salesforce)**

---

### 3. **Falta Archivo `.env` para GEMINI_API_KEY**
**Severidad:** 🔴 CRÍTICA  
**Riesgo:** La aplicación no funcionará en producción sin esta variable

**Solución:**
```bash
# Crear archivo .env.local en la raíz del proyecto
GEMINI_API_KEY=tu_api_key_aqui
```

**Validar en `.gitignore`:**
```
.env*.local
.env
```

---

## 🟡 VULNERABILIDADES MEDIAS (Alta Prioridad)

### 4. **Rate Limiting No Persistente**
**Severidad:** 🟡 MEDIA  
**Archivo:** `src/app/api/chat/route.ts:47`  
**Riesgo:**
- Se reinicia con cada deploy
- En producción con múltiples instancias, cada una tiene su propio contador
- Un atacante podría hacer múltiples solicitudes desde diferentes IPs

**Solución Recomendada:**
```typescript
// Opción 1: Redis (recomendado para producción)
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 m"),
});

// Opción 2: Vercel KV (si usas Vercel)
import { kv } from '@vercel/kv';
```

---

### 5. **No Hay Protección CSRF**
**Severidad:** 🟡 MEDIA  
**Archivo:** `src/app/api/chat/route.ts`  
**Riesgo:** Un sitio malicioso podría hacer solicitudes en nombre del usuario

**Solución Recomendada:**
```typescript
// Validar origin header
const origin = req.headers.get('origin');
const allowedOrigins = ['https://neurocortex.com.ar', 'http://localhost:3000'];

if (!origin || !allowedOrigins.includes(origin)) {
    return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
    );
}
```

---

### 6. **No Hay Validación de Email en Backend**
**Severidad:** 🟡 MEDIA  
**Archivo:** `ContactForm.tsx`  
**Riesgo:** Pueden enviarse emails inválidos o maliciosos

**Solución Recomendada:**
```typescript
import { z } from 'zod';

const ContactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    message: z.string().min(10).max(1000),
    project_type: z.enum(['web', 'mobile', 'saas', 'design']),
});
```

---

### 7. **Headers de Seguridad Podrían Mejorarse**
**Severidad:** 🟡 MEDIA  
**Archivo:** `next.config.ts`  

**Mejoras Recomendadas:**
```typescript
{
    key: "Content-Security-Policy",
    value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-{RANDOM}'", // Usar nonce en lugar de unsafe
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src 'self' fonts.gstatic.com",
        "img-src 'self' data: blob: https://images.unsplash.com https://grainy-gradients.vercel.app",
        "media-src 'self' https://assets.mixkit.co",
        "connect-src 'self' https://generativelanguage.googleapis.com",
        "frame-ancestors 'none'", // Más restrictivo que 'self'
        "form-action 'self'",
        "base-uri 'self'",
        "upgrade-insecure-requests", // Forzar HTTPS
    ].join("; "),
}
```

---

### 8. **No Hay Logging de Errores**
**Severidad:** 🟡 MEDIA  
**Riesgo:** Dificulta debugging en producción

**Solución Recomendada:**
```typescript
// Integrar Sentry, LogRocket, o similar
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## 🟢 VULNERABILIDADES BAJAS (Baja Prioridad)

### 9. **Falta Validación de Tipos en API**
**Severidad:** 🟢 BAJA  
**Solución:** Usar Zod o TypeScript runtime validation

### 10. **No Hay Timeout en Fetch de Gemini**
**Severidad:** 🟢 BAJA  
**Solución:**
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000); // 10s

const response = await fetch(apiUrl, {
    ...
    signal: controller.signal
});
```

### 11. **Dependencias Desactualizadas**
**Severidad:** 🟢 BAJA  
**Solución:**
```bash
npm audit
npm audit fix
npm outdated
```

### 12. **No Hay Honeypot en Formulario**
**Severidad:** 🟢 BAJA  
**Solución:** Añadir campo oculto para detectar bots

---

## ✅ BUENAS PRÁCTICAS IMPLEMENTADAS

1. ✅ **CSP configurado** correctamente
2. ✅ **HSTS habilitado** con preload
3. ✅ **X-Frame-Options** en SAMEORIGIN
4. ✅ **X-Content-Type-Options** nosniff
5. ✅ **Permissions-Policy** restrictivo
6. ✅ **Safety Settings de Gemini** configurados
7. ✅ **Rate Limiting básico** implementado
8. ✅ **Validación de longitud** de mensajes
9. ✅ **No uso de dangerouslySetInnerHTML**
10. ✅ **suppressHydrationWarning** solo en html tag

---

## 📝 CHECKLIST DE SEGURIDAD PARA PRODUCCIÓN

### Antes de Deploy:
- [ ] Crear archivo `.env` con `GEMINI_API_KEY`
- [ ] Mover API key de URL a header `x-goog-api-key`
- [ ] Implementar backend real para formulario de contacto
- [ ] Añadir rate limiting con Redis/Upstash
- [ ] Configurar CORS adecuadamente
- [ ] Implementar logging de errores (Sentry)
- [ ] Añadir validación Zod en backend
- [ ] Configurar monitoreo de uptime
- [ ] Implementar backup de base de datos (si aplica)
- [ ] Revisar y actualizar todas las dependencias

### Variables de Entorno Necesarias:
```env
GEMINI_API_KEY=tu_key_aqui
NEXT_PUBLIC_SITE_URL=https://neurocortex.com.ar
# Si implementas email:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contacto@neurocortex.com.ar
SMTP_PASS=tu_password
# Si usas Redis:
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 🎯 PRIORIDADES DE IMPLEMENTACIÓN

### **Semana 1 (URGENTE):**
1. Mover Gemini API key a headers
2. Implementar backend real para formulario de contacto
3. Crear archivo `.env` y configurar variables

### **Semana 2 (ALTA):**
4. Implementar rate limiting persistente con Redis
5. Añadir protección CSRF
6. Configurar logging de errores

### **Semana 3 (MEDIA):**
7. Mejorar CSP headers
8. Añadir validación Zod
9. Implementar timeouts en fetches

### **Semana 4 (BAJA):**
10. Auditoría de dependencias
11. Añadir honeypot
12. Tests de seguridad automatizados

---

## 🛠️ HERRAMIENTAS RECOMENDADAS

### Testing:
- **OWASP ZAP** - Escaneo de vulnerabilidades
- **Lighthouse** - Auditoría de rendimiento y seguridad
- **npm audit** - Vulnerabilidades en dependencias

### Monitoreo:
- **Sentry** - Error tracking
- **Vercel Analytics** - Métricas de rendimiento
- **Uptime Robot** - Monitoreo de disponibilidad

### Seguridad:
- **Snyk** - Análisis de vulnerabilidades
- **GitHub Dependabot** - Actualización automática de dependencias

---

## 📞 CONTACTO PARA DUDAS

Si tienes preguntas sobre este reporte o necesitas ayuda con la implementación de estas mejoras, no dudes en consultar.

**Próxima auditoría recomendada:** Después de implementar correcciones críticas

---

*Fin del Reporte*
