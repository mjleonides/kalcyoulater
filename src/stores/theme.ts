import { computed, ref } from "vue";
import { defineStore } from "pinia";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "kalcyoulater-theme";
const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<Theme>("light");
  const hasManualThemeOverride = ref(false);
  const isInitialized = ref(false);

  let mediaQueryList: MediaQueryList | null = null;
  let removeMediaQueryListener: (() => void) | null = null;

  const getStoredTheme = (): Theme | null => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const storedTheme = window.sessionStorage.getItem(THEME_STORAGE_KEY);
      return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
    } catch {
      return null;
    }
  };

  const getSystemTheme = (): Theme => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return "light";
    }

    return window.matchMedia(DARK_MEDIA_QUERY).matches ? "dark" : "light";
  };

  const applyTheme = (nextTheme: Theme) => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.dataset.theme = nextTheme;
  };

  const setTheme = (nextTheme: Theme) => {
    theme.value = nextTheme;
    applyTheme(nextTheme);
  };

  const themeToggleLabel = computed(() =>
    theme.value === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );

  const themeToggleIcon = computed(() =>
    theme.value === "dark" ? "fa-solid fa-sun fa-xl" : "fa-solid fa-moon fa-xl",
  );

  const syncWithSystemTheme = (event: MediaQueryListEvent) => {
    if (hasManualThemeOverride.value) {
      return;
    }

    setTheme(event.matches ? "dark" : "light");
  };

  const initializeTheme = () => {
    const storedTheme = getStoredTheme();
    hasManualThemeOverride.value = Boolean(storedTheme);
    setTheme(storedTheme ?? getSystemTheme());

    if (isInitialized.value || typeof window === "undefined" || !window.matchMedia) {
      isInitialized.value = true;
      return;
    }

    mediaQueryList = window.matchMedia(DARK_MEDIA_QUERY);
    const legacyMediaQueryList = mediaQueryList as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };

    if ("addEventListener" in mediaQueryList) {
      mediaQueryList.addEventListener("change", syncWithSystemTheme);
      removeMediaQueryListener = () =>
        mediaQueryList?.removeEventListener("change", syncWithSystemTheme);
    } else {
      legacyMediaQueryList.addListener?.(syncWithSystemTheme);
      removeMediaQueryListener = () =>
        legacyMediaQueryList.removeListener?.(syncWithSystemTheme);
    }

    isInitialized.value = true;
  };

  const toggleTheme = () => {
    const nextTheme = theme.value === "dark" ? "light" : "dark";
    hasManualThemeOverride.value = true;
    setTheme(nextTheme);

    if (typeof window === "undefined") {
      return;
    }

    try {
      window.sessionStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage failures and still apply the selected theme.
    }
  };

  const cleanupTheme = () => {
    removeMediaQueryListener?.();
    removeMediaQueryListener = null;
    mediaQueryList = null;
    isInitialized.value = false;
  };

  return {
    theme,
    themeToggleIcon,
    themeToggleLabel,
    initializeTheme,
    toggleTheme,
    cleanupTheme,
  };
});
