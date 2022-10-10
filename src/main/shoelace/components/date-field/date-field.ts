import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { createRef, ref } from 'lit/directives/ref';
import { LocalizeController } from '@shoelace-style/localize';
import { dateAttributeConverter } from '../../utils/attribute-converters';

// custom elements
import SlInput from '@shoelace-style/shoelace/dist/components/input/input';
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon';
import SlIconButton from '@shoelace-style/shoelace/dist/components/icon-button/icon-button';
import SlDropdown from '@shoelace-style/shoelace/dist/components/dropdown/dropdown';
import { DatePicker } from '../date-picker/date-picker';

// styles
import dateFieldStyles from './date-field.styles';

// icons
import dateIcon from '../../icons/calendar3.icon';
import datesIcon from '../../icons/calendar3.icon';
import timeIcon from '../../icons/clock.icon';
import dateTimeIcon from '../../icons/calendar3.icon';
import dateRangeIcon from '../../icons/calendar-range.icon';
import weekIcon from '../../icons/calendar.icon';
import monthIcon from '../../icons/calendar.icon';
import yearIcon from '../../icons/calendar.icon';

// === types =========================================================

declare global {
  interface HTMLElementTagNameMap {
    'sx-date-field': DateField;
  }
}

// === DateField =====================================================

// dependencies (to prevent to much tree shaking)
void DatePicker || SlDropdown || SlIcon || SlIconButton || SlInput;

@customElement('sx-date-field')
export class DateField extends LitElement {
  static styles = dateFieldStyles;

  @property({ type: String, attribute: 'selection-mode' })
  selectionMode: 'date' | 'dateTime' | 'dateRange' | 'time' = 'date';

  @property()
  name = '';

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ attribute: false })
  selection: Date[] = [];

  @property({ type: Boolean, attribute: 'show-week-numbers' })
  showWeekNumbers = false;

  @property({ type: Boolean, attribute: 'show-adjacent-days' })
  showAdjacentDays = false;

  @property({ type: Boolean, attribute: 'highlight-weekends' })
  highlightWeekends = false;

  @property({ type: Boolean, attribute: 'disable-weekends' })
  disableWeekends = false;

  @property({ type: Boolean, attribute: 'fixed-day-count' })
  fixedDayCount = false; // will be ignored if showAdjacentDays is false

  @property({ converter: dateAttributeConverter, attribute: 'min-date' })
  minDate: Date | null = null;

  @property({ converter: dateAttributeConverter, attribute: 'max-date' })
  maxDate: Date | null = null;

  @state()
  private _value = '';

  private _localize = new LocalizeController(this);
  private _inputRef = createRef<SlInput>();
  private _pickerRef = createRef<DatePicker>();
  private _dropdownRef = createRef<SlDropdown>();

  private _onInputClick() {
    this._inputRef.value!.focus();
  }

  private _onOkClick = () => {
    this._value = this._pickerRef.value!.value;
    this._dropdownRef.value!.hide();
  };

  private _onInputKeyDown = (ev: KeyboardEvent) => {
    if (ev.key !== 'ArrowDown' || this._dropdownRef.value!.open) {
      return;
    }

    this._dropdownRef.value!.show();
  };

  private _onCancelClick = () => {
    this._dropdownRef.value!.hide();
  };

  private _onClearClick = () => {
    this._value = '';
    this._dropdownRef.value!.hide();
  };

  render() {
    const icon = {
      date: dateIcon,
      dates: datesIcon,
      dateRange: dateRangeIcon,
      dateTime: dateTimeIcon,
      time: timeIcon,
      week: weekIcon,
      month: monthIcon,
      year: yearIcon
    }[this.selectionMode];

    return html`
      <div class="base">
        <sl-dropdown
          class="dropdown"
          placement="bottom-start"
          distance=${2}
          skidding=${2}
          .containingElement=${this}
          hoist
          ${ref(this._dropdownRef)}
        >
          <sl-input
            slot="trigger"
            class="sl-control"
            value=${this._value}
            ?disabled=${this.disabled}
            readonly
            @click=${this._onInputClick}
            @keydown=${this._onInputKeyDown}
            ${ref(this._inputRef)}
            class=${classMap({
              'input': true,
              'input--disabled': this.disabled
            })}
          >
            <sl-icon slot="suffix" class="calendar-icon" src=${icon}> </sl-icon>
            <span
              slot="label"
              class=${classMap({
                'sl-control-label': true,
                'sl-control-label--required': this.required
              })}
            >
              ${this.label}
            </span>
          </sl-input>
          <div class="popup-content">
            <sx-date-picker
              class="date-picker"
              .selectionMode=${this.selectionMode}
              .showAdjacentDays=${this.showAdjacentDays}
              .showWeekNumbers=${this.showWeekNumbers}
              .highlightWeekends=${this.highlightWeekends}
              .disableWeekends=${this.disableWeekends}
              .minDate=${this.minDate}
              .maxDate=${this.minDate}
              .fixedDayCount=${this.fixedDayCount}
              ${ref(this._pickerRef)}
            >
            </sx-date-picker>
            <div class="popup-footer">
              <sl-button
                variant="text"
                size="small"
                class="button"
                @click=${this._onClearClick}
                >Clear</sl-button
              >
              <sl-button
                variant="text"
                class="button"
                size="small"
                @click=${this._onCancelClick}
              >
                Cancel
              </sl-button>
              <sl-button
                variant="text"
                class="button"
                size="small"
                @click=${this._onOkClick}
              >
                OK
              </sl-button>
            </div>
          </div>
        </sl-dropdown>
      </div>
    `;
  }
}