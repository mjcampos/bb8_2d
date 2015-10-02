var game = new Phaser.Game(1280, 700, Phaser.AUTO, '');
var PhaserGame = function () {

    this.player = null;
    this.platforms = null;
    this.background = null;

    this.facing = 'left';
    this.jumpTimer = 0;
    this.cursors = null;

};

PhaserGame.prototype = {
    init: function () {
        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 800;
    },

    preload: function() {
        this.load.image('background', 'assets/background.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/dude.png', 40, 48);
    }, 

    create: function() {
         //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.add.sprite(0, 0, 'background');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 48, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(4, 1.5);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(700, 600, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(150, 350, 'ground');
        ledge.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
    }, 

    update: function() {
        //  Collide the player with the platforms
        this.physics.arcade.collide(player, platforms);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
    }
};

game.state.add('Game', PhaserGame, true);