import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SCAM_TYPES = ['WhatsApp Investment', 'Fake Grants', 'Phishing', 'Loan App Harassment', 'Crypto Pump'];

const ReportScam = () => {
  const [form, setForm] = useState({ scamType: '', contact: '', description: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const normalizedContact = form.contact.trim();
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
    <section className="mx-auto max-w-3xl">
      <h2 className="text-3xl font-bold text-brand-dark">Report a Scam</h2>
      <p className="mt-2 text-sm text-slate-600">Numbers stay confidential until verified by admins.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-3xl border border-brand-green/30 bg-white p-6 shadow-sm">
        <div>
          <label className="text-sm font-semibold text-brand-dark">Scam Type</label>
          <select
            required
            name="scamType"
            value={form.scamType}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-brand-green/40 px-4 py-3"
          >
            <option value="">Select scam category</option>
            {SCAM_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-brand-dark">Phone Number / Link</label>
          <input
            required
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-brand-green/40 px-4 py-3"
            placeholder="e.g. 0802 000 1111 or https://wa.me/08020001111"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-brand-dark">Description</label>
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-brand-green/40 px-4 py-3"
            rows="4"
            placeholder="Share what happened and any links provided"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-green py-3 text-center text-white font-semibold hover:bg-green-600"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Report'}
        </button>
        {status === 'success' && <p className="text-sm text-green-600">Report received. Thank you!</p>}
        {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Try again.</p>}
      </form>
    </section>
  );
};

export default ReportScam;
