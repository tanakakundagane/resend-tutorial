
import { Resend } from 'resend';
import { EmailTemplate } from '../../../../components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // const userMailData = await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: [email],  // ユーザーのメールアドレス
    //   subject: `${name}様、お問い合わせありがとうございました`,
    //   text: `こんにちは ${name}様、\n\nお問い合わせいただきありがとうございます。お問い合わせ内容を確認後、担当者より返信させていただきます。\n\nお問い合わせ内容:\n${message}`,
    //   react: EmailTemplate({ firstName: name, firstMessage: message, firstEmail: email, firstPhone: phone }),
    // });


    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['s20970059@nucba.ac.jp'],
      subject: `${name}様からのお問い合わせ`,
      text: `Welcome ${name},Message: ${message}`,
      react: EmailTemplate({ firstName: `${name}` , firstMessage: `${message}`, firstEmail: `${email}`, firstPhone: `${phone}`}),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}