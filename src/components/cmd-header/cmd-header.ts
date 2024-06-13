import { SetParentEvent } from "./events/set-parent.event";
import { ChangeEvent } from "./events/change.event";
import styles from "./styles";
import { AttributesTypes, ButtonWithListenerRef } from "./types";
import { CloseEvent } from "../../components/cmd-header/events/close.event";
import { Attributes } from "./constants";
import { parseBoolean } from "../../utils/parse-boolean.util";
import { parseList } from "../../utils/parse-list.util";
import { hide, show } from "../../utils/show-hide.util";

const template = document.createElement("template");

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <div class="breadcrumb-list"></div>
  <div part="cmd-input-wrapper" class="search-wrapper">
    <label>
      <input
        part="cmd-input"
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
  static get tag() {
    return "cmd-header";
  }

  static readonly PLACEHOLDER_DEFAULT = "Type here...";
  static readonly BREADCRUMB_HOME_DEFAULT = "Home";

  private inputRef: HTMLInputElement;

  private breadcrumbListParent: HTMLDivElement;

  // This part is used to store each button along with its listener created, to later remove it when
  // disconnectedCallback is called.
  private breadcrumbList: ButtonWithListenerRef[] = [];
  private breadcrumbButtonHome: ButtonWithListenerRef = this.createButton();

  override getAttribute(qualifiedName: AttributesTypes): string | null {
    return super.getAttribute(qualifiedName);
  }

  override setAttribute(qualifiedName: AttributesTypes, value: any): void {
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

    this.breadcrumbListParent = this.shadowRoot?.querySelector(
      ".breadcrumb-list"
    ) as HTMLDivElement;
    this.breadcrumbListParent.appendChild(this.breadcrumbButtonHome.button);
    this.addBreadcrumbs();
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
    buttonWithListener.button.textContent =
      breadcrumb ?? this.getBreadcrumbHome();
    buttonWithListener.button.addEventListener(
      "click",
      buttonWithListener.listener
    );

    return buttonWithListener;
  }

  handleChangePlaceholder(newValue?: string) {
    this.inputRef.placeholder = newValue ?? this.getPlaceholder();
  }

  handleChangeHideBreadcrumbs() {
    if (this.isBreadcrumbsHidden()) {
      hide(this.breadcrumbListParent);
    } else {
      show(this.breadcrumbListParent, "flex");
    }
  }

  handleChangeBreadcrumbHome() {
    this.breadcrumbButtonHome.button.textContent = this.getBreadcrumbHome();
  }

  handleChangeBreadcrumbs() {
    this.removeAllBreadcrumbs();
    this.addBreadcrumbs();
  }

  addBreadcrumbs() {
    const breadcrumbs = this.getBreadcrumbs();
    for (let i = 0, length = breadcrumbs.length; i < length; i++) {
      const newBreadcrumbButton = this.createButton(breadcrumbs[i]);
      this.breadcrumbList.push(newBreadcrumbButton);
      this.breadcrumbListParent.appendChild(newBreadcrumbButton.button);
    }
  }

  removeAllBreadcrumbs() {
    this.breadcrumbList.forEach(({ button, listener }) => {
      button.removeEventListener("click", listener);
      button.remove();
    });
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    if (newValue !== oldValue) {
      switch (name) {
        case Attributes.PLACEHOLDER:
          this.handleChangePlaceholder();
          break;
        case Attributes.HIDE_BREADCRUMBS: {
          this.handleChangeHideBreadcrumbs();
          break;
        }
        case Attributes.BREADCRUMB_HOME: {
          this.handleChangeBreadcrumbHome();
          break;
        }
        case Attributes.BREADCRUMBS: {
          this.handleChangeBreadcrumbs();
          break;
        }
        default:
          break;
      }
    }
  }

  getPlaceholder(): string {
    return (
      this.getAttribute(Attributes.PLACEHOLDER) ?? CmdHeader.PLACEHOLDER_DEFAULT
    );
  }

  setPlaceholder(newValue: string): void {
    this.setAttribute(Attributes.PLACEHOLDER, newValue);
  }

  isBreadcrumbsHidden(): boolean {
    return parseBoolean(this.getAttribute(Attributes.HIDE_BREADCRUMBS));
  }

  setHideBreadcrumbs(newValue: boolean): void {
    this.setAttribute(Attributes.HIDE_BREADCRUMBS, newValue);
  }

  toggleBreadcrumbs(): void {
    this.setHideBreadcrumbs(!this.isBreadcrumbsHidden());
  }

  getBreadcrumbHome(): string {
    return (
      this.getAttribute(Attributes.BREADCRUMB_HOME) ??
      CmdHeader.BREADCRUMB_HOME_DEFAULT
    );
  }

  setBreadcrumbHome(newValue: string): void {
    this.setAttribute(Attributes.BREADCRUMB_HOME, newValue);
  }

  getBreadcrumbs(): string[] {
    return parseList(this.getAttribute(Attributes.BREADCRUMBS));
  }

  setBreadcrumbs(newValue: string[]): void {
    this.setAttribute(Attributes.BREADCRUMBS, JSON.stringify(newValue));
  }

  addBreadcrumb(newValue: string, index?: number) {
    if (typeof index !== 'undefined' && index >= 0) {
      const newBreadcrumbs = [...this.getBreadcrumbs()];
      newBreadcrumbs.splice(index, 0, newValue);
      this.setBreadcrumbs(newBreadcrumbs);
    } else {
      this.setBreadcrumbs(this.getBreadcrumbs().concat(newValue));
    }
  }

  removeFirstBreadcrumb() {
    this.setBreadcrumbs(this.getBreadcrumbs().slice(1));
  }

  private removeLastBreadcrumb() {
    this.setBreadcrumbs(this.getBreadcrumbs().slice(0, -1));
  }

  removeBreadcrumb(index?: number) {
    const breadcrumbs = this.getBreadcrumbs();
    if (typeof index === 'undefined' || index >= breadcrumbs.length - 1) {
      this.removeLastBreadcrumb();
    } else if (index === 0) {
      this.removeFirstBreadcrumb();
    } else {
      this.setBreadcrumbs(
        breadcrumbs.filter((_, currentIndex) => index !== currentIndex)
      );
    }
  }

  setSearch(value: string): void {
    this.inputRef.value = value;
  }

  focusSearch(): void {
    requestAnimationFrame(() => {
      this.inputRef.focus();
    });
  }

  private initInput(): void {
    this.inputRef.addEventListener("input", this.handleInput);
    this.focusSearch();
  }

  private selectParent(breadcrumb?: string): void {
    this.dispatchEvent(new SetParentEvent(breadcrumb));
  }

  connectedCallback(): void {
    this.initInput();
    this.handleChangePlaceholder();
    this.handleChangeHideBreadcrumbs();
    this.handleChangeBreadcrumbHome();
  }

  disconnectedCallback(): void {
    this.dispatchEvent(new CloseEvent());
    this.inputRef.removeEventListener("input", this.handleInput);
    this.breadcrumbButtonHome.button.removeEventListener(
      "click",
      this.breadcrumbButtonHome.listener
    );
    this.removeAllBreadcrumbs();
  }
}

window.customElements.define(CmdHeader.tag, CmdHeader);
