/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { ControlStateMixin } from '@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js';
import { ElementMixin } from '@vaadin/vaadin-element-mixin/vaadin-element-mixin.js';

/**
 * `<vaadin-radio-button>` is a Web Component for radio buttons.
 *
 * ```html
 * <vaadin-radio-button value="foo">Foo</vaadin-radio-button>
 * ```
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name         | Description
 * ------------------|----------------
 * `radio`           | The radio button element
 * `label`           | The label content element
 *
 * The following state attributes are available for styling:
 *
 * Attribute  | Description | Part name
 * -----------|-------------|------------
 * `disabled`   | Set when the radio button is disabled. | :host
 * `focus-ring` | Set when the radio button is focused using the keyboard. | :host
 * `focused`    | Set when the radio button is focused. | :host
 * `checked`    | Set when the radio button is checked. | :host
 * `empty`      | Set when there is no label provided. | label
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends HTMLElement
 * @mixes ElementMixin
 * @mixes ControlStateMixin
 * @mixes ThemableMixin
 * @mixes GestureEventListeners
 * @element vaadin-radio-button
 */
class RadioButtonElement extends
  ElementMixin(
    ControlStateMixin(
      ThemableMixin(
        GestureEventListeners(PolymerElement)))) {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-block;
      }

      label {
        display: inline-flex;
        align-items: baseline;
        outline: none;
      }

      [part="radio"] {
        position: relative;
        display: inline-block;
        flex: none;
      }

      input[type="radio"] {
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
    </style>

    <label>
      <span part="radio">
        <input type="radio" checked="[[checked]]" disabled\$="[[disabled]]" role="presentation" on-change="_onChange" tabindex="-1">
      </span>

      <span part="label">
        <slot></slot>
      </span>
    </label>
`;
  }

  static get is() {
    return 'vaadin-radio-button';
  }

  static get version() {
    return '1.5.1';
  }

  static get properties() {
    return {
      /**
       * True if the radio button is checked.
       * @type {boolean}
       */
      checked: {
        type: Boolean,
        value: false,
        notify: true,
        observer: '_checkedChanged',
        reflectToAttribute: true
      },

      /**
       * Name of the element.
       */
      name: String,

      /**
       * The value for this element.
       * @type {string}
       */
      value: {
        type: String,
        value: 'on'
      }
    };
  }

  get name() {
    return this.checked ? this._storedName : '';
  }

  set name(name) {
    this._storedName = name;
  }

  /**
   * @param {string} prop
   * @param {?string} oldVal
   * @param {?string} newVal
   * @protected
   */
  attributeChangedCallback(prop, oldVal, newVal) {
    super.attributeChangedCallback(prop, oldVal, newVal);
    // Needed until Edge has CSS Custom Properties (present in Edge Preview)
    /* istanbul ignore if */
    if (/^(disabled|checked)$/.test(prop)) {
      // iOS 10.3 Safari has an issue with repainting shadow root element styles when a host attribute changes.
      // Need this workaround (toggle any inline css property on and off) until we drop iOS 10.
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      /* istanbul ignore if */
      if (isIOS && this.shadowRoot && parseInt(navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10)) {
        const WEBKIT_PROPERTY = '-webkit-backface-visibility';
        this.shadowRoot.querySelectorAll('*').forEach(el => {
          el.style[WEBKIT_PROPERTY] = 'visible';
          el.style[WEBKIT_PROPERTY] = '';
        });
      }
    }
  }

  /** @protected */
  ready() {
    super.ready();

    this.setAttribute('role', 'radio');

    this._addListeners();

    const attrName = this.getAttribute('name');
    if (attrName) {
      this.name = attrName;
    }

    this.shadowRoot.querySelector('[part~="label"]').querySelector('slot')
      .addEventListener('slotchange', this._updateLabelAttribute.bind(this));

    this._updateLabelAttribute();
  }

  /** @private */
  _updateLabelAttribute() {
    const label = this.shadowRoot.querySelector('[part~="label"]');
    const assignedNodes = label.firstElementChild.assignedNodes();
    if (this._isAssignedNodesEmpty(assignedNodes)) {
      label.setAttribute('empty', '');
    } else {
      label.removeAttribute('empty');
    }
  }

  /** @private */
  _isAssignedNodesEmpty(nodes) {
    // The assigned nodes considered to be empty if there is no slotted content or only one empty text node
    return nodes.length === 0 ||
        (nodes.length == 1
        && nodes[0].nodeType == Node.TEXT_NODE
        && nodes[0].textContent.trim() === '');
  }

  /** @private */
  _checkedChanged(checked) {
    this.setAttribute('aria-checked', checked);
  }

  /** @private */
  _addListeners() {
    this._addEventListenerToNode(this, 'down', (e) => {
      if (!this.disabled) {
        this.setAttribute('active', '');
      }
    });

    this._addEventListenerToNode(this, 'up', (e) => {
      this.removeAttribute('active');

      if (!this.checked && !this.disabled) {
        // If you change this block, please test manually that radio-button and
        // radio-group still works ok on iOS 12/13 and up as it may cause
        // an issue that is not possible to test programmatically.
        // See: https://github.com/vaadin/vaadin-radio-button/issues/140
        this.click();
      }
    });

    this.addEventListener('keydown', e => {
      if (!this.disabled && e.keyCode === 32) {
        e.preventDefault();
        this.setAttribute('active', '');
      }
    });

    this.addEventListener('keyup', e => {
      if (!this.disabled && e.keyCode === 32) {
        e.preventDefault();
        this.click();
        this.removeAttribute('active');
      }
    });
  }

  /**
   * Toggles the radio button, so that the native `change` event
   * is dispatched. Overrides the standard `HTMLElement.prototype.click`.
   * @protected
   */
  click() {
    // If you change this block, please test manually that radio-button and
    // radio-group still works ok on iOS 12/13 and up as it may cause
    // an issue that is not possible to test programmatically.
    // See: https://github.com/vaadin/vaadin-radio-button/issues/140
    if (!this.disabled) {
      this.shadowRoot.querySelector('input').dispatchEvent(new MouseEvent('click'));
    }
  }

  /**
   * @return {!HTMLInputElement}
   * @protected
   */
  get focusElement() {
    return this.shadowRoot.querySelector('input');
  }

  /** @private */
  _onChange(e) {
    this.checked = e.target.checked;
    // In the Shadow DOM, the `change` event is not leaked into the
    // ancestor tree, so we must do this manually.
    const changeEvent = new CustomEvent('change', {
      detail: {
        sourceEvent: e
      },
      bubbles: e.bubbles,
      cancelable: e.cancelable,
    });
    this.dispatchEvent(changeEvent);
  }

  /**
   * Fired when the user toggles the radio button.
   *
   * @event change
   */
}

customElements.define(RadioButtonElement.is, RadioButtonElement);


export { RadioButtonElement };
