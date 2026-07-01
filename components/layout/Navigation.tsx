import { navigationItems } from '@/lib/constants';

export function Navigation() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-6 text-sm font-medium uppercase tracking-[0.14em] text-brand-silver">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="transition hover:text-brand-white">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
