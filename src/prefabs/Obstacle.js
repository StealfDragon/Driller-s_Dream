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
        this.hasExploded = false;  
    }

    update() {
        if(!(this.parentScene.gameOver)) {
            this.y -= 4// this.moveSpeed

            if(this.newObstacle && this.y < centerY && this.texture.key == 'barrel') {
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

            //this.parentScene.physics.world.collide(this.parentScene.drill, this, this.parentScene.drillCollision, null, this.parentScene)

            if(this.texture.key == 'barrel' && this.parentScene.physics.world.collide(this.parentScene.drill, this) && !this.hasExploded) {
                this.parentScene.barrelExplode(this, this.x, this.y)
                this.hasExploded = true
            }
        }

        /*
        if(this.texture.key == 'barrel') {
            this.alpha = 0
            // create explosion sprite at ship's position
            let boom = this.parentScene.add.sprite(this.x, this.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode')             // play explode animation
            boom.on('animationcomplete', () => {   // callback after anim completes
                this.alpha = 1                       // make ship visible again
                boom.destroy()                       // remove explosion sprite
            })   
            this.sound.play('sfx-explosion')
        }
        */
    }
}