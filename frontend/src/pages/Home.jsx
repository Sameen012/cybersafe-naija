import { Link } from 'react-router-dom';
import { ShieldAlert, BookOpen, Activity, Lock, AlertTriangle, ChevronRight } from 'lucide-react';
import { scamHighlights } from '../data/scamContent.js';
import BreachCheck from '../components/BreachCheck.jsx'; // RUTHLESS FEATURE
import PanicButton from '../components/PanicButton.jsx'; // RUTHLESS FEATURE

const stats = [
  { label: 'Scams Reported', value: '1,240+' },
  { label: 'Funds Protected', value: '₦550M' },
  { label: 'Active Defenders', value: '5,000+' }
];

const features = [
  {
    to: '/simulator',
    icon: Activity,
    title: 'Scam Simulator',
    desc: 'Test your instincts against an AI scammer bot.',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    to: '/dictionary',
    icon: BookOpen,
    title: 'Slang Dictionary',
    desc: 'Decode words like "Aza", "Picker", and "Loader".',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    to: '/checklist',
    icon: Lock,
    title: 'Safety Checklist',
    desc: 'Hardening protocols to secure your accounts.',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  }
];

const Home = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-12 pb-12">
      
      {/* 1. FLOATING PANIC BUTTON (Mobile Emergency) */}
      <PanicButton />

      {/* 2. HERO SECTION */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-dark px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16 md:text-left">
        {/* Abstract background pattern */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl"></div>
        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Live Threat Intel
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Don't be the next <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Maga.</span>
            </h1>
            <p className="text-lg text-emerald-100 sm:text-xl">
              Join Nigeria's ruthless defense network. Spot scams, report numbers, and harden your digital life before they strike.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                to="/library"
                className="rounded-full bg-brand-green px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-green/25 transition-transform hover:-translate-y-1 hover:bg-emerald-600"
              >
                Browse Library
              </Link>
              <Link
                to="/report"
                className="rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-dark shadow transition-transform hover:-translate-y-1 hover:bg-slate-50"
              >
                Report a Scam
              </Link>
            </div>
          </div>

          {/* Trust Stats for Desktop */}
          <div className="hidden grid-cols-1 gap-4 sm:grid md:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label} className="w-48 rounded-2xl bg-white/5 p-4 backdrop-blur border border-white/10">
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs font-medium text-emerald-200/70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. URGENT RECOVERY CTA (Panic Banner) */}
      <Link to="/recovery" className="group relative overflow-hidden rounded-3xl border border-red-100 bg-red-50 p-6 shadow-sm transition-all hover:border-red-200 hover:shadow-md">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Did you just send money to a scammer?</h3>
              <p className="text-sm text-red-700">Act immediately. Use our Recovery Guide to freeze accounts.</p>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-red-600 shadow-sm transition-colors group-hover:bg-red-600 group-hover:text-white">
            Start Recovery <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* 4. DARK WEB BREACH SCANNER (New Feature) */}
      <BreachCheck />

      {/* 5. TOOLBOX GRID */}
      <div>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-brand-dark">Defense Tools</h2>
          <p className="hidden text-sm font-semibold text-brand-green sm:block">Explore all features &rarr;</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.to}
                className={`group relative flex flex-col justify-between rounded-3xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${feature.color.replace('text-', 'bg-').split(' ')[0]} ${feature.color.split(' ').pop()} bg-opacity-30`}
              >
                <div>
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ${feature.color.split(' ')[1]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-6 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <ChevronRight className="h-4 w-4 text-slate-900" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 6. RECENT PLAYBOOKS */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-brand-dark">Recent Intel</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {scamHighlights.map((highlight) => (
            <article key={highlight.id} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-green/30 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">{highlight.category}</p>
                <ShieldAlert className="h-4 w-4 text-slate-300 group-hover:text-brand-green" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-brand-dark">{highlight.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{highlight.summary}</p>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Home;