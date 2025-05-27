import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, phone, date, message } = await req.json();

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
        from: email,
        to: "kontakt@jarekolszewski.pl",
        subject: `Nowa wiadomość od ${name}`,
        text: `Imię: ${name}\nEmail: ${email}\nTelefon: ${phone}\nData: ${date}\nWiadomość: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json(
            { message: "Wiadomość wysłana" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Błąd wysyłania e-maila:", error);
        return NextResponse.json({ error: "Błąd wysyłania" }, { status: 500 });
    }
}
