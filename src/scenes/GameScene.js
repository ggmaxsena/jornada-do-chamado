import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Preload game assets here
  }

  create() {
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Welcome to the Game!', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
  }

  update() {
    // Game logic here
  }
}
