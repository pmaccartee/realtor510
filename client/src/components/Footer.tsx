export default function Footer() {
  return (
    <footer className="bg-foreground border-t border-white/10 text-white/50 py-16 text-center text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="font-serif text-2xl tracking-wider text-white mb-6 md:mb-0">
          PATRICK M<span className="text-sm align-top lowercase">AC</span>CARTEE
        </div>
        <div className="space-x-8 text-xs tracking-widest uppercase font-medium">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
