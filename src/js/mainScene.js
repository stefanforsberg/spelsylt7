import Phaser from "phaser";
import Energy from "./energy";
import Defense from "./defense";
import Thoughts from "./thoughts";
import Player from "./player";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
    });
  }

  preload() {
    
  }

  create() {

    this.timeStart = new Date().getTime();
    console.log(this.timeStart)

    this.add.image(500,350,"bg")

    this.smokeParticles = this.add.particles('smoke');

    this.sound.volume = 0.3;
    



    

    this.song01 = this.sound.add("song01", { loop: true})

    this.energy = new Energy(this);

    this.player = new Player(this);

    this.defense = new Defense(this);


    


    this.song01.play();
    this.player.anim();

    this.thoughts = new Thoughts(this);

    
    this.spinningCuteThing = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }, fillStyle: { color: 0x0000aa } });

    this.spinningCuteThing.alpha = 0;

    const c = new Phaser.Geom.Circle(500, 350, 700)

    this.lines = []
    const color = new Phaser.Display.Color();

    const triangles = 100;
    for(var i = 0; i < triangles; i++) {

      const p1 = c.getPoint(i*(1/triangles));
      const p2 = c.getPoint((i+1)*(1/triangles))
      const l = new Phaser.Geom.Triangle(p1.x, p1.y, p2.x, p2.y, 500, 350)
      l.color = color.random().color;
      this.lines.push(l);
    }
    
  }

  update() {
    this.thoughts.update();

    this.spinningCuteThing.clear();



    for(var i = 0; i < this.lines.length; i++)
    {
        Phaser.Geom.Line.RotateAroundPoint(this.lines[i], new Phaser.Geom.Point(500, 350), 0.005);
        this.spinningCuteThing.fillStyle(this.lines[i].color, 0.1)
        this.spinningCuteThing.fillTriangleShape(this.lines[i]);

        this.spinningCuteThing.fillPointShape(new Phaser.Geom.Point(500, 350), 10);
    }
  }
}
