import Phaser from "phaser";
import imgRuna from "../img/runa.png";
import imgRunaSad from "../img/runa_sad.png";
import imgMonster1 from "../img/monster1.png";
import imgBg from "../img/bg.png";
import imgCheese from "../img/cheese.png";
import imgBread from "../img/bread.png";
import imgTomato from "../img/tomato.png";
import imgSandwich from "../img/sandwich.png";
import imgBoot from "../img/boot.png";
import imgBackpack from "../img/backpack.png";
import imgCanvas from "../img/canvas.png";
import imgPencil from "../img/pencil.png";
import imgPainting from "../img/painting.png";
import imgTree from "../img/tree.png";
import imgWalk from "../img/walk.png";
import imgTowerFreeze from "../img/towerFreeze.png";
import imgTowerFreezeSleeping from "../img/towerFreezeSleeping.png";
import imgTowerGun from "../img/towerGun.png";
import imgTowerGunSleeping from "../img/towerGunSleeping.png";
import imgTowerEmpty from "../img/towerEmpty.png";
import imgBullet from "../img/bullet.png";
import imgTitle from "../img/title.png";
import imgScore from "../img/score.png";
import imgStar from "../img/star.png";
import imgSmoke from "../img/smoke.png";
import song01 from "url:../audio/song01.mp3"
import sfx from "url:../audio/sfx.mp3"

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadingScene",
    });
  }

  preload() {

    this.add.text(500,350, "Loading...", {color: "rgba(0,0,0,0.5)", fontSize: "40px", fontFamily: "Arial"}).setOrigin(0.5);

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
    this.load.image("backpack", imgBackpack);
    this.load.image("canvas", imgCanvas);
    this.load.image("pencil", imgPencil);
    this.load.image("painting", imgPainting);
    this.load.image("bullet", imgBullet);
    this.load.image("towerFreeze", imgTowerFreeze);
    this.load.image("towerFreezeSleeping", imgTowerFreezeSleeping);
    this.load.image("towerGun", imgTowerGun);
    this.load.image("towerGunSleeping", imgTowerGunSleeping);
    
    this.load.image("towerEmpty", imgTowerEmpty);
    this.load.image("title", imgTitle);
    this.load.image("score", imgScore);
    
    this.load.image("bg", imgBg);

    this.load.image('star', imgStar);
    this.load.image('smoke', imgSmoke);

    
    this.load.audio("song01", song01);
    this.load.audio('sfx', sfx);
  }

  create() {

    this.add.image(500, 350, "title")

    var g = this.add.rectangle(515, 415, 305, 77, 0xe2e2e2, 0.0);
    g.setInteractive();
    g.on("pointerdown", () => {
      g.disableInteractive();
      
      this.scene.start('MainScene', {caller: 'menu'});
      
    })
  }
}
