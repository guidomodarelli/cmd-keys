export const styles = /* css */ `
:host {
  --cmd-width: 640px;
  --cmd-backdrop-filter: none;
  --cmd-overflow-background: rgba(255, 255, 255, 0.5);
  --cmd-text-color: rgb(60, 65, 73);
  --cmd-font-size: 16px;
  --cmd-top: 20%;

  --cmd-key-border-radius: 0.25em;
  --cmd-accent-color: rgb(110, 94, 210);
  --cmd-secondary-background-color: rgb(239, 241, 244);
  --cmd-secondary-text-color: rgb(107, 111, 118);

  --cmd-selected-background: rgb(248, 249, 251);

  --cmd-icon-color: var(--cmd-secondary-text-color);
  --cmd-icon-size: 1.2em;
  --cmd-separate-border: 1px solid var(--cmd-secondary-background-color);

  --cmd-modal-background: #fff;
  --cmd-modal-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;

  --cmd-actions-height: 300px;
  --cmd-group-text-color: rgb(144, 149, 157);

  --cmd-footer-background: rgba(242, 242, 242, 0.4);

  --cmd-placeholder-color: #8e8e8e;

  font-size: var(--cmd-font-size);

  --cmd-z-index: 1;
}

:host(.dark) {
  --cmd-backdrop-filter: none;
  --cmd-overflow-background: rgba(0, 0, 0, 0.7);
  --cmd-text-color: #7d7d7d;

  --cmd-modal-background: rgba(17, 17, 17, 0.85);
  --cmd-accent-color: rgb(110, 94, 210);
  --cmd-secondary-background-color: rgba(51, 51, 51, 0.44);
  --cmd-secondary-text-color: #888;

  --cmd-selected-text-color: #eaeaea;
  --cmd-selected-background: rgba(51, 51, 51, 0.44);

  --cmd-icon-color: var(--cmd-secondary-text-color);
  --cmd-separate-border: 1px solid var(--cmd-secondary-background-color);

  --cmd-modal-shadow: 0 16px 70px rgba(0, 0, 0, 0.2);

  --cmd-group-text-color: rgb(144, 149, 157);

  --cmd-footer-background: rgba(30, 30, 30, 85%);
}

.modal {
  display: none;
  position: fixed;
  z-index: var(--cmd-z-index);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--cmd-overflow-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-backdrop-filter: var(--cmd-backdrop-filter);
  backdrop-filter: var(--cmd-backdrop-filter);
  text-align: left;
  color: var(--cmd-text-color);
  font-family: var(--cmd-font-family);
}
.modal.visible {
  display: block;
}

.modal-content {
  position: relative;
  top: var(--cmd-top);
  margin: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  -webkit-box-flex: 1;
  flex-grow: 1;
  min-width: 0px;
  will-change: transform;
  background: var(--cmd-modal-background);
  border-radius: 0.5em;
  box-shadow: var(--cmd-modal-shadow);
  max-width: var(--cmd-width);
  overflow: hidden;
}

.bump {
  animation: zoom-in-zoom-out 0.2s ease;
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(0.99);
  }
  50% {
    transform: scale(1.01, 1.01);
  }
  100% {
    transform: scale(1, 1);
  }
}

.cmd-github {
  color: var(--cmd-keys-text-color);
  font-weight: normal;
  text-decoration: none;
}

.actions-list {
  max-height: var(--cmd-actions-height);
  overflow: auto;
  scroll-behavior: smooth;
  position: relative;
  margin: 0;
  padding: 0.5em 0;
  list-style: none;
  scroll-behavior: smooth;
}

.group-header {
  height: 1.375em;
  line-height: 1.375em;
  padding-left: 1.25em;
  padding-top: 0.5em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.75em;
  line-height: 1em;
  color: var(--cmd-group-text-color);
  margin: 1px 0;
}

.modal-footer {
  background: var(--cmd-footer-background);
  padding: 0.5em 1em;
  display: flex;
  /* font-size: 0.75em; */
  border-top: var(--cmd-separate-border);
  color: var(--cmd-secondary-text-color);
}

.modal-footer .help {
  display: flex;
  margin-right: 1em;
  align-items: center;
  font-size: 0.75em;
}

.cmd-examplekey {
  background: var(--cmd-secondary-background-color);
  padding: 0.06em 0.25em;
  border-radius: var(--cmd-key-border-radius);
  color: var(--cmd-secondary-text-color);
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  font-size: 1.25em;
  fill: currentColor;
}
.cmd-examplekey.esc {
  width: auto;
  height: auto;
  font-size: 1.1em;
}
.cmd-examplekey.backspace {
  opacity: 0.7;
}
`;
