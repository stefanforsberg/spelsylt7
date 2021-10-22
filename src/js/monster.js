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

        this.scene.energy.boost(2);

        this.scene.smokeParticles.createEmitter({
          lifespan: 2000,
          quantity: 3,
          frequency: 0,
          maxParticles: 20,
          alpha: {start: 0.7, end: 0.1},
          scale: { start: 0.5, end: 3 },
          moveToX: 500,
          moveToY: 550,
          emitZone: { source: this.getBounds()},
        });
  


        this.destroy();
      }
    }
}
