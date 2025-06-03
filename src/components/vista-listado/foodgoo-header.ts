import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('foodgoo-header')
export class FoodgooHeader extends LitElement {
  static styles = css`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 16px 8px 16px;
    }
    .title {
      font-family: 'Pacifico', cursive;
      font-size: 2rem;
      color: #222;
    }
    .subtitle {
      font-size: 1rem;
      color: #888;
      margin-left: 16px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #f44336;
    }
  `;
  render() {
    return html`
      <div class="header">
        <div>
          <div class="title">Foodgo</div>
          <div class="subtitle">Order your favourite food!</div>
        </div>
        <img class="avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" />
      </div>
    `;
  }
}