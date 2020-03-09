import { LitElement, html, property, PropertyValues } from 'lit-element';
import { Constructor } from '@vaadin/mixin-utils';
import { DisabledStateMixin, DisabledStateInterface } from '@vaadin/disabled-state-mixin/disabled-state-mixin.js';
import { FocusVisibleMixin, FocusVisibleInterface } from '@vaadin/focus-visible-mixin/focus-visible-mixin.js';
import { FocusVisibleClass } from '@vaadin/focus-visible-mixin/focus-visible-class.js';
import {
  KeyboardDirectionMixin,
  KeyboardDirectionInterface
} from '@vaadin/keyboard-direction-mixin/keyboard-direction-mixin.js';
import { KeyboardDirectionClass } from '@vaadin/keyboard-direction-mixin/keyboard-direction-class.js';
import { RovingTabIndexMixin } from '@vaadin/roving-tabindex-mixin/roving-tabindex-mixin.js';
import { SlottedItemsMixin, SlottedItemsInterface } from '@vaadin/slotted-items-mixin/slotted-items-mixin.js';
import { RadioButtonMixinClass } from './vaadin-radio-button-mixin-class';
import { RadioButton } from './vaadin-radio-button-mixin';

export interface RadioGroupInterface {
  value: string | null | undefined;

  label: string | null | undefined;

  invalid: boolean | null | undefined;

  required: boolean | null | undefined;

  readonly: boolean | null | undefined;

  errorMessage: string | null | undefined;

  orientation: string | null | undefined;

  checkValidity(): boolean;

  validate(): boolean;
}

type RadioGroup = RadioGroupInterface &
  SlottedItemsInterface &
  KeyboardDirectionInterface &
  FocusVisibleInterface &
  DisabledStateInterface &
  FocusVisibleClass &
  KeyboardDirectionClass;

const filterRadioButtons = (nodes: Node[]) => {
  return nodes.filter(node => {
    return (
      node.nodeType === Node.ELEMENT_NODE && (node.constructor as typeof RadioButtonMixinClass).hasRadioButtonMixin
    );
  }) as HTMLElement[];
};

let uniqueId = 0;

