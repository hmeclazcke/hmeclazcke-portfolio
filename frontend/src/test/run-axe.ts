import axe from "axe-core";

/**
 * axe's color-contrast rule relies on browser layout APIs unavailable in jsdom.
 * Rendered-browser review remains required for contrast validation.
 */
export function runAxe(context: Element) {
  return axe.run(context, {
    rules: {
      "color-contrast": { enabled: false },
    },
  });
}
