import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() { super({ key: 'BootScene' }); }
  preload() { this.load.image('logo', '/assets/images/logo.png'); }
  create()  {
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;

    const logo = this.add.image(gameWidth / 2, gameHeight / 2, 'logo');

    // Calcula a escala para que a imagem caiba dentro de 80% da largura OU altura do jogo
    const scaleX = (gameWidth * 0.8) / logo.width;
    const scaleY = (gameHeight * 0.8) / logo.height;
    const scale = Math.min(scaleX, scaleY);

    logo.setScale(scale);
    logo.setOrigin(0.5); // Centraliza a origem da imagem

    // Transiciona para a cena de criação de personagem após 3 segundos
    this.time.delayedCall(3000, () => {
      this.scene.start('CharacterCreationScene');
    });
  }
}