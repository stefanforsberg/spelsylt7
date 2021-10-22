import Phaser from "phaser";
import { Sandwich } from "./thought";

export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 500, 520, "runa_happy");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.rotation = 0.03;

    this.needs = ["sandwich", "walk", "painting", "tree", "pencil", "cheese"];

    this.thoughtArea = this.scene.add.graphics();

    this.thoughtArea.fillStyle(0xffffff, 1);
    this.thoughtArea.lineStyle(2, 0xa3a3a3, 1);

    this.thoughtArea.fillCircle(this.x, this.y - 220, 50);
    this.thoughtArea.strokeCircle(this.x, this.y - 220, 50);

    this.scene.physics.world.enable(this.thoughtArea);

    this.thoughtArea.body.setSize(200, 200);
    this.thoughtArea.body.setCircle(50, this.x - 50, this.y - 270);

    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0xffffff, 1);
    graphics.lineStyle(2, 0xa3a3a3, 1);

    graphics.fillCircle(this.x, this.y - 100, 5);
    graphics.strokeCircle(this.x, this.y - 100, 5);

    graphics.fillCircle(this.x - 20, this.y - 120, 10);
    graphics.strokeCircle(this.x - 20, this.y - 120, 10);

    graphics.fillCircle(this.x + 20, this.y - 140, 20);
    graphics.strokeCircle(this.x + 20, this.y - 140, 20);

    this.starParticles = this.scene.add.particles("star");

    this.reset();
    this.newNeed();
  }

  anim() {
    this.tween = this.scene.tweens.add({
      targets: [this],
      yoyo: true,
      repeat: -1,
      scale: 1.15,
      rotation: -0.03,
      duration: 500,
    });
  }

  reset() {
    this.currentNeeds = "";
  }

  newNeed() {
    if (this.needResetTimer) this.needResetTimer.remove();
    if (this.needResetWarning) this.needResetWarning.remove();
    if (this.needResetWarningTween) this.needResetWarningTween.remove();

    const newNeed = Phaser.Math.RND.pick(this.needs);
    if (!this.need) {
      this.need = this.scene.add.image(this.x, this.y - 220, newNeed);
      this.need.setTexture(newNeed);
    } else {
      console.log(newNeed);
      this.need.setTexture(newNeed);
    }

    this.needResetWarningTween = this.scene.time.addEvent({
      delay: 16000,
      callback: () => {
        console.log("WARNING");
        this.needResetWarning = this.scene.tweens.add({
          targets: [this.need],
          alpha: 0,
          duration: 300,
          repeat: -1,
          yoyo: true,
        });
      },
      loop: false,
    });

    this.needResetTimer = this.scene.time.addEvent({
      delay: 20000,
      callback: () => {
        this.newNeed();
      },
      loop: false,
    });

    this.need.alpha = 1;

    this.currentNeeds = newNeed;
  }

  setMood(mood) {
    this.setTexture(`runa_${mood}`);
  }

  thoughtHit(t) {
    const correctTought = this.currentNeeds === t.key;

    if (correctTought) {

      if(Math.random() > 0.5) {
        this.scene.sound.play("sfx", { name: "asd", start: 2, duration: 1, config: {} });
      } else {
        this.scene.sound.play("sfx", { name: "asd", start: 7, duration: 1.2, config: {} });
      }

      this.emitter = this.starParticles.createEmitter({
        x: 500,
        y: 300,
        lifespan: 3000,
        speed: { min: 35, max: 75 },
        quantity: 3,
        frequency: 7,
        maxParticles: 25,
        alpha: { start: 1, end: 0 },
        scale: { start: 0.2, end: 2 },
      });

      if (this.scene.spinningCuteThing.alpha <= 0) {
        this.scene.tweens.add({
          targets: [this.scene.spinningCuteThing],
          alpha: 1,
          duration: 1500,
          repeat: 0,
          yoyo: true,
        });
      }

      

      this.scene.energy.boost(5);
    } else {
      if (Math.random() > 0.5) {
        this.scene.sound.play("sfx", { name: "asd", start: 4, duration: 1, config: {} });
      } else {
        this.scene.sound.play("sfx", { name: "asd", start: 6, duration: 1, config: {} });
      }

      this.scene.energy.boost(-5);
    }

    this.newNeed();
  }
}
