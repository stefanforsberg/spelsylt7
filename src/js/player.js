import Phaser from "phaser";
import { Sandwich } from "./thought";


export default class Player extends Phaser.Physics.Arcade.Image {

    constructor(scene) {
      super(scene, 500, 520, 'runa_happy');
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this);

      this.rotation = 0.03;

      this.needs = ["sandwich","tomato"]

      this.thoughtArea = this.scene.add.graphics();

      this.thoughtArea.fillStyle(0xffffff, 1);
      this.thoughtArea.lineStyle(2,0xa3a3a3,1);

      this.thoughtArea.fillCircle(this.x, this.y-220, 50);
      this.thoughtArea.strokeCircle(this.x, this.y-220, 50);

      this.scene.physics.world.enable(this.thoughtArea);

      this.thoughtArea.body.setSize(200, 200)
      this.thoughtArea.body.setCircle(50, this.x-50,  this.y-270);


      const graphics = this.scene.add.graphics();

      graphics.fillStyle(0xffffff, 1);
      graphics.lineStyle(2,0xa3a3a3,1);

      graphics.fillCircle(this.x, this.y-100, 5);
      graphics.strokeCircle(this.x, this.y-100, 5);

      graphics.fillCircle(this.x-20, this.y-120, 10);
      graphics.strokeCircle(this.x-20, this.y-120, 10);

      graphics.fillCircle(this.x+20, this.y-140, 20);
      graphics.strokeCircle(this.x+20, this.y-140, 20);

      


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
        duration: 500
      })
    }

    reset() {
      this.currentNeeds = []
    }

    newNeed() {
      const newNeed = Phaser.Math.RND.pick(this.needs);
      const need = this.scene.add.image(this.x, this.y-220, newNeed)
      this.currentNeeds.push(need)

    }

    setMood(mood) {
      this.setTexture(`runa_${mood}`);
    }

    thoughtHit(t) {

      const i = this.currentNeeds.findIndex(n => n.texture === t);


      if(i > -1) {
        this.currentNeeds[i].destroy();
        this.currentNeeds.splice(i,1);

        this.newNeed();

        this.scene.energy.boost(3)
      } else {
        this.scene.energy.boost(-3)
      }
      

      
    }
}
