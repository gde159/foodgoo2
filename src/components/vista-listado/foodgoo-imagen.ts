import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('foodgoo-imagen')
export class FoodgooImagen extends LitElement {
  static styles = css`
    .imagen {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 0 16px 80px 16px; /* espacio para el footer */
    }
    .card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .card img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin-bottom: 8px;
    }
    .card-title {
      font-weight: bold;
      font-size: 1rem;
      margin-bottom: 2px;
    }
    .card-subtitle {
      font-size: 0.85rem;
      color: #888;
      margin-bottom: 8px;
    }
    .card-footer {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }
    .star {
      color: #ffc107;
      font-size: 1rem;
      margin-right: 2px;
    }
    .fav {
      color: #f44336;
      font-size: 1.2rem;
      cursor: pointer;
    }
  `;

  // Propiedad pública para recibir los favoritos desde el padre
  favoritos: number[] = [];

  private _toggleFavorito() {
    // Lógica para marcar/desmarcar favorito...
    // Por ejemplo, sumar o restar 1 según el estado actual

    // Supón que agregas un favorito:
    this.dispatchEvent(new CustomEvent('favorito-cambiado', {
      detail: { cambio: 1 }, // o -1 si es quitar favorito
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const cards = [
      { img: '/img/chesseburger.png', title: 'Cheeseburger', subtitle: "Wendy's Burger" },
      { img: '/img/veggieburger.png', title: 'Hamburger', subtitle: 'Veggie Burger' },
      { img: '/img/hamburgerchicken.png', title: 'Hamburger', subtitle: 'Chicken Burger' },
      { img: '/img/hamburgerfriedchicken.png', title: 'Hamburger', subtitle: 'Fried Chicken Burger' }
    ];
    return html`
      <div class="imagen">
        ${cards.map((card, idx) => html`
          <div class="card" @click=${() => this._goDetalle(card.img, card.title, card.subtitle)}>
            <img src="${card.img}" alt="${card.title}" />
            <div class="card-title">${card.title}</div>
            <div class="card-subtitle">${card.subtitle}</div>
            <div class="card-footer">
              <span><span class="star">★</span>4.${9-idx}</span>
              <span
                class="fav"
                style="color:${this.favoritos.includes(idx) ? '#f44336' : '#ccc'};font-size:1.2rem;cursor:pointer;"
                @click=${(e: Event) => { e.stopPropagation(); this._toggleFavorito(); }}
              >${this.favoritos.includes(idx) ? '❤️' : '♡'}</span>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _goDetalle(img: string, title: string, subtitle: string) {
    this.dispatchEvent(new CustomEvent('go-detalle', {
      detail: { img, title, subtitle },
      bubbles: true,
      composed: true
    }));
  }
}