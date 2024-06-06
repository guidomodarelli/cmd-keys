import { Attributes } from "./constants";

export type AttributesTypes = `${Attributes}`;

export interface ButtonWithListenerRef {
  button: HTMLButtonElement;
  listener: (this: HTMLButtonElement, ev: MouseEvent) => any;
}