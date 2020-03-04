import { customElement } from 'lit-element';
import { RadioButtonBase } from './vaadin-radio-button-base';
import { RadioButtonMixin } from './vaadin-radio-button-mixin';

/**
 * `<vaadin-radio-button>` is a Web Component for radio buttons.
 */
@customElement('vaadin-radio-button')
export class VaadinRadioButton extends RadioButtonMixin(RadioButtonBase) {
  static is = 'vaadin-radio-button';

  static get version() {
    return '1.2.3';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-radio-button': VaadinRadioButton;
  }
}
