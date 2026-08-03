const assets = {
  logoFooter: 'https://www.figma.com/api/mcp/asset/9fdfc736-e4b7-4452-9e86-7ab73ffc1ff1',
  discord: 'https://www.figma.com/api/mcp/asset/647eed8e-41fc-4947-8c4b-4ada90ed323f',
  facebook: 'https://www.figma.com/api/mcp/asset/ff161459-f976-4c74-b5c2-5d151492db53',
  linkedin: 'https://www.figma.com/api/mcp/asset/66ad6d4c-d732-4e2e-8b03-2259f1061b81',
  instagram: 'https://www.figma.com/api/mcp/asset/040c5435-99d5-41e5-bd9f-5b5cda1ae921',
  footerDivider: 'https://www.figma.com/api/mcp/asset/e573cc96-b2dc-4fd1-a338-61c922943b5a',
};

const footerAbout = ['Learn', 'App', 'News Analyzer Tool', 'Browser Extension'];
const footerInfo = ['Terms & Condition', 'Privacy Policy', 'Help'];
const footerTeam = ['About Us', 'Goals'];

const socialIcons = {
  discord: assets.discord,
  facebook: assets.facebook,
  linkedin: assets.linkedin,
  instagram: assets.instagram,
};

export default function Footer() {
  return (
    <footer className="bg-[#231f20] px-[100px] py-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={assets.logoFooter}
              alt="MILDA"
              className="mb-6 h-16 w-auto object-contain"
            />
            <p className="max-w-[315px] font-['Josefin_Sans',sans-serif] text-2xl text-[#efe6dd]">
              Empowering users to navigate the digital age with confidence.
            </p>
          </div>

          <div>
            <h3 className="mb-6 font-['Josefin_Sans',sans-serif] text-xl font-semibold text-[#7ebdc2]">
              About
            </h3>
            <ul className="flex flex-col gap-6">
              {footerAbout.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Josefin_Sans',sans-serif] text-base text-[#efe6dd] hover:text-[#7ebdc2]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-['Josefin_Sans',sans-serif] text-xl font-semibold text-[#7ebdc2]">
              Information
            </h3>
            <ul className="flex flex-col gap-6">
              {footerInfo.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Josefin_Sans',sans-serif] text-base text-[#efe6dd] hover:text-[#7ebdc2]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-['Josefin_Sans',sans-serif] text-xl font-semibold text-[#7ebdc2]">
              Team
            </h3>
            <ul className="flex flex-col gap-6">
              {footerTeam.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Josefin_Sans',sans-serif] text-base text-[#efe6dd] hover:text-[#7ebdc2]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8 h-px w-full overflow-hidden">
          <img
            src={assets.footerDivider}
            alt=""
            className="h-px w-full object-cover"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <img src="/images/team-quantumX.png" alt="Team QuantumX" className="w-[100px]" />
            <p className="font-['Josefin_Sans',sans-serif] text-base text-[#efe6dd]">
              © 2026 MILDA. Team QuantumX. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {Object.entries(socialIcons).map(([name, src]) => (
              <a key={name} href="#" className="size-7 overflow-clip">
                <img src={src} alt={name} className="size-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}