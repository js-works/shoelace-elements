import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';

// components
import SlTab from '@shoelace-style/shoelace/dist/components/tab/tab';
import SlTabGroup from '@shoelace-style/shoelace/dist/components/tab-group/tab-group';
import SlTabPanel from '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel';
import { DialogsController } from '../main/shoelace-widgets-lit';
import { TextField } from '../main/shoelace-widgets';
import { TextArea } from '../main/shoelace-widgets';
import { Choice } from '../main/shoelace-widgets';
import { CompoundField } from '../main/shoelace-widgets';
import { Fieldset } from '../main/shoelace-widgets';
import { Form } from '../main/shoelace-widgets';
import { FormSection } from '../main/shoelace-widgets';
import { Sidenav } from '../main/shoelace-widgets';

export default {
  title: 'shoelace-widgets'
};

export const dialogs = () =>
  '<dialogs-demo class="sl-theme-light"></dialogs-demo>';

const styles = css`
  :host {
    padding: 3rem;
    box-sizing: border-box;
    background-color: var(--sl-color-neutral-0);
  }

  .demo sl-button {
    width: 9rem;
    margin: 4px 2px;
  }

  h4 {
    color: var(--sl-color-primary-950);
    background-color: var(--sl-color-neutral-100);
    border: 0px solid var(--sl-color-neutral-300);
    border-width: 0 0 1px 0;
    padding: 0.25rem 0.5rem;
    margin: 0 0 0.75rem 0;
    font-weight: 500;
    font-size: var(--sl-font-size-medium);
  }
`;

@customElement('dialogs-demo')
class DialogsDemo extends LitElement {
  static styles = styles;

  static {
    // depenencies (to prevent too much tree shaking)
    void [
      CompoundField,
      Choice,
      Fieldset,
      Form,
      FormSection,
      TextArea,
      TextField,
      Sidenav,
      SlTab,
      SlTabGroup,
      SlTabPanel
    ];
  }

  private _dlg = new DialogsController(this);

  private _onInfoClick = () => {
    this._dlg.info({
      message: 'Your question has been submitted successfully',
      title: 'Submit',
      okText: 'Thanks :-)'
    });
  };

  private _onSuccessClick = () => {
    this._dlg.success({
      message: 'Your question has been submitted successfully',
      title: 'Submit',
      okText: 'Good to know'
    });
  };

  private _onWarnClick = () => {
    this._dlg.warn({
      message: 'This is your last warning',
      title: 'Important!!!',
      okText: 'OK - I understand'
    });
  };

  private _onErrorClick = () => {
    this._dlg.error({
      message: 'The form could not be submitted',
      title: 'Form error',
      okText: 'OK - I understand'
    });
  };

  private _onConfirmClick = async () => {
    const confirmed = await this._dlg.confirm({
      message: 'Do you really want to log out?',
      okText: 'Log out'
    });

    if (confirmed) {
      await pause(200);

      this._dlg.info({
        message: "You've been logged out"
      });
    }
  };

  private _onApproveClick = async () => {
    const approved = await this._dlg.approve({
      message: 'Do you really want to delete the project?',
      title: 'Are you sure?',
      okText: 'Delete project'
    });

    if (approved) {
      this._dlg.info({
        message: 'Project has been deleted'
      });
    }
  };

  private _onPromptClick = async () => {
    const name = await this._dlg.prompt({
      message: 'Please enter your name',
      title: 'Input required',
      cancelText: 'No way!'
    });

    if (name !== null) {
      await pause(200);

      this._dlg.info({
        message: `Hello, ${name || 'stranger'}!`
      });
    }
  };

