import Phaser from "phaser";

export default class Energy {

    constructor(scene) {
      this.scene = scene;
      this.x = 310;
      this.y = 640;

      

      this.bar = this.scene.add.graphics();

      this.reset();

      this.lastState = "happy";

      this.event = this.scene.time.addEvent({
        delay: 100, 
        callback: this.update,
        callbackScope: this,
        loop: true
      });

    }

    reset() {
      this.energy = 100;
    }

    boost(b) {
      this.energy += b;
    }

    update() {
      this.energy--;

      if(this.energy < 0) {
        this.energy = 100;
      }

      if(this.energy > 50 && this.lastState !== "happy") {
        this.lastState = "happy";
        this.scene.player.setMood("happy");
      }

      if(this.energy < 50 && this.lastState !== "sad") {
        this.lastState = "sad";
        this.scene.player.setMood("sad");
      }
      

      this.bar.clear();

      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 80, 16);

      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

      this.bar.fillStyle(0xff00ff);

      this.bar.fillRect(this.x + 2, this.y + 2, Math.ceil(76*(this.energy/100)), 12);
    }
}
