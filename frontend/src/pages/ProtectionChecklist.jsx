import { useState } from 'react';

const checklistItems = [
  {
    id: '2fa-whatsapp',
    title: 'Enable 2FA on WhatsApp',
    guidance: 'Go to Settings > Account > Two-Step Verification. Set a six-digit PIN and add a recovery email.'
  },
  {
    id: 'forwarding',
    title: 'Check for forwarded SMS',
    guidance: 'Dial *#62# to see if your calls or SMS are routed elsewhere. Contact your network to disable anything suspicious.'
  },
  {
    id: 'bvn-safety',
    title: 'BVN safety reminder',
    guidance: 'Never share your BVN on WhatsApp or random online forms. Banks will not ask for it via DM.'
  },
  {
    id: 'permissions',
    title: 'Audit app permissions',
    guidance: 'Open phone settings. Revoke Contacts, SMS or Microphone access from apps that do not need it.'
  },
  {
    id: 'password-manager',
    title: 'Use a password vault',
    guidance: 'Adopt a password manager (like 1Password or Bitwarden) so every service has a unique, long passphrase.'
  },
  {
    id: 'bank-alerts',
    title: 'Turn on bank alerts',
    guidance: 'Enable in-app/device push and email alerts for transactions so you react within seconds.'
  },
  {
    id: 'contact-review',
    title: 'Review emergency contacts',
    guidance: 'Save your bank hotlines and EFCC Eagle Eye contact so you can escalate quickly.'
  }
];

const ProtectionChecklist = () => {
  const [completed, setCompleted] = useState(() => new Set());
  const score = Math.round((completed.size / checklistItems.length) * 100);

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
    <section className="mx-auto flex max-w-4xl flex-col gap-10 pb-20">
      <div className="sticky top-0 z-10 rounded-2xl border border-brand-green/40 bg-white/95 p-5 shadow-md backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">Safety Score</p>
        <div className="mt-3 h-3 w-full rounded-full bg-brand-light">
          <div
            className="h-full rounded-full bg-green-700 transition-all"
            style={{ width: `${score}%` }}
            aria-label={`${score} percent complete`}
          />
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-600">You are {score}% safe.</p>
      </div>

      <header className="space-y-3">
        <h1 className="text-4xl font-black text-brand-dark">Protection Checklist</h1>
        <p className="text-lg text-slate-600">
          Tap each box as you harden your accounts. Your goal is to reach 100% so scammers hit a dead end.
        </p>
      </header>

      <div className="space-y-6">
        {checklistItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-brand-green/30 bg-white p-6 shadow-sm">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={completed.has(item.id)}
                onChange={() => toggleItem(item.id)}
                className="mt-1 h-5 w-5 rounded border-brand-green text-green-700 focus:ring-green-700"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">Checklist</p>
                <h2 className="mt-1 text-2xl font-bold text-brand-dark">{item.title}</h2>
                <p className="mt-3 text-base text-slate-600">{item.guidance}</p>
              </div>
            </label>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProtectionChecklist;
