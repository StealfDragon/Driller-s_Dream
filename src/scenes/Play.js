class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        //this.background = this.add.tileSprite(0, 100, 2048, 2048, 'dirt').setScale(0.55).setOrigin(0.2, 0)
        //this.background = this.add.tileSprite(0, 100, 2048, 2048, 'dirt2').setScale(0.55).setOrigin(0.2, 0)
        this.background = this.add.tileSprite(0, 100, 2048, 2048, 'dirt3').setScale(1).setOrigin(0, 0)

        this.scoreArea = this.add.rectangle(0, 0, game.config.width, 100, 0x606060).setOrigin(0,0)

        this.anims.create({
            key: 'drillAnim',
            frames: this.anims.generateFrameNames('drill', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        })
        this.drill = new Drill(this, game.config.width/2, game.config.height - 900, 'drill').setScale(0.25).setOrigin(0.5, 0).play('drillAnim')
        this.drill.setSize(282, 580)
        this.drill.setOffset(45, 40)

        this.score = 0;
        this.leveled = false

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

        this.showScore = this.add.text(50, 20, 'Obstacles Dodged: ' + this.score, playConfig)

        /*
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.increaseLevel(),
            callbackScope: this,
            loop: true
        });
        */

        this.gameOver = false
        this.sceneTransition = false
        this.fossilCollided = false

        this.obstacles = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.obstacles.collisionCategory = 0x0001
        
        this.drill.body.setCollidesWith(0x0001)

        this.time.delayedCall(2500, () => { 
            this.addObstacle(); 
        });

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        this.obstacleX = 50;

        this.scoreArea.depth = 100;
        this.showScore.depth = 101;

        this.buttonPressed = false

        this.keys = this.input.keyboard.createCursorKeys()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.bgm = this.sound.add('sfx-music', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        this.trail = this.add.graphics();
        this.trail.fillStyle(0x4B2E1F, 1); // Dark brown color

        this.drill.depth = 99
    }

    update() {
        if(this.score > 0 && this.score % 5 == 0 && !this.leveled && this.score <= 50) {
            game.settings.groundSpeed += 1 // CHANGE THIS FOR DIFFICULTY
            console.log(game.settings.groundSpeed)
            this.leveled = true
        }
        if(this.gameOver && this.sceneTransition) {
            this.bgm.stop();
            this.sound.play('sfx-game_over')
            this.scene.start('gameOverScene')    
        }
        if(!this.gameOver) {
            // this.background.tilePositionY = Math.floor(this.background.tilePositionY + game.settings.groundSpeed);
            this.background.tilePositionY += game.settings.groundSpeed

            if(!(this.fossilCollided)) {
                this.trailPositions = this.trailPositions || [];
                this.trailPositions.push({ x: this.drill.x, y: this.drill.y + 20});

                // Limit trail length
                if (this.trailPositions.length > 30) {
                    this.trailPositions.shift();
                }
                
                if (keyLEFT.isDown) {
                    this.buttonPressed = true;
                    this.drill.direction = -1; // Moving left
                } 
                else if (keyRIGHT.isDown) {
                    this.buttonPressed = true;
                    this.drill.direction = 1; // Moving right
                }
            
                if (this.buttonPressed) {
                // Apply velocity based on last direction
                    this.drill.setVelocityX(this.drill.direction * game.settings.moveSpeed);
                }
            }
            
            if(this.drill.direction) {
                
                let targetAngle = -this.drill.direction * 20; // Max rotation ±15 degrees
                this.drill.angle = Phaser.Math.Linear(this.drill.angle, targetAngle, 0.1);

                let absAngle = Math.abs(this.drill.angle) / 15; // Normalize angle (0 to 1)
                let newWidth = Phaser.Math.Linear(282, 220, absAngle); // Shrink width when tilted
                let newOffsetX = Phaser.Math.Linear(45, 65, absAngle) * this.drill.direction; // Adjust offset

                this.drill.body.setSize(30, 580); // Update body size
                if(this.drill.direction == -1) {
                    this.drill.body.setOffset(30 + newOffsetX, 15); 
                }
                else if (this.drill.direction == 1) {
                    this.drill.body.setOffset(300 + newOffsetX, 20); 
                }
            }
            

            this.trail.clear();
            this.trail.fillStyle(0x412212, 1);

            // Draw trail moving upwards
            for (let i = 0; i < this.trailPositions.length; i++) {
                this.trailPositions[i].y -= game.settings.groundSpeed; // Move trail up
                this.trail.fillCircle(this.trailPositions[i].x, this.trailPositions[i].y, 45);
            }

            if(this.fossilCollided) {
                this.drill.y -= game.settings.groundSpeed
                //console.log(this.drill.y)
            }

            if(this.drill.y <= -55) {
                this.gameOver = true
                this.sceneTransition = true
            }
            
            
            // Prevent the drill from going off-screen
            if (this.drill.x < 45) {
                this.drill.x = 45;
                this.drill.direction = 1; // Bounce off left wall
            } 
            else if (this.drill.x > game.config.width - 45) {
                this.drill.x = game.config.width - 45;
                this.drill.direction = -1; // Bounce off right wall
            }
            
            this.showScore.text = 'Obstacles Dodged: ' + this.score    
            
            //this.physics.world.collide(this.drill, this.obstacles, this.drillCollision, null, this);
            
            this.obstacleX = Phaser.Math.Between(50, game.config.width - 50)
        }
    }

    addObstacle() {
        //let speed = game.settings.moveSpeed
        //console.log("addObstacle() called");
        let rand = Math.random() < 0.5
        //console.log(rand ? "Fossil" : "Barrel");
        if(rand) {
            let xPos = this.obstacleX //Phaser.Math.Between(50, game.config.width - 50)
            this.obstacle = new Fossil(this, xPos, game.config.height, 'fossil').setScale(0.5).setOrigin(0.5, 0)
        }
        else {
            let xPos = this.obstacleX//Phaser.Math.Between(50, game.config.width - 50)
            this.obstacle = new Barrel(this, xPos, game.config.height, 'barrel').setScale(0.25).setOrigin(0.5, 0)
        }
        this.obstacles.add(this.obstacle);
    }

    fossilCollision() {
        this.drill.stop()
        this.drill.setVelocityX(0)
        //this.drill.setVelocityY(-4)
    }

    barrelExplode(barrel, barrelx, barrely) {
        barrel.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(barrelx, barrely, 'explosion').setScale(5).setOrigin(0.5, 0.5)
        this.gameOver = true
        this.drill.stop()
        this.drill.setVelocityX(0)
        boom.anims.play('explode')
        this.sound.play('sfx-explosion') 
        this.drill.alpha = 0;
        this.drill.destroy()            // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes                  
            barrel.destroy()                     // make ship visible again
            boom.destroy()  
            this.sceneTransition = true                   // remove explosion sprite
        })
    }
}