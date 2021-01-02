import {PolymerElement} from '@polymer/polymer/polymer-element.js';

import {FlattenedNodesObserver} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';

import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

import {DirMixin} from '@vaadin/vaadin-element-mixin/vaadin-dir-mixin.js';

import {RadioButtonElement} from './vaadin-radio-button.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * `<vaadin-radio-group>` is a Web Component for grouping vaadin-radio-buttons.
 *
 * ```html
 * <vaadin-radio-group>
 *   <vaadin-radio-button name="foo">Foo</vaadin-radio-button>
 *   <vaadin-radio-button name="bar">Bar</vaadin-radio-button>
 *   <vaadin-radio-button name="baz">Baz</vaadin-radio-button>
 * </vaadin-radio-group>
 * ```
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `label` | The label element
 * `group-field` | The element that wraps radio-buttons
 *
 * The following state attributes are available for styling:
 *
 * Attribute  | Description | Part name
 * -----------|-------------|------------
 * `disabled`   | Set when the radio group and its children are disabled. | :host
 * `readonly` | Set to a readonly radio group | :host
 * `invalid` | Set when the element is invalid | :host
 * `has-label` | Set when the element has a label | :host
 * `has-value` | Set when the element has a value | :host
 * `has-helper` | Set when the element has helper text or slot | :host
 * `has-error-message` | Set when the element has an error message, regardless if the field is valid or not | :host
 * `focused` | Set when the element contains focus | :host
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 */
declare class RadioGroupElement extends
  ThemableMixin(
  DirMixin(
  PolymerElement)) {

  /**
   * The current disabled state of the radio group. True if group and all internal radio buttons are disabled.
   */
  disabled: boolean|null|undefined;

  /**
   * This attribute indicates that the user cannot modify the value of the control.
   */
  readonly: boolean|null|undefined;

  /**
   * This property is set to true when the value is invalid.
   */
  invalid: boolean;

  /**
   * Specifies that the user must fill in a value.
   */
  required: boolean|null|undefined;

  /**
   * Error to show when the input value is invalid.
   * @attr {string} error-message
   */
  errorMessage: string;

  /**
   * String used for the label element.
   */
  label: string;

  /**
   * String used for the helper text.
   * @attr {string} helper-text
   */
  helperText: string|null;

  /**
   * Value of the radio group.
   */
  value: string|null|undefined;
  ready(): void;
  _setFocused(focused: boolean): void;
  _selectIncButton(next: boolean, checkedRadioButton: RadioButtonElement): void;
  _selectButton(element: RadioButtonElement, setFocusRing?: boolean): void;
  _containsFocus(): boolean;
  _hasEnabledButtons(): boolean;
  _selectNextButton(element: RadioButtonElement): void;
  _selectPreviousButton(element: RadioButtonElement): void;
  _changeSelectedButton(button: RadioButtonElement|null, fireChangeEvent?: boolean): void;

  /**
   * Returns true if `value` is valid.
   * `<iron-form>` uses this to check the validity or all its elements.
   *
   * @returns True if the value is valid.
   */
  validate(): boolean;

  /**
   * Returns true if the current input value satisfies all constraints (if any)
   */
  checkValidity(): boolean;
  _setFocusable(idx: number): void;
  _getHelperTextAriaHidden(helperText: any, helperTextId: any, hasSlottedHelper: any): any;
}

declare global {

  interface HTMLElementTagNameMap {
    "vaadin-radio-group": RadioGroupElement;
  }
}

export {RadioGroupElement};
