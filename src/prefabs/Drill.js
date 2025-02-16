class Drill extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        //this.body.setCollideWorldBounds(true);
        this.body.setVelocityX(0);
        this.active = true;
    }

    update() {
        if (this.active) {
            this.body.setVelocityX(this.direction * 200);
        } else {
            this.body.setVelocityX(0);
        }
    }

    checkCollision(obstacles) {
        this.scene.physics.add.collider(this, obstacles, (drill, obstacle) => {
            if (obstacle instanceof Barrel) {
                obstacle.explode();
            } else if (obstacle instanceof Fossil) {
                drill.stopDrill();
            }
        }, null, this.scene);
    }
    
    stopDrill() {
        this.active = false;
        this.scene.drillStoppedByFossil = true;
    }
}