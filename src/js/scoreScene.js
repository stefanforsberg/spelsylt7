import Phaser from "phaser";

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super({
      key: "ScoreScene",
    });
  }

  preload() {
    
  }

  create(score) {
    this.add.image(500,350,"score")

    var g = this.add.rectangle(500, 415, 305, 77, 0x000000, 0.0);
    g.setInteractive();
    g.on("pointerdown", () => {
      g.disableInteractive();
      
      this.scene.start('MainScene', {caller: 'menu'});
      
    })

    this.add.text(500,550, `Time: ${score.time} seconds`, {color: "rgba(0,0,0,0.5)", fontSize: "40px", fontFamily: "Arial"}).setOrigin(0.5);
  }
}
