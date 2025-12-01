import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fallbackScams = [
  {
    id: 'fallback-whatsapp',
    category: 'WhatsApp Investment',
    title: 'Double-Your-Cash Rooms',
    description:
      'Scammers recycle screenshots of fake payouts to lure people into paying a “registration fee” before vanishing.',
    redFlags: ['Admins delete questions about CAC registration', 'Demands for urgent transfer to personal accounts'],
    preventionTips: 'Never pay upfront fees to strangers promising guaranteed doubling of funds.'
  },
  {
    id: 'fallback-grants',
    category: 'Fake Grants',
    title: 'Federal Youth Grant Scam',
    description:
      'Fraudsters impersonate government agencies on Facebook, offering ₦300k empowerment grants after “processing fees.” Tap to read the full breakdown.',
    redFlags: ['Requests for gift cards or POS charges', 'Grammar mistakes and unofficial email domains'],
    preventionTips: 'Confirm every grant on official .gov.ng websites or social handles before sharing personal details.'
  }
];

const fakeGrantInsight = {
  overview:
    'Scammers impersonate agencies like the CBN, Ministry of Humanitarian Affairs, and prominent figures to sell fake ₦20k-₦500k grants. They flood WhatsApp broadcasts and Facebook ads with doctored approval letters.',
  commonScams: [
    'Central Bank of Nigeria (CBN) Grants: Viral posts promise ₦475k–₦500k support but the CBN never disburses funds through unsolicited WhatsApp links.',
    'Ministry of Humanitarian Affairs “Child Support” Grants: Fake flyers request data capture fees for non-existent ₦50k stipends.',
    'TETFund Student Grants: Fraudulent broadcasts promise ₦20k academic grants to students after signup fees.',
    'Foundation Grants using notable Nigerians: The name and photo of former President Olusegun Obasanjo has been used to bait victims into paying ₦20k.'
  ],
  redFlags: [
    'Upfront charges labeled “processing”, “legal”, or “transfer” fees.',
    'Unsolicited messages via WhatsApp, Facebook, SMS, or Gmail/Yahoo accounts.',
    'Poor grammar, generic salutations, and lack of official domains (e.g., contact@agency.gov.ng).',
    'Artificial urgency such as “apply in 24 hours” or “guaranteed approval.”',
    'Zero verifiable web presence or references to past beneficiaries.'
  ],
  actions: [
    'Never pay fees or share BVN/OTP with unverified handlers.',
    'Cross-check every grant on the official government or foundation website.',
    'Report suspicious handles to the Nigerian Police Force Cybercrime Unit or EFCC as soon as you spot them.'
  ]
};

const ScamLibrary = () => {
  const [scams, setScams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [showFakeGrantInsight, setShowFakeGrantInsight] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/scams`);
        if (!response.ok) {
          throw new Error('Failed to fetch scams');
        }
        const data = await response.json();
        const fetchedScams = data.scams || [];
        if (fetchedScams.length === 0) {
          setIsFallback(true);
          setScams(fallbackScams);
        } else {
          setScams(fetchedScams);
        }
        if (!fetchedScams.some((scam) => /grant/i.test(`${scam.category} ${scam.title}`))) {
          setShowFakeGrantInsight(false);
        }
      } catch (error) {
        console.error('Failed to load scams', error);
        setIsFallback(true);
        setScams(fallbackScams);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (isLoading) {
    return <p>Loading library…</p>;
  }

  return (
    <section className="mx-auto max-w-5xl">
      <header className="mb-6 space-y-2">
        <h2 className="text-3xl font-bold text-brand-dark">Scam Library</h2>
        <p className="text-sm text-slate-600">Browse verified playbooks shared by the CyberSafe Naija community.</p>
        {isFallback && (
          <p className="rounded-xl bg-amber-50 px-4 py-2 text-sm text-amber-700">
            Live data is unavailable, showing trusted examples instead.
          </p>
        )}
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {scams.map((scam) => (
          <article
            key={scam.id}
            tabIndex={0}
            className="flex cursor-pointer flex-col rounded-2xl border border-brand-green/30 bg-white p-6 shadow transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
            onClick={() => {
              if ((scam.category && /grant/i.test(scam.category)) || /grant/i.test(scam.title)) {
                setShowFakeGrantInsight(true);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if ((scam.category && /grant/i.test(scam.category)) || /grant/i.test(scam.title)) {
                  setShowFakeGrantInsight(true);
                }
              }
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">{scam.category}</p>
            <h3 className="mt-2 text-xl font-bold text-brand-dark">{scam.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{scam.description || scam.summary}</p>
            {((scam.category && /grant/i.test(scam.category)) || /grant/i.test(scam.title)) && (
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">
                Tap to read full fake grant breakdown
              </p>
            )}
            {Array.isArray(scam.redFlags) && scam.redFlags.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">Red Flags</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {scam.redFlags.map((flag, index) => (
                    <li key={`${scam.id}-flag-${index}`}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}
            {scam.preventionTips && (
              <div className="mt-auto pt-4 text-sm text-brand-dark">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">Prevention Tips</p>
                <p className="mt-1 leading-relaxed text-slate-700">{scam.preventionTips}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      {showFakeGrantInsight && (
        <div className="mt-8 rounded-3xl border border-brand-green/30 bg-white p-6 shadow">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">Deep Dive</p>
              <h3 className="text-2xl font-bold text-brand-dark">Fake Grant Playbook</h3>
            </div>
            <button
              onClick={() => setShowFakeGrantInsight(false)}
              className="self-start rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-700">{fakeGrantInsight.overview}</p>

          <section className="mt-5 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-brand-dark">Common Fake Grant Scams in Nigeria</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {fakeGrantInsight.commonScams.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-dark">Red Flags to Watch</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {fakeGrantInsight.redFlags.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-dark">What To Do</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {fakeGrantInsight.actions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default ScamLibrary;
