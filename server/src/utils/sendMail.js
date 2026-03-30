// Sendind email otp for email verification and password reset

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASS
    }
})

export const sendOTPMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_HOST,
        to,
        subject: "Verify Your Email ",
        html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
    })   
}

