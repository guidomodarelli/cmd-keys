export enum Attributes {
  PLACEHOLDER = "placeholder",
  HIDE_BREADCRUMBS = "hideBreadcrumbs",
  BREADCRUMB_HOME = "breadcrumbHome",
  BREADCRUMBS = "breadcrumbs",
}

export type AttributesTypes = `${Attributes}`;

export enum CmdHeaderEventType {
  SET_PARENT = "setParent",
  CHANGE = "change",
  CLOSE = "close",
}

export interface ButtonWithListenerRef {
  button: HTMLButtonElement;
  listener: (this: HTMLButtonElement, ev: MouseEvent) => any;
}