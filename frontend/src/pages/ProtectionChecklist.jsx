import { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Smartphone, Globe, CreditCard, EyeOff, KeyRound, Sparkles } from 'lucide-react';

const checklistItems = [
  {
    id: 'sim-lock',
    icon: Smartphone,
    title: 'Physical SIM PIN Lock',
    badge: 'Critical Defense',
    guidance: 'Go to Settings > Security > SIM Lock and set a 4-digit PIN. If your phone is snatched in traffic or a bus, the thief cannot put your SIM into another phone to receive bank OTPs.'
  },
  {
    id: 'wa-2fa',
    icon: KeyRound,
    title: 'WhatsApp Two-Step Verification',
    badge: 'Account Takeover',
    guidance: 'Open WhatsApp > Settings > Account > Two-Step Verification. Set a 6-digit PIN and attach your private email. This completely immunizes your account against 6-digit SMS forward scams.'
  },
  {
    id: 'financial-airgap',
    icon: CreditCard,
    title: 'Financial Account Air-Gapping',
    badge: 'Loss Containment',
    guidance: 'Never keep your main savings in an account tied to a debit card. Use fintech wallets (like OPay, Moniepoint, or PalmPay) strictly for daily spending, keeping your main funds safe.'
  },
  {
    id: 'lockscreen-preview',
    icon: EyeOff,
    title: 'Disable Lockscreen SMS Preview',
    badge: 'OTP Protection',
    guidance: 'Go to Settings > Notifications > Lockscreen and set to "Don\'t show sensitive content". This prevents bystanders or thieves from reading OTP codes without unlocking your phone.'
  },
  {
    id: 'pos-vigilance',
    icon: ShieldAlert,
    title: 'POS Terminal Surveillance',
    badge: 'Card Skimming',
    guidance: 'Never let POS operators carry your card under a table or behind a counter. Shield the keypad with your hand when typing your 4-digit PIN against overhead cameras.'
  },
  {
    id: 'burner-identity',
    icon: Lock,
    title: 'Dedicated Banking Email',
    badge: 'Anti-Phishing',
    guidance: 'Create a confidential email address strictly for bank alerts and tax records. Never use this email for social media, free downloads, or online shopping registrations.'
  },
  {
    id: 'dns-filtering',
    icon: Globe,
    title: 'Encrypted DNS Filtering',
    badge: 'Network Security',
    guidance: 'Set your mobile Private DNS to "dns.quad9.net" or NextDNS. This automatically blocks known phishing and malware links before the malicious webpage loads.'
  }
];

const ProtectionChecklist = () => {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('csn_checklist_progress');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const score = Math.round((completed.size / checklistItems.length) * 100);

  useEffect(() => {
    localStorage.setItem('csn_checklist_progress', JSON.stringify([...completed]));
  }, [completed]);

  const toggleItem = (id) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getRank = () => {
    if (score === 100) return { title: 'Fortified Cyber Defender 🛡️', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (score >= 60) return { title: 'Hardened Security Posture 🔒', color: 'text-teal-700 bg-teal-50 border-teal-300' };
    if (score >= 30) return { title: 'Basic Defense In Progress ⚠️', color: 'text-amber-800 bg-amber-50 border-amber-300' };
    return { title: 'Vulnerable • Action Needed 🚨', color: 'text-red-700 bg-red-50 border-red-300' };
  };

  const rank = getRank();

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-24 sm:px-6">
      
      {/* SCORECARD STICKY HEADER WITH LINEAR GRADIENT */}
      <div className="sticky top-4 z-20 rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-6 shadow-xl backdrop-blur-md transition-all">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Defense Hardening Level</p>
            <div className={`mt-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${rank.color}`}>
              <span>{rank.title}</span>
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {score}% <span className="text-xs font-semibold text-slate-500">({completed.size}/{checklistItems.length} Secured)</span>
          </span>
        </div>
        
        {/* Linear Gradient Progress Bar */}
        <div className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              score < 40 
                ? 'bg-gradient-to-r from-red-500 to-rose-500' 
                : score < 80 
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500' 
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <header className="space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Sparkles className="h-4 w-4" />
          Proactive Countermeasures
        </div>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
          Account Hardening <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Checklist</span>
        </h1>
        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          Passive defense is failure. In Nigeria, phone snatching, rogue POS operators, and SIM cloning happen daily. Take these 7 proven steps to secure your digital life.
        </p>
      </header>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {checklistItems.map((item) => {
          const isChecked = completed.has(item.id);
          const Icon = item.icon;

          return (
            <article 
              key={item.id} 
              className={`group relative overflow-hidden rounded-3xl border p-5 transition-all duration-200 ${
                isChecked 
                  ? 'border-emerald-300 bg-gradient-to-br from-emerald-50/70 to-teal-50/30 shadow-none' 
                  : 'border-slate-200 bg-white shadow-sm hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <label className="flex cursor-pointer items-start gap-4">
                <div className="relative pt-1 shrink-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleItem(item.id)}
                    className="peer sr-only"
                  />
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                    isChecked 
                      ? 'border-emerald-600 bg-emerald-600 text-white' 
                      : 'border-slate-300 bg-transparent group-hover:border-emerald-400'
                  }`}>
                    {isChecked && <ShieldCheck size={14} strokeWidth={3} />}
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon size={18} className={isChecked ? 'text-emerald-700' : 'text-slate-400'} />
                      <h2 className={`text-base font-bold ${isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                        {item.title}
                      </h2>
                    </div>
                  </div>
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {item.badge}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 pt-1">
                    {item.guidance}
                  </p>
                </div>
              </label>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProtectionChecklist;