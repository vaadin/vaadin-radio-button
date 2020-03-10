import { expect, fixture, nextFrame, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { arrowDown, arrowLeft, arrowRight, arrowUp } from '@vaadin/vaadin-component-dev-dependencies/keys.js';
import { focusin } from '@vaadin/vaadin-component-dev-dependencies/events.js';
import { VaadinRadioButton } from '../../src/vaadin-radio-button';
import { VaadinRadioGroup } from '../../src/vaadin-radio-group';

const { sinon } = window;

describe('radio-group', () => {
  let group: VaadinRadioGroup;
  let buttons: VaadinRadioButton[];

  const focusout = (node: Element, composed: boolean) => {
    const event = new CustomEvent('focusout', { bubbles: true, composed });
    node.dispatchEvent(event);
  };

  beforeEach(async () => {
    group = await fixture(html`
      <vaadin-radio-group>
        <vaadin-radio-button>Button 1</vaadin-radio-button>
        <vaadin-radio-button value="2">Button 2</vaadin-radio-button>
        <vaadin-radio-button value="3">Button 3</vaadin-radio-button>
      </vaadin-radio-group>
    `);

    buttons = group.items as VaadinRadioButton[];
    await Promise.all(buttons.map(button => button.updateComplete));
  });

  describe('custom element definition', () => {
    let tagName: string;

    beforeEach(() => {
      tagName = group.tagName.toLowerCase();
    });

    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(group instanceof VaadinRadioGroup).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });
  });

  describe('disabled property', () => {
    beforeEach(async () => {
      group.disabled = true;
      await group.updateComplete;
    });

    it('should propagate disabled property to all the radio buttons', () => {
      buttons.forEach(button => {
        expect(button.disabled).to.be.true;
      });
    });

    it('should set disabled property to dynamically added radio buttons', async () => {
      const radio = document.createElement('vaadin-radio-button');
      group.appendChild(radio);
      await radio.updateComplete;
      await nextFrame();
      expect(radio.disabled).to.be.true;
    });
  });

  describe('readOnly property', () => {
    it('should disable unchecked buttons when readOnly', async () => {
      group.readOnly = true;
      await group.updateComplete;
      buttons.forEach(button => {
        expect(button.disabled).to.be.true;
      });
    });

    it('should enable button when value is set while readOnly', async () => {
      group.readOnly = true;
      await group.updateComplete;
      group.value = '2';
      await group.updateComplete;
      expect(buttons[0].disabled).to.be.true;
      expect(buttons[1].disabled).to.be.false;
      expect(buttons[2].disabled).to.be.true;
    });

    it('should enable all buttons readOnly is set back to false', async () => {
      group.readOnly = true;
      await group.updateComplete;
      group.readOnly = false;
      await group.updateComplete;
      buttons.forEach(button => {
        expect(button.disabled).to.be.false;
      });
    });

    it('should reflect to lowercase readonly attribute', async () => {
      group.readOnly = true;
      await group.updateComplete;
      expect(group.hasAttribute('readonly')).to.be.true;
      group.readOnly = false;
      await group.updateComplete;
      expect(group.hasAttribute('readonly')).to.be.false;
    });
  });

  describe('label property', () => {
    it('should not have has-label attribute by default', () => {
      expect(group.hasAttribute('has-label')).to.be.false;
    });

    it('should toggle has-label attribute on label change', async () => {
      group.label = 'foo';
      await group.updateComplete;
      expect(group.hasAttribute('has-label')).to.be.true;

      group.label = null;
      await group.updateComplete;
      expect(group.hasAttribute('has-label')).to.be.false;
    });
  });

  describe('orientation property', () => {
    it('should not be defined by default', () => {
      expect(group.orientation).to.be.undefined;
    });

    it('should reflect to attribute', async () => {
      group.orientation = 'horizontal';
      await group.updateComplete;
      expect(group.getAttribute('orientation')).to.equal('horizontal');
    });
  });

  describe('focused state', () => {
    it('should set focused attribute on focusin event dispatched', () => {
      focusin(buttons[0]);
      expect(group.hasAttribute('focused')).to.be.true;
    });

    it('should set focused attribute on radio button focus', () => {
      buttons[0].focus();
      expect(group.hasAttribute('focused')).to.be.true;
    });

    it('should not set focused attribute on focusin event dispatched when disabled', async () => {
      group.disabled = true;
      await group.updateComplete;
      focusin(buttons[0]);
      expect(group.hasAttribute('focused')).to.be.false;
    });

    it('should remove focused attribute on radio button focusout', () => {
      focusin(buttons[0]);
      focusout(buttons[0], true);
      expect(group.hasAttribute('focused')).to.be.false;
    });

    it('should remove focused attribute on radio group focusout', () => {
      focusin(buttons[0]);
      focusout(group, true);
      expect(group.hasAttribute('focused')).to.be.false;
    });
  });

  describe('value property', () => {
    it('should set value when radio button is checked', async () => {
      buttons[0].checked = true;
      await buttons[0].updateComplete;
      await group.updateComplete;
      expect(group.value).to.eq('on');

      buttons[1].checked = true;
      await buttons[1].updateComplete;
      await group.updateComplete;
      expect(group.value).to.eq('2');
    });

    it('should check proper button when value is set', async () => {
      group.value = '2';
      await group.updateComplete;
      await buttons[1].updateComplete;
      expect(buttons[1].checked).to.be.true;

      group.value = 'on';
      await group.updateComplete;
      await buttons[0].updateComplete;
      expect(buttons[0].checked).to.be.true;
    });

    it('should un-check proper button when value is set to null', async () => {
      group.value = '2';
      await group.updateComplete;
      await buttons[1].updateComplete;
      expect(buttons[1].checked).to.be.true;

      group.value = null;
      await group.updateComplete;
      await buttons[1].updateComplete;
      expect(buttons[1].checked).to.be.false;
    });

    it('should un-check proper button when value is set to undefined', async () => {
      group.value = '2';
      await group.updateComplete;
      await buttons[1].updateComplete;
      expect(buttons[1].checked).to.be.true;

      group.value = undefined;
      await group.updateComplete;
      await buttons[1].updateComplete;
      expect(buttons[1].checked).to.be.false;
    });

    it('should un-check proper button when value is set to empty string', async () => {
      group.value = '2';
      await group.updateComplete;
      await buttons[1].updateComplete;
      expect(buttons[1].checked).to.be.true;

      group.value = '';
      await group.updateComplete;
      await buttons[1].updateComplete;
      expect(buttons[1].checked).to.be.false;
    });

    it('should not have has-value attribute by default', () => {
      expect(group.hasAttribute('has-value')).to.be.false;
    });

    it('should toggle has-value attribute on value change', async () => {
      group.value = '2';
      await group.updateComplete;
      expect(group.hasAttribute('has-value')).to.be.true;

      group.value = '';
      await group.updateComplete;
      expect(group.hasAttribute('has-value')).to.be.false;
    });

    it('should dispatch value-changed event when value changes', async () => {
      const spy = sinon.spy();
      group.addEventListener('value-changed', spy);
      buttons[0].checked = true;
      await buttons[0].updateComplete;
      await group.updateComplete;
      await group.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should not focus radio group when value is set programmatically', async () => {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();

      group.value = '2';
      await group.updateComplete;
      expect(document.activeElement).to.be.equal(input);

      document.body.removeChild(input);
    });

    it('should warn when no radio button matches value set programmatically', async () => {
      const stub = sinon.stub(console, 'warn');
      group.value = 'foo';
      await group.updateComplete;
      expect(stub.callCount).to.equal(1);
      stub.restore();
    });
  });

  describe('keyboard selection', () => {
    describe('default orientation', () => {
      beforeEach(() => {
        group.focus();
      });

      it('should not select radio button when focused', () => {
        expect(group.value).to.be.undefined;
      });

      it('should not select next radio button on arrow down when un-checked', async () => {
        arrowDown(buttons[0]);
        await group.updateComplete;
        await buttons[1].updateComplete;
        expect(buttons[1].checked).to.be.false;
        expect(group.value).to.be.undefined;
      });

      it('should select next radio button on arrow down when checked', async () => {
        group.value = 'on';
        await group.updateComplete;
        arrowDown(buttons[0]);
        await group.updateComplete;
        await buttons[1].updateComplete;
        expect(buttons[1].checked).to.be.true;
        expect(group.value).to.equal('2');
      });

      it('should select prev radio button on arrow up when checked', async () => {
        group.value = '2';
        await group.updateComplete;
        buttons[1].focus();
        await buttons[1].updateComplete;
        arrowUp(buttons[1]);
        await group.updateComplete;
        await buttons[0].updateComplete;
        expect(buttons[0].checked).to.be.true;
        expect(group.value).to.equal('on');
      });

      it('should skip disabled button and check the next one instead', async () => {
        group.value = 'on';
        await group.updateComplete;
        buttons[1].disabled = true;
        await buttons[1].updateComplete;
        arrowDown(buttons[0]);
        await group.updateComplete;
        await buttons[2].updateComplete;
        expect(buttons[2].checked).to.be.true;
        expect(group.value).to.equal('3');
      });

      it('should set focused and focus-ring attributes when selecting', async () => {
        group.value = 'on';
        await group.updateComplete;
        arrowDown(buttons[0]);
        await group.updateComplete;
        await buttons[1].updateComplete;
        expect(buttons[1].hasAttribute('focused')).to.be.true;
        expect(buttons[1].hasAttribute('focus-ring')).to.be.true;
      });

      it('should select last radio button on arrow up on first button', async () => {
        group.value = 'on';
        await group.updateComplete;
        arrowUp(buttons[0]);
        await group.updateComplete;
        await buttons[2].updateComplete;
        expect(buttons[2].checked).to.be.true;
        expect(group.value).to.equal('3');
      });

      it('should select first radio button on arrow down on last button', async () => {
        group.value = '3';
        await group.updateComplete;
        buttons[2].focus();
        await buttons[2].updateComplete;
        arrowDown(buttons[2]);
        await group.updateComplete;
        await buttons[0].updateComplete;
        expect(buttons[0].checked).to.be.true;
        expect(group.value).to.equal('on');
      });

      it('should not check radio button with keyboard if disabled', async () => {
        buttons[1].checked = true;
        await buttons[1].updateComplete;
        await group.updateComplete;
        buttons[1].focus();
        group.disabled = true;
        await group.updateComplete;
        await buttons[1].updateComplete;
        arrowDown(buttons[1]);
        await group.updateComplete;
        expect(buttons[2].checked).to.be.false;
        expect(group.value).to.equal('2');
      });

      it('should not check radio button with keyboard if readOnly', async () => {
        buttons[1].checked = true;
        await buttons[1].updateComplete;
        await group.updateComplete;
        buttons[1].focus();
        group.readOnly = true;
        await group.updateComplete;
        await buttons[1].updateComplete;
        arrowDown(buttons[1]);
        await group.updateComplete;
        expect(buttons[2].checked).to.be.false;
        expect(group.value).to.equal('2');
      });
    });

    describe('horizontal orientation', () => {
      beforeEach(async () => {
        group.orientation = 'horizontal';
        await group.updateComplete;
        group.focus();
      });

      describe('default mode', () => {
        it('should select next radio button on arrow right when checked', async () => {
          group.value = 'on';
          await group.updateComplete;
          arrowRight(buttons[0]);
          await group.updateComplete;
          await buttons[1].updateComplete;
          expect(buttons[1].checked).to.be.true;
          expect(group.value).to.equal('2');
        });

        it('should select prev radio button on arrow left when checked', async () => {
          group.value = '2';
          await group.updateComplete;
          buttons[1].focus();
          await buttons[1].updateComplete;
          arrowLeft(buttons[1]);
          await group.updateComplete;
          await buttons[0].updateComplete;
          expect(buttons[0].checked).to.be.true;
          expect(group.value).to.equal('on');
        });

        it('should skip disabled button and check the next one instead', async () => {
          group.value = 'on';
          await group.updateComplete;
          buttons[1].disabled = true;
          await buttons[1].updateComplete;
          arrowRight(buttons[0]);
          await group.updateComplete;
          await buttons[2].updateComplete;
          expect(buttons[2].checked).to.be.true;
          expect(group.value).to.equal('3');
        });

        it('should select last radio button on arrow left on first button', async () => {
          group.value = 'on';
          await group.updateComplete;
          arrowLeft(buttons[0]);
          await group.updateComplete;
          await buttons[2].updateComplete;
          expect(buttons[2].checked).to.be.true;
          expect(group.value).to.equal('3');
        });

        it('should select first radio button on arrow right on last button', async () => {
          group.value = '3';
          await group.updateComplete;
          buttons[2].focus();
          await buttons[2].updateComplete;
          arrowRight(buttons[2]);
          await group.updateComplete;
          await buttons[0].updateComplete;
          expect(buttons[0].checked).to.be.true;
          expect(group.value).to.equal('on');
        });
      });

      describe('RTL mode', () => {
        beforeEach(() => {
          group.setAttribute('dir', 'rtl');
        });

        it('should select prev radio button on arrow right when checked', async () => {
          group.value = '3';
          await group.updateComplete;
          buttons[2].focus();
          await buttons[2].updateComplete;
          arrowRight(buttons[2]);
          await group.updateComplete;
          await buttons[1].updateComplete;
          expect(buttons[1].checked).to.be.true;
          expect(group.value).to.equal('2');
        });

        it('should select next radio button on arrow left when checked', async () => {
          group.value = 'on';
          await group.updateComplete;
          arrowLeft(buttons[0]);
          await group.updateComplete;
          await buttons[1].updateComplete;
          expect(buttons[1].checked).to.be.true;
          expect(group.value).to.equal('2');
        });
      });
    });
  });

  describe('change event', () => {
    let spy: sinon.SinonSpy;

    beforeEach(() => {
      spy = sinon.spy();
      group.addEventListener('change', spy);
    });

    it('should fire when selecting a radio button on click', async () => {
      buttons[1].click();
      await buttons[1].updateComplete;
      await group.updateComplete;
      expect(spy).to.be.calledOnce;
      const event = spy.getCall(0).args[0];
      expect(event).to.be.instanceof(Event);
    });

    it('should fire when selecting a radio button from keyboard', async () => {
      buttons[1].focus();
      buttons[1].checked = true;
      await buttons[1].updateComplete;
      await group.updateComplete;
      arrowDown(buttons[1]);
      await group.updateComplete;
      expect(spy).to.be.calledOnce;
      const event = spy.getCall(0).args[0];
      expect(event).to.be.instanceof(Event);
    });

    it('should bubble', async () => {
      buttons[1].click();
      await buttons[1].updateComplete;
      await group.updateComplete;
      expect(spy).to.be.calledOnce;
      const event = spy.getCall(0).args[0];
      expect(event).to.have.property('bubbles', true);
    });

    it('should not be composed', async () => {
      buttons[1].click();
      await buttons[1].updateComplete;
      await group.updateComplete;
      expect(spy).to.be.calledOnce;
      const event = spy.getCall(0).args[0];
      expect(event).to.have.property('composed', false);
    });

    it('should be called after checked-changed on click', async () => {
      const buttonSpy = sinon.spy();
      buttons[1].addEventListener('checked-changed', buttonSpy);
      buttons[1].click();
      await buttons[1].updateComplete;
      await group.updateComplete;
      expect(buttonSpy).to.be.calledOnce;
      expect(spy).to.be.calledAfter(buttonSpy);
    });

    it('should be called after checked-changed on keydown', async () => {
      buttons[0].focus();
      buttons[0].checked = true;
      await buttons[0].updateComplete;
      await group.updateComplete;
      const buttonSpy = sinon.spy();
      buttons[1].addEventListener('checked-changed', buttonSpy);
      arrowDown(buttons[0]);
      await buttons[1].updateComplete;
      await group.updateComplete;
      expect(buttonSpy).to.be.calledOnce;
      expect(spy).to.be.calledAfter(buttonSpy);
    });

    it('should not fire on programmatic value change', async () => {
      group.value = '2';
      await group.updateComplete;
      expect(spy).to.not.be.called;
    });

    it('should fire after radio group value is updated on click', done => {
      group.addEventListener('change', () => {
        expect(group.value).to.equal(buttons[1].value);
        done();
      });
      buttons[1].click();
    });

    it('should fire after radio group value is updated on keydown', done => {
      group.addEventListener('change', () => {
        expect(group.value).to.equal(buttons[2].value);
        done();
      });
      buttons[1].focus();
      buttons[1].checked = true;
      buttons[1].updateComplete.then(() => arrowDown(buttons[1]));
    });
  });

  describe('validation', () => {
    it('should set required property to false by default', () => {
      expect(group.required).to.be.false;
    });

    it('should pass validation by default when group is not required', () => {
      expect(group.checkValidity()).to.be.true;
      expect(group.invalid).to.be.false;
    });

    it('should not set invalid when group is required and has not lost focus yet', async () => {
      group.required = true;
      await group.updateComplete;
      expect(group.checkValidity()).to.be.false;
      expect(group.invalid).to.be.false;
    });

    it('should set invalid when radio group is required and validate is called', async () => {
      group.required = true;
      await group.updateComplete;
      group.validate();
      expect(group.invalid).to.be.true;
    });

    it('should validate and reset invalid state after changing selected radio', async () => {
      group.required = true;
      await group.updateComplete;
      group.validate();
      await group.updateComplete;
      buttons[1].checked = true;
      await group.updateComplete;
      expect(group.invalid).to.be.false;
    });

    it('should validate and set invalid on focusout when group is required', async () => {
      group.required = true;
      await group.updateComplete;
      focusout(group, true);
      await group.updateComplete;
      expect(group.checkValidity()).to.be.false;
      expect(group.invalid).to.be.true;
    });

    it('should not validate on focusout when event is not composed', async () => {
      group.required = true;
      await group.updateComplete;
      focusout(group, false);
      await group.updateComplete;
      expect(group.invalid).to.be.false;
    });

    it('should dispatch invalid-changed event when invalid changes', async () => {
      const spy = sinon.spy();
      group.addEventListener('invalid-changed', spy);
      group.required = true;
      await group.updateComplete;
      focusout(group, true);
      await group.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should reflect required property to attribute', async () => {
      group.required = true;
      await group.updateComplete;
      expect(group.hasAttribute('required')).to.be.true;
      group.required = false;
      await group.updateComplete;
      expect(group.hasAttribute('required')).to.be.false;
    });

    it('should reflect invalid property to attribute', async () => {
      group.invalid = true;
      await group.updateComplete;
      expect(group.hasAttribute('invalid')).to.be.true;
      group.invalid = false;
      await group.updateComplete;
      expect(group.hasAttribute('invalid')).to.be.false;
    });
  });

  describe('errorMessage property', () => {
    let error: HTMLElement;

    beforeEach(() => {
      error = group.renderRoot.querySelector('[part="error-message"]') as HTMLElement;
    });

    it('should set id and ARIA attributes to error message part', () => {
      expect(error.getAttribute('aria-live')).to.be.equal('assertive');
      expect(error.getAttribute('aria-hidden')).to.be.equal('true');
      expect(/^vaadin-radio-group-error-\d+$/.test(error.id)).to.be.true;
    });

    it('should remove aria-hidden when error is shown', async () => {
      group.errorMessage = 'Bad input!';
      group.invalid = true;
      await group.updateComplete;
      expect(error.getAttribute('aria-hidden')).to.be.equal('false');
    });

    it('should now show error message by default', async () => {
      group.errorMessage = 'Bad input!';
      await group.updateComplete;
      expect(error.hasAttribute('hidden')).to.be.true;
    });

    it('should show error message when group is invalid', async () => {
      group.errorMessage = 'Bad input!';
      await group.updateComplete;
      group.invalid = true;
      await group.updateComplete;
      expect(error.hasAttribute('hidden')).to.be.false;
    });
  });

  describe('ARIA', () => {
    it('should have proper role', () => {
      expect(group.getAttribute('role')).to.eq('radiogroup');
    });

    it('should set aria-disabled to true when disabled', async () => {
      group.disabled = true;
      await group.updateComplete;
      expect(group.getAttribute('aria-disabled')).to.eq('true');
    });
  });

  describe('a11y', () => {
    it('should pass accessibility test', async () => {
      // TODO: https://github.com/vaadin/vaadin-radio-button/issues/139
      await expect(group).to.be.accessible({ ignoredRules: ['aria-allowed-role'] });
    });
  });
});

describe('radio-group with initial value', () => {
  let group: VaadinRadioGroup;
  let buttons: VaadinRadioButton[];

  beforeEach(async () => {
    group = await fixture(html`
      <vaadin-radio-group>
        <vaadin-radio-button>Button 1</vaadin-radio-button>
        <vaadin-radio-button value="1" checked>Button 2</vaadin-radio-button>
        <vaadin-radio-button value="2" checked>Button 3</vaadin-radio-button>
        <vaadin-radio-button>Button 4</vaadin-radio-button>
      </vaadin-radio-group>
    `);

    buttons = group.items as VaadinRadioButton[];
    await Promise.all(buttons.map(button => button.updateComplete));
  });

  it('should set the value based on the initially checked radio button', () => {
    expect(group.value).to.be.equal('2');
  });

  it('should set the last initially checked button value as the radio group value', () => {
    expect(buttons[1].checked).to.be.false;
    expect(buttons[2].checked).to.be.true;
  });

  it('should reset the value of radio group if the checked radio button is removed', async () => {
    const button = buttons[2];
    group.removeChild(button);
    await nextFrame();
    await group.updateComplete;
    expect(group.value).to.not.be.equal('2');
  });
});
