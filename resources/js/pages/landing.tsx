import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';

const assets = {
  heroGrid: 'https://www.figma.com/api/mcp/asset/0af67c53-2ccb-451e-a905-0a3f38d41de2',
  heroScreenshot: 'https://www.figma.com/api/mcp/asset/3fbff731-3298-4c1d-828f-390e205d95b6',
  searchIcon: 'https://www.figma.com/api/mcp/asset/0fbc3f83-18ab-4173-a2ad-025b81431994',
  chevronDown: 'https://www.figma.com/api/mcp/asset/39d0d499-b825-46e6-80c5-41e03bddd883',
};

const sidebarLinks = [
  { label: 'Dashboard', image: '/images/dashboard.png' },
  { label: 'Course Modules', image: '/images/coursemodules.png' },
  { label: 'Badges', image: '/images/badges.png' },
  { label: 'Community', image: '/images/community.png' },
  { label: 'Fake News Detector', image: '/images/fakenewsdetector.png' },
];

const primaryButton =
    "className=mb-16 rounded-lg border border-transparent bg-[#efe6dd] px-6 py-3 font-josefin text-base font-semibold text-[#231f20] transition-all duration-300 ease-in-out hover:rounded-3xl hover:bg-[#7EBDC2] hover:text-black cursor-pointer";

