/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        //Start the Arcade Physics systems
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Change the background colour
        this.game.stage.backgroundColor = "#a9f0ff";

        //Add the tilemap and tileset image. The first parameter in addTilesetImage
        //is the name you gave the tilesheet when importing it into Tiled, the second
        //is the key to the asset in Phaser
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('tileset_gutter', 'tiles');

        //Add both the background and ground layers. We won't be doing anything with the
        //GroundLayer though
        this.backgroundlayer = this.map.createLayer('BackgroundColor');
        this.graphicLayer = this.map.createLayer('GraphicLayer');

        //Before you can use the collide function you need to set what tiles can collide
        this.map.setCollisionBetween(1, 100, true, 'GraphicLayer');

        //Add the sprite to the game and enable arcade physics on it
        this.sprite = this.game.add.sprite(50, 0, 'player');
        this.game.physics.arcade.enable(this.sprite);

        //Change the world size to match the size of this layer
        this.graphicLayer.resizeWorld();

        //Set some physics on the sprite
        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.gravity.y = 2000;
        // this.sprite.body.gravity.x = 20;
        // this.sprite.body.velocity.x = 100;

        //Create a running animation for the sprite and play it
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
        this.sprite.animations.play('right');

        //Make the camera follow the sprite
        this.game.camera.follow(this.sprite);

        //Enable cursor keys so we can create some controls
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        //Make the sprite collide with the ground layer
        this.game.physics.arcade.collide(this.sprite, this.graphicLayer);

        if(this.cursors.up.isDown) {
          this.sprite.body.velocity.y = -300;
        }

        if(this.cursors.right.isDown) {
          this.sprite.body.x += 5;
        }

        if(this.cursors.left.isDown) {
          this.sprite.body.x -= 5;
        }
    }

    render() {
        if (__DEV__) {}
    }
}
