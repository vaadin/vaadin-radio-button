import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { spaceKeyDown, spaceKeyUp } from '@vaadin/vaadin-component-dev-dependencies/keys.js';
import { mousedown, mouseup, touchstart, touchend } from '@vaadin/test-helpers';
import { VaadinRadioButton } from '../../src/vaadin-radio-button';

const { sinon } = window;

describe('radio-button', () => {
  let radio: VaadinRadioButton;

  beforeEach(async () => {
    radio = await fixture(html`
      <vaadin-radio-button>Radio button</vaadin-radio-button>
    `);
  });

  describe('custom element definition', () => {
    let tagName: string;

    beforeEach(() => {
      tagName = radio.tagName.toLowerCase();
    });

    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(radio instanceof VaadinRadioButton).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });
  });

  describe('native input', () => {
    let input: HTMLInputElement;

    beforeEach(() => {
      input = radio.renderRoot.querySelector('input') as HTMLInputElement;
    });

    it('should propagate checked to the native input', async () => {
      radio.checked = true;
      await radio.updateComplete;
      expect(input.checked).to.be.true;
    });

    it('should set checked on native input change', async () => {
      input.checked = true;
      input.dispatchEvent(new CustomEvent('change'));
      await radio.updateComplete;
      expect(radio.checked).to.be.true;
    });

    it('should propagate disabled to the native input', async () => {
      radio.disabled = true;
      await radio.updateComplete;
      expect(input.disabled).to.be.true;
    });

    it('should dispatch click event on host click', async () => {
      const spy = sinon.spy();
      input.addEventListener('click', spy);
      radio.click();
      await radio.updateComplete;
      expect(spy).to.be.calledOnce;
      const event = spy.getCall(0).args[0];
      expect(event).to.be.instanceof(MouseEvent);
    });

    it('should not dispatch click event when disabled', async () => {
      const spy = sinon.spy();
      input.addEventListener('click', spy);
      radio.disabled = true;
      await radio.updateComplete;
      radio.click();
      await radio.updateComplete;
      expect(spy).to.not.be.called;
    });
  });

  describe('checked property', () => {
    it('should set checked on host click', async () => {
      radio.click();
      await radio.updateComplete;
      expect(radio.checked).to.be.true;
    });

    it('should set checked on mouseup', async () => {
      mousedown(radio);
      mouseup(radio);
      await radio.updateComplete;
      expect(radio.checked).to.be.true;
    });

    it('should set checked on touchend', async () => {
      touchstart(radio);
      touchend(radio);
      await radio.updateComplete;
      expect(radio.checked).to.be.true;
    });

    it('should set checked on space keyup', async () => {
      spaceKeyDown(radio);
      spaceKeyUp(radio);
      await radio.updateComplete;
      expect(radio.checked).to.be.true;
    });
  });

  describe('disabled property', () => {
    beforeEach(async () => {
      radio.disabled = true;
      await radio.updateComplete;
    });

    it('should not set checked on click when disabled', async () => {
      radio.click();
      await radio.updateComplete;
      expect(radio.checked).to.be.false;
    });

    it('should not set checked on mouseup when disabled', async () => {
      mousedown(radio);
      mouseup(radio);
      await radio.updateComplete;
      expect(radio.checked).to.be.false;
    });

    it('should not set checked on touchend when disabled', async () => {
      touchstart(radio);
      touchend(radio);
      await radio.updateComplete;
      expect(radio.checked).to.be.false;
    });

    it('should not set checked on space keyup when disabled', async () => {
      spaceKeyDown(radio);
      spaceKeyUp(radio);
      await radio.updateComplete;
      expect(radio.checked).to.be.false;
    });
  });

  describe('click method', () => {
    let spy: sinon.SinonSpy;

    beforeEach(() => {
      spy = sinon.spy(radio, 'click');
    });

    it('should be called on mouseup', async () => {
      mousedown(radio);
      mouseup(radio);
      await radio.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should not be called on mouseup when checked', async () => {
      radio.checked = true;
      await radio.updateComplete;
      mousedown(radio);
      mouseup(radio);
      await radio.updateComplete;
      expect(spy).to.not.be.called;
    });

    it('should not be called on mouseup when disabled', async () => {
      radio.disabled = true;
      await radio.updateComplete;
      mousedown(radio);
      mouseup(radio);
      await radio.updateComplete;
      expect(spy).to.not.be.called;
    });

    it('should be called on space keyup', async () => {
      spaceKeyDown(radio);
      spaceKeyUp(radio);
      await radio.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should not be called on space keyup when disabled', async () => {
      radio.disabled = true;
      await radio.updateComplete;
      spaceKeyDown(radio);
      spaceKeyUp(radio);
      await radio.updateComplete;
      expect(spy).to.not.be.called;
    });
  });

  describe('change event', () => {
    let spy: sinon.SinonSpy;

    beforeEach(() => {
      spy = sinon.spy();
      radio.addEventListener('change', spy);
    });

    it('should fire on click', async () => {
      radio.click();
      await radio.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should fire on mouseup', async () => {
      mousedown(radio);
      mouseup(radio);
      await radio.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should fire on touchend', async () => {
      touchstart(radio);
      touchend(radio);
      await radio.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should fire on space keyup', async () => {
      spaceKeyDown(radio);
      expect(spy).to.not.be.called;

      spaceKeyUp(radio);
      await radio.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should not fire on programmatic toggle', async () => {
      radio.checked = true;
      await radio.updateComplete;
      expect(spy).to.not.be.called;
    });

    it('should not fire when checked', async () => {
      radio.checked = true;
      await radio.updateComplete;
      radio.click();
      expect(spy).to.not.be.called;
    });

    it('should bubble', async () => {
      radio.click();
      await radio.updateComplete;
      const event = spy.getCall(0).args[0];
      expect(event).to.have.property('bubbles', true);
    });

    it('should not be composed', async () => {
      radio.click();
      await radio.updateComplete;
      const event = spy.getCall(0).args[0];
      expect(event).to.have.property('composed', false);
    });
  });

  describe('ARIA', () => {
    it('should have proper role', () => {
      expect(radio.getAttribute('role')).to.eq('radio');
    });

    it('should set aria-checked to false by default', () => {
      expect(radio.getAttribute('aria-checked')).to.eq('false');
    });

    it('should set aria-checked to true when checked', async () => {
      radio.checked = true;
      await radio.updateComplete;
      expect(radio.getAttribute('aria-checked')).to.eq('true');
    });
  });

  describe('a11y', () => {
    it('should pass accessibility test', async () => {
      // TODO: https://github.com/vaadin/vaadin-radio-button/issues/139
      await expect(radio).to.be.accessible({ ignoredRules: ['aria-allowed-role'] });
    });
  });
});
