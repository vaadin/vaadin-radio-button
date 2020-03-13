import { css } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';

export class RadioButtonBase extends VaadinElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      label {
        display: inline-flex;
        align-items: baseline;
        outline: none;
      }

      [part='radio'] {
        position: relative;
        display: inline-block;
        flex: none;
      }

      input[type='radio'] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
        margin: 0;
      }

      :host([disabled]) {
        -webkit-tap-highlight-color: transparent;
      }
    `;
  }
}
