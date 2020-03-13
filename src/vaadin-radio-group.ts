import { customElement } from 'lit-element';
import { RadioGroupBase } from './vaadin-radio-group-base';
import { RadioGroupMixin } from './vaadin-radio-group-mixin';
import './vaadin-radio-button';

/**
 * `<vaadin-radio-group>` is a Web Component for grouping vaadin-radio-buttons.
 *
 * @attr disabled - Set when the radio group and its children are disabled.
 * @attr focused - Set when the radio group contains focus.
 * @attr focus-ring - Set when the radio group is focused using the keyboard.
 * @attr has-label - Set when the radio group has a label.
 * @attr has-value - Set when the radio group has a value.
 * @attr invalid - Set when the radio group is invalid.
 * @attr readonly - Set to a readonly radio group.
 * @attr required - Set when a radio group is required.
 *
 * @csspart group-field - The element that wraps radio buttons.
 * @csspart label - The label element.
 *
 * @event change - Fired when the user changes the selected radio button.
 * @event invalid-changed - Fired when the `invalid` property changes.
 * @event value-changed - Fired when the `value` property changes.
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
