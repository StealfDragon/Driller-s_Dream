class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        //this.background = this.add.tileSprite(0, 100, 2048, 2048, 'dirt').setScale(0.55).setOrigin(0.2, 0)
        //this.background = this.add.tileSprite(0, 100, 2048, 2048, 'dirt2').setScale(0.55).setOrigin(0.2, 0)
        this.background = this.add.tileSprite(0, 100, 2048, 2048, 'dirt3').setScale(1).setOrigin(0, 0)

        this.add.rectangle(0, 0, game.config.width, 100, 0x000000).setOrigin(0,0)

        this.anims.create({
            key: 'drillAnim',
            frames: this.anims.generateFrameNames('drill', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        })
        this.drill = new Drill(this, game.config.width/2, game.config.height - 900, 'drill').setScale(0.25).setOrigin(0.5, 0).play('drillAnim')

        this.score = 0;

        let playConfig = {
            fontFamily: 'Georgia',
            fontSize: '48px',
            //backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        this.showScore = this.add.text(85, 20, 'Waves Passed: ' + this.score, playConfig)

        this.gameOver = false


        this.keys = this.input.keyboard.createCursorKeys()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        this.background.tilePositionY = Math.floor(this.background.tilePositionY + 4);
        /*
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.score += 10
            this.showScore.text = 'Waves Passed: ' + this.score     
        }
        */

    }

}