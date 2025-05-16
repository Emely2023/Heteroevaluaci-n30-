import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configurar el transporter
// ¿Quien envía el correo?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// ¿Quien lo envia?
const sendEmail = async (to, subject, body, html) => {
  try {
    const info = await transporter.sendMail({
      from:  '"Cinemark La Gran Via" "emelybntz1707@gmail.com"',
      to, 
      subject, // El asunto
      html, //HTML
    });

    return info;
  } catch (error) {
    console.log("error" + error);
  }
};

// Función para generar el HTML del correo de recuperación de contraseña
const HTMLRecoveryEmail = (code) => {
  return `
         <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f8f8f8; padding: 20px; border: 1px solid #ccc; border-radius: 10px; max-width: 600px; margin: 0 auto;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Cinemark_logo.svg/512px-Cinemark_logo.svg.png" alt="Cinemark Logo" style="max-width: 200px; margin-bottom: 20px;" />
      <h1 style="color: #b31217; font-size: 24px; margin-bottom: 15px;">Código de Verificación</h1>
      <p style="font-size: 16px; color: #333; line-height: 1.5;">
        ¡Hola! Para continuar con tu proceso en Cinemark, usa el siguiente código de verificación:
      </p>
      <div style="display: inline-block; padding: 12px 25px; margin: 20px 0; font-size: 20px; font-weight: bold; color: #fff; background-color: #b31217; border-radius: 6px;">
        ${code}
      </div>
      <p style="font-size: 14px; color: #555; line-height: 1.5;">
        Este código es válido por los próximos <strong>15 minutos</strong>. Si no solicitaste este código, puedes ignorar este mensaje.
      </p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <footer style="font-size: 12px; color: #999;">
        ¿Necesitas ayuda? Contáctanos en
        <a href="mailto:soporte@cinemark.com" style="color: #b31217; text-decoration: none;">soporte@cinemark.com</a>
      </footer>
    </div>
  `;
};

export { sendEmail, HTMLRecoveryEmail };