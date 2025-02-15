class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture,) {
        super(scene, Phaser.Math.Between(50, game.config.width - 50), game.config.height, 'fossil')
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.moveSpeed = game.settings.moveSpeed

        this.parentScene = scene;      
        this.newObstacle = true;         
    }

    update() {
        this.y -= this.moveSpeed

        if(this.newObstacle && this.y < centerY) {
            // (recursively) call parent scene method from this context
            this.parentScene.addObstacle(this.parent, this.velocity);
            this.newObstacle = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.y < -this.height) {
            //console.log('obstacle destroyed')
            this.destroy();
        }
    }
}