import { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, RefreshCw, Smartphone, Check, CheckCheck, Clock } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'efcc',
    title: 'EFCC / BVN Freeze',
    threatType: 'Authority Impersonation & Panic',
    target: 'Account PINs & BVN',
    contactName: 'Inspector Musa (EFCC Cyber)',
    avatar: '🚨',
    initialMessages: [
      {
        id: 'efcc-1',
        author: 'bot',
        text: '🚨 ATTENTION: This is Inspector Musa from the EFCC Cybercrime Investigation Unit.',
        time: '09:12'
      },
      {
        id: 'efcc-2',
        author: 'bot',
        text: 'Your BVN is flagged for illicit foreign laundering. You have 15 seconds to verify your identity or your accounts will be frozen immediately.',
        time: '09:12'
      }
    ],
    stages: {
      intro: {
        options: [
          { id: 'comply', label: 'Ask what details he needs to stop the freeze' },
          { id: 'verify', label: 'Demand badge ID & state you will call EFCC HQ' }
        ]
      },
      crypto: {
        options: [
          { id: 'connect', label: 'Click the link and submit the emergency OTP' },
          { id: 'cut-call', label: 'Hang up, block number & alert your bank' }
        ]
      }
    }
  },
  {
    id: 'grant',
    title: 'FG Youth Grant (₦250k)',
    threatType: 'Advance-Fee Scam',
    target: 'Processing Fee (₦3,500)',
    contactName: 'Fed. Youth Empowerment Desk',
    avatar: '🏛️',
    initialMessages: [
      {
        id: 'grant-1',
        author: 'bot',
        text: '🎉 Congratulations! Your application for the Federal Government ₦250,000 Youth Empowerment Grant has been APPROVED.',
        time: '11:04'
      },
      {
        id: 'grant-2',
        author: 'bot',
        text: 'To disburse funds directly to your account today, kindly pay the ₦3,500 CBN clearance stamp & documentation fee.',
        time: '11:04'
      }
    ],
    stages: {
      intro: {
        options: [
          { id: 'pay-fee', label: 'Ask for the bank account to pay the ₦3,500 fee' },
          { id: 'reject-grant', label: 'Refuse fee & verify on official .gov.ng portal' }
        ]
      }
    }
  },
  {
    id: 'whatsapp-hijack',
    title: 'WhatsApp 6-Digit Code',
    threatType: 'Account Takeover / SIM Swap',
    target: 'WhatsApp 2FA Code',
    contactName: 'Bro Tunde (Alumni Group)',
    avatar: '👨🏾',
    initialMessages: [
      {
        id: 'wa-1',
        author: 'bot',
        text: 'Bro how far! I am adding all members to our new Alumni Welfare WhatsApp group.',
        time: '14:22'
      },
      {
        id: 'wa-2',
        author: 'bot',
        text: 'A 6-digit verification code was just sent to your SMS by mistake from the group portal. Please forward it to me quickly so I can confirm your slot!',
        time: '14:23'
      }
    ],
    stages: {
      intro: {
        options: [
          { id: 'send-code', label: 'Forward the 6-digit SMS code you just received' },
          { id: 'deny-code', label: 'Refuse to share & call Bro Tunde directly via voice' }
        ]
      }
    }
  }
];

