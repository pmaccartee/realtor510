const neighborhoods = [
  { name: "Crocker Highlands", link: "/neighborhood/crocker-highlands" },
  { name: "Trestle Glen", link: "/neighborhood/trestle-glen-guide" },
  { name: "Piedmont", link: "/neighborhood/piedmont-home-values" },
  { name: "Rockridge", link: "/neighborhood/rockridge-guide" },
  { name: "Temescal", link: "/neighborhood/temescal-guide" },
  { name: "Montclair", link: "/neighborhood/montclair-guide" },
  { name: "Oakmore–Glenview", link: "/neighborhood/oakmore-glenview-guide" },
  { name: "Sequoyah Hills", link: "/neighborhood/sequoyah-hills-market-report" },
  { name: "Berkeley Hills", link: "/neighborhood/berkeley-hills-guide" },
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
