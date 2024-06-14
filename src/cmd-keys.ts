import "./components/cmd-footer";
import "./components/cmd-header/cmd-header";
import { CMD_KEYS } from "./constants/constants";
import { styles } from "./base-styles";
import { ICmdAction } from "./interfaces/cmd-action.interface";
import hotkeys from "hotkeys-js";
import { CmdHeader } from "./components/cmd-header/cmd-header";
import { CmdAction } from "./components/cmd-action/cmd-action";

const template = document.createElement("template");

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <cmd-header />
`;

class CmdKey extends HTMLElement {
  static get tag() {
    return CMD_KEYS;
  }

  /**
   * Search placeholder text
   */
  placeholder = "Type a command or search...";

  /**
   * If true will register all hotkey for all actions
   */
  disableHotkeys = false;

  /**
   * Show or hide breadcrumbs on header
   */
  hideBreadcrumbs = false;

  /**
   * Open or hide shorcut
   */
  openHotkey = "cmd+k,ctrl+k";

  /**
   * Navigation Up hotkey
   */
  navigationUpHotkey = "up,shift+tab";

  /**
   * Navigation Down hotkey
   */
  navigationDownHotkey = "down,tab";

  /**
   * Close hotkey
   */
  closeHotkey = "esc";

  /**
   * Go back on one level if has parent menu
   */
  goBackHotkey = "backspace";

  /**
   * Select action and execute handler or open submenu
   */
  selectHotkey = "enter"; // enter,space

  /**
   * Show or hide breadcrumbs on header
   */
  hotKeysJoinedView = false;

  /**
   * Disable load material icons font on connect
   * If you use custom icons.
   * Set this attribute to prevent load default icons font
   */
  noAutoLoadMdIcons = false;

  /**
   * Array of actions
   */
  data: ICmdAction[] = [];

  /**
   * Show or hide element
   */
  visible = false;
  /**
   * Temproray used for animation effect. TODO: change to animate logic
   */
  private _bump = true;

  private _actionMatches: ICmdAction[] = [];

  private _search = "";

  private _currentRoot?: string;

  /**
   * Array of actions in flat structure
   */
  private _flatData: ICmdAction[] = [];

  private _selected?: ICmdAction;

  private get breadcrumbs(): string[] {
    const path: string[] = [];
    let parentAction = this._selected?.parent;
    if (parentAction) {
      path.push(parentAction);
      while (parentAction) {
        const action = this._flatData.find((a) => a.id === parentAction);
        if (action?.parent) {
          path.push(action.parent);
        }
        parentAction = action ? action.parent : undefined;
      }
    }
    return path.reverse();
  }

  private _headerRef: CmdHeader;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this._headerRef = this.shadowRoot?.querySelector("cmd-header") as CmdHeader;

    this._render();
  }

  private _render() {}

  private _actionFocused(index: ICmdAction, $event: MouseEvent) {
    // this.selectedIndex = index;
    this._selected = index;
    ($event.target as CmdAction).ensureInView();
  }

  private _onTransitionEnd() {
    this._bump = false;
  }

  private _actionSelected(action?: ICmdAction) {
    // fire selected event even when action is empty/not selected,
    // so possible handle api search for example
    this.dispatchEvent(
      /* FIXME */
      new CustomEvent("selected", {
        detail: { search: this._search, action },
        bubbles: true,
        composed: true,
      })
    );

    if (!action) {
      return;
    }

    if (action.children && action.children?.length > 0) {
      this._currentRoot = action.id;
      this._search = "";
    }

    this._headerRef.setSearch("");
    this._headerRef.focusSearch();

    if (action.handler) {
      const result = action.handler(action);
      if (!result?.keepOpen) {
        this.close();
      }
    }

    this._bump = true;
  }

  private get _selectedIndex(): number {
    if (!this._selected) {
      return -1;
    }
    return this._actionMatches.indexOf(this._selected);
  }

  private _goBack() {
    const parent =
      this.breadcrumbs.length > 1
        ? this.breadcrumbs[this.breadcrumbs.length - 2]
        : undefined;
    this.setParent(parent);
  }

  private isEveryChildren(
    children: ICmdAction["children"]
  ): children is ICmdAction[] {
    return children?.every((child) => !(typeof child === "string")) ?? false;
  }

  private _flattern(members: ICmdAction[], parent?: string): ICmdAction[] {
    let children: ICmdAction[] = [];
    if (!members) {
      members = [];
    }
    return members
      .map((cmdAction) => {
        const newCmdAction: ICmdAction = {
          ...cmdAction,
          parent: cmdAction.parent || parent,
        };

        if (!this.isEveryChildren(cmdAction.children)) {
          return newCmdAction;
        }

        // I know that every children is not string
        const newChildren = newCmdAction.children as ICmdAction[];

        if (newChildren && newChildren.length) {
          parent = cmdAction.id;
          children = [...children, ...newChildren];
        }

        newCmdAction.children = newChildren
          ? newChildren.map((child) => child.id)
          : [];

        return newCmdAction;
      })
      .concat(children.length ? this._flattern(children, parent) : children);
  }

  private async _handleInput(event: CustomEvent<{ search: string }>) {
    this._search = event.detail.search;
    // FIXME: await this.updateComplete;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { search: this._search, actions: this._actionMatches },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _overlayClick(event: Event) {
    if ((event.target as HTMLElement)?.classList.contains("modal")) {
      this.close();
    }
  }

  private _registerInternalHotkeys() {
    if (this.openHotkey) {
      hotkeys(this.openHotkey, (event) => {
        event.preventDefault();
        this.visible ? this.close() : this.open();
      });
    }

    if (this.selectHotkey) {
      hotkeys(this.selectHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        event.preventDefault();
        this._actionSelected(this._actionMatches[this._selectedIndex]);
      });
    }

    if (this.goBackHotkey) {
      hotkeys(this.goBackHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        if (!this._search) {
          event.preventDefault();
          this._goBack();
        }
      });
    }

    if (this.navigationDownHotkey) {
      hotkeys(this.navigationDownHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        event.preventDefault();
        if (this._selectedIndex >= this._actionMatches.length - 1) {
          this._selected = this._actionMatches[0];
        } else {
          this._selected = this._actionMatches[this._selectedIndex + 1];
        }
      });
    }

    if (this.navigationUpHotkey) {
      hotkeys(this.navigationUpHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        event.preventDefault();
        if (this._selectedIndex === 0) {
          this._selected = this._actionMatches[this._actionMatches.length - 1];
        } else {
          this._selected = this._actionMatches[this._selectedIndex - 1];
        }
      });
    }

    if (this.closeHotkey) {
      hotkeys(this.closeHotkey, () => {
        if (!this.visible) {
          return;
        }
        this.close();
      });
    }
  }

  connectedCallback() {
    if (!this.noAutoLoadMdIcons) {
      document.fonts.load("24px Material Icons", "apps").then(() => {});
    }

    this._registerInternalHotkeys();
  }

  private _unregisterInternalHotkeys() {
    if (this.openHotkey) {
      hotkeys.unbind(this.openHotkey);
    }

    if (this.selectHotkey) {
      hotkeys.unbind(this.selectHotkey);
    }

    if (this.goBackHotkey) {
      hotkeys.unbind(this.goBackHotkey);
    }

    if (this.navigationDownHotkey) {
      hotkeys.unbind(this.navigationDownHotkey);
    }

    if (this.navigationUpHotkey) {
      hotkeys.unbind(this.navigationUpHotkey);
    }

    if (this.closeHotkey) {
      hotkeys.unbind(this.closeHotkey);
    }
  }

  disconnectedCallback() {
    this._unregisterInternalHotkeys();
  }

  /******************
   * PUBLIC METHODS *
   ******************/

  /**
   * Navigate to group of actions
   * @param parent id of parent group/action
   */
  setParent(parent?: string) {
    if (!parent) {
      this._currentRoot = undefined;
      // this.breadcrumbs = [];
    } else {
      this._currentRoot = parent;
    }
    this._selected = undefined;
    this._search = "";
    this._headerRef.setSearch("");
  }

  /**
   * Show a modal
   */
  open(options: { parent?: string } = {}) {
    this._bump = true;
    this.visible = true;
    this._headerRef.focusSearch();
    if (this._actionMatches.length > 0) {
      this._selected = this._actionMatches[0];
    }
    this.setParent(options.parent);
  }

  /**
   * Close modal
   */
  close() {
    this._bump = false;
    this.visible = false;
  }
}

window.customElements.define(CmdKey.tag, CmdKey);