const Simulator = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const currentScenario = SCENARIOS[selectedScenarioIndex];

  const [messages, setMessages] = useState(currentScenario.initialMessages);
  const [stage, setStage] = useState('intro');
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  // Switch scenario
  const handleSelectScenario = (index) => {
    setSelectedScenarioIndex(index);
    setMessages(SCENARIOS[index].initialMessages);
    setStage('intro');
    setResult(null);
    setTimeLeft(15);
  };

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

  const currentOptions = currentScenario.stages[stage]?.options || [];

  // Reset timer on stage change
  useEffect(() => {
    if (stage === 'end' || currentOptions.length === 0) return;
    setTimeLeft(15);
  }, [stage, selectedScenarioIndex]);

  // Countdown timer effect
  useEffect(() => {
    if (stage === 'end' || currentOptions.length === 0) return;
    if (timeLeft <= 0) {
      pushMessage('system', '⏱️ Panic timer expired. The fraudster exploited your hesitation.');
      setStage('end');
      setResult({
        title: 'DRILL FAILED: Panic Freeze',
        detail: 'In high-stress attacks, hesitation gives attackers leverage. When in doubt, terminate contact immediately and independently verify through official banking channels.',
        tone: 'danger',
        vector: currentScenario.threatType
      });
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, timeLeft, currentOptions.length]);

  const handleChoice = (action) => {
    if (currentScenario.id === 'efcc') {
      if (stage === 'intro') {
        if (action === 'comply') {
          pushMessage('user', 'Please Inspector, I am innocent. What details do you need?');
          pushMessage('bot', 'We sent an authorization code to your phone. Send the 6 digits right now or police will arrive at your address.');
          pushMessage('system', '🚨 Attackers hijacked your internet banking and initiated unauthorized debit.');
          setStage('end');
          setResult({
            title: 'DRILL FAILED: Harvested by Impersonator',
            detail: 'Law enforcement agencies like the EFCC or Police will NEVER conduct interrogations or request banking OTPs via WhatsApp. Artificial urgency is their primary psychological weapon.',
            tone: 'danger',
            vector: 'Authority Bias & Countdown Coercion'
          });
        } else if (action === 'verify') {
          pushMessage('user', 'Provide your official service badge number. I will call the EFCC hotline directly to verify.');
          pushMessage('bot', 'There is no time! We already detect suspicious transactions draining your funds right now. Click this emergency link immediately: bit.ly/efcc-freeze-portal');
          setStage('crypto');
        }
      } else if (stage === 'crypto') {
        if (action === 'connect') {
          pushMessage('user', 'I clicked the link and entered my ATM card details to stop the transfer.');
          pushMessage('system', 'Phishing site harvested your full card details & CVV. Your account was debited.');
          setStage('end');
          setResult({
            title: 'DRILL FAILED: Phishing Site Trapped',
            detail: 'Never click emergency links sent via chat. Phishing portals mirror real bank or agency websites to capture your card numbers and OTPs.',
            tone: 'danger',
            vector: 'Phishing Redirect / Credential Theft'
          });
        } else if (action === 'cut-call') {
          pushMessage('user', 'I am hanging up now and dialing my bank emergency code.');
          pushMessage('system', '✅ Call severed. You dialed *737*51*10# to lock banking access. Attacker blocked.');
          setStage('end');
          setResult({
            title: 'DRILL SUCCESS: Zero-Trust Mastered! 🛡️',
            detail: 'Perfect response! You resisted artificial panic, refused unverified links, and used verified out-of-band channels to protect your funds.',
            tone: 'success',
            vector: 'Active Zero-Trust Containment'
          });
        }
      }
    } else if (currentScenario.id === 'grant') {
      if (action === 'pay-fee') {
        pushMessage('user', 'Okay, send me the account number for the ₦3,500 fee.');
        pushMessage('bot', 'Pay to: OPay - 8023456789 (Clearance Officer). Once paid, send screenshot.');
        pushMessage('system', 'You sent ₦3,500. The scammer blocked you immediately. The grant never existed.');
        setStage('end');
        setResult({
          title: 'DRILL FAILED: Advance-Fee Trap',
          detail: 'Real government grants or empowerment initiatives (CBN, BOI, Humanitarian Ministry) NEVER charge an application or "stamp" fee to disburse funds. Demanding money to receive money is 100% fraud.',
          tone: 'danger',
          vector: 'Advance-Fee / 419 Format'
        });
      } else if (action === 'reject-grant') {
        pushMessage('user', 'Legitimate government grants never require processing fees. I am reporting this handle to EFCC Eagle Eye.');
        pushMessage('system', 'You blocked the fraudster and reported the account number.');
        setStage('end');
        setResult({
          title: 'DRILL SUCCESS: Trap Evaded! 🛡️',
          detail: 'Spot on! Any scheme requiring payment to "unlock" or "process" free money or grants is an advance-fee scam.',
          tone: 'success',
          vector: 'Scam Format Detection'
        });
      }
    } else if (currentScenario.id === 'whatsapp-hijack') {
      if (action === 'send-code') {
        pushMessage('user', 'The code is 842-109. Add me quickly!');
        pushMessage('system', 'Your WhatsApp logged out! The attacker registered your phone number on their device using the code you shared.');
        setStage('end');
        setResult({
          title: 'DRILL FAILED: Account Hijacked',
          detail: 'The 6-digit code was your WhatsApp registration SMS. Scammers use hacked friends’ accounts to trick you into forwarding your OTP. Never share your WhatsApp SMS code with anyone.',
          tone: 'danger',
          vector: 'Account Takeover / Friend Impersonation'
        });
      } else if (action === 'deny-code') {
        pushMessage('user', 'I will not forward any SMS code. That is a WhatsApp registration code. Calling your direct line now.');
        pushMessage('system', 'You called Bro Tunde on cellular. He confirmed his WhatsApp was hacked 30 minutes ago.');
        setStage('end');
        setResult({
          title: 'DRILL SUCCESS: Account Saved! 🛡️',
          detail: 'Brilliant defense! Out-of-band verification (calling via normal phone call) is the number one weapon against social account takeover.',
          tone: 'success',
          vector: 'Out-of-Band Verification'
        });
      }
    }
  };

  const resetCurrentScenario = () => {
    setMessages(currentScenario.initialMessages);
    setStage('intro');
    setResult(null);
    setTimeLeft(15);
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8 pb-20">
      
      {/* HEADER SECTION */}
      <header className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <ShieldAlert className="h-3.5 w-3.5 text-emerald-600" />
          Interactive Incident Drill • Zero-Trust Training
        </div>
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
          Simulate a <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Live Attack</span>
        </h1>
        <p className="text-sm text-slate-600 sm:text-base max-w-2xl">
          Scammers use psychological triggers like artificial countdowns and authority intimidation. Test your instincts in a safe, simulated chat environment.
        </p>
      </header>

      {/* SCENARIO SELECTOR PILLS */}
      <div className="flex flex-wrap gap-2.5">
        {SCENARIOS.map((scen, idx) => (
          <button
            key={scen.id}
            onClick={() => handleSelectScenario(idx)}
            className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              selectedScenarioIndex === idx
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            <span>{scen.avatar}</span>
            <span>{scen.title}</span>
          </button>
        ))}
      </div>

      {/* WHATSAPP INTERFACE PHONE FRAME */}
      <div className="relative mx-auto w-full max-w-md rounded-[2.5rem] border-4 border-slate-800 bg-slate-900 p-2.5 shadow-2xl">
        
        {/* Phone Notch */}
        <div className="absolute left-1/2 top-4 h-4 w-28 -translate-x-1/2 rounded-full bg-slate-800 z-30" />

        <div className="overflow-hidden rounded-[2rem] bg-[#efeae2] flex flex-col min-h-[520px]">
          
          {/* WhatsApp Top Bar */}
          <div className="bg-[#075e54] px-4 pt-8 pb-3 text-white flex items-center justify-between shadow">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100/20 text-xl border border-white/20">
                {currentScenario.avatar}
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">{currentScenario.contactName}</p>
                <p className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> online
                </p>
              </div>
            </div>

            {/* Panic Countdown Timer */}
            {stage !== 'end' && currentOptions.length > 0 && (
              <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                timeLeft <= 5 ? 'bg-red-500 text-white animate-bounce' : 'bg-black/30 text-emerald-200'
              }`}>
                <Clock className="h-3 w-3" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>

          {/* Security Notice Banner inside Chat */}
          <div className="bg-amber-100/90 border-b border-amber-200/60 px-3 py-1.5 text-[11px] text-amber-900 text-center font-medium">
            🔒 Messages and calls are end-to-end encrypted. No one outside of this chat can read them.
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((message) => {
              if (message.author === 'system') {
                return (
                  <div key={message.id} className="mx-auto my-2 max-w-[90%] rounded-xl bg-slate-800/90 px-3.5 py-2 text-center text-[11px] font-semibold text-white shadow-sm">
                    {message.text}
                  </div>
                );
              }

              const isUser = message.author === 'user';
              return (
                <div key={message.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm leading-relaxed ${
                      isUser
                        ? 'rounded-tr-none bg-[#dcf8c6] text-slate-900'
                        : 'rounded-tl-none bg-white text-slate-900'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-slate-400">
                      <span>{message.time}</span>
                      {isUser && <CheckCheck className="h-3 w-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Options / Action Choices */}
          <div className="p-3 bg-slate-100/90 border-t border-slate-200">
            {activeChoicesSection(currentOptions, stage, handleChoice, resetCurrentScenario)}
          </div>

        </div>
      </div>

      {/* POST-DRILL CYBERSECURITY DEBRIEFING */}
      {result && (
        <div
          className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition-all ${
            result.tone === 'success'
              ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 via-teal-50 to-white text-emerald-950'
              : 'border-red-300 bg-gradient-to-br from-red-50 via-orange-50 to-white text-red-950'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              result.tone === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {result.tone === 'success' ? <ShieldCheck className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Vector: {result.vector}
                </span>
                <button
                  onClick={resetCurrentScenario}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <RefreshCw className="h-3 w-3" /> Replay Drill
                </button>
              </div>
              <h3 className="text-xl font-black">{result.title}</h3>
              <p className="text-sm sm:text-base leading-relaxed">{result.detail}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

// Sub-component for options inside phone frame
function activeChoicesSection(currentOptions, stage, handleChoice, resetCurrentScenario) {
  if (stage === 'end') {
    return (
      <button
        onClick={resetCurrentScenario}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white shadow hover:bg-slate-800"
      >
        <RefreshCw className="h-4 w-4" /> Try Scenario Again
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center">
        Choose your response:
      </p>
      {currentOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handleChoice(opt.id)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-xs font-semibold text-slate-800 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50/50 hover:text-emerald-950"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default Simulator;
