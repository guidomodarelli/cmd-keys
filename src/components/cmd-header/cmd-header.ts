import { SetParentEvent } from "./events/set-parent.event";
import { ChangeEvent } from "./events/change.event";
import styles from "./styles";
import { AttributesTypes, ButtonWithListenerRef } from "./types";
import { CloseEvent } from "src/components/cmd-header/events/close.event";
import { Attributes } from "./constants";

const template = document.createElement("template");

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <div class="search-wrapper">
    <label>
      <input
        type="text"
        id="search"
        spellcheck="false"
        autocomplete="off"
        class="search"
      />
    </label>
  </div>
`;

export class CmdHeader extends HTMLElement {
  private inputRef: HTMLInputElement;

  // This part is used to store each button along with its listener created, to later remove it when
  // disconnectedCallback is called.
  private buttonsRef: ButtonWithListenerRef[];

  override getAttribute(qualifiedName: AttributesTypes): string | null {
    return super.getAttribute(qualifiedName);
  }

  override setAttribute(qualifiedName: AttributesTypes, value: string): void {
    super.setAttribute(qualifiedName, value);
  }

  override dispatchEvent(
    event: ChangeEvent | SetParentEvent | CloseEvent
  ): boolean {
    return super.dispatchEvent(event);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this.inputRef = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    this.inputRef.addEventListener("input", this.handleInput);
    this.initInput();

    this.buttonsRef = [];
    this.handleChangeHideBreadcrumbs();
  }

  static get observedAttributes() {
    return [
      Attributes.PLACEHOLDER,
      Attributes.HIDE_BREADCRUMBS,
      Attributes.BREADCRUMB_HOME,
      Attributes.BREADCRUMBS,
    ];
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dispatchEvent(new ChangeEvent(input.value));
  }

  createButton(breadcrumb?: string) {
    const buttonWithListener: ButtonWithListenerRef = {
      button: document.createElement("button"),
      listener: () => this.selectParent(breadcrumb),
    };

    buttonWithListener.button.tabIndex = -1;
    buttonWithListener.button.classList.add("breadcrumb");
    buttonWithListener.button.textContent = breadcrumb ?? this.breadcrumbHome;
    buttonWithListener.button.addEventListener(
      "click",
      buttonWithListener.listener
    );

    this.buttonsRef.push(buttonWithListener);

    return buttonWithListener.button;
  }

  handleChangeHideBreadcrumbs() {
    let breadcrumbs: HTMLDivElement;
    if (!this.hideBreadcrumbs) {
      breadcrumbs = document.createElement("div");
      breadcrumbs.classList.add("breadcrumb-list");
      breadcrumbs.appendChild(this.createButton());

      for (const breadcrumb of this.breadcrumbs) {
        breadcrumbs.appendChild(this.createButton(breadcrumb));
      }
      this.shadowRoot?.prepend(breadcrumbs);
    }
  }

  attributeChangeCallback(name: string, oldValue: unknown, newValue: unknown) {
    if (oldValue !== newValue) {
      switch (name) {
        case Attributes.PLACEHOLDER:
          this.handleChangePlaceholder();
          break;
        case Attributes.HIDE_BREADCRUMBS: {
          this.handleChangeHideBreadcrumbs();
          break;
        }
        case Attributes.BREADCRUMB_HOME:
          break;
        case Attributes.BREADCRUMBS:
          break;
        default:
          break;
      }
    }
  }

  get placeholder() {
    return this.getAttribute(Attributes.PLACEHOLDER) ?? "Type here...";
  }

  set placeholder(_v : string) {
    // This is to avoid errors in the parent when using Typescript
  }

  get hideBreadcrumbs() {
    return this.getAttribute(Attributes.HIDE_BREADCRUMBS) === "true";
  }

  set hideBreadcrumbs(_v : boolean) {
    // This is to avoid errors in the parent when using Typescript
  }

  get breadcrumbHome() {
    return this.getAttribute(Attributes.BREADCRUMB_HOME) ?? "Home";
  }

  set breadcrumbHome(_v : string) {
    // This is to avoid errors in the parent when using Typescript
  }

  get breadcrumbs() {
    return (this.getAttribute(Attributes.BREADCRUMBS) ?? []) as string[];
  }

  set breadcrumbs(_v : string[]) {
    // This is to avoid errors in the parent when using Typescript
  }

  handleChangePlaceholder() {
    this.inputRef.placeholder = this.placeholder;
  }

  setSearch(value: string) {
    this.inputRef.value = value;
  }

  focusSearch() {
    requestAnimationFrame(() => {
      this.inputRef.focus();
    });
  }

  initInput() {
    this.handleChangePlaceholder();
    this.focusSearch();
  }

  private selectParent(breadcrumb?: string) {
    this.dispatchEvent(new SetParentEvent(breadcrumb));
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.dispatchEvent(new CloseEvent());
    this.inputRef.removeEventListener("input", this.handleInput);
    this.buttonsRef.forEach(({ button, listener }) => {
      button.removeEventListener("click", listener);
    });
  }
}

window.customElements.define("cmd-header", CmdHeader);
