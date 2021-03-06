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

      if(this.energy <= 0) {
        console.log(new Date().getTime())
        console.log( this.scene.timeStart)
        const time = Math.round((new Date().getTime() - this.scene.timeStart)/1000);
        console.log(`${time} seconds has passed`)
        this.scene.scene.start('ScoreScene', {time});
        this.scene.game.sound.stopAll();
        
        
      }

      this.update();
    }

    update() {

      if(this.energy > 50) {
        if(this.lastState !== "happy") {
          this.lastState = "happy";
          this.scene.player.setMood("happy");
        }
      } 
      else if(this.energy > 30) {
        if(this.lastState !== "sad") {
          this.lastState = "sad";
          this.scene.player.setMood("sad");
        }
      } else if(this.energy > 15) {
        if(this.lastState !== "angry") {
          this.lastState = "angry";
          this.scene.player.setMood("angry");
        }
      } else if(this.lastState !== "hopeless") {
        this.lastState = "hopeless";
        this.scene.player.setMood("hopeless");
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
