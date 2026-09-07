const propertyName = "--site-header-height";

export const setSiteHeaderHeight = (height: number) => {
  document.documentElement.style.setProperty(propertyName, `${height}px`);
};

export const siteHeaderHeight = () => {
  const configured = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(propertyName),
  );
  if (configured > 0) return configured;
  return document.querySelector("header")?.getBoundingClientRect().height ?? 0;
};
