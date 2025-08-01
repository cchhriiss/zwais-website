import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // System message to restrict chatbot to your agency & services
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are the official chatbot for zwais Services Agency in Vienna.
You ONLY answer questions about:
- Our services (Chatbots & AI Integration, Web Development, Brand Strategy)
- Pricing and packages
- Our company information
- How to work with us
If the user asks something unrelated, politely guide them back to topics about zwais Services Agency.
Be concise, professional, and friendly. Do NOT include phrases like "As an AI" or "reply:".
          `,
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content || "No response.";

    // Return raw text
    return new Response(reply, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}