class Barrel extends Obstacle {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, 'barrel')
    }

    explode() {
        this.setTexture('explosion')
        this.scene.time.delayedCall(500, () => this.destroy())
    }
}