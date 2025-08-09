import Phaser from 'phaser';
/** @typedef {import('../data/avatarSchema').AvatarState} AvatarState */

export default class AvatarRenderer {
  scene;
  rt;
  frame = 0;
  outCanvas;
  outCtx;

  constructor(scene, x = 0, y = 0) {
    this.scene = scene;
    this.rt = scene.add.renderTexture(x, y, 64, 64).setOrigin(0.5);
  }

  /** Permite conectar um <canvas> DOM para “preview” externo */
  attachToCanvas(canvasEl) {
    this.outCanvas = canvasEl;
    this.outCanvas.width = 128;
    this.outCanvas.height = 128;
    this.outCtx = canvasEl.getContext('2d', { alpha: true });
    // garante pixel-perfect no browser
    canvasEl.style.imageRendering = 'pixelated';
  }

  /** Atualize o frame de animação (ex. chamado no update) */
  setFrame(f) {
    this.frame = f;
  }

  /** Redesenha todas as camadas conforme o estado */
  redraw(state /** AvatarState */) {
    console.log('redraw!', state);
    this.rt.clear();

    // Show the canvas if it was hidden
    if (this.outCanvas && this.outCanvas.style.display === 'none') {
      this.outCanvas.style.display = 'block';
    }

    // 1. Corpo base (gênero + tom de pele)
    const bodyFrame = `body_${state.gender}_${state.skin}`;
    this.draw('body', bodyFrame);

    // 2. Cabelo
    const hairFrame = `hair_${state.hair}`;
    this.draw('hair', hairFrame);

    // 3. Roupa dependendo da moralidade
    const robeKey = 'robes_0'; // TODO: Implementar seleção de roupa baseada em moralidade/equipamento
    this.draw('robes', robeKey);

    // 4. Equipamentos
    if (state.equipment.armor !== 'none')
      this.draw('armors', 'armors_0'); // TODO: Implementar seleção de armadura
    if (state.equipment.weapon !== 'none')
      this.draw('weapons', 'weapons_0'); // TODO: Implementar seleção de arma

    // 5. Efeitos de graça
    if (state.grace > 80) this.draw('fx', 'fx_0');

    /* === copia para o canvas externo, se existir === */
    if (this.outCtx) {
      this.rt.snapshot((img) => {
        const { width, height } = this.outCanvas;
        this.outCtx.clearRect(0, 0, width, height);
        // desenha esticado mantendo “nearest neighbour”
        this.outCtx.imageSmoothingEnabled = false;
        this.outCtx.drawImage(img, 0, 0, width, height);
      });
    }
  }

  /**
   * @private
   * @param {string} sheet
   * @param {string} frameKey
   */
  draw(sheet, frameKey) {
    const sprite = this.scene.add
      .sprite(0, 0, sheet, frameKey) // Usa o quadro diretamente
      .setOrigin(0); // 0,0 para alinhar no canto
    this.rt.draw(sprite, 0, 0);
    sprite.destroy(); // não precisamos mantê-lo vivo
  }
}