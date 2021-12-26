class about extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'about', active: false });
    }
    create() {
        //background
        var bg = this.add.image(0,0,'bg_menu_about')
        bg.setOrigin(0)

        //penguin
        var penguin = this.add.image(0,0,'player')
        penguin.setOrigin(0)
        penguin.setScale(1.7)
        penguin.setPosition(0,220)

        var aboutText = this.add.text(320,220,'We Are from Group 6\nWe are:\n1.FX Kennard Sugirotok\n2.Arina Sabilahaq\n3. Jecyca Velisyau\n4. Muhammad Risma\n5. Rahmandi Fitra Madenda\n6. Yocelin Faristi Daely');
        aboutText.setOrigin(0.5);


        //buttons
        var backButton = this.add.text(320,320,'Back')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', function () {
            this.scene.start('startGame')
        }, this);
    }
}