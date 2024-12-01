import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const sendEmail = async (userEmail, subject, message ) => {
    try {
        // Create Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: "QWAZE",
            to: userEmail,
            subject,
            html: message,
          };
          await transporter.sendMail(mailOptions);
    } catch (error) {
        return NextResponse.json({
            message: 'Something went wrong'+ error
        },{
            status: 500
        }
    )
    }
}
