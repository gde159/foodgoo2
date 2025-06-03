import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './vista-listado/foodgoo-header';
import './vista-listado/foodgoo-search';
import './vista-listado/foodgoo-tabs';
import './vista-listado/foodgoo-imagen';
import './vista-listado/foodgoo-footer';
import './vista-detalle/foodgoo-detalle';
import './vista-modal/foodgoo-modal';

@customElement('foodgoo-app')
export class FoodgooApp extends LitElement {
  private vista: 'listado' | 'detalle' = 'listado';
  private mostrarModal = false;
  private detalleImg = '';
  private detalleTitle = '';
  private detalleSubtitle = '';
  private detallePortion: number = 1; // NUEVO
  private modalTexto: string = '';

  static styles = css`
    .app-container {
      max-width: 430px;
      margin: 24px auto;
      min-height: 100vh;
      background: #fff;
      position: relative;
      box-shadow: 0 0 24px rgba(0,0,0,0.10);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding-bottom: 80px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('go-detalle', this._mostrarDetalle as EventListener);
    this.addEventListener('go-listado', this._mostrarListado as EventListener);
    this.addEventListener('show-modal', this._mostrarModal as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener('go-detalle', this._mostrarDetalle as EventListener);
    this.removeEventListener('go-listado', this._mostrarListado as EventListener);
    this.removeEventListener('show-modal', this._mostrarModal as EventListener);
    super.disconnectedCallback();
  }

  private _mostrarDetalle = (e: Event) => {
    const customEvent = e as CustomEvent;
    if (customEvent.detail) {
      this.detalleImg = customEvent.detail.img;
      this.detalleTitle = customEvent.detail.title;
      this.detalleSubtitle = customEvent.detail.subtitle;
      this.detallePortion = 1; // Reinicia portion al entrar al detalle
    }
    this.vista = 'detalle';
    this.requestUpdate();
  };

  private _mostrarListado() {
    this.vista = 'listado';
    this.mostrarModal = false;
    this.requestUpdate();
  }

  private _mostrarModal = (e: Event) => {
    const customEvent = e as CustomEvent;
    if (customEvent.detail) {
      const { portion, title, subtitle } = customEvent.detail;
      this.modalTexto = `${portion} ${title} ${subtitle}`;
    }
    this.mostrarModal = true;
    this.requestUpdate();
  };

  // Recibe el evento para actualizar portion desde foodgoo-detalle
  private _actualizarPortion = (e: CustomEvent) => {
    this.detallePortion = e.detail;
    this.requestUpdate();
  };

  render() {
    return html`
      <div class="app-container">
        <foodgoo-header></foodgoo-header>
        ${this.vista === 'listado'
          ? html`
              <foodgoo-search></foodgoo-search>
              <foodgoo-tabs></foodgoo-tabs>
              <foodgoo-imagen></foodgoo-imagen>
            `
          : html`
              <foodgoo-detalle
                .img=${this.detalleImg}
                .title=${this.detalleTitle}
                .subtitle=${this.detalleSubtitle}
                .portion=${this.detallePortion}
                @portion-changed=${this._actualizarPortion}
                @go-listado=${this._mostrarListado}
                @show-modal=${this._mostrarModal}
              ></foodgoo-detalle>
            `
        }
        ${this.mostrarModal ? html`
          <foodgoo-modal .texto=${this.modalTexto}></foodgoo-modal>
        ` : ''}
      </div>
      <foodgoo-footer></foodgoo-footer>
    `;
  }
}