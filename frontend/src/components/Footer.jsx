import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* COL 1: Brand & Student Story */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                CyberSafe <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Naija</span> 🇳🇬
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              An independent public safety initiative founded by a Nigerian cybersecurity student. Dedicated to inoculating citizens against financial fraud, social engineering, and identity theft.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              Built for the Nigerian Community
            </div>
          </div>

          {/* COL 2: Rapid Tools */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Defense Tools</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/simulator" className="transition-colors hover:text-emerald-600">
                  Interactive Threat Simulator
                </Link>
              </li>
              <li>
                <Link to="/recovery" className="font-semibold text-red-600 transition-colors hover:text-red-700">
                  🚨 Bank Distress Codes (USSD)
                </Link>
              </li>
              <li>
                <Link to="/dictionary" className="transition-colors hover:text-emerald-600">
                  Cybercrime Slang Lexicon
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="transition-colors hover:text-emerald-600">
                  Account Hardening Checklist
                </Link>
              </li>
              <li>
                <Link to="/library" className="transition-colors hover:text-emerald-600">
                  Scam Playbook Library
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: Initiative & Participation */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Community & Intel</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/report" className="transition-colors hover:text-emerald-600">
                  Submit Scam Incident
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-emerald-600">
                  About the Student Mission
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 transition-colors hover:text-slate-600">
                  Incident Response Dispatch
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: Official Emergency Contacts */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Official Hotlines</p>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                <p className="font-bold text-slate-900">EFCC Eagle Eye</p>
                <a href="tel:+2348093322644" className="text-emerald-700 font-medium hover:underline">
                  +234 809 332 2644
                </a>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                <p className="font-bold text-slate-900">NPF Cybercrime Centre</p>
                <p className="text-[11px] text-slate-500">report@cybercrime.npf.gov.ng</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM DISCLAIMER & COPYRIGHT */}
        <div className="mt-12 border-t border-slate-100 pt-6 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} CyberSafe Naija. Non-profit public interest cybersecurity platform.</p>
          <p className="text-[11px] text-slate-400 text-center sm:text-right">
            Zero-Trust • Community Defense • Digital Sovereignty
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
