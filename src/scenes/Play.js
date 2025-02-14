class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 2049, 2048, 'dirt').setScale(0.55).setOrigin(0.2, 0)

        this.anims.create({
            key: 'drillAnim',
            frames: this.anims.generateFrameNames('drill', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
        })
        this.drill = new Drill(this, game.config.width/2, game.config.height - 950, 'drill').setScale(0.25).setOrigin(0.5, 0).play('drillAnim')


        this.keys = this.input.keyboard.createCursorKeys()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {

    }
}