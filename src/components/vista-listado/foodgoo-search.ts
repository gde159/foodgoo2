import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('foodgoo-search')
export class FoodgooSearch extends LitElement {
  static styles = css`
    .search-bar {
      display: flex;
      align-items: center;
      padding: 0 16px;
      margin-bottom: 16px;
    }
    .input {
      flex: 1;
      padding: 12px;
      border-radius: 16px;
      border: none;
      background: #f5f5f5;
      font-size: 1rem;
      margin-right: 8px;
    }
    .search-btn {
      background: #f44336;
      border: none;
      border-radius: 12px;
      width: 40px;
      height: 40px;
      color: #fff;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  `;
  render() {
    return html`
      <div class="search-bar">
        <input class="input" type="text" placeholder="Search" />
        <button class="search-btn">☰</button>
      </div>
    `;
  }
}