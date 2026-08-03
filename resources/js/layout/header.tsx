import { Link } from '@inertiajs/react';

const navLinks = [
    { label: 'Learn', id: 'learn' },
    { label: 'App', id: 'app-section' },
    { label: 'News Analyzer Tool', id: 'news-analyzer-tool' },
    { label: 'Browser Extension', id: 'browser-extension' },
];

const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    let offset = 120; // Default

    switch (id) {
        case 'learn':
            offset = 60; // Smaller offset (scrolls lower)
            break;

        case 'app-section':
            offset = 300; // Larger offset (scrolls higher)
            break;

        case 'news-analyzer-tool':
            offset = 260;
            break;

        case 'browser-extension':
            offset = 140;
            break;
    }

    const y =
        section.getBoundingClientRect().top +
        window.scrollY -
        offset;

    window.scrollTo({
        top: y,
        behavior: 'smooth',
    });

    window.history.replaceState({}, "", "/");
};

const primaryButton =
    "className=mb-16 rounded-lg border border-transparent bg-[#efe6dd] px-6 py-3 font-josefin text-base font-semibold text-[#231f20] transition-all duration-300 ease-in-out hover:rounded-3xl hover:bg-[#7EBDC2] hover:text-black";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#231f20] shadow-[0_4px_4px_rgba(239,230,221,0.04)]">
            <div className="mx-auto flex h-[100px] max-w-[1440px] items-center justify-between px-[100px]">
                <img
                    src="/images/milda.png"
                    alt="MILDA"
                    className="h-[34px] w-[160px] object-contain"
                />

                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className="relative font-josefin text-base text-[#efe6dd]
                                    transition-colors duration-300
                                    hover:text-[#7EBDC2]
                                    after:absolute after:left-1/2 after:-bottom-1
                                    after:h-[2px] after:w-0
                                    after:bg-[#7EBDC2]
                                    after:transition-all after:duration-300
                                    after:-translate-x-1/2 hover:after:w-full"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-8">
                    <a
                        href="/login"
                        className="relative font-josefin text-base text-[#efe6dd]
                                   transition-colors duration-300
                                   hover:text-[#7EBDC2]
                                   after:absolute after:left-1/2 after:-bottom-1
                                   after:h-[2px] after:w-0
                                   after:bg-[#7EBDC2]
                                   after:transition-all after:duration-300
                                   after:-translate-x-1/2 hover:after:w-full"
                    >
                        Login
                    </a>

                    <Link href="/milda" className={primaryButton}>
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}