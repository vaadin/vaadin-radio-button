import { css } from 'lit-element';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

export const radioGroupStyles = css`
  :host {
    color: var(--lumo-body-text-color);
    font-size: var(--lumo-font-size-m);
    font-family: var(--lumo-font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    padding: var(--lumo-space-xs) 0;
  }

  :host::before {
    height: var(--lumo-size-m);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
  }

  [part='label'] {
    align-self: flex-start;
    color: var(--lumo-secondary-text-color);
    font-weight: 500;
    font-size: var(--lumo-font-size-s);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    padding-bottom: 0.2em;
    transition: color 0.2s;
    line-height: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    max-width: 100%;
    box-sizing: border-box;
  }

  :host([focused]:not([readonly])) [part='label'] {
    color: var(--lumo-primary-text-color);
  }

  :host(:hover:not([readonly]):not([focused])) [part='label'] {
    color: var(--lumo-body-text-color);
  }

  :host([has-label])::before {
    margin-top: calc(var(--lumo-font-size-s) * 1.5);
  }

  :host([has-label]) {
    padding-top: var(--lumo-space-m);
  }

  :host([has-label]) [part='label'] {
    padding-bottom: 0.7em;
  }

  :host([required]) [part='label'] {
    padding-right: 1em;
  }

  [part='label']::after {
    content: var(--lumo-required-field-indicator, '•');
    transition: opacity 0.2s;
    opacity: 0;
    color: var(--lumo-primary-text-color);
    position: absolute;
    right: 0;
    width: 1em;
    text-align: center;
  }

  :host([required]:not([has-value])) [part='label']::after {
    opacity: 1;
  }

  :host([invalid]) [part='label']::after {
    color: var(--lumo-error-text-color);
  }

  [part='error-message'] {
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
    color: var(--lumo-error-text-color);
    will-change: max-height;
    transition: 0.4s max-height;
    max-height: 5em;
  }

  /* Do not reserve space when there is no error message */
  [part='error-message']:not(:empty)::before,
  [part='error-message']:not(:empty)::after {
    content: '';
    display: block;
    height: 0.4em;
  }

  :host(:not([invalid])) [part='error-message'] {
    max-height: 0;
    overflow: hidden;
  }

  /* RTL styles */
  :host([dir='rtl']) [part='label'] {
    margin-left: 0;
    margin-right: calc(var(--lumo-border-radius-m) / 4);
  }

  :host([required][dir='rtl']) [part='label'] {
    padding-left: 1em;
    padding-right: 0;
  }

  :host([dir='rtl']) [part='label']::after {
    right: auto;
    left: 0;
  }

  :host([dir='rtl']) [part='error-message'] {
    margin-left: 0;
    margin-right: calc(var(--lumo-border-radius-m) / 4);
  }

  /* Touch device adjustment */
  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused])) [part='label'] {
      color: var(--lumo-secondary-text-color);
    }
  }
`;
