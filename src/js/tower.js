import Phaser from "phaser";


export default class Tower {

    constructor(scene, x, y) {
      this.scene = scene;
      this.size = 60;
      this.radius = 60;
      this.x = 540+x*this.size + this.size/2
      this.y = y*this.size + this.size/2
      this.graphics = this.scene.add.rectangle(this.x, this.y, this.size, this.size, 0xe2e2e2, 0);
      this.graphics.tower = this;
      this.level = 0;

      this.img = this.scene.add.image(this.x, this.y, 'towerSleeping');

      this.canAct = false;

      this.graphics.setInteractive();

      this.graphics.on('pointerdown', (pointer) => {

        if(this.level === 0) {

          this.img.setTexture("tower")

          this.tween = this.scene.tweens.add({
            targets: [this.img],
            yoyo: true,
            repeat: -1,
            // scale: 1.15,
            rotation: -0.03,
            duration: 500
          })

          this.scene.physics.world.enable(this.graphics);

          this.graphics.body.setCircle(this.radius, -this.radius/2, -this.radius/2);

          this.scene.defense.towers.add(this.graphics)
        } else {
          this.radius += 10;
          
          this.graphics.body.setCircle(this.radius, -this.radius/2 - 5*this.level, -this.radius/2 - 5*this.level);



        }

        this.level++;


        
        

      });
    }

    action(monster) {
      this.scene.physics.world.disable(this.graphics)
      console.log("shooting")

      const bullet = this.scene.physics.add.image(this.x, this.y, "bullet")
      this.scene.defense.bullets.add(bullet)
      this.scene.physics.moveTo(bullet,monster.x, monster.y, 100);


      var timer = this.scene.time.addEvent({
          delay: 3000,                // ms
          callback: () => {
            console.log("readding")
            this.scene.physics.world.enable(this.graphics)
          },
          //args: [],
          loop: false
      });
    }

    reset() {

    
    }
}