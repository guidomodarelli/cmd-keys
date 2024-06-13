export const styles = /*css*/ `
:host {
  display: flex;
  width: 100%;
}
.cmd-action {
  padding: 0.75em 1em;
  display: flex;
  border-left: 2px solid transparent;
  align-items: center;
  justify-content: start;
  outline: none;
  transition: color 0s ease 0s;
  width: 100%;
}
.cmd-action.selected {
  cursor: pointer;
  color: var(--cmd-selected-text-color);
  background-color: var(--cmd-selected-background);
  border-left: 2px solid var(--cmd-accent-color);
  outline: none;
}
.cmd-action.selected .cmd-icon {
  color: var(--cmd-selected-text-color);
}
.cmd-icon {
  font-size: var(--cmd-icon-size);
  max-width: var(--cmd-icon-size);
  max-height: var(--cmd-icon-size);
  margin-right: 1em;
  color: var(--cmd-icon-color);
  margin-right: 1em;
  position: relative;
}

.cmd-title {
  flex-shrink: 0.01;
  margin-right: 0.5em;
  flex-grow: 1;
  font-size: 0.8125em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cmd-hotkeys {
  flex-shrink: 0;
  width: min-content;
  display: flex;
}

.cmd-hotkeys kbd {
  font-family: inherit;
}
.cmd-hotkey {
  background: var(--cmd-secondary-background-color);
  padding: 0.06em 0.25em;
  border-radius: var(--cmd-key-border-radius);
  text-transform: capitalize;
  color: var(--cmd-secondary-text-color);
  font-size: 0.75em;
  font-family: inherit;
}

.cmd-hotkey + .cmd-hotkey {
  margin-left: 0.5em;
}
.cmd-hotkeys + .cmd-hotkeys {
  margin-left: 1em;
}
`;
