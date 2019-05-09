// play state of the game 
//


var play_state = 
{
	
	preload: function()
	{// preload assets
		console.log('preload'); // loads all files nessary for the level 
		reference_chart = util.load_image(images);
		game.load.spritesheet('redfighter', 'assets/img/redfighter.png', 343, 383);
	},// End preload 
	
	create: function()
	{// create play_state
		
		console.log('create');
	
		//create scene 
		game.physics.startSystem(Phaser.Physics.P2JS);
		sky = game.add.sprite(0, 0, 'sky');
		sky.height = game.world.height;
		
		// create player
		player = game.add.sprite(0, game.world.height - 250, 'redfighter', 4); // set player 150px above the ground 
		player.scale.setTo(0.3, 0.3);
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 0; // gravity of the player 
		player.body.collideWorldBounds = true; 
		var left = player.animations.add('left', [3, 2, 1, 0], 10, true); // sets the animation sprites of the spritesheet 
		left.onLoop.add(this.animation_stop, this);
		var right = player.animations.add('right', [5, 6, 7, 8], 10, true);
		right.onLoop.add(this.animation_stop, this);
		
		key_input = 
		{ // init key_input 
			SHIFT: () => game.input.keyboard.isDown(Phaser.Keyboard.SHIFT),
			SPACEBAR: () => game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR),
			W: () => game.input.keyboard.isDown(Phaser.Keyboard.W),
			A: () => game.input.keyboard.isDown(Phaser.Keyboard.A),
			S: () => game.input.keyboard.isDown(Phaser.Keyboard.S),
			D: () => game.input.keyboard.isDown(Phaser.Keyboard.D),
			UP: () => game.input.keyboard.isDown(Phaser.Keyboard.UP),
			LEFT: () => game.input.keyboard.isDown(Phaser.Keyboard.LEFT),
			DOWN: () => game.input.keyboard.isDown(Phaser.Keyboard.DOWN),
			RIGHT: () => game.input.keyboard.isDown(Phaser.Keyboard.RIGHT),
			Z: () => game.input.keyboard.isDown(Phaser.Keyboard.Z),
			X: () => game.input.keyboard.isDown(Phaser.Keyboard.X),
			C: () => game.input.keyboard.isDown(Phaser.Keyboard.C),
			NUM_1: () => game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_1),
			NUM_2: () => game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_2),
			NUM_3: () => game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_3),
		};
		
		// create stars
		stars = game.add.group(); 
		stars.points = 10; // set stars to equal 10 points 
		stars.enableBody = true;
		for (var i = 0; i < stars_number; i++)
		{ // creates star objs to the number of stars_number 
			var star = stars.create(i * stars_dist, 0, 'star'); // create a star obj inside the stars group 
			star.body.gravity.y = 60; // gravity of the star 
			star.body.bounce.y = 0.7 + Math.random() * 0.2; // determines of the amount of bounce the obj has 
		}
		
		// create diamond 
		diamonds = game.add.group();
		diamonds.points = 25; // set diamonds to equal 25 points 
		diamonds.enableBody = true;
		var diamond = diamonds.create(Math.random() * (game.world.width - 100) , Math.random() * (game.world.height - 100), 'diamond');
		diamond.body.gravity.y = 60;
		diamond.body.bounce.y = 0.5;
		
		// create player data text
		scoreText = game.add.text(16,16, 'score: ' + score, {fontSize: '22px', fill:'#000'});
		livesText = game.add.text(16, 40, 'lives: ' + lives,  {fontSize: '22px', fill:'#000'});
		levelText = game.add.text(16, 64, 'level: ' + level,  {fontSize: '22px', fill:'#000'});
		barrierText = game.add.text(game.world.width - 150, 16, 'barrier: ' + barrier,  {fontSize: '22px', fill:'#000'});
		shootText = game.add.text(game.world.width - 150, 40, 'shoot: ' + shoot,  {fontSize: '22px', fill:'#000'});
		boostText = game.add.text(game.world.width - 150, 64, 'boost: ' + boost,  {fontSize: '22px', fill:'#000'});
		
	},// End create 
	
	update: function() 
	{// run game loop
		//console.log('update');
		score++;
		if(score >= 3000)
			game.state.start('game_over');
		scoreText.setText('score: ' + score); // increase the score by time 
		barrierText.setText('barrier: ' + barrier); // update the text of the data 
		shootText.setText('shoot: ' + shoot);
		boostText.setText('boost: ' + boost);
		game.physics.arcade.collide(stars, platforms); // checks if stars obj and platforms obj collide
		game.physics.arcade.overlap(player, stars, this.collect_obj, null, this); // calls collect_obj, if player and stars overlap 
	
		game.physics.arcade.collide(diamonds, platforms); // checks if stars obj and platforms obj collide 
		game.physics.arcade.overlap(player, diamonds, this.collect_obj, null, this); // calls collect_obj, if player and diamond overlap 
		this.player_input(); // control player input 
	},
	
	player_input: function()
	{ // controls the player inputs
		if (key_input.LEFT() || key_input.A())
		{//  Move to the left
			
			if(player.body.velocity.x > -350)
				player.body.velocity.x += -75;	
			if(is_right != 0)
				player.animations.play('left')
			is_right = 0;
		}
		if (key_input.RIGHT() || key_input.D())
		{//  Move to the right
			
			if(player.body.velocity.x < 350)
				player.body.velocity.x += 75;
			if(is_right != 1)
				player.animations.play('right');
			is_right = 1;
		}
		if (key_input.UP() || key_input.W())
		{// move up 
			if(player.body.velocity.y > -300)
				player.body.velocity.y += -50;
			
		}
		if (key_input.DOWN() || key_input.S())
		{// move down 
			if(player.body.velocity.y < 300)
				player.body.velocity.y += 50;
			
		}
		if(key_input.SHIFT())
		{ // control the boost system 
			if(boost > 10)
			{
			if(is_right == 0)
				player.body.velocity.x += -75;
			if(is_right == 1)
				player.body.velocity.x += 75;
			}
			if(boost > 1)
				boost -= 2;
		}
		else if(!key_input.SHIFT())
		{// recover boost if not used
			if(boost < 100)
				boost++;
		}
		if(key_input.SPACEBAR())
		{
			if(shoot > 0)
				shoot--;
		}
		else if(!key_input.SPACEBAR())
		{// recover boost if not used
			if(shoot < 100)
				shoot++;
		}
		if(key_input.Z() || key_input.NUM_1())
		{
			if(barrier > 0)
				barrier--;
		}
		if(!(key_input.LEFT() || key_input.A() || key_input.RIGHT() || key_input.D() || 
		key_input.UP() || key_input.W() || key_input.DOWN() || key_input.S()))
		{//  Stand still
			player.animations.frame = 4;
			is_right = 3;
			if(player.body.velocity.x < 0)
				player.body.velocity.x += 10;
			else if(player.body.velocity.x > 0)
				player.body.velocity.x -= 10;
			if(player.body.velocity.y < 0)
				player.body.velocity.y += 10;
			else if(player.body.velocity.y > 0)
				player.body.velocity.y -= 10;
		}
		
	}, // End player_input 
	
	collect_obj: function(player, obj)
	{ // player collects objects 
		obj.kill();
		score += obj.parent.points; // get the point assignment from the parent object
		
	}, // End collect_obj
	
	animation_stop: function(sprite, animation)
	{// stop loop animation 
		console.log('called');
		player.animations.stop(null, true);
		animation.loop = false;
	}, // End animation_stop
	
};


