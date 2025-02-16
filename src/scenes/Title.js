class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        //this.load.image('dirt', './assets/Dirt.png')
        //this.textures.get('dirt').setFilter(Phaser.Textures.FilterMode.NEAREST);
        //this.load.image('dirt2', './assets/tileddirt.png')
        this.load.image('dirt3', './assets/dirt3.png')
        this.load.image('fossil', './assets/Fossil.png')
        this.load.image('barrel', './assets/Oil_Barrel.png')
        this.load.spritesheet('drill', './assets/Drillspritesheet.png', {
            frameWidth: 372,
            frameHeight: 622,
            startFrame: 0,
            endFrame: 2
        })
        this.load.spritesheet('explosion', './assets/Gungeon-like_Explosion.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        
        this.load.audio('sfx-music', './assets/sounds/DrillerMusic.mp3')
        this.load.audio('sfx-explosion', './assets/sounds/explosion.mp3')
        this.load.audio('sfx-game_over', './assets/sounds/game_over.mp3')
        this.load.audio('sfx-barrel', './assets/sounds/metalsound.mp3')
        this.load.audio('sfx-thunk', './assets/sounds/thud.mp3')
        this.load.audio('sfx-select', './assets/sounds/menu_click.mp3')
        
    }

    create() {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', 
                { start: 0, end: 3, first: 0}),
            frameRate: 4
        })
        /*
        this.anims.create({
            key: 'drillAnim',
            frames: this.anims.generateFrameNumbers('drill', 
                { start: 0, end: 2, first: 0}),
            frameRate: 30
        })
            */

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

        this.add.image(0, 100, 'dirt3').setScale(1).setOrigin(0, 0)

        // black rectangle: this.add.rectangle(0, 0, game.config.width, 100, 0x000000).setOrigin(0,0)
        this.add.rectangle(0, 0, game.config.width, 100, 0x606060).setOrigin(0,0)
        this.add.rectangle(game.config.width/2, game.config.height/2 - 100, game.config.width - 175, 50, 0x606060).setOrigin(0.5)
        this.add.rectangle(game.config.width/2, game.config.height/2 - 25, game.config.width - 200, 50, 0x606060).setOrigin(0.5)
        this.add.rectangle(game.config.width/2, game.config.height/2 + 450, game.config.width - 300, 50, 0x000000).setOrigin(0.5)


        this.add.text(game.config.width/2, game.config.height/2 - 490, 
            'Driller\'s Dream', menuConfig).setOrigin(0.5)

        menuConfig.fontSize = '30px'
        this.add.text(game.config.width/2, game.config.height/2 - 100, 
            'Press T to view the tutorial', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 25, 
            'Press S to start the game', menuConfig).setOrigin(0.5)

        menuConfig.fontSize = '20px'
        this.add.text(game.config.width/2, game.config.height/2 + 450, 
            'Press C to view the credits', menuConfig).setOrigin(0.5)

        this.keys = this.input.keyboard.createCursorKeys()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyTUTORIAL =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySTART)) {
            game.settings = {
                moveSpeed: 150, 
                groundSpeed: 4  
              }
            this.sound.play('sfx-select')
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyTUTORIAL)) {
            game.settings = {}
            this.sound.play('sfx-select')
            this.scene.start('tutorialScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            game.settings = {}
            this.sound.play('sfx-select')
            this.scene.start('creditsScene')    
        }
    }
}