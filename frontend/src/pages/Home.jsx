import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, BookOpen, FileText, Landmark, Users, Heart, 
  ArrowRight, Play, Search, AlertTriangle, Lock, CheckCircle2, 
  Sparkles, AlertOctagon, ChevronRight, PhoneCall 
} from 'lucide-react';
import PanicButton from '../components/PanicButton.jsx';

// Direct Image Addresses provided by the user
export const APOLLO_CYBER_IMAGE_URL = 'https://apollouniversity.edu.in/blog/wp-content/uploads/2025/09/2150061984.webp';
export const DREAMSTIME_ALERT_IMAGE_URL = 'https://thumbs.dreamstime.com/b/red-neon-warning-sign-exclamation-mark-inside-triangle-labeled-security-alert-against-high-tech-digital-background-393969815.jpg';


const SAMPLE_TEXTS = [
  {
    label: 'Fake BVN Block',
    text: 'Dear customer, your bank account has been blocked due to BVN mismatch. Call our dispute desk on 08021234567 immediately to verify or face total suspension.'
  },
  {
    label: 'FG Grant Scam',
    text: 'CONGRATULATIONS! You have been approved for the Presidential ₦250,000 Youth Empowerment Grant. Kindly pay ₦3,500 file processing fee to claim today.'
  },
  {
    label: 'WhatsApp Code',
    text: 'Bro urgent! An SMS verification code of 6 digits was sent to your phone by mistake for our alumni group. Forward it to me quickly so I can add you.'
  }
];

