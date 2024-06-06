export const Attributes = {
  PLACEHOLDER: "placeholder",
  HIDE_BREADCRUMBS: "hide-breadcrumbs",
  BREADCRUMB_HOME: "breadcrumb-home",
  BREADCRUMBS: "breadcrumbs",
} satisfies Record<string, Lowercase<string>>;

export const CmdHeaderEventType = {
  SET_PARENT: "set-parent",
  CHANGE: "change",
  CLOSE: "close",
} satisfies Record<string, Lowercase<string>>;
