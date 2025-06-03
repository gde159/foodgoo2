import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('foodgoo-tabs')
export class FoodgooTabs extends LitElement {
  static styles = css`
    .tabs {
      display: flex;
      gap: 8px;
      padding: 0 16px 16px 16px;
    }
    .tab {
      padding: 8px 16px;
      border-radius: 16px;
      background: #f5f5f5;
      color: #f44336;
      font-weight: 500;
      cursor: pointer;
      border: none;
      outline: none;
      transition: background 0.2s;
    }
    .tab.active {
      background: #f44336;
      color: #fff;
    }
  `;
  render() {
    return html`
      <div class="tabs">
        <button class="tab active">All</button>
        <button class="tab">Combos</button>
        <button class="tab">Sliders</button>
        <button class="tab">Classics</button>
      </div>
    `;
  }
}