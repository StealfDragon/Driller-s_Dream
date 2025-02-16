class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        game.settings.groundSpeed = 4

        let menuConfig = {
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


        // black rectangle: this.add.rectangle(0, 0, game.config.width, 100, 0x000000).setOrigin(0,0)
        this.add.rectangle(0, 0, game.config.width, 100, 0x606060).setOrigin(0,0)
        this.add.rectangle(game.config.width/2, game.config.height/2 - 100, game.config.width - 100, 50, 0x606060).setOrigin(0.5)
        this.add.rectangle(game.config.width/2, game.config.height/2 - 25, game.config.width - 165, 50, 0x606060).setOrigin(0.5)


        this.add.text(game.config.width/2, game.config.height/2 - 490, 
            'Game Over!', menuConfig).setOrigin(0.5)

        menuConfig.fontSize = '30px'
        this.add.text(game.config.width/2, game.config.height/2 - 100, 
            'Press M to go to the main menu', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 25, 
            'Press R to restart the game', menuConfig).setOrigin(0.5)

        menuConfig.fontSize = '20px'
        this.add.text(game.config.width/2, game.config.height/2 + 450, 
            'Press C to view the credits', menuConfig).setOrigin(0.5)

        this.keys = this.input.keyboard.createCursorKeys()
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyMENU =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            this.sound.play('sfx-select')
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.sound.play('sfx-select')
            this.scene.start('titleScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.sound.play('sfx-select')
            this.scene.start('creditsScene')    
        }
    }
}