import "./components/cmd-footer";
import "./components/cmd-header/cmd-header";
import { CMD_KEYS } from "./constants/constants";
import { styles } from "./base-styles";
import { CmdHeader } from "./components/cmd-header/cmd-header";

const template = document.createElement("template");

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <cmd-header />
`;

class CmdKey extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const cmd_header = this.shadowRoot?.querySelector("cmd-header");
    if (cmd_header) {
      const cmdHeader = cmd_header as CmdHeader;
    }
  }
}

window.customElements.define(CMD_KEYS, CmdKey);
