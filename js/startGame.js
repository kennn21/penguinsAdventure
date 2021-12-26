class startGame extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'startGame', active: false });
    }
    preload() {
        this.load.image('bg_menu','./assets/background_menu.png')
        this.load.image('bg_menu_about','./assets/background_menu_about.png')
        this.load.image('player', './assets/player.png')
        this.load.image('player_rage', './assets/player_rage.png')
    }
    
    create() {
        //background
        var bg = this.add.image(0,0,'bg_menu')
        bg.setOrigin(0)

        //penguin
        this.penguin = this.add.image(0,0,'player_rage')
        .setOrigin(0)
        .setScale(1.7)
        .setPosition(0,220)

        //buttons
        var playButton = this.add.text(320,180,'Play')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('level0')
        }, this);


        var levelSelectButton = this.add.text(320,220,'Level Select')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('levelSelect')
        }, this);

        var aboutButton = this.add.text(320,260,'About')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('about')
        }, this);

        var musicCredit = this.add.text(532,340,'Music: 8 Bit Adventure\nAdhesiveWombat')
        musicCredit.setOrigin(0.5)
    }
}