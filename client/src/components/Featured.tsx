import { Link } from "wouter";

const frontImg = "https://imgx.openhomes.photo/q:60/https://cdn.openhomesphotography.com/uploads/2417-marti-rae-court.1f0a2f56-83ce-6d42-bbd2-02ffd8b76bfd/manualBatchUploads/web.1f0a2f56-83e5-6fb0-9dde-02ffd8b76bfd/pictures/2417-marti-rae-court.85419.www.01Front1.JPG?signature=f26e8cb2ca1d0567abb95da1a9182dbf158cc92fb3a563f1ab4f56ec1a482eb0";
const entryImg = "https://imgx.openhomes.photo/q:60/https://cdn.openhomesphotography.com/uploads/2417-marti-rae-court.1f0a2f56-83ce-6d42-bbd2-02ffd8b76bfd/manualBatchUploads/web.1f0a2f56-83e5-6fb0-9dde-02ffd8b76bfd/pictures/2417-marti-rae-court.85419.www.03Entry.JPG?signature=6de270ec8b322ab98b4352042d9b59dbbabfba50f4b6def20fa73125d951d0f4";
const livingImg = "https://imgx.openhomes.photo/q:60/https://cdn.openhomesphotography.com/uploads/2417-marti-rae-court.1f0a2f56-83ce-6d42-bbd2-02ffd8b76bfd/manualBatchUploads/web.1f0a2f56-83e5-6fb0-9dde-02ffd8b76bfd/pictures/2417-marti-rae-court.85419.www.05Liv2.JPG?signature=665f5ac7781ed8832c21e7d4936dfd7dbef83bf01ea85610208971313c48fea3";

export default function Featured() {
  return (
    <section className="py-24 bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 border-b border-primary/20 pb-6">
          <div>
            <span className="text-sm tracking-widest uppercase text-primary font-semibold block mb-2">Current Market</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">Featured Property</h2>
          </div>
          <Link href="#" className="text-sm tracking-widest uppercase hover:text-primary transition-colors hidden sm:block font-medium">
            View All Listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 group relative overflow-hidden cursor-pointer shadow-xl">
            <img src={frontImg} alt="2417 Marti Rae Court" className="w-full h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="bg-primary text-white text-xs tracking-widest uppercase px-4 py-2 self-start mb-4 shadow-sm">Just Listed</span>
              <h3 className="text-3xl md:text-4xl font-serif mb-2">2417 Marti Rae Court</h3>
              <p className="font-light tracking-wide text-lg text-white/90">Alameda, CA 94501</p>
            </div>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="h-[240px] lg:h-[288px] overflow-hidden group shadow-md">
               <img src={livingImg} alt="Living Room" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="h-[240px] lg:h-[288px] overflow-hidden group shadow-md">
               <img src={entryImg} alt="Entry Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
        
        <div className="mt-0 lg:-mt-24 bg-white p-8 lg:p-12 max-w-3xl border-t-4 border-primary shadow-2xl relative z-20 mx-4 lg:mx-12">
          <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-light">
            Tucked away on one of Alameda's most delightful little courts, this charming storybook bungalow brims with vintage character. Features a sunny living room with a cozy woodburning fireplace, hardwood floors throughout, and a generous eat-in kitchen perfect for entertaining. Just moments from Park Street's cafés and boutiques.
          </p>
          <a href="#" className="inline-block bg-transparent border border-primary text-primary px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300">
            View Full Details
          </a>
        </div>
      </div>
    </section>
  );
}
