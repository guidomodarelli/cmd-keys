import { CmdHeaderEventType } from "../types";

export class SetParentEvent extends CustomEvent<{ parent?: string }> {
  constructor(parent?: string) {
    super(CmdHeaderEventType.SET_PARENT, {
      detail: { parent },
      bubbles: true,
      composed: true,
    });
  }
}
