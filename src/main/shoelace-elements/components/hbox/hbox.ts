import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { shoelaceElement } from 'shoelace-elements/lit';

// styles
import hboxStyles from './hbox.styles';

// === exports =======================================================

export { HBox };

// === types =========================================================

declare global {
  interface HTMLElementTagNameMap {
    'sx-hbox': HBox;
  }
}

// === HBox ==========================================================

@shoelaceElement({
  tag: 'sx-hbox',
  styles: hboxStyles
})
class HBox extends LitElement {
  @property({ attribute: 'align-items' })
  alignItems: 'top' | 'center' | 'bottom' = 'top';

  @property()
  gap: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'huge' = 'none';

  @property({ type: Boolean })
  wrap = false;

  render() {
    const gapClass = ['tiny', 'small', 'medium', 'large', 'huge'].includes(
      this.gap
    )
      ? `gap-${this.gap}`
      : 'gap-none';

    const alignClass =
      this.alignItems === 'top' || this.alignItems === 'bottom'
        ? `align-items-${this.alignItems}`
        : 'align-items-center';

    const wrapClass = this.wrap ? 'wrap' : 'no-wrap';

    return html`
      <div class=${`base ${gapClass} ${alignClass} ${wrapClass}`}>
        <slot></slot>
      </div>
    `;
  }
}
