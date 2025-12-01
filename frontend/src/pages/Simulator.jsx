import { useState } from 'react';

const initialMessages = [
  {
    id: 'intro-1',
    author: 'bot',
    text: '👋🏾 Hello dear! I am Mrs. Blessing from the Federal Women Empowerment Office.',
    time: '08:45'
  },
  {
    id: 'intro-2',
    author: 'bot',
    text: 'We are giving ₦200,000 cash grants this week. I can fast-track your name if you respond quickly.',
    time: '08:45'
  }
];

const Simulator = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [stage, setStage] = useState('intro');
  const [result, setResult] = useState(null);

  const pushMessage = (author, text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random()}`,
        author,
        text,
        time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const resolveResult = (status) => {
    if (status === 'safe') {
      setResult({
        title: 'SUCCESS: You are safe ✅',
        detail: 'Blocking suspicious contacts protects your savings and helps us warn others.',
        tone: 'success'
      });
    } else {
      setResult({
        title: 'GAME OVER: You were scammed ⚠️',
        detail: 'Never send “processing fees” for grants. Real agencies do not request transfers via WhatsApp.',
        tone: 'danger'
      });
    }
  };

  const handleChoice = (action) => {
    if (stage === 'intro') {
      if (action === 'interested') {
        pushMessage('user', "I'm interested. How do I receive it?");
        pushMessage(
          'bot',
          'Wonderful! Kindly send a ₦5,000 processing fee to account 123456789 so I can release your ₦200,000 grant today.'
        );
        setStage('fee');
      }
      if (action === 'block') {
        pushMessage('user', 'This sounds suspicious. I will block you.');
        pushMessage('system', 'You blocked Mrs. Blessing and forwarded the chat to report.gov.ng.');
        setStage('end');
        resolveResult('safe');
      }
    } else if (stage === 'fee') {
      if (action === 'pay') {
        pushMessage('user', 'Okay, I will pay the ₦5,000 fee now.');
        pushMessage('bot', 'Please hurry! Many Nigerians are begging for this opportunity. Send proof once done.');
        pushMessage('system', 'Mrs. Blessing disappeared after receiving your transfer.');
        setStage('end');
        resolveResult('scammed');
      }
      if (action === 'report') {
        pushMessage('user', 'Nope, this is fake. I am reporting and blocking you.');
        pushMessage('system', 'You reported the chat to CyberSafe Naija hotlines.');
        setStage('end');
        resolveResult('safe');
      }
    }
  };

  const currentOptions = () => {
    if (stage === 'intro') {
      return [
        { id: 'interested', label: "I'm interested" },
        { id: 'block', label: 'Block Mrs. Blessing' }
      ];
    }
    if (stage === 'fee') {
      return [
        { id: 'pay', label: 'Pay ₦5,000 fee' },
        { id: 'report', label: 'Report & Block' }
      ];
    }
    return [];
  };

  const bubbleStyles = (author) => {
    if (author === 'user') {
      return 'self-end max-w-[80%] rounded-2xl rounded-br-sm bg-brand-green px-4 py-2 text-sm text-white shadow';
    }
    if (author === 'system') {
      return 'self-center max-w-[90%] rounded-full bg-slate-200 px-4 py-1 text-xs font-semibold uppercase text-slate-600';
    }
    return 'self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-white px-4 py-2 text-sm text-slate-900 shadow';
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">Phase 5</p>
        <h2 className="text-3xl font-bold text-brand-dark">Scam Simulator</h2>
        <p className="text-sm text-slate-600">Walk through a WhatsApp chat and decide how to respond.</p>
      </header>

      <div className="relative mx-auto w-full max-w-sm rounded-[2.5rem] border border-slate-200 bg-[#e8eded] p-4 shadow-xl">
        <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-slate-300" />
        <div className="mt-6 flex flex-col gap-3 overflow-hidden rounded-3xl bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] bg-white/60 p-4 shadow-inner">
          {messages.map((message) => (
            <div key={message.id} className={`flex flex-col ${message.author === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={bubbleStyles(message.author)}>
                <p>{message.text}</p>
              </div>
              {message.author !== 'system' && (
                <span className="mt-1 text-[10px] text-slate-500">{message.time}</span>
              )}
            </div>
          ))}
        </div>

        {currentOptions().length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {currentOptions().map((option) => (
              <button
                key={option.id}
                onClick={() => handleChoice(option.id)}
                className="w-full rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-brand-dark shadow hover:bg-brand-light"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {result && (
        <div
          className={`rounded-3xl border px-6 py-5 text-sm font-medium shadow-sm ${
            result.tone === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-red-200 bg-red-50 text-red-900'
          }`}
        >
          <p className="text-lg font-bold">{result.title}</p>
          <p className="mt-2 text-sm">{result.detail}</p>
        </div>
      )}
    </section>
  );
};

export default Simulator;