  private _onInputClick = async () => {
    const data = await this._dlg.input({
      title: 'Add new user',
      labelLayout: 'horizontal',
      width: '50rem',
      height: '35rem',

      content: html`
        <sx-sidenav
          .menu=${[
            { text: 'General', tabId: 'general' },
            { text: 'Contact', tabId: 'contact' },
            { text: 'Notes', tabId: 'notes' }
          ]}
        >
          <div data-tab="general">
            <h4>General</h4>
              <sx-fieldset caption="User">
                <sx-choice
                  label="Salutation"
                  type="horizontal-radios"
                  required
                  .options=${[
                    { value: 'mrs', text: 'Mrs.' },
                    { value: 'mr', text: 'Mr.' },
                    { value: 'x', text: 'Other' }
                  ]}
                ></sx-choice>
                <sx-text-field
                  label="First name"
                  name="firstName"
                  required
                ></sx-text-field>
                <sx-text-field
                  label="Last name"
                  name="lastName"
                  required
                ></sx-text-field>
                <sx-date-field
                  label="Day of birth"
                  name="dayOfBirth"
                  show-adjacent-days
                  fixed-day-count
                ></sx-date-field>
              </sx-fieldset>
              <sx-fieldset caption="Address">
                <sx-vbox>
                  <sx-text-field label="Street" required></sx-text-field>
                  <sx-compound-field label="Zip / City" column-widths="30% 70%">
                    <sx-text-field name="zip" required></sx-text-field>
                    <sx-text-field name="city" required></sx-text-field>
                  </sx-compound-field>
                  <sx-choice
                    label="Country"
                    required
                    .options=${[
                      { value: 'gb', text: 'Great Britain' },
                      { value: 'us', text: 'USA' }
                    ]}
                  ></sx-choice>
                </sx-vbox>
              </sx-fieldset>
            </sx-hbox>
          </div>
          <div data-tab="contact">
            <h4>Contact</h4>
            <sx-fieldset caption="Phone + email">
              <sx-text-field
                name="phone"
                type="telephone"
                label="Phone"
                required
              >
              </sx-text-field>
              <sx-text-field name="mobilePhone" type="phone" label="Mobile">
              </sx-text-field>
              <sx-text-field
                name="email"
                type="email"
                label="Email address"
                required
              >
              </sx-text-field>
            </sx-fieldset>
            <sx-fieldset caption="Company">
              <sx-text-field name="company" label="Company" aria-required>
              </sx-text-field>
              <sx-text-field name="companyStreet" label="Street" aria-required>
              </sx-text-field>
              <sx-compound-field label="Zip / City" column-widths="30% 70%">
                <sx-text-field name="companyPostalCode" aria-required>
                </sx-text-field>
                <sx-text-field name="companyCity" aria-required>
                </sx-text-field>
              </sx-compound-field>
              <sx-choice
                label="Country"
                name="companyCountry"
                required
                .options=${[
                  { value: 'gb', text: 'Great Britain' },
                  { value: 'us', text: 'USA' }
                ]}
              ></sx-choice>
            </sx-fieldset>
          </div>
          <div data-tab="notes">
            <h4>Notes</h4>
            <sx-fieldset caption="Notes and comments" label-layout="vertical">
              <sx-text-area label="General notes" rows="5"></sx-text-area>
              <sx-text-area label="Comments" rows="5"></sx-text-area>
            </sx-fieldset>
          </div>
        </sx-sidenav>
      `,

      okText: 'Add user'
    });
  };

  private _onDestroyPlanet = async () => {
    const confirmed = await this._dlg.confirm({
      message: 'Are you really sure that the planet shall be destroyed?'
    });

    if (confirmed) {
      await pause(200);

      const approved = await this._dlg.approve({
        message:
          'But this is such a lovely planet. ' +
          'Are you really, really sure it shall be destroyed?',

        okText: 'Destroy!',
        cancelText: 'Abort'
      });

      if (approved) {
        await pause(200);

        await this._dlg.error({
          message:
            'You are not allowed to destroy planets. ' +
            'Only Darth Vader is authorized.'
        });
      }
    }
  };

  render() {
    return html`
      <div class="demo">
        <div>
          <sl-button @click=${this._onInfoClick}>Info</sl-button>
        </div>
        <div>
          <sl-button @click=${this._onSuccessClick}>Success</sl-button>
        </div>
        <div>
          <sl-button @click=${this._onWarnClick}>Warn</sl-button>
        </div>
        <div>
          <sl-button @click=${this._onErrorClick}>Error</sl-button>
        </div>
        <div>
          <sl-button @click=${this._onConfirmClick}>Confirm</sl-button>
        </div>
        <div>
          <sl-button @click=${this._onApproveClick}>Approve</sl-button>
        </div>
        <div>
          <sl-button @click=${this._onPromptClick}>Prompt</sl-button>
        </div>
        <div>
          <sl-button @click=${this._onInputClick}>Input</sl-button>
        </div>
        <br />
        <sl-button @click=${this._onDestroyPlanet}>
          Destroy planet &#x1F609;
        </sl-button>
      </div>
      ${this._dlg.render()}
    `;
  }
}

function pause(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}