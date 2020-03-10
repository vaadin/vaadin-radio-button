import { LitElement, html, property, PropertyValues } from 'lit-element';
import { Constructor } from '@vaadin/mixin-utils';
import { ActiveStateMixin } from '@vaadin/active-state-mixin/active-state-mixin.js';
import { ActiveStateClass } from '@vaadin/active-state-mixin/active-state-class.js';
import { CheckedStateMixin, CheckedStateInterface } from '@vaadin/checked-state-mixin/checked-state-mixin.js';
import { ControlStateMixin, ControlStateInterface } from '@vaadin/control-state-mixin/control-state-mixin.js';
import { DisabledStateMixin, DisabledStateInterface } from '@vaadin/disabled-state-mixin/disabled-state-mixin.js';
import { FocusVisibleMixin, FocusVisibleInterface } from '@vaadin/focus-visible-mixin/focus-visible-mixin.js';
import { KeyboardMixin } from '@vaadin/keyboard-mixin/keyboard-mixin.js';
import { KeyboardClass } from '@vaadin/keyboard-mixin/keyboard-class.js';
import { SlottedLabelMixin } from '@vaadin/slotted-label-mixin/slotted-label-mixin.js';
import { RadioButtonMixinClass } from './vaadin-radio-button-mixin-class';

export interface RadioButtonInterface {
  value: string | null | undefined;
}

export type RadioButton = RadioButtonInterface &
  DisabledStateInterface &
  FocusVisibleInterface &
  ControlStateInterface &
  CheckedStateInterface &
  ActiveStateClass &
  KeyboardClass &
  RadioButtonMixinClass;

export const RadioButtonMixin = <T extends Constructor<LitElement>>(base: T): T & Constructor<RadioButton> => {
  class RadioButton extends SlottedLabelMixin(
    CheckedStateMixin(KeyboardMixin(ControlStateMixin(FocusVisibleMixin(ActiveStateMixin(DisabledStateMixin(base))))))
  ) {
    /**
     * Used for mixin detection because `instanceof` does not work with mixins.
     */
    static hasRadioButtonMixin = true;

    /**
     * Value of the radio button. Required when used in a radio group.
     */
    @property({ type: String }) value: string | null | undefined = 'on';

    protected render() {
      return html`
        <label>
          <span part="radio">
            <input
              type="radio"
              .checked="${this.checked}"
              ?disabled="${this.disabled}"
              role="presentation"
              @change="${this._onChange}"
              tabindex="-1"
            />
          </span>

          <span part="label">
            <slot></slot>
          </span>
        </label>
      `;
    }

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      this.setAttribute('role', 'radio');
    }

    /**
     * Toggles the radio button, so that the native `change` event
     * is dispatched. Overrides the `HTMLElement.prototype.click`.
     * @protected
     */
    click() {
      // If you change this block, please test manually that radio-button and
      // radio-group still works ok on iOS 12/13 and up as it may cause
      // an issue that is not possible to test programmatically.
      // See: https://github.com/vaadin/vaadin-radio-button/issues/140
      if (!this.disabled) {
        this.focusElement.dispatchEvent(new MouseEvent('click'));
      }
    }

    protected get focusElement() {
      return this.renderRoot.querySelector('input') as HTMLInputElement;
    }

    protected _onChange(event: Event) {
      this.checked = (event.target as HTMLInputElement).checked;

      this.dispatchEvent(
        new Event('change', {
          bubbles: true,
          cancelable: false
        })
      );
    }

    /**
     * @see KeyboardClass
     */
    protected _onKeyDown(event: KeyboardEvent) {
      super._onKeyDown && super._onKeyDown(event);

      if (!this.disabled && event.keyCode === 32) {
        event.preventDefault();
      }
    }

    /**
     * @see KeyboardClass
     */
    protected _onKeyUp(event: KeyboardEvent) {
      super._onKeyUp && super._onKeyUp(event);

      if (!this.disabled && event.keyCode === 32) {
        event.preventDefault();
        this.click();
      }
    }

    /**
     * @see ActiveStateClass
     */
    protected _onMouseUp(event: MouseEvent) {
      super._onMouseUp && super._onMouseUp(event);

      if (!this.checked && !this.disabled) {
        this.click();
      }
    }

    /**
     * @see ActiveStateClass
     */
    protected _onTouchEnd(event: TouchEvent) {
      super._onTouchEnd && super._onTouchEnd(event);

      if (!this.checked && !this.disabled) {
        this.click();
      }
    }
  }

  return RadioButton;
};
