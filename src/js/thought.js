import Phaser from "phaser";


class Thought extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, spriteName) {
      super(scene, x, y, spriteName);
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this);

      this.scene.physics.add.overlap(this.scene.player.thoughtArea, this, this.hitPlayer, null, this);

      this.scene.input.setDraggable(this.setInteractive());

      this.speed = this.scene.thoughtSpeed;

      this.reset();

      
      this.on('dragstart', () =>
      {
        this.depth = 1;
        this.body.moves = false;
      });

      this.on('drag', (pointer, dragX, dragY) =>
      {
        if(dragX < 500) {
          this.setPosition(dragX, dragY);
        } else {
          this.setPosition(500, dragY);
        }
        
      });

      this.on('dragend', (pointer, dragX, dragY) => 
      {
        this.depth = 0;
        this.body.moves = true;
        this.scene.physics.moveTo(this,this.scene.player.x-50, this.scene.player.y-220, this.speed);
      });
    }

    reset(x,y) {

      this.angle = Phaser.Math.RND.between(-3,3);

      this.alpha = 0;

      if(x && y) {
        this.setPosition(x, y);
      } else {
        const pos = (() => {
          const r = Math.random();

          if(r < 0.33) return {x:Phaser.Math.RND.between(0,450), y: 25};
          else if(r < 0.66) return {x:25, y: Phaser.Math.RND.between(0,700)};
          else return {x:Phaser.Math.RND.between(0,450), y: 675}
        })();
        
        this.setPosition(pos.x, pos.y);
      }

      this.scene.tweens.add({
        targets: [this],
        alpha: 1,
        duration: 1500
      })
      
      this.scene.physics.moveTo(this,this.scene.player.x-50, this.scene.player.y-220, this.speed);
    }

    hitPlayer(player,monster) {
      if(this.body.moves) {
        this.scene.player.thoughtHit(this.texture);
        this.destroy();
      }
    }

    mix(t) {
      return false;
    }
}

class Bread extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'bread');
  }

  mix(t) {
    return t.texture === 'cheese';
  }
}

class Cheese extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'cheese');
  }

  mix(t) {
    return t.texture === 'bread';
  }

}

class Sandwich extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'sandwich');
  }

}

class Backpack extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'backpack');
  }

}

class Tree extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'tree');
  }

}

class Walk extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'walk');
  }
}

class Canvas extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'canvas');
  }
}

class Pencil extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'pencil');
  }
}

class Painting extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'painting');
  }
}

export {
  Bread,
  Cheese,
  Sandwich,
  Backpack,
  Tree,
  Walk,
  Canvas,
  Pencil,
  Painting
}