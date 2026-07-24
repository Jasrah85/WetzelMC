import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-black text-white">
            WETZEL <span className="text-orange-500">MC</span>
          </p>
          <p className="mt-2 text-sm">
            Wetzel Motorcycle Club
            <br />
            PO Box 891
            <br />
            Van Wert, Ohio 45891
          </p>
          <a href="mailto:wetzelmc1987@gmail.com" className="mt-2 block text-sm hover:text-white">
            wetzelmc1987@gmail.com
          </a>
        </div>
        <div>
          <p className="font-bold text-white text-sm uppercase tracking-wide">Quick Links</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/wetzelland" className="hover:text-white">Wetzelland 2026</Link></li>
            <li><Link href="/events" className="hover:text-white">Event Calendar</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/advertising" className="hover:text-white">Advertise with Us</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-white text-sm uppercase tracking-wide">Follow Us</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a href="https://www.facebook.com/wetzelland/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/wetzelland" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@wetzelland" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-4 text-center text-xs">
        © {new Date().getFullYear()} Wetzel M.C. All rights reserved.
      </div>
    </footer>
  );
}
