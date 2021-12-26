class level0 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level0', active: false });
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
    this.load.image('seal', './assets/seal.png');
    this.load.image('goal', './assets/treasure.png');
}

create ()
{
    //adding variables & set base attr
        //background
    this.bg = this.add.image(0,0,'bg');
    this.bg.setOrigin(0);
    

        //player
    this.player = this.physics.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'player');
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
            //randomize pos
    this.seal.setScale(0.8);
    this.seal.setRandomPosition(0,0, this.sys.game.config.width, this.sys.game.config.height);
            //SEAL movements
    this.seal.setVelocity(300, 300);
    this.seal.setCollideWorldBounds(true);
    this.seal.setBounce(1);

        //GOAL
    this.goal = this.physics.add.sprite(this.sys.game.config.width/2 + 200,this.sys.game.config.height/2,'goal');
    this.goal.setScale(0.5);

    
    

    //Add controls
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    
    this.level = this.add.text(20,20,'Level 1')
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
            this.player.setTexture('player_rage')
            this.stamina--;
            continue;
        }
    }
    if (this.keyShift.isUp){
        this.playerSpeed = 0.85;
        this.player.setTexture('player')
        this.stamina++;
    }


    //GET BOUNDS
    let playerRect = this.player.getBounds();
    let sealRect = this.seal.getBounds();
    let goalRect = this.goal.getBounds();

    // OVERLAP CHECK
        //ENEMY
    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, sealRect)) {
        console.log(`died`);
        // restart the Scene
        this.scene.restart();
        return;
    }

        //GOAL
    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
        console.log(`WIN`);
        // restart the Scene
        this.scene.start('level1');
        return;
    }
}
}
