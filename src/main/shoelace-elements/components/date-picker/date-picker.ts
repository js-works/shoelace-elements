import { css, html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { LocalizeController } from '@shoelace-style/localize/dist/index';
import { DatePicker as Picker } from './vanilla/date-picker';
import { dateAttributeConverter } from '../../utils/attribute-converters';
import { GregorianCalendar } from './vanilla/calendars/gregorian/gregorian-calendar';

import { shoelaceFormField } from 'shoelace-elements/lit';
import type { Calendar } from './vanilla/calendar';

// === exports =======================================================

export { DatePicker };

// === exported types ================================================

namespace DatePicker {
  export type SelectionMode = Picker.SelectionMode;
}

// === styles  =======================================================

const datePickerCustomStyles = css`
  :host {
    --cal-font-family: var(--sl-font-sans);
    --cal-font-size: var(--sl-font-size-medium);
    --cal-color: var(--sl-color-neutral-1000);
    --cal-background-color: transparent;
    --cal-header-color: var(--sl-color-neutral-1000);
    --cal-header-background-color: transparent;
    --cal-header-hover-background-color: var(--sl-color-primary-300);
    --cal-header-active-background-color: var(--sl-color-primary-400);
    --cal-header-accentuated-color: var(--sl-color-neutral-0);
    --cal-header-accentuated-background-color: var(--sl-color-primary-600);

    --cal-header-accentuated-hover-background-color: var(
      --sl-color-primary-700
    );

    --cal-header-accentuated-active-background-color: var(
      --sl-color-primary-800
    );

    --cal-cell-hover-background-color: var(--sl-color-primary-200);
    --cal-cell-disabled-color: var(--sl-color-neutral-300);
    --cal-cell-highlighted-background-color: var(--sl-color-neutral-50);
    --cal-cell-adjacent-color: var(--sl-color-neutral-400);
    --cal-cell-adjacent-disabled-color: var(--sl-color-neutral-200);
    --cal-cell-adjacent-selected-color: var(--sl-color-neutral-800);
    --cal-cell-current-highlighted-color: var(--sl-color-primary-600);
    --cal-cell-selected-color: var(--sl-color-neutral-0);
    --cal-cell-selected-background-color: var(--sl-color-primary-500);
    --cal-cell-selected-hover-background-color: var(--sl-color-primary-600);
    --cal-cell-selection-range-background-color: var(--sl-color-primary-100);
    --cal-slider-thumb-background-color: var(--sl-color-neutral-0);
    --cal-slider-thumb-border-color: var(--sl-color-neutral-400);
    --cal-slider-thumb-border-width: 1px;
    --cal-slider-thumb-border-radius: 4px;
    --cal-slider-thumb-hover-background-color: var(--sl-color-neutral-0);
    --cal-slider-thumb-hover-border-color: var(--sl-color-neutral-1000);
    --cal-slider-thumb-focus-background-color: var(--sl-color-primary-600);
    --cal-slider-thumb-focus-border-color: var(--sl-color-primary-600);
    --cal-slider-track-color: var(--sl-color-neutral-400);
    --cal-button-background-color: var(--sl-color-primary-200);
    --cal-button-hover-background-color: var(--sl-color-primary-300);
    --cal-button-active-background-color: var(--sl-color-primary-400);
    --cal-button-border-radius: var(--sl-border-radius-medium);
    --cal-border-color: var(--sl-color-neutral-300);
  }
`;
// === components ====================================================

@shoelaceFormField({
  tag: 'sx-date-picker',
  styles: [unsafeCSS(Picker.styles), datePickerCustomStyles]
})
class DatePicker extends LitElement {
  @property()
  get value(): string {
    return this._picker.getValue();
  }

  set value(value: string) {
    this._picker.setValue(value);
  }

  @property({ type: String, attribute: 'selection-mode' })
  selectionMode: DatePicker.SelectionMode = 'date';

  @property({ type: Boolean, attribute: 'accentuate-header' })
  accentuateHeader = false;

  @property({ type: Boolean, attribute: 'show-week-numbers' })
  showWeekNumbers = false;

  @property({ type: String, attribute: 'calendar-size' })
  calendarSize: 'default' | 'minimal' | 'maximal' = 'minimal';

  @property({ type: Boolean, attribute: 'highlight-current' })
  highlightCurrent = false;

  @property({ type: Boolean, attribute: 'highlight-weekends' })
  highlightWeekends = false;

  @property({ type: Boolean, attribute: 'disable-weekends' })
  disableWeekends = false;

  @property({ type: Boolean, attribute: 'enable-century-view' })
  enableCenturyView = false;

  @property({ converter: dateAttributeConverter, attribute: 'min-date' })
  minDate: Date | null = null;

  @property({ converter: dateAttributeConverter, attribute: 'max-date' })
  maxDate: Date | Calendar.Date | null = null;

  @property()
  lang = '';

  @property()
  dir = '';

  private _picker: Picker;
  private _containerRef = createRef<HTMLDivElement>();
  private _localize = new LocalizeController(this);

  constructor() {
    super();

    this._picker = new Picker({
      calendar: new GregorianCalendar(() => this._localize.lang()),
      requestUpdate: () => this.requestUpdate(),
      onChange: this._onChange,
      getLocale: () => this._localize.lang(),
      getDirection: () => this._localize.dir(),
      getProps: () => this
    });
  }

  private _onChange = () => {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  };

  shouldUpdate() {
    if (!this.hasUpdated) {
      return true;
    }

    this._picker.render(this._containerRef.value!);
    return false;
  }

  firstUpdated() {
    this._picker.render(this._containerRef.value!);
  }

  resetView() {
    this._picker.resetView();
  }

  render() {
    return html`
      <div class="base" ${ref(this._containerRef)}>
        ${unsafeHTML(this._picker.renderToString())}
      </div>
    `;
  }
}
