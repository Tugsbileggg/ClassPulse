import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { LOGIN_HREF, NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
          <div className="max-w-sm sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 leading-relaxed text-slate-600">
              Багш нарт зориулсан ангийн оролцооны ухаалаг туслах. Нууцлалыг эрхэмлэн, Монголын сургуулиудад
              зориулан бүтээв.
            </p>
          </div>

          <nav aria-label="Хөлийн цэс">
            <h2 className="text-sm font-semibold text-slate-900">Хуудас</h2>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-600 hover:text-brand-700">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={LOGIN_HREF} className="text-slate-600 hover:text-brand-700">
                  Нэвтрэх
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Холбоо барих</h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-flex items-center gap-2 font-medium break-all text-slate-700 hover:text-brand-700"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">© 2026 ClassPulse</p>
      </Container>
    </footer>
  );
}
