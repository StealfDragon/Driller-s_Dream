class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        let tutorialConfig = {
            fontFamily: 'Georgia',
            fontSize: '30px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        tutorialConfig.fontSize = '30px'
        this.add.text(game.config.width/2, game.config.height/2 - 400, 
            'Programming by Cassian Jones', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 350, 
            'Art assets by Cassian Jones', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 300, 
            'Created using Phaser', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 150, 
            'Music from opengameart.org by:', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 100, 
            'rezoner', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 50, 
            'Sound effects from pixabay.com by:', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 100, 
            'freesound_community', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 150, 
            'u_8t57ikf46v', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 200, 
            'floraphonic', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 250, 
            'Universfield', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 300, 
            'Tuomas_Data', tutorialConfig).setOrigin(0.5)

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