import Phaser from "phaser";

export default class Monster extends Phaser.GameObjects.PathFollower  {

    constructor(scene, path, life, timeToTarget) {

      super(scene, path, 1000, 0, 'monster1')
      this.scene = scene;

      this.scene.add.existing(this)
      this.maxLife = life;
      this.life = life;

      this.scene.physics.world.enable(this);

      this.startFollow({
        duration: timeToTarget,
        positionOnPath: true,
        rotateToPath: false,
        verticalAdjust: true,
        
      });

    }

    hit(dmg) {
      this.life -= dmg;
      this.alpha = this.life / this.maxLife;
      if(this.life <= 0) {

        this.scene.smokeParticles.createEmitter({
          x: this.x, y: this.y,
          lifespan: 2000,
          speed: {min: 10, max: 20},
          quantity: 3,
          frequency: 0,
          maxParticles: 100,
          alpha: { start: 1, end: 0 },
          scale: { start: 0.1, end: 2 },
        });
  


        this.destroy();
      }
    }
}
