import { Link } from 'react-router-dom';
import { scamHighlights } from '../data/scamContent.js';

const Home = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10">
      <div className="rounded-3xl bg-gradient-to-r from-brand-green to-emerald-700 p-10 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-light">CyberSmart Nigeria</p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
          Spot scams faster. Report suspicious numbers. Keep your naira safe.
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-emerald-100">
          CyberSafe Naija distills real stories from WhatsApp, Facebook, and SMS scams into easy lessons
          for families, SMEs, and student communities.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
          <Link
            to="/library"
            className="rounded-full bg-white px-6 py-3 text-brand-green transition hover:bg-emerald-100"
          >
            Browse Scam Library
          </Link>
          <Link
            to="/report"
            className="rounded-full border border-white/70 px-6 py-3 text-white hover:bg-white/10"
          >
            Report a Scam
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-brand-dark">Popular Playbooks</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {scamHighlights.map((highlight) => (
            <article key={highlight.id} className="rounded-2xl border border-brand-green/30 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-green">{highlight.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-brand-dark">{highlight.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{highlight.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
