import { CmdHeaderEventType } from "../types";

export class ChangeEvent extends CustomEvent<{ search: string }> {
  constructor(search: string) {
    super(CmdHeaderEventType.CHANGE, {
      // An additional detail is being provided to the event. In this case, the detail is an object with a property
      // called "search", whose value is the current value of the input element.
      detail: { search },
      // This indicates that the event will not propagate through the DOM hierarchy. In other words, the event will
      // not bubble up through the ancestors of the triggering element.
      bubbles: false,
      // This indicates that the event will not cross the boundaries of Shadow DOM. If the page uses Shadow DOM to
      // encapsulate the style and behavior of certain elements, this ensures that the event will not propagate
      // outside those boundaries.
      composed: false,
    });
  }
}
