import Phaser from "phaser";
import Tower from "./tower";
import Monster from "./monster";

export default class Defense {
  constructor(scene) {
    this.scene = scene;
    this.reset();

    const graphics = this.scene.add.graphics();

    if (this.scene.game.config.physics.arcade.debug) {
      const grid = this.scene.add.graphics();
      grid.lineStyle(2, 0xa3a3a3, 1);
      for (let x = 0; x < 15; x++) {
        grid.strokeRect(540 + x * 60, 0, 0, 700);
        grid.strokeRect(540, +x * 60, 500, 0);
      }
    }

    this.towers = this.scene.physics.add.group();
    this.monsters = this.scene.physics.add.group();
    this.bullets = this.scene.physics.add.group();

    this.monsterLife = 1;
    this.monsterTimeToTarget = 80000;

    new Tower(this.scene, 0, 0);
    new Tower(this.scene, 4, 1);
    new Tower(this.scene, 0, 2);
    new Tower(this.scene, 1, 2);
    new Tower(this.scene, 2, 2);

    new Tower(this.scene, 1, 4);
    new Tower(this.scene, 5, 4);

    new Tower(this.scene, 1, 5);
    new Tower(this.scene, 3, 5);

    new Tower(this.scene, 6, 7);
    new Tower(this.scene, 1, 8);
    new Tower(this.scene, 6, 8);
    new Tower(this.scene, 6, 9);

    this.scene.physics.add.overlap(this.towers, this.monsters, (t1, t2) => {
      t1.tower.action(t2);
    });

    this.scene.physics.add.overlap(this.bullets, this.monsters, (t1, t2) => {
      t2.hit(1);
      t1.destroy();
    });

    this.path = new Phaser.Curves.Path(1040, 10);

    this.path.lineTo(700, 50);
    this.path.lineTo(550, 100);
    this.path.lineTo(760, 100);
    this.path.lineTo(760, 260);
    this.path.lineTo(900, 100);
    this.path.lineTo(900, 200);
    this.path.ellipseTo(60, 60, 90, 270, false, 180);
    this.path.lineTo(840, 320);
    this.path.lineTo(840, 380);
    this.path.lineTo(980, 380);
    this.path.lineTo(980, 660);
    this.path.lineTo(840, 660);
    this.path.lineTo(840, 460);
    this.path.lineTo(700, 360);
    this.path.lineTo(700, 260);
    this.path.ellipseTo(60, 60, 0, 180, true, 0);
    this.path.lineTo(580, 360);
    this.path.lineTo(780, 540);
    this.path.lineTo(580, 540);

    this.timer = this.scene.time.addEvent({
      delay: 15000,
      callback: () => {
        this.addNewMonster();
        
      },
      loop: true,
    });

    this.scene.time.addEvent({
      delay: 10000,
      callback: () => {
        if(this.timer.delay > 2000) {
          this.timer.delay = this.timer.delay-1000;
        }
        if(this.monsterTimeToTarget > 20000) {
          this.monsterTimeToTarget-= 2000;
        }
        this.monsterLife += 6;
        
      },
      loop: true,
    });

    this.scene.physics.add.overlap(this.scene.player, this.monsters, (p, m) => {
      this.scene.energy.boost(-10);
      m.destroy();
      this.scene.sound.play('sfx', { name: "asd", start: 5, duration: 1, config: {}});
    });

    // graphics.lineStyle(1, 0xff00ff, 1.0);
    // path.draw(graphics);
  }

  addNewMonster() {
    this.monsters.add(new Monster(this.scene, this.path, this.monsterLife, this.monsterTimeToTarget));
  }

  reset() {}
}
