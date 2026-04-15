import { fireEvent, render, screen } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App.vue";

type MatchMediaChangeListener = (event: MediaQueryListEvent) => void;

let prefersDark = false;
const matchMediaListeners = new Set<MatchMediaChangeListener>();

const dispatchThemeChange = (nextPrefersDark: boolean) => {
  prefersDark = nextPrefersDark;
  const event = { matches: prefersDark } as MediaQueryListEvent;

  for (const listener of matchMediaListeners) {
    listener(event);
  }
};

describe("App", () => {
  beforeEach(() => {
    prefersDark = false;
    matchMediaListeners.clear();
    window.sessionStorage.clear();
    delete document.documentElement.dataset.theme;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: prefersDark,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addEventListener: (_eventName: string, listener: MatchMediaChangeListener) =>
          matchMediaListeners.add(listener),
        removeEventListener: (
          _eventName: string,
          listener: MatchMediaChangeListener,
        ) => matchMediaListeners.delete(listener),
        addListener: (listener: MatchMediaChangeListener) =>
          matchMediaListeners.add(listener),
        removeListener: (listener: MatchMediaChangeListener) =>
          matchMediaListeners.delete(listener),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("uses the system dark preference on first load", async () => {
    prefersDark = true;
    setActivePinia(createPinia());

    render(App, {
      global: {
        plugins: [createPinia()],
      },
    });

    await nextTick();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("uses the system light preference on first load", async () => {
    setActivePinia(createPinia());

    render(App, {
      global: {
        plugins: [createPinia()],
      },
    });

    await nextTick();
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles theme and stores the manual choice in session storage", async () => {
    setActivePinia(createPinia());

    render(App, {
      global: {
        plugins: [createPinia()],
      },
    });

    await fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.sessionStorage.getItem("kalcyoulater-theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("follows live system theme changes until the user overrides the theme", async () => {
    setActivePinia(createPinia());

    render(App, {
      global: {
        plugins: [createPinia()],
      },
    });

    dispatchThemeChange(true);
    await nextTick();
    expect(document.documentElement.dataset.theme).toBe("dark");

    await fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(document.documentElement.dataset.theme).toBe("light");

    dispatchThemeChange(true);
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