const Home = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Red-Flag Message Scanner State
  const [showScanner, setShowScanner] = useState(false);
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  const analyzeMessage = (textToAnalyze) => {
    const text = (textToAnalyze || inputText).toLowerCase();
    if (!text.trim()) return;

    const redFlags = [];
    let riskScore = 0;

    if (/(immediately|urgent|within 24|blocked|freeze|suspended|deactivate|arrest|police|efcc)/i.test(text)) {
      redFlags.push({
        title: 'Artificial Urgency & Fear',
        desc: 'Attackers create fake deadlines so you panic and skip verification before thinking.'
      });
      riskScore += 35;
    }

    if (/(fee|processing|clearance|grant|approved|winner|claim|congratulations|invest|double|200%|survival fund)/i.test(text)) {
      redFlags.push({
        title: 'Advance-Fee / Greed Bait',
        desc: 'Demanding payment to unlock free funds or promising unrealistic returns is classic advance-fee fraud.'
      });
      riskScore += 35;
    }

    if (/(bvn|nin|otp|code|pin|password|cvv|card number|verify your identity|forward the code)/i.test(text)) {
      redFlags.push({
        title: 'Credential Harvesting Attempt',
        desc: 'Demanding OTPs, BVN, or verification codes allows criminals to authorize transfers or steal accounts.'
      });
      riskScore += 40;
    }

    if (/(bit\.ly|tinyurl|wa\.me|t\.me|opay|palmpay|moniepoint|whatsapp)/i.test(text)) {
      redFlags.push({
        title: 'Unofficial / Obfuscated Channel',
        desc: 'Legitimate institutions communicate via verified domains, not shortened links or chat DMs.'
      });
      riskScore += 20;
    }

    setAnalysis({
      score: Math.min(riskScore, 100),
      redFlags,
      analyzedText: textToAnalyze || inputText
    });
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 pb-16">
      
      {/* FLOATING PANIC BUTTON FOR MOBILE DISTRESS */}
      <PanicButton />

      {/* HERO SECTION: MATCHING EXACT MOCKUP WITH APOLLO CYBER IMAGE */}
      <div className="relative overflow-hidden rounded-3xl bg-[#042419] text-white shadow-xl min-h-[460px] flex items-center">
        
        {/* Background Cyber Image from Apollo University */}
        <div 
          className="absolute inset-0 bg-cover bg-right md:bg-center opacity-40 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: "url('/hero-cyber.webp')" }}
        />

        {/* Deep Emerald Gradient Overlay matching mockup */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032015] via-[#04281b]/95 via-55% to-[#04281b]/40 pointer-events-none" />

        <div className="relative z-10 w-full px-6 py-10 sm:px-12 sm:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Left Column Content */}
          <div className="max-w-xl space-y-4">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-[#063b28]/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              <span>👋</span>
              <span>Welcome to CyberSafe Naija</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white">
              Smarter People.<br />
              <span className="text-emerald-400">Safer Nigeria.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-emerald-100/80 leading-relaxed max-w-lg">
              Get the latest scam alerts, learn how to stay safe online, and access practical tools to protect your money, accounts and personal information.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/library"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-500/25 transition-transform hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                <span>Explore Scam Library</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                to="/simulator"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                <Play className="h-3 w-3 fill-current text-white" />
                <span>Try the Scam Simulator</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Apollo Cyber Defense Image Showcase + Quick Tip */}
          <div className="w-full lg:max-w-md shrink-0 flex flex-col gap-3.5">
            {/* Apollo Cyber Security Image Showcase Card */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400/40 shadow-2xl bg-[#031c13] group">
              <img
                src="/hero-cyber.webp"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = APOLLO_CYBER_IMAGE_URL;
                }}
                alt="Cyber Security Defense in Action - Shielding Digital Citizens"
                className="w-full h-48 sm:h-56 object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042419] via-transparent to-transparent opacity-70 pointer-events-none" />
              
              {/* Floating Shield Status Badge */}
              <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/50 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero-Trust Shield</span>
              </div>

              {/* Bottom Tagline Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-emerald-100 bg-emerald-950/80 backdrop-blur-sm border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <span className="font-semibold text-emerald-300 text-[11px]">Nigerian Cyber Defense</span>
                <span className="text-[10px] text-emerald-200/80">Every Click is a Risk</span>
              </div>
            </div>

            {/* Quick Tip Card (Matching Mockup) */}
            <div className="rounded-2xl border border-emerald-500/30 bg-[#052b1e]/90 p-4 text-white shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Quick Defense Tip</span>
                </div>
                <Link 
                  to="/checklist" 
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="mt-2 text-xs text-emerald-100/90 leading-relaxed">
                Never share your OTP, PIN or bank details with anyone, no matter how convincing they sound.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 4 FEATURE CARDS GRID (EXACT MOCKUP) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Scam Library */}
        <Link
          to="/library"
          className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-300"
        >
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Scam Library</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Learn about common scams, warning signs and how to avoid them.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-700">
            <span>Browse Scams</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Card 2: Scam Simulator */}
        <Link
          to="/simulator"
          className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-300"
        >
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Scam Simulator</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Test your knowledge with real-life scenarios and see if you can spot the scam.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-700">
            <span>Try Simulator</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Card 3: Report Scam */}
        <Link
          to="/report"
          className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-300"
        >
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Report Scam</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Help others by reporting suspicious accounts, numbers or messages.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-700">
            <span>Submit a Report</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Card 4: Bank Emergency Codes */}
        <Link
          to="/recovery"
          className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-300"
        >
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Landmark className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Bank Emergency Codes</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Get quick access to bank USSD codes and help contacts.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-700">
            <span>View Codes</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

      </div>

      {/* HIGH-TECH RED NEON ALERT STRIP (MATCHING DREAMSTIME HIGH-TECH IMAGE) */}
      <div className="relative overflow-hidden rounded-2xl border border-red-500/50 shadow-xl bg-slate-950 text-white">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Prominent Dreamstime Red Neon Warning Graphic */}
            <div className="relative shrink-0 overflow-hidden rounded-xl border border-red-500/60 shadow-lg shadow-red-500/30 w-16 h-16 sm:w-20 sm:h-20 bg-black">
              <img
                src="/security-alert.jpg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DREAMSTIME_ALERT_IMAGE_URL;
                }}
                alt="High-Tech Red Neon Security Alert"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-red-950/80 border border-red-500/50 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-red-300">
                  <AlertTriangle className="h-3 w-3 text-red-400" />
                  Security Alert
                </span>
                <span className="text-[11px] text-red-400 font-semibold hidden sm:inline">• Immediate Containment Protocol</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Did you just send money to a scammer or lose WhatsApp?
              </h2>
              <p className="text-xs text-slate-300 max-w-xl">
                Dial verified USSD codes to freeze your accounts immediately before funds leave the NIBSS switch.
              </p>
            </div>
          </div>

          <Link
            to="/recovery"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all shrink-0 hover:scale-[1.02]"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Dial Distress USSD</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* INTERACTIVE SCANNER TOGGLE / WIDGET */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Instant Message Red-Flag Scanner</h2>
          </div>
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            {showScanner ? 'Hide Scanner' : 'Paste & Analyze Suspicious SMS / WhatsApp →'}
          </button>
        </div>

        {showScanner && (
          <div className="space-y-3 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">Quick test:</span>
              {SAMPLE_TEXTS.map((sample) => (
                <button
                  key={sample.label}
                  onClick={() => {
                    setInputText(sample.text);
                    analyzeMessage(sample.text);
                  }}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  {sample.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste suspicious text (e.g. 'Your BVN is blocked. Send ₦3,500 fee...')"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
              />
              <button
                onClick={() => analyzeMessage()}
                disabled={!inputText.trim()}
                className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-600 disabled:opacity-50"
              >
                Scan Now
              </button>
            </div>

            {analysis && (
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold">
                  {analysis.score >= 50 ? (
                    <span className="text-red-700 flex items-center gap-1">
                      <AlertOctagon className="h-4 w-4" /> High Risk Scam Pattern ({analysis.score}%)
                    </span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Low Automated Signals ({analysis.score}%)
                    </span>
                  )}
                </div>
                {analysis.redFlags.map((flag, i) => (
                  <p key={i} className="text-slate-600 pl-5">
                    • <strong>{flag.title}:</strong> {flag.desc}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM ROW (EXACT MOCKUP): "WHY CYBERSAFE NAIJA?" + "GET LATEST ALERTS" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Left Column: Why CyberSafe Naija? (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              {/* Green Nigeria shape icon placeholder */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <span className="text-base font-black">🇳🇬</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Why CyberSafe Naija?</h2>
            </div>
            
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              We're a community-driven platform focused on cybersecurity awareness and fraud prevention in Nigeria. Our goal is to help you stay informed, alert and safe in the digital world.
            </p>
          </div>

          {/* 4 Stats in a clean row (Matching Mockup) */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div>
              <div className="flex items-center gap-1.5 text-emerald-800 mb-1">
                <Users className="h-4 w-4" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900">1,240+</p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">Scam Formats Catalogued</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-emerald-800 mb-1">
                <Landmark className="h-4 w-4" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900">15</p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">Banks Listed</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-emerald-800 mb-1">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900">100%</p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">Free Access</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-emerald-800 mb-1">
                <Heart className="h-4 w-4 text-emerald-700 fill-emerald-700" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900">Built for</p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">Nigerians</p>
            </div>

          </div>
        </div>

        {/* Right Column: Get the Latest Scam Alerts (5 cols) (Matching Mockup) */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063323] via-[#052b1e] to-[#031d14] p-6 sm:p-8 text-white shadow-md flex flex-col justify-between">
          
          {/* Subtle Watermark Shield on the right */}
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
            <ShieldCheck className="h-48 w-48 text-emerald-400" />
          </div>

          <div className="relative z-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Get the Latest Scam Alerts</h2>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Stay informed about new fraud tactics, trending scams and important security updates.
            </p>
          </div>

          <div className="relative z-10 mt-6 space-y-3">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-xl bg-white px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-400 transition-colors shrink-0"
              >
                {subscribed ? 'Subscribed! ✅' : 'Subscribe'}
              </button>
            </form>

            <p className="flex items-center gap-1.5 text-[11px] text-emerald-200/70">
              <Lock className="h-3 w-3" />
              <span>We respect your privacy. No spam, ever.</span>
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Home;