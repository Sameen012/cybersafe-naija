const Footer = () => {
  return (
    <footer className="border-t border-brand-green/30 bg-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CyberSafe Naija. All rights reserved.</p>
        <p className="font-semibold text-brand-dark">Stay sharp. Report scams.</p>
      </div>
    </footer>
  );
};

export default Footer;
