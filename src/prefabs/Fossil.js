class Fossil extends Obstacle {
    constructor(scene, x, y, texture) {
        super(scene, x, y, 'fossil')
        this.setCircle(280)
        this.setOffset(60, 60)
        //this.body.setSize(this.width - 225, this.height - 225)
        //texture = 'fossil'
    }
}