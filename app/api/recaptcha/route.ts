import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token not found' }), { status: 400 });
    }

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: { secret: secretKey, response: token }
      }
    );

    if (response.data.success && response.data.score > 0.5) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
