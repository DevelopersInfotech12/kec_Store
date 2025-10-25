'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${currentPath}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded ${
          locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('hi')}
        className={`px-3 py-1 rounded ${
          locale === 'hi' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        हिं
      </button>
    </div>
  );
}