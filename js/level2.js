class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2', active: false });
    }

    init() {
        this.playerStartingPos = 50;
        this.playerSpeed = 0.85;
    }
    
    preload ()
    {
        this.load.image('bg','./assets/background.png');
        this.load.image('player', './assets/player.png');
        this.load.image('player_rage', './assets/player_rage.png');
        this.load.image('seal', './assets/sealn.png');
        this.load.image('monster', './assets/monster2.png');
        this.load.image('goal', './assets/treasure.png');

        this.load.image('bg_night','./assets/background_night.png');
        this.load.image('player_night', './assets/player_night.png');
        this.load.image('player_rage_night', './assets/player_rage_night.png');
        this.load.image('seal_night', './assets/seal_night.png');
        this.load.image('monster_night', './assets/monster2_night.png');
        this.load.image('goal_night', './assets/treasure_night.png');
    }
    
    create ()
    {
        //adding variables & set base attr
            //background
        this.bg = this.add.image(0,0,'bg');
        this.bg.setOrigin(0);
        this.bg.setTexture('bg_night');
    
            //player
        this.player = this.physics.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'player_night');
        this.player.setScale(0.75);
        this.player.x = this.playerStartingPos;
        this.player.setCollideWorldBounds(true);

    
                //Player Slippery
        this.player.setDamping(true);
        this.player.setDrag(0.25);
        this.player.setMaxVelocity(50);
        
                //PLAYER STAMINA
        this.stamina = 100;
    
    
    
            //Seal
        this.seal = this.physics.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'seal');
        this.seal.setDepth(1)
        this.seal.setTexture('seal_night')
                //randomize pos
        this.seal.setScale(0.8);
        this.seal.setRandomPosition(0,0, this.sys.game.config.width, this.sys.game.config.height);
                //SEAL movements
        this.seal.setVelocity(300, 300);
        this.seal.setCollideWorldBounds(true);
        this.seal.setBounce(1);

        //SEAL 2
        this.seal2 = this.physics.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'seal');
        this.seal2.setDepth(1)
        this.seal2.setTexture('seal_night')
                //randomize pos
        this.seal2.setScale(0.8);
        this.seal2.setRandomPosition(0,0, this.sys.game.config.width, this.sys.game.config.height);
                //seal2 movements
        this.seal2.setVelocity(300, 300);
        this.seal2.setCollideWorldBounds(true);
        this.seal2.setBounce(1);
    
            
            //Monster
        this.monster = this.physics.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'monster');
        this.monster.setDepth(1)
        this.monster.setTexture('monster_night')
                //randomize pos
        this.monster.setScale(0.1);
        this.monster.setRandomPosition(0,0, this.sys.game.config.width, this.sys.game.config.height);
                //monster movements
        this.monster.setVelocity(300, 300);
        this.monster.setCollideWorldBounds(true);
        this.monster.setBounce(1);

            //GOAL
        this.goal = this.physics.add.sprite(this.sys.game.config.width/2 + 200,this.sys.game.config.height/2,'goal');
        this.goal.setScale(0.5);
        this.goal.setTexture('goal_night')
    
        
        
    
        //Add controls
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        
    this.level = this.add.text(20,20,'Level 3')

    }
    
    update ()
    {
        //assigning controls
        if (this.keyW.isDown)
        {
            this.player.y -= this.playerSpeed;
            this.player.setAcceleration(0,-500);
        } else {
            this.player.setAcceleration(0);
        }
    
        if (this.keyA.isDown)
        {
            this.player.x -= this.playerSpeed;
            this.player.flipX = true;
            this.player.setAcceleration(-300,0);
        }
    
        if (this.keyS.isDown)
        {
            this.player.y += this.playerSpeed;
            this.player.setAcceleration(0,500);
        }
        if (this.keyD.isDown)
        {
            this.player.x += this.playerSpeed;
            this.player.flipX = false;
            this.player.setAcceleration(300,0);
            
        }
        if (this.keyShift.isDown)
        {
            this.playerSpeed = 0.85;
    
            while(this.stamina > 0) {
                this.playerSpeed = 1.15;
                // console.log(this.stamina)
                this.player.setTexture('player_rage_night')
                this.stamina--;
                continue;
            }
        }
        if (this.keyShift.isUp){
            this.playerSpeed = 0.85;
            this.player.setTexture('player_night')
            this.stamina++;
        }
    
    
        //GET BOUNDS
        let playerRect = this.player.getBounds();
        let sealRect = this.seal.getBounds();
        let seal2Rect = this.seal2.getBounds();
        let monsterRect = this.monster.getBounds();
        let goalRect = this.goal.getBounds();
    
        // OVERLAP CHECK
            //ENEMY
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, sealRect)) {
            console.log(`died`);
            // restart the Scene
            this.scene.restart();
            return;
        }
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, seal2Rect)) {
            console.log(`died`);
            // restart the Scene
            this.scene.restart();
            return;
        }
    
            //GOAL
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
            console.log(`WIN`);
            var gameOverText = this.add.text(320,180,'GAME OVER');
            gameOverText.setOrigin(0.5)
            this.scene.pause();
            return;
        }
            //monster
            if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, monsterRect)) {
                console.log(`died`);
                // restart the Scene
                this.scene.restart();
                return;
            }
    }
}