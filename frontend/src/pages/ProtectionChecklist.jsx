import { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Smartphone, Globe, CreditCard } from 'lucide-react';

// RUTHLESS UPGRADE: Hardened Security Protocols
const checklistItems = [
  {
    id: 'dns-filtering',
    icon: Globe,
    title: 'Deploy DNS Filtering',
    guidance: 'Configure NextDNS or Quad9 on your mobile private DNS settings. This ruthlessly blocks known malicious domains at the network level before they load.'
  },
  {
    id: 'financial-airgap',
    icon: CreditCard,
    title: 'Financial Segmentation',
    guidance: 'Never keep life savings in an account linked to a debit card. Use a separate "spending-only" wallet for daily transactions to limit blast radius.'
  },
  {
    id: 'sim-lock',
    icon: Smartphone,
    title: 'Physical SIM Lock',
    guidance: 'Set a PIN on your physical SIM card settings. If your phone is stolen, the thief cannot put your SIM in another phone to intercept OTPs.'
  },
  {
    id: 'burner-identity',
    icon: Lock,
    title: 'Burner Identity Protocol',
    guidance: 'Use email aliases (Firefox Relay/iCloud) for random signups. Never expose your primary banking email to e-commerce sites.'
  },
  {
    id: 'app-audit',
    icon: ShieldAlert,
    title: 'Ruthless App Audit',
    guidance: 'Delete any app you haven\'t used in 3 months. Every app is a potential entry point. If it is not essential, it is a liability.'
  }
];

const ProtectionChecklist = () => {
  // Load state from localStorage to persist progress
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
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    // RESPONSIVE CONTAINER:
    // 'px-4' for mobile padding, 'sm:px-6' for tablets.
    // 'pb-24' ensures content isn't hidden behind bottom navigation on mobile.
    <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-24 sm:px-6">
      
      {/* RESPONSIVE SCORECARD: Sticky top so it's always visible on mobile scroll */}
      <div className="sticky top-4 z-20 rounded-2xl border border-brand-green/40 bg-white/95 p-5 shadow-lg backdrop-blur transition-all">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Security Hardening</p>
          <span className={`text-sm font-bold ${score === 100 ? 'text-brand-green' : 'text-slate-500'}`}>
            {score}% Secure
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              score < 50 ? 'bg-red-500' : score < 100 ? 'bg-yellow-500' : 'bg-brand-green'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500 sm:text-sm">
          {score === 100 
            ? "You are a hard target. Well done." 
            : "You are vulnerable. Close the gaps."}
        </p>
      </div>

      <header className="space-y-3 pt-2">
        {/* RESPONSIVE TYPOGRAPHY: text-3xl on mobile, text-4xl on desktop */}
        <h1 className="text-3xl font-black text-brand-dark md:text-4xl">Paranoid Checklist</h1>
        <p className="text-base text-slate-600 md:text-lg">
          Passive defense is failure. Actively harden your digital life against attacks.
        </p>
      </header>

      {/* RESPONSIVE GRID:
          - Default (Mobile): 1 column (stack)
          - md (Tablets): 2 columns
          - Gap changes for better spacing on larger screens
      */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {checklistItems.map((item) => {
          const isChecked = completed.has(item.id);
          const Icon = item.icon;

          return (
            <article 
              key={item.id} 
              className={`group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 ${
                isChecked 
                  ? 'border-brand-green bg-brand-light shadow-none' 
                  : 'border-slate-200 bg-white shadow-sm hover:border-brand-green/50 hover:shadow-md'
              }`}
            >
              <label className="flex cursor-pointer items-start gap-4">
                {/* Custom Checkbox for better touch targets */}
                <div className="relative pt-1">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleItem(item.id)}
                    className="peer sr-only" // Hide default checkbox
                  />
                  <div className={`flex h-6 w-6 items-center justify-ZXcenter rounded-full border-2 transition-colors ${
                    isChecked ? 'border-brand-green bg-brand-green text-white' : 'border-slate-300 bg-transparent'
                  }`}>
                    {isChecked && <ShieldCheck size={14} />}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className={isChecked ? 'text-brand-dark' : 'text-slate-400'} />
                    <h2 className={`text-lg font-bold ${isChecked ? 'text-brand-dark' : 'text-slate-800'}`}>
                      {item.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
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