import { ICmdAction } from "src/interfaces/cmd-action.interface";
import { Attributes } from "./constants";
import { ActionsSelectedEvent } from "./events/actions-selected.event";
import { styles } from "./styles";

const template = document.createElement("template");

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <div class="cmd-action">
    <div class="cmd-title"></div>
  </div>
`;

export class CmdAction extends HTMLElement {
  static get tag() {
    return "cmd-action";
  }

  private action!: ICmdAction;
  private selected = false;
  /**
   * Display hotkey as separate buttons on UI or as is
   */
  private hotKeysJoinedView = true;

  constructor() {
    super();
    this.addEventListener("click", this.click);
    this.render();
  }

  static get observedAttributes() {
    return [
      Attributes.ACTION,
      Attributes.SELECTED,
      Attributes.HOT_KEYS_JOINED_VIEW,
    ];
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    if (newValue !== oldValue) {
      switch (name) {
        case Attributes.SELECTED:
          this.ensureInView();
          break;
        default:
          break;
      }
    }
  }

  /**
   * Scroll to show element
   */
  ensureInView() {
    requestAnimationFrame(() => this.scrollIntoView({ block: "nearest" }));
  }

  override click() {
    this.dispatchEvent(new ActionsSelectedEvent(this.action));
  }

  getIcon() {
    let icon: string = "";
    if (this.action.mdIcon) {
      icon = /* html */ `
        <mwc-icon part="cmd-icon" class="cmd-icon">
          ${this.action.mdIcon}
        </mwc-icon>
      `;
    } else if (this.action.icon) {
      icon = this.action.icon || "";
    }
    return icon;
  }

  getHotkeys() {
    let hotkeys: string[] = [];
    if (this.action.hotkey) {
      if (this.hotKeysJoinedView) {
        hotkeys = this.action.hotkey.split(",").map((hotkeys) => {
          const keys = hotkeys.split("+");
          const mappedKeys = keys.map((key) => /* html */ `<kbd>${key}</kbd>`);
          const joinedKeys = mappedKeys.join("+");

          return /* html */ `
            <div class="cmd-hotkey cmd-hotkeys">
              ${joinedKeys}
            </div>
          `;
        });
      } else {
        hotkeys = this.action.hotkey.split(",").map((hotkeys) => {
          const keys = hotkeys.split("+");
          const mappedKeys = keys.map(
            (key) => /* html */ `<kbd class="cmd-hotkey">${key}</kbd>`
          );
          return /* html */ `<kbd class="cmd-hotkeys">${mappedKeys}</kbd>`;
        });
      }
    }
    return hotkeys.join(" ");
  }

  render() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    const classes = {
      selected: this.selected,
      "cmd-action": true,
    };

    for (const [key, value] of Object.entries(classes)) {
      if (value) {
        const cmd_action = this.shadowRoot?.querySelector(".cmd-action");
        cmd_action?.classList.add(key);
        cmd_action?.part.add("cmd-action")
        if (this.selected) {
          cmd_action?.part.add("cmd-selected")
        }
      }
    }

    const cmd_title = this.shadowRoot?.querySelector(".cmd-title") as Element;
    cmd_title.prepend(this.getIcon());
    cmd_title.innerHTML = this.action.title;
    cmd_title.append(this.getHotkeys());
  }
}

window.customElements.define(CmdAction.tag, CmdAction);
