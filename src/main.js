/********************************************************************************************************************************
Cassian Jones
Driller's Dream
30+ Hours
Creative Tilt:
1. The trail left behind by the drill and making the hitbox (somewhat) follow the rotation both required some creative thinking 
2. I've never seen an endless runner where the character is moving downwards, and I also haven't seen a system without gravity that forces the player to stay on top of the way their character moves
********************************************************************************************************************************/

let config = {
    type: Phaser.AUTO,
    width: 540,
    height:1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            /*
            gravity: {
                x: 0,
                y: 0
            }
            */
        }
    },
    scene: [ Title, Play, Credits, Tutorial, GameOver, ]
}

let game = new Phaser.Game(config)

let keyLEFT, keyRIGHT, keyTUTORIAL, keyCREDITS, keySTART, keyMENU, keyRESTART

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let upperY = game.config.height/3;
let level;
let highScore;
let newHighScore = false;

/*
let borderUISize = game.config.height /15
let borderPadding = borderUISize / 3
*/
