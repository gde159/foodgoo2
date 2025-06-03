import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('foodgoo-footer')
export class FoodgooFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 100%;
      max-width: 430px;
      z-index: 100;
      /* Opcional: sombra para que se vea flotante */
      box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
    }
    .footer-bar {
      background: #f44336;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom-left-radius: 24px;
      border-bottom-right-radius: 24px;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
      position: relative;
    }
    .footer-bar .icon {
      color: #fff;
      font-size: 24px;
      flex: 1;
      text-align: center;
      z-index: 1;
    }
    .footer-bar .icon[aria-label="Favoritos"] {
      background: #f44336;
      border: none;
      border-radius: 50%;
      padding: 4px;
    }
    .fab-container {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(-30%);
      z-index: 2;
    }
    .fab {
      background: #fff;
      color: #f44336;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      border: none;
      cursor: pointer;
      outline: none;
    }
  `;

  favCount: number = 0;

  render() {
    return html`
      <div class="footer-bar">
        <span class="icon">🏠</span>
        <span class="icon">👤</span>
        <div class="fab-container">
          <button id="favbtn" class="fab">${this.favCount}</button>
        </div>
        <span class="icon">📝</span>
        <button class="icon" aria-label="Favoritos">❤️</button>
      </div>
    `;
  }
/*@click=${this._goToDetalle}
  private _goToDetalle() {
    this.dispatchEvent(new CustomEvent('go-detalle', { bubbles: true, composed: true }));
  }*/
}