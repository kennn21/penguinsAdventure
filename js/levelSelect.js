class levelSelect extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'levelSelect', active: false });
    }
    preload() {
        this.load.image('bg_menu','./assets/background_menu.png')
        this.load.image('player', './assets/player.png')
        this.load.image('player_rage', './assets/player_rage.png')
    }
    
    create() {
        //background
        var bg = this.add.image(0,0,'bg_menu')
        bg.setOrigin(0)

        //penguin
        var penguin = this.add.image(0,0,'player')
        penguin.setOrigin(0)
        penguin.setScale(1.7)
        penguin.setPosition(0,220)

        //buttons
        var backButton = this.add.text(320,180,'Back')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('startGame')
        }, this);

        var level1Button = this.add.text(320,220,'Level 1')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('level0')
        }, this);

        var level2Button = this.add.text(320,260,'Level 2')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('level1')
        }, this);

        var level3Button = this.add.text(320,300,'Level 3')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('level2')
        }, this);
    }
}