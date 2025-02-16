class Barrel extends Obstacle {
    constructor(scene, x, y, texture) {
        super(scene, x, y, 'barrel')
        //texture = 'barrel'
    }

    explode() {
        this.setTexture('explosion')
        this.scene.time.delayedCall(500, () => this.destroy())
    }
}