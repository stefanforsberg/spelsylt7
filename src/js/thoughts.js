import Phaser from "phaser";
import * as thoughts from "./thought";

export default class Thoughts {
  constructor(scene) {
    this.scene = scene;

    this.mixedGroup = this.scene.physics.add.group();

    this.cheeseAndBreadGroup = this.scene.physics.add.group();

    this.backpackAndTreeGroup = this.scene.physics.add.group();

    this.canvasAndPencilGroup = this.scene.physics.add.group();

    this.overlap(this.cheeseAndBreadGroup, () => new thoughts.Sandwich(this.scene));
    this.overlap(this.backpackAndTreeGroup, () => new thoughts.Walk(this.scene));
    this.overlap(this.canvasAndPencilGroup, () => new thoughts.Painting(this.scene));

    this.scene.thoughtSpeed = 1;

    this.addNewThoughts();

    this.newThoughtsTimer = this.scene.time.addEvent({
      callback: this.addNewThoughts,
      callbackScope: this,
      delay: 3000,
      loop: true,
    });
  }

  addNewThoughts() {

    if(this.scene.thoughtSpeed < 15) {
      this.scene.thoughtSpeed+=0.5;
    }

    var r = Phaser.Math.Between(0,99)

    console.log(r);

    if (r < 33) {
      if (this.canvasAndPencilGroup.getLength() < 8) {
        const i = r >= 16 ? new thoughts.Canvas(this.scene) : new thoughts.Pencil(this.scene);
        this.canvasAndPencilGroup.add(i);
        i.reset();
      }
    }
    else if (r < 66) {
      if (this.cheeseAndBreadGroup.getLength() < 8) {
        const i = r >= 49 ? new thoughts.Bread(this.scene) : new thoughts.Cheese(this.scene);
        this.cheeseAndBreadGroup.add(i);
        i.reset();
      }
    } else {
      if (this.backpackAndTreeGroup.getLength() < 8) {
        const i = r >= 82 ? new thoughts.Backpack(this.scene) : new thoughts.Tree(this.scene);
        this.backpackAndTreeGroup.add(i);
        i.reset();
      }
    }
  }

  overlap(group, newThough) {
    this.scene.physics.add.overlap(group, undefined, (t1, t2) => {
      if (t1.body.moves && t2.body.moves) {
        if (t1.texture === t2.texture) {
          t2.destroy();
        } else {
          var t = newThough();
          this.mixedGroup.add(t);

          t.reset(t1.x, t1.y);

          t1.destroy();
          t2.destroy();
        }
      } else {
        t1.setTint(0x00ff00, 0xffffff, 0xffffff, 0xffffff);
      }
    });
  }

  update() {
    this.cheeseAndBreadGroup.children.entries
      .filter((f) => f.body.touching.none)
      .forEach((f) => {
        f.tint = 0xffffff;
      });

    this.backpackAndTreeGroup.children.entries
      .filter((f) => f.body.touching.none)
      .forEach((f) => {
        f.tint = 0xffffff;
      });

    this.canvasAndPencilGroup.children.entries
      .filter((f) => f.body.touching.none)
      .forEach((f) => {
        f.tint = 0xffffff;
      });
  }
}
