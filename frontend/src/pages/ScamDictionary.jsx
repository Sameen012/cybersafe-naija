import { useState } from 'react';
import { Search, BookOpen, X, ArrowUp } from 'lucide-react';

const dictionaryTerms = [
  {
    term: 'Aza',
    definition: 'Street slang for a bank account number. Often used in phrases like "Send your Aza" to receive stolen funds.'
  },
  {
    term: 'Benefits',
    definition: 'A scam format claiming the government is sharing money (e.g., "Federal Youth Grant"), usually requiring a "processing fee" to unlock it.'
  },
  {
    term: 'Billing',
    definition: 'The phase where a scammer actively demands money from a victim after establishing trust. E.g., "I have started billing the client."'
  },
  {
    term: 'Bombing',
    definition: 'Sending mass automated messages (SMS, Email, or WhatsApp) to thousands of numbers at once, hoping a few people will reply.'
  },
  {
    term: 'BVN Harvesting',
    definition: 'Collecting Bank Verification Numbers by tricking users into filling out fake "KYC" forms online.'
  },
  {
    term: 'Cashout',
    definition: 'The final stage of a fraud where the stolen digital money is successfully converted into physical cash.'
  },
  {
    term: 'CC / Fullz',
    definition: 'Stolen credit card details. "Fullz" refers to the full package: Card Number, CVV, Expiry, Name, Address, and sometimes Social Security Number.'
  },
  {
    term: 'Client',
    definition: 'The victim. Scammers dehumanize their targets by referring to them strictly as business clients.'
  },
  {
    term: 'Cloning',
    definition: 'Creating a fake social media profile that looks exactly like a real person (often a friend of the victim) to ask for urgent money.'
  },
  {
    term: 'Cookie',
    definition: 'A small file stolen from a victim’s browser that allows a hacker to bypass 2FA and log into accounts (Gmail, Facebook) without a password.'
  },
  {
    term: 'Dating Format',
    definition: 'A script used in romance scams. It involves fake photos, a fake backstory (often "military" or "engineer"), and a slow buildup of affection.'
  },
  {
    term: 'Drop',
    definition: 'The specific bank account provided to a victim to send money to. Scammers change "drops" frequently to avoid police tracking.'
  },
  {
    term: 'Fake Alert',
    definition: 'A manipulated SMS or app notification that makes it look like money has been credited to an account when no real transfer occurred.'
  },
  {
    term: 'Format',
    definition: 'The specific script or storyline a scammer uses (e.g., "Foreign Lover," "Oil Company Agent") to manipulate a victim.'
  },
  {
    term: 'G-Boy',
    definition: 'Slang for "Yahoo Boy" or internet fraudster. Derived from "G" for "Guy" or "Gangster".'
  },
  {
    term: 'Giveaway',
    definition: 'A trap where scammers promise free money or iPhones on Twitter/Instagram but ask for a small "delivery fee" first.'
  },
  {
    term: 'Hushpuppi',
    definition: 'Refers to a high-profile, flashy lifestyle funded by fraud, named after the convicted fraudster Ramon Abbas.'
  },
  {
    term: 'Invest',
    definition: 'A keyword often used in Ponzi schemes (e.g., "Invest 5k to get 10k in 45 minutes").'
  },
  {
    term: 'Jazz / Juju / Soap',
    definition: 'Metaphysical or ritualistic practices some scammers believe give them luck or "command" over victims.'
  },
  {
    term: 'Loader',
    definition: 'A specialist who moves stolen funds through complex digital channels (crypto, multiple transfers) to hide the trail.'
  },
  {
    term: 'Log',
    definition: 'Stolen login credentials (username + password) for banks, shops, or social media, often bought and sold on underground markets.'
  },
  {
    term: 'Love Bombing',
    definition: 'Overwhelming a victim with affection, compliments, and attention early in a romance scam to gain trust quickly.'
  },
  {
    term: 'Maga / Mayi',
    definition: 'Derogatory slang for the victim. Specifically, someone considered gullible or easy to manipulate.'
  },
  {
    term: 'Middleman',
    definition: 'An intermediary used during P2P crypto transactions or illicit deals to hold funds in escrow.'
  },
  {
    term: 'Mixer',
    definition: 'A service used to "mix" tainted cryptocurrency with clean coins to make it impossible to trace on the blockchain.'
  },
  {
    term: 'OTP (One Time Password)',
    definition: 'The 6-digit code banks send you. Scammers call asking for this code to "verify" your account, but actually use it to steal it.'
  },
  {
    term: 'Picker',
    definition: 'A collaborator who supplies the bank account to receive stolen money and withdraws the physical cash for the main scammer.'
  },
  {
    term: 'Phishing',
    definition: 'Sending fake emails (e.g., "Your Netflix is expired") to trick users into clicking a link and entering their password.'
  },
  {
    term: 'Plug',
    definition: 'A vendor who sells tools for crime, such as fake foreign numbers, VPNs, or stolen credit card data.'
  },
  {
    term: 'POS Fraud',
    definition: 'When an agent uses a skimming device or distracts a customer to copy their ATM card details or swap their card.'
  },
  {
    term: 'Rate',
    definition: 'The exchange rate used when converting stolen gift cards (iTunes, Steam, Amazon) into Naira.'
  },
  {
    term: 'RDP (Remote Desktop)',
    definition: 'A tool that allows a scammer in Nigeria to control a computer in the USA, making it look like they are physically located there.'
  },
  {
    term: 'Runs',
    definition: 'General slang for a deal, hustle, or illegal scheme. "I have a runs" means "I have a potential fraud opportunity."'
  },
  {
    term: 'Script',
    definition: 'A pre-written dialogue document that tells the scammer exactly what to say for every possible reply a victim gives.'
  },
  {
    term: 'Sim Swap',
    definition: 'Bribing telecom agents or using fake ID to register a victim’s phone number on a new SIM card to intercept their bank alerts.'
  },
  {
    term: 'Spamming',
    definition: 'The act of sending unsolicited emails or messages to a large list of contacts to find potential victims.'
  },
  {
    term: 'Sure Odds',
    definition: 'Fake sports betting predictions sold for a fee, promising a "100% guarantee" of winning.'
  },
  {
    term: 'Update',
    definition: 'New information or a new method for committing fraud. Scammers ask each other "Any update?" to learn new tricks.'
  },
  {
    term: 'Urgent 2k',
    definition: 'A low-level tactic where scammers beg for small amounts of money under the guise of an immediate emergency.'
  },
  {
    term: 'Vendor',
    definition: 'Someone who buys stolen assets (like Gift Cards or Bitcoin) from scammers and pays them in local currency.'
  },
  {
    term: 'VPN (Virtual Private Network)',
    definition: 'Software used to hide a scammer’s real location (IP address), making them appear to be in the US or UK.'
  },
  {
    term: 'Wire',
    definition: 'Refers to a Wire Transfer. "The wire has landed" means a large bank transfer has successfully arrived.'
  },
  {
    term: 'Yahoo Yahoo',
    definition: 'The most common Nigerian term for internet fraud.'
  },
  {
    term: 'Yahoo Plus',
    definition: 'Internet fraud that involves ritualistic elements (fetish) to supposedly charm victims.'
  }
];

const ScamDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // FILTER LOGIC: Updates the list automatically as you type
  const filteredTerms = dictionaryTerms.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => setSearchTerm('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-20">
      
      {/* HEADER SECTION */}
      <header className="space-y-4 pt-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
          <BookOpen className="h-7 w-7" />
        </div>
        <h1 className="text-4xl font-black text-brand-dark md:text-5xl">Cybercrime Lexicon</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          The comprehensive A-Z guide to the slang, codes, and formats used by scammers. 
          <span className="font-semibold text-brand-green"> {dictionaryTerms.length} terms decoded.</span>
        </p>
      </header>

      {/* STICKY SEARCH BAR */}
      <div className="sticky top-4 z-30 mx-auto w-full max-w-xl">
        <div className="relative group shadow-xl rounded-full bg-white transition-all hover:shadow-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-green" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search slang (e.g. 'Loader', 'Aza')..."
            className="block w-full rounded-full border-0 bg-transparent py-4 pl-12 pr-12 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-green sm:text-base sm:leading-6"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-red-500 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((entry) => (
            <article 
              key={entry.term} 
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="h-1 w-8 rounded-full bg-brand-green/20 group-hover:bg-brand-green/50 transition-colors"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-green">
                  Def
                </span>
              </div>
              <h2 className="text-2xl font-bold text-brand-dark group-hover:text-brand-green transition-colors">
                {entry.term}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {entry.definition}
              </p>
            </article>
          ))
        ) : (
          // EMPTY STATE
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-slate-500">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
              <Search className="h-8 w-8 opacity-40" />
            </div>
            <p className="text-lg font-medium">No results found for "{searchTerm}"</p>
            <p className="text-sm">Try checking your spelling or search for a different keyword.</p>
            <button 
              onClick={clearSearch}
              className="mt-4 rounded-full bg-brand-light px-6 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-green/20 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* SCROLL TO TOP BUTTON (Visible only when filtering or lots of scrolling happens) */}
      <div className="mt-8 flex justify-center">
        <button 
          onClick={scrollToTop}
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition-all hover:border-brand-green hover:text-brand-green hover:shadow-md"
        >
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          Back to Top
        </button>
      </div>
    </section>
  );
};

export default ScamDictionary;