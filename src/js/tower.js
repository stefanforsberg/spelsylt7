import Phaser from "phaser";

export default class Tower {
  constructor(scene, x, y) {
    this.scene = scene;
    this.size = 60;
    this.radius = 60;
    this.x = 540 + x * this.size + this.size / 2;
    this.y = y * this.size + this.size / 2;
    this.graphics = this.scene.add.rectangle(this.x, this.y, this.size, this.size, 0xe2e2e2, 0);

    this.cdGraphics = this.scene.add.graphics();

    this.graphics.tower = this;
    
    this.built = false;
    this.level = 0;

    

    this.canAct = false;

    this.radiusGraphics = this.scene.add.circle(this.x, this.y, this.radius);

    this.graphics.setInteractive();

    this.img = this.scene.add.image(this.x, this.y, "towerEmpty");
    this.img.alpha = 0.6;

    this.graphics.on("pointerover", () => {
      if(!this.level) {
        this.img.alpha = 1
      }

      this.radiusGraphics.alpha = 1;
    });

    this.graphics.on("pointerout", () => {

      if(!this.level) {
        this.img.alpha = 0.6
      }

      this.radiusGraphics.alpha = 0;
    });




    this.graphics.on("pointerdown", (pointer, localX) => {

      if(this.scene.energy.energy < 5) {
        return;    
      }

      this.scene.energy.boost(-5);

      if (this.level === 0) {

        this.scene.sound.play('sfx', { name: "asd", start: 9, duration: 1.2, config: {}});

        this.img.alpha = 1

        if(localX < 25) {
          this.type = "Gun"
          this.coolDownTimer = 1000;
        } else {
          this.type = "Freeze"
          this.coolDownTimer = 5000;
        }

        this.img.setTexture("tower" + this.type);

        this.radiusGraphics.setStrokeStyle(1, 0x97bfc1);
        this.radiusGraphics.setFillStyle(0x97bfc1, 0.2);

        this.scene.physics.world.enable(this.graphics);

        this.graphics.body.setCircle(this.radius, -this.radius / 2, -this.radius / 2);

        this.scene.defense.towers.add(this.graphics);
      } else {
        this.radius += 10;

        this.graphics.body.setCircle(this.radius, -this.radius / 2 - 5 * this.level, -this.radius / 2 - 5 * this.level);

        this.radiusGraphics.radius = this.radius;
        this.radiusGraphics.setStrokeStyle(1, 0xffffff);
      }

      this.level++;
    });
  }

  action(monster) {
    this.scene.physics.world.disable(this.graphics);

    if(this.type === "Gun") {
      const bullet = this.scene.physics.add.image(this.x, this.y, "bullet");
      
      this.scene.defense.bullets.add(bullet);

      bullet.setCollideWorldBounds(true);
      bullet.body.setBoundsRectangle(new Phaser.Geom.Rectangle(500,0,500,750))
      bullet.body.onWorldBounds = true;
      
      bullet.body.world.on('worldbounds', (b) => {
        b.gameObject.destroy();
      });

      this.scene.physics.moveTo(bullet, monster.x, monster.y, 100);
      
    } else {
      monster.pathTween.timeScale = 0.5;

      this.scene.time.addEvent({
        delay: 2000,
        callback: () => {
          monster.pathTween.timeScale = 1;
        },
        loop: false,
      });

      this.scene.time.addEvent({
        delay: 300,
        callback: () => {
          this.img.setTexture("tower" + this.type + "Sleeping");
        },
        loop: false,
      });
    }

    



    

    const cdGraphicsTween = this.scene.tweens.addCounter({
      from: 0,
      to: 50,
      ease: "Linear",
      duration: this.coolDownTimer,
      repeat: 0,
      yoyo: false,
      onUpdate: (c) => {
        this.cdGraphics.clear();

        this.cdGraphics.fillStyle(0x97bfc1, 0.4);
        this.cdGraphics.fillRect(this.x - 25, this.y + 30, cdGraphicsTween.getValue(), 10);
        this.cdGraphics.lineStyle(1, 0x97bfc1, 1);
        this.cdGraphics.strokeRect(this.x - 25, this.y + 30, 50, 10);
      },
    });

    this.scene.time.addEvent({
      delay: this.coolDownTimer,
      callback: () => {
        this.scene.physics.world.enable(this.graphics);
        this.img.setTexture("tower" + this.type);
      },
      //args: [],
      loop: false,
    });
  }

  reset() {}
}
