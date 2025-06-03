import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('foodgoo-modal')
export class FoodgooModal extends LitElement {
  static styles = css`
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .modal-content {
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.10);
      padding: 40px 32px 32px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 320px;
      max-width: 90vw;
    }
    .modal-icon {
      background: #f44336;
      color: #fff;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      margin-bottom: 24px;
    }
    .modal-title {
      color: #f44336;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
    }
    .modal-desc {
      color: #888;
      font-size: 1rem;
      text-align: center;
      margin-bottom: 32px;
      line-height: 1.5;
    }
    .modal-btn {
      background: #f44336;
      color: #fff;
      border: none;
      border-radius: 16px;
      font-size: 1.1rem;
      padding: 16px 0;
      width: 100%;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(244,67,54,0.15);
      transition: background 0.2s;
    }
    @media (max-width: 400px) {
      .modal-content {
        min-width: 0;
        padding: 24px 8px 16px 8px;
      }
    }
  `;

  texto: string = '';

  render() {
    return html`
      <div class="modal-backdrop">
        <div class="modal-content">
          <div class="modal-icon">✔️</div>
          <div class="modal-title">Success !</div>
          <div class="modal-desc">
            <b>${this.texto}</b><br>
            Your payment was successful.<br>
            A receipt for this purchase has<br>
            been sent to your email.
          </div>
          <button class="modal-btn" @click=${this._goBack}>Go Back</button>
        </div>
      </div>
    `;
  }

  private _goBack() {
    this.dispatchEvent(new CustomEvent('go-listado', { bubbles: true, composed: true }));
  }
}