import Phaser from "phaser";
import Energy from "./energy";
import Defense from "./defense";
import * as thoughts from "./thought";
import Player from "./player";
import imgRuna from "../img/runa.png";
import imgRunaSad from "../img/runa_sad.png";
import imgMonster1 from "../img/monster1.png";
import imgBg from "../img/bg.png";
import imgCheese from "../img/cheese.png";
import imgBread from "../img/bread.png";
import imgTomato from "../img/tomato.png";
import imgSandwich from "../img/sandwich.png";
import imgBoot from "../img/boot.png";
import imgTree from "../img/tree.png";
import imgWalk from "../img/walk.png";
import imgTower from "../img/tower.png";
import imgTowerSleeping from "../img/towerSleeping.png";
import imgBullet from "../img/bullet.png";
import song01 from "url:../audio/song01.mp3"
import song02 from "url:../audio/song02.mp3"

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
    });
  }

  preload() {
    this.load.image("runa_happy", imgRuna);
    this.load.image("runa_sad", imgRunaSad);
    this.load.image("monster1", imgMonster1);
    this.load.image("cheese", imgCheese);
    this.load.image("bread", imgBread);
    this.load.image("tomato", imgTomato);
    this.load.image("sandwich", imgSandwich);
    this.load.image("boot", imgBoot);
    this.load.image("tree", imgTree);
    this.load.image("walk", imgWalk);
    this.load.image("bullet", imgBullet);
    this.load.image("tower", imgTower);
    this.load.image("towerSleeping", imgTowerSleeping);
    
    this.load.image("bg", imgBg);
    
    this.load.audio("song01", song01);
    this.load.audio("song02", song02);
  }

  create() {

    this.add.image(500,350,"bg")

    this.song01 = this.sound.add("song01", { loop: true})
    this.song02 = this.sound.add("song02", { loop: true});

    this.energy = new Energy(this);

    this.defense = new Defense(this);

    this.player = new Player(this);

    


    this.song01.play();
    // this.song02.play();
    this.player.anim();

    this.thoughtsGroup = this.physics.add.group();

    this.mixedGroup = this.physics.add.group();

    this.cheeseAndBreadGroup = this.physics.add.group();

    this.bootAndTreeGroup = this.physics.add.group();


    var b = new thoughts.Bread(this);
    var c = new thoughts.Cheese(this);
    var t = new thoughts.Tomato(this);
    // var c = new thoughts.Cheese(this)

    this.cheeseAndBreadGroup.add(b);
    this.cheeseAndBreadGroup.add(c);
    this.thoughtsGroup.add(t);

    this.bootAndTreeGroup.add(new thoughts.Boot(this))
    this.bootAndTreeGroup.add(new thoughts.Tree(this))


    b.reset();
    c.reset();
    t.reset();

    this.bootAndTreeGroup.children.entries.forEach(c => c.reset())

    // var c = new thoughts.Cheese(this)

    // thoughtsGroup.add(b.sprite)

    // b.sprite.setActive(true);
    // b.sprite.setVisible(true);

    // console.log(thoughtsGroup)

    // var thoughts = this.physics.add.group({
    //   key: 'cheese',
    //   quantity: 24,
    //   bounceX: 1,
    //   bounceY: 1,
    //   collideWorldBounds: true,
    //   velocityX: 300,
    //   velocityY: 150
    // });

    // var t1 = thoughts.create(-50, Phaser.Math.RND.between(0,700), 'cheese');

    

    this.physics.add.overlap(this.cheeseAndBreadGroup, undefined, (t1, t2) => {
      if (t1.body.moves && t2.body.moves) {
          var t = new thoughts.Sandwich(this);
          this.mixedGroup.add(t)

          t.reset(t1.x, t1.y)

          t1.destroy();
          t2.destroy();
      } else {


          t1.setTint(0x00ff00, 0xffffff, 0xffffff, 0xffffff)


      }
      console.log("overloaooo");
    });

    this.physics.add.overlap(this.bootAndTreeGroup, undefined, (t1, t2) => {
      if (t1.body.moves && t2.body.moves) {
          var t = new thoughts.Walk(this);
          this.mixedGroup.add(t)

          t.reset(t1.x, t1.y)

          t1.destroy();
          t2.destroy();
      } else {


          t1.setTint(0x00ff00, 0xffffff, 0xffffff, 0xffffff)


      }
      console.log("overloaooo");
    });

  }

  update() {
    this.cheeseAndBreadGroup.children.entries.filter(f => f.body.touching.none).forEach((f) => {
      f.tint = 0xffffff;
    })
  }
}
