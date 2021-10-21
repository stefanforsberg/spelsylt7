import Phaser from "phaser";

export default class Energy {

    constructor(scene) {
      this.scene = scene;
      this.x = 500-75;
      this.y = 640;

      

      this.bar = this.scene.add.graphics();

      this.reset();

      this.lastState = "happy";

      this.update();

    }

    reset() {
      this.energy = 100;
    }

    boost(b) {
      this.energy += b;

      if(this.energy > 100) {
        this.energy = 100;
      }

      this.update();
    }

    update() {

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
      this.bar.fillRect(this.x, this.y, 150, 16);

      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 146, 12);

      this.bar.fillStyle(0xff00ff);

      this.bar.fillRect(this.x + 2, this.y + 2, Math.ceil(146*(this.energy/100)), 12);
    }
}
