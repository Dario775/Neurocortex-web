import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres Neuro Assistant, el asistente virtual EXCLUSIVO de Neurocortex.

**⚠️ RESTRICCIÓN CRÍTICA - LEE ESTO PRIMERO:**
Tu ÚNICA función es responder preguntas sobre Neurocortex y sus servicios. 
NO respondas preguntas que no estén relacionadas con la empresa.

**SI LA PREGUNTA NO ES SOBRE NEUROCORTEX:**
Responde EXACTAMENTE: "Solo puedo ayudarte con consultas sobre los servicios de Neurocortex. ¿Te gustaría saber sobre desarrollo web, apps móviles, diseño UI/UX o cotizar un proyecto?"

**PREGUNTAS QUE DEBES RECHAZAR (ejemplos):**
- Matemáticas, cálculos, distancias, geografía
- Historia, ciencia, cultura general
- Recetas, consejos personales, entretenimiento
- Programación general (solo ayudas si preguntan por servicios de Neurocortex)
- Cualquier cosa que NO sea sobre contratar o conocer Neurocortex

**PREGUNTAS QUE SÍ PUEDES RESPONDER:**
- ¿Qué servicios ofrecen?
- ¿Cuánto cuesta un sitio web/app?
- ¿Hacen e-commerce?
- ¿Cómo los contacto?
- ¿En qué tecnologías trabajan?
- ¿Cuál es su proceso de trabajo?
- Preguntas sobre cotizaciones y proyectos

**Servicios de Neurocortex:**
1. **Desarrollo Web:** Sitios corporativos, landing pages, sistemas web a medida.
2. **Apps Móviles:** iOS y Android (Flutter, React Native, nativas).
3. **Plataformas SaaS:** Software escalable para empresas.
4. **E-Commerce:** Tiendas online optimizadas para conversión.
5. **Diseño UI/UX:** Interfaces modernas y experiencia de usuario premium.

**Datos de contacto:**
- Web: neurocortex.com.ar
- Email: contacto@neurocortex.com.ar

**Tu personalidad:**
- Profesional pero amigable
- Breve y directo
- Siempre guía hacia cotizar o contactar

**Idioma:** Español principalmente, pero responde en el idioma del usuario.`;

// Simple rate limiting (in-memory, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // max requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT) {
        return true;
    }

    record.count++;
    return false;
}

export async function POST(req: Request) {
    try {
        // Get client IP for rate limiting
        const forwardedFor = req.headers.get('x-forwarded-for');
        const clientIp = forwardedFor?.split(',')[0]?.trim() || 'unknown';

        // Check rate limit
        if (isRateLimited(clientIp)) {
            return NextResponse.json(
                { error: "Demasiadas solicitudes. Por favor espera un momento." },
                { status: 429 }
            );
        }

        const { message, history } = await req.json();

        // Basic content length validation
        if (!message || typeof message !== 'string' || message.length > 500) {
            return NextResponse.json(
                { error: "Mensaje inválido o muy largo (máx 500 caracteres)." },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API Key not configured" },
                { status: 500 }
            );
        }

        // Build conversation contents
        const contents = [];

        // Add limited history (max 4 messages to prevent abuse)
        if (history && Array.isArray(history)) {
            const limitedHistory = history.slice(-4);
            limitedHistory.forEach((msg: { role?: string; content?: string }) => {
                if (msg.role && msg.content && msg.content.length <= 500) {
                    contents.push({
                        role: msg.role === 'bot' ? 'model' : 'user',
                        parts: [{ text: msg.content }]
                    });
                }
            });
        }

        // Add current message
        contents.push({
            role: "user",
            parts: [{ text: message }]
        });

        // Call Gemini API (API key now in header for security)
        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY || '',
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: contents,
                generationConfig: {
                    temperature: 0.3, // Lower temperature for more focused responses
                    topK: 20,
                    topP: 0.8,
                    maxOutputTokens: 200, // Limit response length
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_LOW_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_LOW_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_LOW_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_LOW_AND_ABOVE"
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', JSON.stringify(errorData, null, 2));
            throw new Error(`API Error ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Solo puedo ayudarte con consultas sobre los servicios de Neurocortex. ¿Te interesa saber más sobre desarrollo web o apps?";

        return NextResponse.json({ text });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error processing request";
        console.error("Error in Chat API:", errorMessage);
        return NextResponse.json(
            { error: "Error al procesar tu consulta. Intenta de nuevo." },
            { status: 500 }
        );
    }
}

