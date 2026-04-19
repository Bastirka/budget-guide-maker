import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Lang, TranslationKey, translations } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "pricelab.lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "lv";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "lv" || stored === "en") return stored;
  const nav = window.navigator.language.toLowerCase();
  return nav.startsWith("lv") ? "lv" : "en";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => detectInitial());

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const dict = translations[lang] as Record<string, string>;
      return dict[key] ?? translations.lv[key] ?? key;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
