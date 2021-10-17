import Phaser from "phaser";


class Thought extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, spriteName) {
      super(scene, x, y, spriteName);
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this);

      this.scene.physics.add.overlap(this.scene.player.thoughtArea, this, this.hitPlayer, null, this);

      this.scene.input.setDraggable(this.setInteractive());

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
          
        }
        
      });

      this.on('dragend', (pointer, dragX, dragY) => 
      {
        this.depth = 0;
        this.body.moves = true;
        this.scene.physics.moveTo(this,this.scene.player.x-50, this.scene.player.y-220, 20);
      });
    }

    reset(x,y) {

      this.angle = Phaser.Math.RND.between(-3,3);

      if(x && y) {
        this.setPosition(x, y);
      } else {
        const r = Math.random();

        const pos = r < 0.5 ? {x:Phaser.Math.RND.between(0,300), y: -50} : {x:-50, y: Phaser.Math.RND.between(0,700)};
        this.setPosition(pos.x, pos.y);
      }
      
      this.scene.physics.moveTo(this,this.scene.player.x-50, this.scene.player.y-220, 20);
    }

    hitPlayer(player,monster) {
      if(this.body.moves) {
        this.scene.player.thoughtHit(this.texture);
        this.reset();
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

class Tomato extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'tomato');
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

class Boot extends Thought {

  constructor(scene) {
    super(scene, 50, 50, 'boot');
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

export {
  Bread,
  Tomato,
  Cheese,
  Sandwich,
  Boot,
  Tree,
  Walk
}