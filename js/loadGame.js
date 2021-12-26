class loadGame extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'loadGame', active: true });
    }
    preload() {
        this.load.audio("music", ["./assets/music.mp3"]);
    }
    
    create() {
        var music = this.sound.add("music", { loop: true });
        music.play();
        this.scene.start('startGame')
}
}
config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 },
            debuf: false
        }
    },
    // scene: {
    //     init: init,
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
    scene: [ loadGame, startGame, levelSelect, about, level0, level1, level2]
};

var game = new Phaser.Game(config);