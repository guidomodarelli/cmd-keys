import { CmdHeaderEventType } from "../constants";

export class CloseEvent extends CustomEvent<undefined> {
  constructor() {
    super(CmdHeaderEventType.CLOSE, { bubbles: true, composed: true });
  }
}
