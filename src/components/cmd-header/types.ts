import { Attributes } from "./constants";

export type AttributesTypes = (typeof Attributes)[keyof typeof Attributes];

export interface ButtonWithListenerRef {
  button: HTMLButtonElement;
  listener: (this: HTMLButtonElement, ev: MouseEvent) => any;
}
