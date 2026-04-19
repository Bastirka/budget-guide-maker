import { useLanguage } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card/60 backdrop-blur p-0.5">
      {LANGUAGES.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all ${
              active
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={active}
            aria-label={`Switch to ${l.label}`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};
