import { LitElement, html, property, PropertyValues } from 'lit-element';
import { Constructor } from '@vaadin/mixin-utils';
import { ActiveStateMixin } from '@vaadin/active-state-mixin/active-state-mixin.js';
import { ActiveStateClass } from '@vaadin/active-state-mixin/active-state-class.js';
import { CheckedStateMixin, CheckedStateInterface } from '@vaadin/checked-state-mixin/checked-state-mixin.js';
import { ControlStateMixin, ControlStateInterface } from '@vaadin/control-state-mixin/control-state-mixin.js';
import { DisabledStateMixin, DisabledStateInterface } from '@vaadin/disabled-state-mixin/disabled-state-mixin.js';
import { FocusVisibleMixin, FocusVisibleInterface } from '@vaadin/focus-visible-mixin/focus-visible-mixin.js';
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
    CheckedStateMixin(ControlStateMixin(FocusVisibleMixin(ActiveStateMixin(DisabledStateMixin(base)))))
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

      this.addEventListener('mouseup', event => this._onMouseUp(event));
    }

    /**
     * Toggles the radio button, so that the native `change` event
     * is dispatched. Overrides the `HTMLElement.prototype.click`.
     * @protected
     */
    click() {
      this.focusElement.click();
    }

    protected get focusElement() {
      return this.renderRoot.querySelector('input') as HTMLInputElement;
    }

    protected _onChange(event: Event) {
      this.checked = (event.target as HTMLInputElement).checked;

      const changeEvent = new CustomEvent('change', {
        detail: {
          sourceEvent: event
        },
        bubbles: event.bubbles,
        cancelable: event.cancelable
      });
      this.dispatchEvent(changeEvent);
    }

    protected _onKeyDown(event: KeyboardEvent) {
      super._onKeyDown && super._onKeyDown(event);

      if (!this.disabled && event.keyCode === 32) {
        event.preventDefault();
      }
    }

    protected _onKeyUp(event: KeyboardEvent) {
      super._onKeyUp && super._onKeyUp(event);

      if (!this.disabled && event.keyCode === 32) {
        event.preventDefault();
        this.click();
      }
    }

    protected _onMouseUp(_event: MouseEvent) {
      if (!this.checked && !this.disabled) {
        this.click();
      }
    }

    protected _onTouchEnd(event: TouchEvent) {
      super._onTouchEnd && super._onTouchEnd(event);

      if (!this.checked && !this.disabled) {
        this.click();
      }
    }
  }

  return RadioButton;
};
