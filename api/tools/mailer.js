import nodemailer from "nodemailer";

export default async function sendMail(user, subject, url) {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
		const txt = `		Dear ${user.username},
		Thank you for registering to join BloodStream.
		Please check the link below to confirm your email adresse.
		${url}
		If you have any questions, please refer to the FAQ.
		Sincerely,
		The BloodStream Team
		`
		const emial = {
            from: "BloodStream",
            to: user.email,
            subject: subject,
            text: txt,
        };
        transporter
		.sendMail(emial)
		.catch((err) => {
			console.log(err);
			return err});
    } catch (err) {
        console.log(err);
        return err;
    }
}