export default function Landing() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  return (
    <>
      <Head title="MILDA — Learn. Verify. Share Responsibly." />

      <div className="min-h-screen w-full bg-white font-lato text-[#231f20]">
        <Header />

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#2a2425] pb-24 pt-[80px]">
          <img
            src={assets.heroGrid}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
            aria-hidden="true"
          />

          <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-[100px] text-center">
            <p className="mb-6 font-josefin text-base font-bold tracking-wide text-[#efe6dd]">
              LEARN • VERIFY • THINK CRITICALLY • SHARE RESPONSIBLY
            </p>

            <h1 className="mb-6 max-w-[862px] font-josefin text-4xl font-bold leading-tight text-[#efe6dd] md:text-5xl lg:text-[64px]">
              <span>Navigate </span>
              <span className="text-[#7ebdc2]">Information.</span>
              <br />
              <span>Master </span>
              <span className="text-[#7ebdc2]">Truth</span>
              <span> in the </span>
              <span className="text-[#7ebdc2]">AI Era.</span>
            </h1>

            <p className="mb-8 max-w-[861px] text-base leading-relaxed text-[#efe6dd]">
              Build the skills to identify misinformation, evaluate online sources, think critically, and communicate
              responsibly through interactive lessons designed for the digital age.
            </p>

            <Link
              href="/milda" 
              className="mb-16 rounded-lg border border-transparent bg-[#efe6dd] px-6 py-3 font-josefin text-base font-semibold text-[#231f20] transition-all duration-300 ease-in-out hover:rounded-3xl hover:bg-[#7EBDC2] hover:text-black cursor-pointer"
            >
              Try the Prototype
            </Link>

            <div className="relative w-full max-w-[1240px]">
                {/* Base image (rectangle) */}
                <img
                    src="/images/background.png"
                    alt="MILDA prototype preview"
                    className="h-auto w-full rounded-[20px] shadow-2xl"
                />

                {/* Image on top */}
                <img
                    src="/images/home.png"
                    alt=""
                    className="absolute left-1/2 top-1/2
                              w-[900px]
                              -translate-x-1/2 -translate-y-1/2
                              z-10"
                />
            </div>
          </div>
        </section>

        {/* Features / Learn */}
        <section className="overflow-hidden bg-[#2a2425] py-[88px]" id="learn">
          <div className="mx-auto max-w-[1440px] px-[100px]">
            <div className="mb-12 max-w-[505px]">
              <h2 className="mb-6 font-josefin text-4xl font-bold text-[#efe6dd] lg:text-[48px]">
                Learn with <span className="text-[#7ebdc2]">MILDA</span>
              </h2>
              <p className="text-base font-medium leading-relaxed text-[#efe6dd]">
                The global learning platform for Media &amp; Information Literacy. Gain critical skills to detect
                misinformation, evaluate digital media, understand AI algorithms, and lead responsible digital communities.
              </p>
            </div>

            <div className="flex flex-col gap-0 overflow-hidden rounded-[25px] lg:flex-row">
              <aside className="flex w-full flex-col gap-2 bg-[#2a2425] px-8 py-10 lg:w-[290px] lg:shrink-0">
                {sidebarLinks.map((item) => (
                  <button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveLink(item.label)}
                      className="group cursor-pointer flex items-center gap-3 text-left"
                  >
                    <span
                        className={`h-8 w-0.5 shrink-0 rounded-full transition-colors duration-300 ${
                            activeLink === item.label
                                ? 'bg-[#7ebdc2]'
                                : 'bg-transparent group-hover:bg-[#7ebdc2]'
                        }`}
                    />

                    <span
                        className={`text-base transition-colors duration-300 ${
                            activeLink === item.label
                                ? 'font-normal text-[#7ebdc2]'
                                : 'text-[#efe6dd] group-hover:text-[#7ebdc2]'
                        }`}
                    >
                        {item.label}
                    </span>
                  </button>
                ))}
              </aside>

              <div className="relative min-h-[485px] flex-1 overflow-hidden rounded-[25px] bg-[#2a2425] p-10 lg:p-12">
                <img
                  src="/images/background.png"
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
                  aria-hidden="true"
                />

                <img
                  src={sidebarLinks.find((item) => item.label === activeLink)?.image}
                  alt={`${activeLink} preview`}
                  className="relative z-10 h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* App Section */}
        <section className="bg-[#fff9f4] py-24">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-[100px] lg:flex-row">
            <div className="h-[487px] w-full max-w-[609px] shrink-0 rounded-lg bg-[#d9d9d9] lg:w-[609px]" />

            <div id="app-section" className="max-w-[505px]">
              <h2 className="mb-6 font-josefin text-4xl font-bold leading-tight lg:text-[48px]">
                <span className="text-[#231f20]">Learn </span>
                <span className="text-[#7ebdc2]">Anywhere</span>
                <span className="text-[#231f20]">, </span>
                <span className="text-[#7ebdc2]">Anytime</span>
                <span className="text-[#231f20]">, with </span>
                <span className="text-[#7ebdc2]">MILDA</span>
              </h2>
              <p className="mb-8 text-base font-medium leading-relaxed text-[#231f20]">
                Continue learning beyond the classroom with bite-sized lessons, real-world activities, and progress
                tracking designed to help you become a more informed digital citizen.
              </p>
              <button className={primaryButton}>
                  Download Now
              </button>
            </div>
          </div>
        </section>

        {/* Fake News Detector */}
        <section className="bg-[#fff9f4] pb-24 pt-8" id="news-analyzer-tool">
          <div className="mx-auto max-w-[1440px] px-[100px]">
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-josefin text-4xl font-bold text-[#231f20] lg:text-[48px]">
                Fake News Detector
              </h2>
              <p className="mx-auto max-w-[975px] text-base text-[#231f20]">
                Use AI-assisted guidance, source evaluation, and moderated community review.
              </p>
            </div>

            <div className="relative mx-auto max-w-[1030px]">
              <div className="flex h-[73px] items-center overflow-hidden rounded-[95px] border border-[#9a9a9a] bg-white pl-[188px] pr-[160px]">
                <p className="text-base text-[#707070]">Paste content to be reviewed here</p>
              </div>

              <div className="absolute left-5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full bg-white px-4 py-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#231f20]">Content Type</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-base text-[#707070]">Select</span>
                    <div className="size-[19px] overflow-clip">
                      <img src={assets.chevronDown} alt="" className="size-full" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="absolute right-[10px] top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-[66px] bg-[#afafaf] px-6 py-3.5"
              >
                <div className="size-6 overflow-clip">
                  <img src={assets.searchIcon} alt="" className="size-full" />
                </div>
                <span className="text-base font-semibold text-[#231f20]">Analyze</span>
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-[#707070]">
              AI guidance is advisory. Final status requires credible evidence and moderation.
            </p>
          </div>
        </section>

        {/* Browser Extension */}
        <section className="bg-[#fff9f4] py-24" id="browser-extension">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-[100px] lg:flex-row">
            <div className="max-w-[565px]">
              <h2 className="mb-6 font-josefin text-4xl font-bold leading-tight lg:text-[48px]">
                <span className="text-[#7ebdc2]">Think </span>
                <span className="text-[#231f20]">Before you Click. </span>
                <br />
                <span className="text-[#7ebdc2]">Verify </span>
                <span className="text-[#231f20]">Before you Share.</span>
              </h2>
              <p className="mb-8 text-base font-medium leading-relaxed text-[#231f20]">
                The MILDA browser extension helps you evaluate online content by detecting unreliable sources, highlighting
                credibility indicators, and encouraging responsible information sharing.
              </p>
              <button className={primaryButton}>
                Add to Chrome
            </button>
            </div>

            <div className="h-[487px] w-full max-w-[610px] shrink-0 rounded-lg bg-[#d9d9d9] lg:w-[610px]" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}