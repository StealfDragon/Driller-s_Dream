class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    create() {
        let tutorialConfig = {
            fontFamily: 'Georgia',
            fontSize: '64px',
            //backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.image(0, 100, 'dirt3').setScale(1).setOrigin(0, 0)

        this.add.rectangle(0, 0, game.config.width, 100, 0x000000).setOrigin(0,0)

        this.add.text(game.config.width/2, game.config.height/2 - 490, 
            'Driller\'s Dream', tutorialConfig).setOrigin(0.5)

        tutorialConfig.fontSize = '30px'
        this.add.text(game.config.width/2, game.config.height/2 - 150, 
            'Use ←→ arrows to move', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 50, 
            'Avoid the obstacles as you', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 
            'drill down into the earth', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 100, 
            'Pay attention to your drill,', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 150, 
            'as the earth will continue to pull,', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 200, 
            'even after you release the controls.', tutorialConfig).setOrigin(0.5)

        tutorialConfig.fontSize = '20px'
        this.add.text(game.config.width/3, game.config.height/2 + 450, 
            'Press ← to go back to the title screen', tutorialConfig).setOrigin(0.5)

        this.keys = this.input.keyboard.createCursorKeys()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {}
            this.sound.play('sfx-select')
            this.scene.start('titleScene') 
        }
    }
}