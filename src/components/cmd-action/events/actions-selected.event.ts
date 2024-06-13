import { ICmdAction } from "src/interfaces/cmd-action.interface";
import { CmdActionEventType } from "../constants";

export class ActionsSelectedEvent extends CustomEvent<ICmdAction> {
  constructor(action: ICmdAction) {
    super(CmdActionEventType.ACTIONS_SELECTED, {
      detail: action,
      bubbles: true,
      composed: true,
    });
  }
}