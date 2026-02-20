"use client"
import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="w-full bg-slate-900 text-white">
      {/* Top gradient divider (subtle, keeps same bg) */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand / short description */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              <div className="rounded-xl ">
                <Link href="/" className="block cursor-pointer">
                  <img
                    src="/images/logo_city_roam_tickets-transparent.png"
                    alt="City Rome Tickets"
                    className="h-25 w-auto md:h-22 sm:h-22"
                  />
                </Link>
              </div>
              <div className="flex items-center gap-3">

                <div>
                  <p className="text-xs text-white/60 tracking-[0.2em] uppercase mt-1">
                    {t.footer.toursTickets}
                  </p>
                </div>
              </div>

              <p className="text-sm text-white leading-relaxed max-w-md">
                {t.footer.tagline}
              </p>

              {/* Quick contact (compact + responsive) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href="mailto:cityrometickets@gmail.com"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <span className="h-9 w-9 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400">
                    <Mail size={18} />
                  </span>
                  <span className="text-sm text-white group-hover:text-white transition break-all">
                    cityrometickets@gmail.com
                  </span>
                </a>

                <a
                  href="tel:+337711048902"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <span className="h-9 w-9 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400">
                    <Phone size={18} />
                  </span>
                  <span className="text-sm text-white group-hover:text-white transition">
                    +33 771 104 8902
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-8">
            {/* Support */}
            <div>
              <h3 className="font-semibold text-sm tracking-widest uppercase text-white">
                {t.footer.support}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-white transition">
                    {t.footer.contact}
                  </Link>
                </li>
                <li>
                  <Link href="/legal-notice" className="text-white/80 hover:text-white transition">
                    {t.footer.legalNotice}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-white/80 hover:text-white transition">
                    {t.footer.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-white/80 hover:text-white transition">
                    {t.footer.terms}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-sm tracking-widest uppercase text-white">
                {t.footer.company}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/about-us" className="text-white/80 hover:text-white transition">
                    {t.footer.aboutUs}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Language (kept) */}
            {/* <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-sm tracking-widest uppercase text-white/90">
                Language
              </h3>
              <div className="mt-4">
                <select className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm border-none font-medium outline-none">
                  <option>English</option>
                  <option>Español</option>
                </select>
                <p className="text-xs text-white/50 mt-3 leading-relaxed">
                  Choose your preferred language for the best experience.
                </p>
              </div>
            </div> */}
          </div>

          {/* Small “location / note” card */}

        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/10" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60 text-center sm:text-left">
            © 2019 – 2026 City Rome Tickets.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Instagram"
            >
              <Instagram size={20} className="text-white/80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
