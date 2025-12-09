import { useState } from 'react';
import { AlertTriangle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// RUTHLESS INTEL: Define the attacks so users know exactly what hit them.
const SCAM_DEFINITIONS = {
  'WhatsApp Investment': {
    title: 'Ponzi / Doubling Scheme',
    description: 'You were added to a group or messaged by an "Admin" promising to double your money (e.g., "Invest 5k get 10k") in a short time. They usually ask for a deposit to "unlock" your profit.',
    indicators: ['Promises 100% returns in hours', 'Admins turn off group chat', 'Testimonials look fake/scripted']
  },
  'Fake Grants': {
    title: 'Government/NGO Impersonation',
    description: 'You received a message claiming you won a Federal Government or WHO grant (e.g., "Youth Empowerment"). They demand a "processing fee", "ID card fee", or "legal fee" before they can send the money.',
    indicators: ['Asking for a fee to receive money', 'Using unofficial gmail/yahoo emails', 'Urgency ("Apply Now or miss out")']
  },
  'Phishing': {
    title: 'Credential Harvesting',
    description: 'You got an SMS or Email claiming your Bank, OPay, or Social Media account is "Blocked" or "Needs Verification." It includes a link that steals your Password, PIN, or BVN.',
    indicators: ['Links that do not match the official website', 'Threats to block your account', 'Grammar/Spelling errors']
  },
  'Loan App Harassment': {
    title: 'Predatory Lending / Defamation',
    description: 'You borrowed money from a digital lender. Now they are threatening you, sending your photos to your contact list, or calling you a criminal/fraudster to force repayment.',
    indicators: ['Threatening messages', 'Contacting your family/friends', 'Posting your photo with "Wanted" labels']
  },
  'Crypto Pump': {
    title: 'Fake Exchange / Investment',
    description: 'Someone on Telegram/Twitter convinced you to invest in a specific Coin or Forex platform. You can see your "profit" on their website, but they demand more fees (Tax/Gas) when you try to withdraw.',
    indicators: ['You cannot withdraw without paying more', 'Strangers DMing you investment advice', 'Guaranteed profits']
  }
};

const ReportScam = () => {
  const [form, setForm] = useState({ scamType: '', contact: '', description: '' });
  const [status, setStatus] = useState(null);

  // Get the definition for the currently selected scam type
  const activeDefinition = SCAM_DEFINITIONS[form.scamType];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const normalizedContact = form.contact.trim();
      // Simple heuristic: if it contains http, it's a link; else assume phone
      const looksLikeLink = /^https?:\/\//i.test(normalizedContact);
      
      const payload = {
        scammerPhone: normalizedContact,
        scamLink: looksLikeLink ? normalizedContact : null,
        description: `${form.scamType ? `[${form.scamType}] ` : ''}${form.description}`.trim()
      };

      const response = await fetch(`${API_BASE}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Unable to submit report');
      }

      setForm({ scamType: '', contact: '', description: '' });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-brand-dark md:text-4xl">Report a Scam</h2>
        <p className="mt-2 text-slate-600">
          Your report helps us build the blacklist. Scammer numbers stay confidential until verified by our ruthless admins.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT COLUMN: THE FORM */}
        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-brand-green/30 bg-white p-6 shadow-lg md:p-8">
          
          {/* Dropdown with Scam Types */}
          <div>
            <label className="mb-1 block text-sm font-bold text-brand-dark">What type of attack was it?</label>
            <div className="relative">
              <select
                required
                name="scamType"
                value={form.scamType}
                onChange={handleChange}
                className="w-full appearance-none rounded-2xl border border-brand-green/40 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              >
                <option value="">Select a category...</option>
                {Object.keys(SCAM_DEFINITIONS).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {/* Custom arrow icon could go here */}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-brand-dark">Scammer's Phone Number or Link</label>
            <input
              required
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full rounded-2xl border border-brand-green/40 bg-slate-50 px-4 py-3.5 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              placeholder="e.g. 0802 000 1111 or https://bit.ly/fake-grant"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-brand-dark">What happened?</label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-brand-green/40 bg-slate-50 px-4 py-3.5 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              rows="5"
              placeholder="Please describe the conversation. Did they ask for a code? Did they promise 2x returns?"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green py-4 text-center font-bold text-white shadow-md transition-transform hover:-translate-y-1 hover:bg-emerald-700 disabled:opacity-70"
          >
            {status === 'loading' ? 'Encrypting & Submitting...' : 'Submit Report'}
            <ShieldAlert size={20} />
          </button>

          {status === 'success' && (
            <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-green-800">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">Report received. You are helping to secure Nigeria.</p>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-800">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">Network error. Please try again.</p>
            </div>
          )}
        </form>

        {/* RIGHT COLUMN: THE INTEL PANEL */}
        <div className="flex flex-col gap-6">
          {activeDefinition ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-6 md:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                  <Info size={14} />
                  Intel Brief
                </div>
                <h3 className="text-2xl font-black text-brand-dark">{activeDefinition.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {activeDefinition.description}
                </p>
                
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Key Indicators</p>
                  <ul className="mt-3 space-y-3">
                    {activeDefinition.indicators.map((indicator, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                          <AlertTriangle size={12} />
                        </span>
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // Default State: "Why Report?"
            <div className="hidden rounded-3xl border border-slate-100 bg-slate-50 p-8 text-center lg:block">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <ShieldAlert className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-700">Select a Category</h3>
              <p className="mt-2 text-sm text-slate-500">
                Choose a scam type from the list to see detailed indicators and confirm if it matches your experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReportScam;