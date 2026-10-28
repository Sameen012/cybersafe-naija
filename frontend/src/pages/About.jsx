import { ShieldCheck, Terminal, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="mx-auto max-w-5xl space-y-12 pb-20">
      
      {/* HERO BANNER WITH LINEAR GRADIENT */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-[#0a2318] to-slate-900 px-6 py-14 text-white shadow-2xl sm:px-12 sm:py-20">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-brand-green/20 to-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Student-Led Initiative 🇳🇬
          </div>

          <h1 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Born from a Student's Mission to Protect{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-200 bg-clip-text text-transparent">
              Everyday Nigerians.
            </span>
          </h1>

          <p className="text-base text-emerald-100/90 sm:text-xl leading-relaxed">
            I created <span className="font-semibold text-white">CyberSafe Naija</span> as a Nigerian cybersecurity student after watching hardworking friends, parents, students, and traders lose their life savings to calculated social engineering, fake grants, and digital attacks.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/simulator"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-transform hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
            >
              Try Defense Simulator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/recovery"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Emergency Bank Codes
            </Link>
          </div>
        </div>
      </div>

      {/* THE STORY: AUTHENTIC HUMAN NARRATIVE */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
            <Terminal className="h-4 w-4" /> The Story Behind The Code
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Why I Refused to Sit on the Sidelines
          </h2>

          <p>
            In Nigeria today, digital financial inclusion has grown at lightning speed. Mobile banking, POS agents, OPay, PalmPay, and WhatsApp have made money movement effortless. But that convenience created a massive attack surface.
          </p>

          <p>
            Scammers don't hack firewalls anymore — they hack <strong className="text-slate-900 font-bold">human psychology</strong>. They weaponize the urgency of a blocked BVN, exploit financial desperation with fake ₦250k Federal Grants, harvest card details at rogue POS terminals, and blackmail victims with predatory loan apps.
          </p>

          <p>
            As a student immersing myself in defensive security, network analysis, and threat intelligence, I realized that technical knowledge kept in university lecture halls saves no one. Nigerians needed practical, localized, zero-fluff defenses written in our language, addressing our reality.
          </p>

          <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/60 p-5 text-sm sm:text-base text-emerald-950">
            <p className="italic font-medium">
              "Cybersecurity is not just about writing code or locking servers. In our country, it is about keeping a mother’s shop capital safe, protecting a student’s school fees, and stopping fraudulent cartels from exploiting human trust."
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
              — Creator & Security Researcher, CyberSafe Naija
            </p>
          </div>
        </div>

        {/* PILLARS CARD & CYBER DEFENDER SHOWCASE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-xl bg-slate-950 group">
            <img
              src="/hero-cyber.webp"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://apollouniversity.edu.in/blog/wp-content/uploads/2025/09/2150061984.webp";
              }}
              alt="Cybersecurity battles and defensive posture"
              className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Cyber Defense Readiness</span>
              <p className="text-xs text-white font-medium mt-0.5">Defending everyday Nigerians in an era where every click carries risk.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              Our Core Principles
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Zero-Trust Instincts</h4>
                  <p className="text-slate-600 mt-1">Never verify callers through channels they initiate. Always independently verify with bank HQ or official .gov portals.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Rapid Incident Containment</h4>
                  <p className="text-slate-600 mt-1">The first 15 minutes decide whether stolen funds leave the banking switch. Our USSD distress codes dial instantly without internet.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Community Intelligence</h4>
                  <p className="text-slate-600 mt-1">When one Nigerian spots an active scam number or cloned format, reporting it protects millions across the nation.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">100% Free & Independent</h4>
                  <p className="text-slate-600 mt-1">Built purely as a public good and student portfolio project to give back to the Nigerian digital ecosystem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW TO COLLABORATE & CONTACT */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white sm:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
              <Users className="h-4 w-4" /> Academic & Community Collaboration
            </div>
            <h3 className="text-2xl font-black sm:text-3xl">Are you a fellow student, researcher, or dev?</h3>
            <p className="text-slate-300 text-sm sm:text-base">
              CyberSafe Naija is constantly evolving. If you have verified scam format data, honeypot scripts, or want to conduct cybersecurity awareness at your campus or community, let's join forces.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/report"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow hover:bg-emerald-400 transition-colors"
            >
              Submit Threat Intel
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
