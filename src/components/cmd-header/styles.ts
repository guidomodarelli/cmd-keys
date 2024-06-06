export default /* css */`
:host {
  flex: 1;
  position: relative;
}
.search {
  padding: 1.25em;
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0px;
  border: none;
  appearance: none;
  font-size: 1.125em;
  background: transparent;
  caret-color: var(--cmd-accent-color);
  color: var(--cmd-text-color);
  outline: none;
  font-family: var(--cmd-font-family);
}
.search::placeholder {
  color: var(--cmd-placeholder-color);
}
.breadcrumb-list {
  padding: 1em 4em 0 1em;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  flex: initial;
}

.breadcrumb {
  background: var(--cmd-secondary-background-color);
  text-align: center;
  line-height: 1.2em;
  border-radius: var(--cmd-key-border-radius);
  border: 0;
  cursor: pointer;
  padding: 0.1em 0.5em;
  color: var(--cmd-secondary-text-color);
  margin-right: 0.5em;
  outline: none;
  font-family: var(--cmd-font-family);
}

.search-wrapper {
  display: flex;
  border-bottom: var(--cmd-separate-border);
}
`;
