class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, Phaser.Math.Between(140, game.config.width - 140), game.config.height, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.moveSpeed = game.settings.moveSpeed

        this.texture == texture
        this.parentScene = scene;      
        this.newObstacle = true;      
        this.passedDrill = false;   
    }

    update() {
        this.y -= 4// this.moveSpeed

        if(this.newObstacle && this.y < centerY && this.texture == 'barrel') {
            console.log('barrel spawn')
            this.parentScene.addObstacle();
            this.newObstacle = false;
        }
        else if(this.newObstacle && this.y < upperY) {
            console.log('fossil spawn')
            this.parentScene.addObstacle();
            this.newObstacle = false;
        }

        if(this.y + this.height / 2 < game.config.height - 950 && this.passedDrill == false) {
            this.parentScene.score += 1
            this.passedDrill = true
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.y < -this.height) {
            //console.log('obstacle destroyed')
            this.destroy();
        }
    }
}