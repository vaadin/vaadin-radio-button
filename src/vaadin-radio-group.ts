import { customElement } from 'lit-element';
import { RadioGroupBase } from './vaadin-radio-group-base';
import { RadioGroupMixin } from './vaadin-radio-group-mixin';
import './vaadin-radio-button';

/**
 * `<vaadin-radio-button>` is a Web Component for grouping vaadin-radio-buttons.
 */
@customElement('vaadin-radio-group')
export class VaadinRadioGroup extends RadioGroupMixin(RadioGroupBase) {
  static is = 'vaadin-radio-group';

  static get version() {
    return '1.2.3';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-radio-group': VaadinRadioGroup;
  }
}
