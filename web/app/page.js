'use client'
import { useState } from 'react'
import ServiceSlider from './components/ServiceSlider'


export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [serviceIndex, setServiceIndex] = useState(0)

  const services = [
    {
      title: "Chatbots & AI Integration",
      description: "Custom-trained bots for lead gen, support & automation."
    },
    {
      title: "Web Design",
      description: "Responsive, fast and beautiful websites."
    },
    {
      title: "Branding & Identity",
      description: "Logos, colors, typography and full brand kits."
    },
    {
      title: "Social Media Strategy",
      description: "Content plans, ads, and engagement growth."
    }
  ]

  const prevService = () => {
    setServiceIndex(prev => prev === 0 ? services.length - 1 : prev - 1)
  }
  const nextService = () => {
    setServiceIndex(prev => prev === services.length - 1 ? 0 : prev + 1)
  }

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');

  const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input }),
});

const reply = await res.text(); // now it's plain text

setMessages((prev) => [
  ...prev,
  { role: 'assistant', content: reply },
]);


  const reader = res.body.getReader();
  let botMessage = { role: 'assistant', content: "" };
  setMessages(prev => [...prev, botMessage]);

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    botMessage.content += new TextDecoder().decode(value);
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...botMessage };
      return updated;
    });
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex flex-col justify-center items-center text-center px-4 relative">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">We uncover brand potential</h1>
          <p className="mb-8 max-w-xl">An agency with AI‑based service and interactive insights.</p>
          <button
            onClick={() => document.getElementById('chatbot').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
          >
            Talk to us
          </button>
        </div>
      </section>

<ServiceSlider />

      {/* Chatbot */}
      {/* Chatbot */}
<section id="chatbot" className="bg-white py-12 px-4 flex flex-col h-[70vh]">
  <div className="flex-1 overflow-y-auto space-y-4">
    {messages.map((m, i) => (
      <div
        key={i}
        className={`max-w-[80%] p-3 rounded-2xl ${
          m.role === 'user'
            ? 'bg-black text-white self-end ml-auto'
            : 'bg-gray-100 text-black'
        }`}
      >
        {m.content}
      </div>
    ))}
  </div>

  {/* Input Bar */}
  <div className="border-t pt-4 mt-4 flex gap-2">
    <input
      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message…"
    />
    <button
      onClick={sendMessage}
      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-lg"
    >
      Send
    </button>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 text-center">
        <div className="max-w-lg mx-auto space-y-2">
          <p>ZWAI Services Agency – Vienna</p>
          <p><a href="/impressum">Imprint</a> · <a href="/privacy">Privacy Policy</a></p>
        </div>
      </footer>
    </div>
  )
}