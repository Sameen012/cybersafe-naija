import { useEffect, useState } from 'react';

const initialMessages = [
  {
    id: 'intro-1',
    author: 'bot',
    text: '🚨 This is Inspector Musa from EFCC Cybercrime Response Team.',
    time: '09:12'
  },
  {
    id: 'intro-2',
    author: 'bot',
    text: 'Your BVN is tied to a laundering ring. Confirm your identity within 15 seconds or your accounts go into immediate freeze.',
    time: '09:12'
  }
];

const Simulator = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [stage, setStage] = useState('intro');
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

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

  const resolveResult = (status, customDetail) => {
    if (status === 'safe') {
      setResult({
        title: 'SUCCESS: You are safe ✅',
        detail:
          customDetail ||
          'Zero-trust pays off. You verified the caller, cut the session, and kept your naira plus crypto untouched.',
        tone: 'success'
      });
    } else {
      setResult({
        title: 'GAME OVER: You were scammed ⚠️',
        detail:
          customDetail ||
          'Countdown intimidation made you reveal secrets. Law enforcement will never demand OTPs or seeds on WhatsApp.',
        tone: 'danger'
      });
    }
  };

  const optionConfig = {
    intro: [
      { id: 'comply', label: 'Comply immediately' },
      { id: 'verify', label: 'Request badge & call EFCC HQ' }
    ],
    crypto: [
      { id: 'connect', label: 'Connect wallet to “emergency” portal' },
      { id: 'cold-power', label: 'Cold power down & call exchange' }
    ]
  };

  const activeOptions = optionConfig[stage] || [];

  useEffect(() => {
    if (stage === 'end' || activeOptions.length === 0) return;
    setTimeLeft(15);
  }, [stage, activeOptions.length]);

  useEffect(() => {
    if (stage === 'end' || activeOptions.length === 0) return;
    if (timeLeft <= 0) {
      pushMessage('system', '⏱️ You froze for too long and the attackers escalated.');
      setStage('end');
      resolveResult(
        'scammed',
        'Hesitation gave the impersonator room to social-engineer your telecom provider and hijack your accounts.'
      );
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, timeLeft, activeOptions.length]);

  const handleChoice = (action) => {
    if (stage === 'intro') {
      if (action === 'comply') {
        pushMessage('user', 'Okay inspector, what do you need?');
        pushMessage('bot', 'Send the OTP you just received. You have 10 seconds before we send patrols.');
        pushMessage('system', 'EFCC impersonator cloned your SIM and emptied your main account.');
        setStage('end');
        resolveResult('scammed', 'EFCC does not run investigations via WhatsApp countdowns or request OTPs.');
      }
      if (action === 'verify') {
        pushMessage('user', 'Share your badge number. I will call EFCC HQ myself.');
        pushMessage('bot', 'No time for bureaucracy. ChainPulse Security already sees a crypto drain in progress.');
        pushMessage('system', 'ChainPulse Bot: Wallet 0x09fa... flagged for live draining. Act now!');
        setStage('crypto');
      }
    } else if (stage === 'crypto') {
      if (action === 'connect') {
        pushMessage('user', 'Connecting now, please stop the drain!');
        pushMessage('bot', 'Upload your seed phrase to authenticate the emergency patch.');
        pushMessage('system', '11 seconds later, the attacker transferred your entire USDT balance.');
        setStage('end');
        resolveResult('scammed', 'No incident responder needs your seed phrase. You just handed them total control.');
      }
      if (action === 'cold-power') {
        pushMessage('user', 'Powering down and calling my exchange fraud desk right now.');
        pushMessage('system', 'Exchange froze withdrawals and EFCC confirmed the caller was fake.');
        setStage('end');
        resolveResult('safe');
      }
    }
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

        {activeOptions.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {activeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleChoice(option.id)}
                className="w-full rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-brand-dark shadow hover:bg-brand-light"
              >
                {option.label}
              </button>
            ))}
            <div className="flex items-center justify-between rounded-full bg-black/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
              <span>Panic timer</span>
              <span>{timeLeft}s</span>
            </div>
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
