import Phaser from "phaser";
import MainScene from "./mainScene";

const config = {
  type: Phaser.AUTO,
  backgroundColor: 0xf0e2ff,
  scale: {
    parent: 'game',
    width: 1000,
    height: 700,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT
  },
  pixelArt: true,
  parent: "game",
  scene: [MainScene],
  pixelArt: false,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);

export default game;