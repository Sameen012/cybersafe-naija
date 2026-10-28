import { useState } from 'react';
import { Copy, CheckCircle2, Phone, Search, AlertTriangle, ShieldCheck, ExternalLink, ShieldAlert } from 'lucide-react';

const bankCodes = [
  { name: 'GTBank', code: '*737*51*10#', note: 'Blocks all transfers and cards instantly' },
  { name: 'Zenith Bank', code: '*966*911#', note: 'Dial from any phone, then enter account number' },
  { name: 'Access Bank', code: '*901*911#', note: 'Immediate USSD debit block' },
  { name: 'FirstBank', code: '*894*911#', note: 'Blocks account & USSD transactions' },
  { name: 'UBA', code: '*919*10#', note: 'Emergency account lock' },
  { name: 'OPay', code: '*955*131#', note: 'Freezes wallet on compromised devices' },
  { name: 'PalmPay', code: '*861*0#', note: 'Emergency USSD lock & customer freeze' },
  { name: 'Moniepoint', code: '*5573*911#', note: 'Business & personal wallet emergency block' },
  { name: 'Kuda Bank', code: '*894*911#', note: 'Lock card & login; contact help@kuda.com' },
  { name: 'Fidelity Bank', code: '*770*911#', note: 'Instant account freeze' },
  { name: 'FCMB', code: '*329*911#', note: 'Blocks internet and mobile banking' },
  { name: 'Stanbic IBTC', code: '*909*911#', note: 'Locks cards and mobile channels' },
  { name: 'Union Bank', code: '*826*911#', note: 'Emergency freeze code' },
  { name: 'Sterling Bank', code: '*822*911#', note: 'Instant account lock' },
  { name: 'Wema Bank / ALAT', code: '*945*911#', note: 'Emergency account & ALAT lock' }
];

const socialSteps = [
  {
    title: 'WhatsApp Account Takeover',
    steps: [
      'Uninstall WhatsApp immediately from your phone to force logout active desktop/web sessions.',
      'Reinstall from the official App Store or Google Play and enter your phone number.',
      'Verify using the 6-digit SMS OTP sent to your SIM card.',
      'If the scammer enabled Two-Step Verification (2FA PIN), wait out the 7-day period. Crucially, the hacker is kicked out of your account IMMEDIATELY the moment you enter the SMS OTP.'
    ]
  },
  {
    title: 'Instagram & Facebook Compromise',
    steps: [
      'Open Instagram > Login screen > Tap "Forgot password?"',
      'Select "Need more help?" and choose "My account was hacked".',
      'Submit the video selfie biometric verification so Meta facial AI can match you against your posted photos.',
      'Log into your email provider (Gmail/Yahoo) immediately and click "Sign out of all other web sessions".'
    ]
  }
];

const RecoveryGuide = () => {
  const [copiedBank, setCopiedBank] = useState('');
  const [bankSearch, setBankSearch] = useState('');

  const handleCopy = async (code, name) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedBank(name);
      setTimeout(() => setCopiedBank(''), 2500);
    } catch (error) {
      console.error('Unable to copy code', error);
    }
  };

  const filteredBanks = bankCodes.filter((b) =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
    b.code.includes(bankSearch)
  );

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 pb-20">
      
      {/* PANIC BANNER WITH EYE-CATCHING LINEAR GRADIENT */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-8 text-white shadow-2xl sm:p-12">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
            Immediate Incident Response
          </div>

          <h1 className="text-3xl font-black leading-tight sm:text-5xl">
            Under active attack? <span className="underline decoration-white/40">Act in minutes.</span>
          </h1>

          <p className="text-base text-red-50 sm:text-lg leading-relaxed">
            The first 15 to 30 minutes decide whether unauthorized debits can be recalled before scammers transfer funds through intermediary accounts (drops/pickers). Lock down your accounts below.
          </p>
        </div>
      </div>

      {/* STEP 1: BANK DISTRESS CODES (NO "SECTION 1") */}
      <section className="space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black">1</span>
              Immediate Containment
            </div>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">Bank Distress Codes (USSD)</h2>
            <p className="mt-1 text-sm text-slate-600">
              Dial these codes from any mobile phone to freeze your accounts and debit cards without internet.
            </p>
          </div>

          {/* Quick Bank Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={bankSearch}
              onChange={(e) => setBankSearch(e.target.value)}
              placeholder="Search bank (e.g. OPay, Zenith)..."
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
            />
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBanks.map((bank) => (
            <article
              key={bank.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">{bank.name}</p>
                  {copiedBank === bank.name && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Copied
                    </span>
                  )}
                </div>
                <p className="mt-3 text-2xl font-black tracking-wider text-slate-900">
                  <code className="bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">{bank.code}</code>
                </p>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{bank.note}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${encodeURIComponent(bank.code)}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" /> Dial Now
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(bank.code, bank.name)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STEP 2: SOCIAL & MESSAGING RECOVERY (NO "SECTION 2") */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black">2</span>
            Account Takeover
          </div>
          <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">Social Media & SIM Containment</h2>
          <p className="mt-1 text-sm text-slate-600">
            Kick scammers out of your WhatsApp and Instagram accounts before they message your contacts for money.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {socialSteps.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-emerald-600" />
                {item.title}
              </h3>
              <ol className="list-decimal space-y-2.5 pl-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {/* STEP 3: OFFICIAL LAW ENFORCEMENT ESCALATION (NO "SECTION 3") */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black">3</span>
            Legal Escalation
          </div>
          <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">Official Law Enforcement Channels</h2>
          <p className="mt-1 text-sm text-slate-600">
            Formal reports trigger official court freeze orders (Banker's Books Evidence Act) allowing banks to freeze recipient accounts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          
          {/* EFCC */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Financial Crimes</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">EFCC Eagle Eye</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Upload receipts, scammer account names, BVN, and conversation screenshots directly into the EFCC digital evidence vault.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <p><strong className="text-slate-800">Hotline:</strong> +234 809 332 2644</p>
              <p><strong className="text-slate-800">Email:</strong> info@efcc.gov.ng</p>
            </div>
          </div>

          {/* NPF CYBERCRIME */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-teal-700">Police Cyber Unit</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">NPF-NCCC Portal</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                The Nigeria Police Force National Cybercrime Centre investigates blackmail, phone hijacking, and identity theft rings.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <p><strong className="text-slate-800">Portal:</strong> cybercrime.npf.gov.ng</p>
              <p><strong className="text-slate-800">Email:</strong> report@cybercrime.npf.gov.ng</p>
            </div>
          </div>

          {/* CBN CONSUMER PROTECTION */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Banking Regulatory</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">CBN Consumer Protection</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Escalate if your commercial bank or fintech operator refuses to reverse unauthorized transfers or cooperate within 72 hours.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <p><strong className="text-slate-800">Email:</strong> cpd@cbn.gov.ng</p>
              <p><strong className="text-slate-800">Notice:</strong> Attach bank complaint ticket ID</p>
            </div>
          </div>

        </div>
      </section>

    </section>
  );
};

export default RecoveryGuide;
