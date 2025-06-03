import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('foodgoo-detalle')
export class FoodgooDetalle extends LitElement {
  // Estas propiedades serán asignadas por el padre
  img: string = '';
  title: string = '';
  subtitle: string = '';
  portion: number = 1;
  spicy: number = 1;

  static styles = css`
    .detalle-container {
      padding: 24px 16px 0 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .detalle-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .detalle-img {
      width: 160px;
      height: 160px;
      object-fit: contain;
      border-radius: 16px;
      margin-bottom: 16px;
      background: #fafafa;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .detalle-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 4px;
      text-align: center;
    }
    .detalle-subtitle {
      font-size: 1rem;
      color: #888;
      margin-bottom: 16px;
      text-align: center;
    }
    .detalle-rating {
      display: flex;
      align-items: center;
      font-size: 1rem;
      color: #888;
      margin-bottom: 8px;
      gap: 8px;
    }
    .star {
      color: #ffc107;
      font-size: 1.1rem;
      margin-right: 2px;
    }
    .detalle-desc {
      font-size: 1rem;
      color: #444;
      margin-bottom: 20px;
      text-align: left;
      line-height: 1.5;
    }
    .detalle-controls {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 16px;
    }
    .spicy-control, .portion-control {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .spicy-label, .portion-label {
      font-size: 0.95rem;
      color: #888;
      margin-bottom: 8px;
    }
    .spicy-slider {
      width: 100%;
      margin-bottom: 4px;
    }
    .spicy-scale {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 0.85rem;
      color: #888;
    }
    .portion-btns {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .portion-btn {
      background: #ff5252;
      color: #fff;
      border: none;
      border-radius: 8px;
      width: 36px;
      height: 36px;
      font-size: 1.3rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
    }
    .portion-value {
      font-size: 1.1rem;
      min-width: 24px;
      text-align: center;
    }
    .detalle-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      width: 100%;
      justify-content: center;
    }
    .price-btn {
      background: #fff;
      color: #f44336;
      border: 2px solid #f44336;
      border-radius: 12px;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .order-btn {
      background: #111;
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 12px 32px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
  `;

  render() {
    return html`
      <div class="detalle-container">
        <div class="detalle-header">
          <button
            style="background:none;border:none;font-size:1.4rem;cursor:pointer;"
            @click=${this._goBack}
            aria-label="Volver"
          >←</button>
          <span style="font-size:1.4rem;cursor:pointer;">🔍</span>
        </div>
        <img class="detalle-img" src="${this.img}" alt="${this.title}" />
        <div class="detalle-title">${this.title}</div>
        <div class="detalle-subtitle">${this.subtitle}</div>
        <div class="detalle-rating">
          <span class="star">★</span>4.9 &nbsp;–&nbsp; 26 mins
        </div>
        <div class="detalle-desc">
          The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite.
          Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce,
          ripe tomato, and crunchy pickles.
        </div>
        <div class="detalle-controls">
          <div class="spicy-control">
            <div class="spicy-label">Spicy</div>
            <input
              class="spicy-slider"
              type="range"
              min="0"
              max="2"
              .value=${String(this.spicy)}
              @input=${this._onSpicyChange}
            />
            <div class="spicy-scale">
              <span style="color: #43a047;">Mild</span>
              <span style="color: #e53935;">Hot</span>
            </div>
          </div>
          <div class="portion-control">
            <div class="portion-label">Portion</div>
            <div class="portion-btns">
              <button class="portion-btn" @click=${this._decrementPortion}>-</button>
              <span class="portion-value">${this.portion}</span>
              <button class="portion-btn" @click=${this._incrementPortion}>+</button>
            </div>
          </div>
        </div>
        <div class="detalle-actions">
          <button class="price-btn">$8.24</button>
          <button class="order-btn" @click=${this._orderNow}>ORDER NOW</button>
        </div>
      </div>
    `;
  }

  private _goBack() {
    this.dispatchEvent(new CustomEvent('go-listado', { bubbles: true, composed: true }));
  }

  private _orderNow() {
    this.dispatchEvent(new CustomEvent('show-modal', {
      detail: {
        portion: this.portion,
        title: this.title,
        subtitle: this.subtitle
      },
      bubbles: true,
      composed: true
    }));
  }

  private _onSpicyChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.spicy = Number(input.value);
    this.requestUpdate();
  }

  private _incrementPortion() {
    this.portion++;
    this._emitPortionChanged();
    this.requestUpdate();
  }

  private _decrementPortion() {
    if (this.portion > 1) {
      this.portion--;
      this._emitPortionChanged();
      this.requestUpdate();
    }
  }

  private _emitPortionChanged() {
    this.dispatchEvent(new CustomEvent('portion-changed', {
      detail: this.portion,
      bubbles: true,
      composed: true
    }));
  }
}