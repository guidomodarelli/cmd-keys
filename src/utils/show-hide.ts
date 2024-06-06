export type Display = "flex";

export const show = (htmlElement: HTMLElement, display: Display) => {
  htmlElement.style.display = display;
};

export const hide = (htmlElement: HTMLElement) => {
  htmlElement.style.display = "none";
};
