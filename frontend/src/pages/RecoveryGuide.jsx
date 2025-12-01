import { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

const bankCodes = [
  { name: 'GTBank', code: '*737*51*10#' },
  { name: 'Zenith Bank', code: '*966*911#' },
  { name: 'UBA', code: '*919*10#' },
  { name: 'FirstBank', code: '*894*911#' },
  { name: 'Access Bank', code: '*901*911#' },
  { name: 'OPay', code: '*955*131#' }
];

const socialSteps = [
  {
    title: 'WhatsApp Recovery',
    steps: [
      'Uninstall WhatsApp immediately to log the scammer out.',
      'Reinstall, enter your number, and verify with OTP.',
      'If it requests a PIN you never set, the attacker enabled 2FA — wait 7 days for reset. The intruder is kicked out instantly.'
    ]
  },
  {
    title: 'Instagram Recovery',
    steps: [
      'Open Instagram > Login > Forgot password.',
      'Tap “Need more help?” and follow the prompts.',
      'Submit the video selfie verification so Meta can confirm you are the real owner.'
    ]
  }
];

const RecoveryGuide = () => {
  const [copiedBank, setCopiedBank] = useState('');

  const handleCopy = async (code, name) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedBank(name);
      setTimeout(() => setCopiedBank(''), 2500);
    } catch (error) {
      console.error('Unable to copy code', error);
    }
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 pb-16">
      <div className="rounded-3xl bg-red-600 p-8 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.4em]">Panic Button</p>
        <h1 className="mt-3 text-4xl font-black leading-tight">Just been scammed? Act NOW. Time is money.</h1>
        <p className="mt-3 text-lg text-red-50">
          Freeze the money trail, lock your accounts, and escalate to investigators within minutes. Start with your bank.
        </p>
      </div>

      <section className="space-y-5">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-green">Section 1</p>
          <h2 className="text-3xl font-bold text-brand-dark">Bank Distress Codes</h2>
          <p className="mt-2 text-slate-600">Dial the USSD below from the phone linked to your account. It instantly blocks transfers and cards.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {bankCodes.map((bank) => (
            <article key={bank.name} className="rounded-2xl border border-brand-green/30 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">{bank.name}</p>
                {copiedBank === bank.name && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-4 w-4" aria-hidden /> Copied
                  </span>
                )}
              </div>
              <p className="mt-3 text-2xl font-bold text-brand-dark">
                <code>{bank.code}</code>
              </p>
              <p className="mt-2 text-sm text-slate-500">Copy and dial immediately to freeze activity.</p>
              <button
                type="button"
                onClick={() => handleCopy(bank.code, bank.name)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
              >
                <Copy className="h-4 w-4" aria-hidden /> Copy Code
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-green">Section 2</p>
          <h2 className="text-3xl font-bold text-brand-dark">Social Media Recovery</h2>
          <p className="mt-2 text-slate-600">Kick scammers out of your WhatsApp or Instagram before they message more victims.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {socialSteps.map((item) => (
            <article key={item.title} className="rounded-2xl border border-brand-green/20 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-brand-dark">{item.title}</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
                {item.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-green">Section 3</p>
          <h2 className="text-3xl font-bold text-brand-dark">Report immediately</h2>
          <p className="mt-2 text-slate-600">Formal reports give investigators jurisdiction to trace accounts and shut networks down.</p>
        </header>
        <article className="rounded-3xl border border-brand-green/30 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-brand-dark">EFCC Eagle Eye App</h3>
          <p className="mt-3 text-base text-slate-600">
            Download <strong>Eagle Eye</strong> from your app store. Upload screenshots, receipts, transfer narration, account statements,
            and every phone number involved. Add a short timeline of events so EFCC officers can escalate quickly.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-brand-light p-4 text-sm text-slate-600">
              <p className="font-semibold text-brand-dark">Hotline</p>
              <p className="mt-1">+234 (0) 809 332 2644</p>
            </div>
            <div className="rounded-2xl bg-brand-light p-4 text-sm text-slate-600">
              <p className="font-semibold text-brand-dark">Email</p>
              <p className="mt-1">info@efcc.gov.ng</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm"
          >
            Open App Store &gt;
          </button>
        </article>
      </section>
    </section>
  );
};

export default RecoveryGuide;
