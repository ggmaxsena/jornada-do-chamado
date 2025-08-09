import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import CharacterCreationScene from './scenes/CharacterCreationScene.js';
import GameScene from './scenes/GameScene.js';

console.log('main.js: Inicializando Phaser Game com configuração DOM.');

new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  antialiasGL: false,
  backgroundColor: '#1b1b1b',
  parent: 'game-container', // Define o ID do elemento pai
  scene: [BootScene, CharacterCreationScene, GameScene],
  dom: { createContainer: true }, // Garante que o contêiner DOM seja criado
  physics: { default: 'arcade', arcade: { gravity: { y: 0 } } }
});