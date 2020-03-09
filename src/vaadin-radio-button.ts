import { customElement } from 'lit-element';
import { RadioButtonBase } from './vaadin-radio-button-base';
import { RadioButtonMixin } from './vaadin-radio-button-mixin';

/**
 * `<vaadin-radio-button>` is a Web Component for radio buttons.
 *
 * @attr label-empty - Set when there is no label provided.
 * @attr disabled - Set when the radio button is disabled.
 * @attr focus-ring - Set when the radio button is focused using the keyboard.
 * @attr focused - Set when the radio button is focused.
 * @attr checked - Set when the radio button is checked.
 *
 * @slot - Slot for the label content.
 *
 * @csspart radio - The radio button element.
 * @csspart label - The label content element.
 *
 * @event change - Fired when the user toggles the radio button.
 * @event checked-changed - Fired when the `checked` property changes.
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
