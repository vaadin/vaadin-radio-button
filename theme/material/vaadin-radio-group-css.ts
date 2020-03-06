import { css } from 'lit-element';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/typography.js';

export const radioGroupStyles = css`
  :host {
    display: inline-flex;
    position: relative;
    padding-top: 8px;
    margin-bottom: 8px;
    outline: none;
    color: var(--material-body-text-color);
    font-size: var(--material-body-font-size);
    line-height: 24px;
    font-family: var(--material-font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host::before {
    line-height: 32px;
  }

  :host([has-label]) {
    padding-top: 24px;
  }

  [part='label'] {
    display: block;
    position: absolute;
    top: 8px;
    font-size: 1em;
    line-height: 1;
    height: 20px;
    margin-bottom: -4px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    color: var(--material-secondary-text-color);
    transform-origin: 0 75%;
    transform: scale(0.75);
  }

  :host([required]) [part='label']::after {
    content: ' *';
    color: inherit;
  }

  :host([invalid]) [part='label'] {
    color: var(--material-error-text-color);
  }

  [part='error-message'] {
    font-size: 0.75em;
    line-height: 1;
    color: var(--material-error-text-color);
  }

  [part='error-message']::before {
    content: '';
    display: block;
    height: 6px;
  }

  :host(:not([invalid])) [part='error-message'] {
    margin-top: 0;
    max-height: 0;
    overflow: hidden;
  }

  :host([invalid]) [part='error-message'] {
    animation: reveal 0.2s;
  }

  @keyframes reveal {
    0% {
      opacity: 0;
    }
  }

  :host(:not([has-label])) [part='label'] {
    display: none;
  }

  :host([disabled]) [part='label'] {
    color: var(--material-disabled-text-color);
    -webkit-text-fill-color: var(--material-disabled-text-color);
  }

  :host([focused]:not([invalid])) [part='label'] {
    color: var(--material-primary-text-color);
  }

  /* RTL styles */
  :host([dir='rtl']) [part='label'] {
    transform-origin: 100% 75%;
  }
`;