export const RadioGroupMixin = <T extends Constructor<LitElement & KeyboardDirectionClass>>(
  base: T
): T & Constructor<RadioGroup> => {
  class RadioGroup extends FocusVisibleMixin(
    DisabledStateMixin(RovingTabIndexMixin(KeyboardDirectionMixin(SlottedItemsMixin(base))))
  ) {
    /**
     * String used for the label element.
     */
    @property({ type: String }) label: string | null | undefined;

    /**
     * Value of the radio group.
     */
    @property({ type: String }) value: string | null | undefined;

    /**
     * When true, the radio group value is invalid.
     */
    @property({ type: Boolean, reflect: true }) invalid: boolean | null | undefined = false;

    /**
     * Radio group is aligned vertically by default. Set to "horizontal" to change this.
     */
    @property({ type: String, reflect: true }) orientation: string | null | undefined;

    /**
     * When true, the radio group must have a value set by the user.
     */
    @property({ type: Boolean, reflect: true }) required: boolean | null | undefined;

    /**
     * When true, the user cannot modify the value of the radio group.
     */
    @property({ type: Boolean, reflect: true }) readonly: boolean | null | undefined;

    /**
     * Error to show when the radio group value is invalid.
     */
    @property({ type: String, attribute: 'error-message' }) errorMessage: string | null | undefined;

    private _boundCheckedChanged = this._onCheckedChanged.bind(this) as EventListener;

    private _checkedButton?: RadioButton;

    private _errorId = `vaadin-radio-group-error-${(uniqueId += 1)}`;

    private _inputChange?: Event;

    protected render() {
      return html`
        <div class="vaadin-group-field-container">
          <label part="label">${this.label}</label>

          <div part="group-field">
            <slot id="slot"></slot>
          </div>

          <div
            id="${this._errorId}"
            part="error-message"
            aria-live="assertive"
            aria-hidden="${this.errorMessage && this.invalid ? 'false' : 'true'}"
            ?hidden="${!this.invalid}"
          >
            ${this.errorMessage}
          </div>
        </div>
      `;
    }

    constructor() {
      super();

      this.addEventListener('change', (event: Event) => {
        if (this.items.includes(event.composedPath()[0] as HTMLElement)) {
          event.stopImmediatePropagation();
          // store reference to the original event
          this._inputChange = (event as CustomEvent).detail.sourceEvent;
        }
      });
    }

    /**
     * Returns true if `value` is valid.
     */
    validate(): boolean {
      this.invalid = !this.checkValidity();
      return this.invalid === false;
    }

    /**
     * Returns true if the current value satisfies all constraints (if any).
     */
    checkValidity(): boolean {
      return !this.required || !!this.value;
    }

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      this.setAttribute('role', 'radiogroup');
    }

    protected updated(props: PropertyValues) {
      super.updated(props);

      if (props.has('disabled') || props.has('readonly')) {
        this._updateDisableButtons();
      }

      if (props.has('label')) {
        this.toggleAttribute('has-label', Boolean(this.label));
      }

      if (props.has('value')) {
        this._valueChanged(this.value, props.get('value'));

        this.dispatchEvent(
          new CustomEvent('value-changed', {
            detail: { value: this.value }
          })
        );
      }

      if (props.has('invalid')) {
        this.dispatchEvent(
          new CustomEvent('invalid-changed', {
            detail: { value: this.invalid }
          })
        );
      }
    }

    protected get _containsFocus() {
      const root = this.getRootNode() as Document;
      return Boolean(root.activeElement && this.contains(root.activeElement));
    }

    protected get _vertical() {
      return this.orientation !== 'horizontal';
    }

    protected _filterItems() {
      return filterRadioButtons(Array.from(this.children));
    }

    protected _focus(radio: RadioButton) {
      super._focus && super._focus(radio);

      this._checkedButton && this._selectButton(radio, true);
    }

    protected _itemsChanged(radios: RadioButton[], oldRadios: RadioButton[]) {
      super._itemsChanged && super._itemsChanged(radios, oldRadios);

      radios
        .filter(radio => !oldRadios.includes(radio))
        .reverse()
        .forEach(radio => {
          radio.addEventListener('checked-changed', this._boundCheckedChanged);

          if (this.disabled) {
            radio.disabled = true; // eslint-disable-line no-param-reassign
          }
          if (radio.checked) {
            this._changeSelectedButton(radio);
          }
        });

      oldRadios
        .filter(radio => !radios.includes(radio))
        .forEach(radio => {
          radio.removeEventListener('checked-changed', this._boundCheckedChanged);
          if (radio.checked) {
            this.value = undefined;
          }
        });
    }

    protected _onFocusin(_event: FocusEvent) {
      this._setFocused && this._setFocused(this._containsFocus && !this.disabled);
    }

    protected _onFocusout(event: FocusEvent) {
      event.composed && this.validate();
      super._onFocusout && super._onFocusout(event);
    }

    private _changeSelectedButton(radio?: RadioButton, fireChangeEvent?: boolean) {
      if (this._checkedButton === radio) {
        return;
      }

      this._checkedButton = radio;

      if (radio) {
        this.value = radio.value;
      }

      (this.items as RadioButton[]).forEach(button => {
        if (button === this._checkedButton) {
          if (fireChangeEvent) {
            button.click();
          } else {
            button.checked = true; // eslint-disable-line no-param-reassign
          }
        } else {
          button.checked = false; // eslint-disable-line no-param-reassign
        }
      });

      this.validate();
      this.readonly && this._updateDisableButtons();
      radio && this._setTabIndex && this._setTabIndex(radio);

      if (fireChangeEvent && this._inputChange) {
        const sourceEvent = this._inputChange;
        const { bubbles, cancelable } = sourceEvent;
        this._inputChange = undefined;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              sourceEvent
            },
            bubbles,
            cancelable
          })
        );
      }
    }

    private _onCheckedChanged(event: CustomEvent) {
      if (event.detail.value) {
        this._changeSelectedButton(event.composedPath()[0] as RadioButton, Boolean(this._inputChange));
      }
    }

    private _selectButton(radio: RadioButton, fireChangeEvent: boolean) {
      this._changeSelectedButton(radio, fireChangeEvent);
    }

    private _updateDisableButtons() {
      this.items.forEach(radio => {
        const button = radio as RadioButton;
        if (this.disabled) {
          button.disabled = true;
        } else if (this.readonly) {
          button.disabled = button !== this._checkedButton && this.readonly;
        } else {
          button.disabled = false;
        }
      });
    }

    private _valueChanged(newV: string | null | undefined, oldV: unknown) {
      if (oldV && (newV === '' || newV === null || newV === undefined)) {
        this._changeSelectedButton(undefined);
        this.removeAttribute('has-value');
        return;
      }

      if (!this._checkedButton || newV !== this._checkedButton.value) {
        const newButton = (this.items as RadioButton[]).find(button => button.value === newV);

        if (newButton) {
          this._selectButton(newButton, false);
          this.setAttribute('has-value', '');
        } else {
          console.warn(`No <vaadin-radio-button> with value ${newV} found.`);
        }
      }
    }
  }

  return RadioGroup;
};