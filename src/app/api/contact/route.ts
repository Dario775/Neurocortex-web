import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple rate limiting (in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max 5 emails per hour per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

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
                { error: "Demasiados mensajes enviados. Por favor espera una hora." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { name, email, project_type, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Todos los campos son requeridos." },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Email inválido." },
                { status: 400 }
            );
        }

        // Length validation
        if (name.length > 100 || email.length > 100 || message.length > 1000) {
            return NextResponse.json(
                { error: "Los campos exceden la longitud máxima permitida." },
                { status: 400 }
            );
        }

        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY not configured");
            return NextResponse.json(
                { error: "Servicio de email no configurado." },
                { status: 500 }
            );
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Neurocortex Web <contacto@neurocortex.com.ar>',
            to: ['contacto@neurocortex.com.ar'], // Tu email de destino
            replyTo: email,
            subject: `Nuevo mensaje de ${name} - ${project_type || 'Consulta General'}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 30px;
                            border-radius: 10px 10px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                            font-weight: 800;
                        }
                        .content {
                            background: #f8f9fa;
                            padding: 30px;
                            border-radius: 0 0 10px 10px;
                        }
                        .field {
                            margin-bottom: 20px;
                        }
                        .field label {
                            display: block;
                            font-weight: 600;
                            color: #667eea;
                            margin-bottom: 5px;
                            font-size: 12px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        .field p {
                            margin: 0;
                            padding: 10px;
                            background: white;
                            border-radius: 5px;
                            border-left: 3px solid #667eea;
                        }
                        .message-box {
                            background: white;
                            padding: 20px;
                            border-radius: 5px;
                            border-left: 3px solid #667eea;
                            white-space: pre-wrap;
                            word-wrap: break-word;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 2px solid #e9ecef;
                            color: #6c757d;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>💼 NUEVO MENSAJE DE CONTACTO</h1>
                    </div>
                    <div class="content">
                        <div class="field">
                            <label>Nombre del Cliente</label>
                            <p>${name}</p>
                        </div>
                        <div class="field">
                            <label>Email de Contacto</label>
                            <p><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                        </div>
                        ${project_type ? `
                        <div class="field">
                            <label>Tipo de Proyecto</label>
                            <p>${project_type}</p>
                        </div>
                        ` : ''}
                        <div class="field">
                            <label>Mensaje</label>
                            <div class="message-box">${message}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>Este mensaje fue enviado desde el formulario de contacto de <strong>neurocortex.com.ar</strong></p>
                        <p>IP del remitente: ${clientIp}</p>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Error al enviar el mensaje. Intenta de nuevo." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Mensaje enviado exitosamente"
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error processing request";
        console.error("Error in Contact API:", errorMessage);
        return NextResponse.json(
            { error: "Error al procesar tu solicitud. Intenta de nuevo." },
            { status: 500 }
        );
    }
}
