const neighborhoods = [
  { name: "Crocker Highlands", link: "/crocker-highlands-guide.html" },
  { name: "Trestle Glen", link: "/trestle-glen-guide.html" },
  { name: "Piedmont", link: "/piedmont-home-values.html" },
  { name: "Rockridge", link: "/rockridge-guide.html" },
  { name: "Temescal", link: "/temescal-guide.html" },
  { name: "Montclair", link: "/montclair-guide.html" },
  { name: "Oakmore–Glenview", link: "/oakmore-glenview-guide.html" },
  { name: "Sequoyah Hills", link: "/sequoyah-hills-market-report.html" },
  { name: "Berkeley Hills", link: "/berkeley-hills-guide.html" },
];

export default function NeighborhoodBar() {
  return (
    <div className="bg-[#f0f0f0] border-t border-border py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-evenly items-center gap-y-2">
          {neighborhoods.map((n) => (
            <a
              key={n.name}
              href={n.link}
              className="text-xs tracking-widest uppercase font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap px-2"
              data-testid={`neighborhood-bar-link-${n.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
            >
              {n.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
