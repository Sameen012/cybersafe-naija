const dictionaryTerms = [
  {
    term: 'Format',
    definition: 'The storyline or script a scammer uses to convince victims, such as the popular “Foreign Lover” promise of gifts stuck at customs.'
  },
  {
    term: 'Picker',
    definition: 'A collaborator who supplies the bank account that receives stolen or laundered money.'
  },
  {
    term: 'Magna / Maga',
    definition: 'Slang for the target or victim—the person the scammers are “working on.”'
  },
  {
    term: 'Loader',
    definition: 'A specialist who moves stolen funds across accounts until they disappear from traceable channels.'
  },
  {
    term: 'Urgent 2k',
    definition: 'A tactic where scammers beg for small sums under fake emergencies to test if a victim will send money.'
  },
  {
    term: 'Log',
    definition: 'A list of stolen credentials—usernames, passwords, PINs—ready to be exploited or sold.'
  }
];

const ScamDictionary = () => {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 pb-16">
      <header className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">Cybercrime Lexicon</p>
        <h1 className="text-4xl font-black text-brand-dark">Decode Nigerian scam slang</h1>
        <p className="text-lg text-slate-600">
          Learn the language scammers use so you can spot them mid-conversation and warn your community faster.
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl">
        <label className="flex items-center gap-3 rounded-2xl border border-brand-green/40 bg-white px-4 py-3 text-slate-500 shadow-sm">
          <span className="text-sm font-semibold uppercase tracking-[0.3em]">Search</span>
          <input
            type="text"
            placeholder="Type a word (visual only)"
            className="flex-1 border-none bg-transparent text-base text-brand-dark outline-none"
            readOnly
          />
        </label>
      </div>

      <div className="space-y-6 rounded-3xl border border-brand-green/30 bg-white p-6 shadow-sm">
        {dictionaryTerms.map((entry) => (
          <article key={entry.term} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green">A-Z</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-dark">{entry.term}</h2>
            <p className="mt-2 text-base text-slate-600">{entry.definition}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ScamDictionary;
