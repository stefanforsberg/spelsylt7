import Phaser from "phaser";
import Tower from "./tower";
import Monster from "./monster";


export default class Defense {

    constructor(scene) {
      this.scene = scene;
      this.reset();


      const graphics = this.scene.add.graphics();

      if(this.scene.game.config.physics.arcade.debug) {
        const grid = this.scene.add.graphics();
        grid.lineStyle(2,0xa3a3a3,1); 
        for(let x = 0; x < 15; x++) {
          grid.strokeRect(540+x*60,0,0,700)
          grid.strokeRect(540,+x*60,500,0)
        }
      }

      this.towers = this.scene.physics.add.group();
      this.monsters = this.scene.physics.add.group();
      this.bullets = this.scene.physics.add.group();

      new Tower(this.scene,0,0)
      new Tower(this.scene,4,1)
      new Tower(this.scene,0,2)
      new Tower(this.scene,1,2)
      new Tower(this.scene,2,2)

      this.scene.physics.add.overlap(this.towers, this.monsters, (t1, t2) => {
        t1.tower.action(t2);
      });

      this.scene.physics.add.overlap(this.bullets, this.monsters, (t1, t2) => {
        console.log(t2)
        t2.hit(10)
        t1.destroy();
      });



      var path = new Phaser.Curves.Path(1000, 0);
  
      path.lineTo(700, 50);

      path.lineTo(550, 100);

      path.lineTo(760, 100);

      path.lineTo(760, 260);

      path.lineTo(900, 100);
      
      path.lineTo(900, 200);

      path.ellipseTo(60, 60, 90, 270, false, 180);

      path.lineTo(840, 320);

      path.lineTo(840, 380);

      path.lineTo(980, 380);

      path.lineTo(980, 660);

      path.lineTo(840, 660);

      path.lineTo(840, 460);

      path.lineTo(700, 360);

      path.lineTo(700, 260);

      path.ellipseTo(60, 60, 0, 180, true, 0);

      path.lineTo(580, 360);

      path.lineTo(780, 540);

      path.lineTo(580, 540);


      this.scene.time.addEvent({

        delay: 2000,                // ms
        callback: () => {
          console.log("readding")
          this.monsters.add(new Monster(this.scene, path))
        },
        //args: [],
        loop: true,
        
    });






      // for (var i = 0; i < 8; i++)
      // {
      //     // xRadius, yRadius, startAngle, endAngle, clockwise, rotation
      //     if (i % 2 === 0)
      //     {
      //         path.ellipseTo(50, 80, 180, 360, true, 0);
      //     }
      //     else
      //     {
      //         path.ellipseTo(50, 80, 180, 360, false, 0);
      //     }
      // }
  
      graphics.lineStyle(1, 0xff00ff, 0.4);
  
      path.draw(graphics);
    }

    reset() {

    
    }
}
