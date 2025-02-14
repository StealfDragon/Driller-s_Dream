class Barrel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.moveSpeed = game.settings.moveSpeed
    }

    explode() {
        this.setTexture('explosion')
        this.scene.time.delayedCall(500, () => this.destroy())
    }

    update() {
        this.y -= this.moveSpeed

        if(this.y <= 0 - this.height) {
            this.y = game.config.height
        }
    }
}