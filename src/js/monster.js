import Phaser from "phaser";

export default class Monster extends Phaser.GameObjects.PathFollower  {

    constructor(scene, path) {

      super(scene, path, 1000, 0, 'monster1')
      this.scene = scene;

      this.scene.add.existing(this)

      this.life = 100;

      // this.monster = this.scene.add.follower(path, 1000, 0, 'monster1');
      this.scene.physics.world.enable(this);

      this.startFollow({
        duration: 100000,
        positionOnPath: true,
        rotateToPath: false,
        verticalAdjust: true,
        
      });

    }

    hit(dmg) {
      this.life -= dmg;
      this.alpha = this.life / 100;
      console.log(this.life)
      if(this.life <= 0) {
        this.destroy();
      }
    }
}
