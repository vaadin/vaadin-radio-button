import { css } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';

export class RadioGroupBase extends VaadinElement {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      :host::before {
        content: '\\2003';
        width: 0;
        display: inline-block;
      }

      :host([hidden]) {
        display: none !important;
      }

      .vaadin-group-field-container {
        display: flex;
        flex-direction: column;
      }

      :host([label-empty]) [part='label'] {
        display: none;
      }

      :host(:not([orientation='horizontal'])) [part='group-field'] {
        display: flex;
        flex-direction: column;
      }
    `;
  }
}
