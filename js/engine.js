/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
var gameOver = false; 
var x;
var y;
var playerSelected = false; 
var score;
var record;

var getRecord = function () {
	if (window.localStorage.getItem('record')) {
			record = window.localStorage.getItem('record');
		} 
		else {
			record = 0;
		}
}


 var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
	 
     var doc = global.document,
     win = global.window,
     canvas = doc.createElement('canvas'),
     ctx = canvas.getContext('2d'),
     lastTime;
	
	
     canvas.width = 505;
     canvas.height = 707;
     doc.body.appendChild(canvas);
	 getRecord();
    /* This function serves as the kickoff point for the game loop itself
    * and handles properly calling the update and render methods.
    */

    function main() {
        /* Get our time delta information which is required if your game
        * requires smooth animation. Because everyone's computer processes
        * instructions at different speeds we need a constant value that
        * would be the same for everyone (regardless of how fast their
        * computer is) - hurray time!
        */
        var now = Date.now(),
        dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
        * our update function since it may be used for smooth animation.
        */
		
		
			
			update(dt);
			render();
			checkHeal();

			/* Set our lastTime variable which is used to determine the time delta
			* for the next time this function is called.
			*/
			lastTime = now;

			/* Use the browser's requestAnimationFrame function to call this
			* function again as soon as the browser is able to draw another frame.
			*/

			win.requestAnimationFrame(main);
		
	}

    /* This function does some initial setup that should only occur once,
    * particularly setting the lastTime variable that is required for the
    * game loop.
    */
    function init() {
        lastTime = Date.now();
        render();
    }

    /* This function is called by main (our game loop) and itself calls all
    * of the functions which may need to update entity's data. Based on how
    * you implement your collision detection (when two entities occupy the
    * same space, for instance when your character should die), you may find
    * the need to add an additional function call here. For now, we've left
    * it commented out - you may or may not want to implement this
    * functionality this way (you could just implement collision detection
    * on the entities themselves within your app.js file).
    */
    function update(dt) {
        if (gameOver == false && playerSelected == true) {
		updateEntities(dt);
        checkCollisions();
		checkVictory();
		}
    }

    /* This is called by the update function and loops through all of the
    * objects within your allEnemies array as defined in app.js and calls
    * their update() methods. It will then call the update function for your
    * player object. These update methods should focus purely on updating
    * the data/properties related to the object. Do your drawing in your
    * render methods.
    */

    function updateEntities(dt) {
		
			allEnemies.forEach(function(enemy) {
				enemy.update(dt);
			});
			player.update();
		    }

    /* This function initially draws the "game level", it will then call
    * the renderEntities function. Remember, this function is called every
    * game tick (or loop of the game engine) because that's how games work -
    * they are flipbooks creating the illusion of animation but in reality
    * they are just drawing the entire screen over and over.
    */

    function render() {
        /* This array holds the relative URL to the image used
        * for that particular row of the game level.
        */
        var rowImages = [
            'images/water-block.png',   // Top row is water
            'images/stone-block.png',   // Row 1 of 4 of stone
            'images/stone-block.png',   // Row 2 of 4 of stone
            'images/stone-block.png',   // Row 3 of 4 of stone
            'images/stone-block.png',   // Row 4 of 4 of stone
            'images/grass-block.png',   // Row 1 of 2 of grass
            'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 7,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
        * and, using the rowImages array, draw the correct image for that
        * portion of the "grid"
        */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                * requires 3 parameters: the image to draw, the x coordinate
                * to start drawing and the y coordinate to start drawing.
                * We're using our Resources helpers to refer to our images
                * so that we get the benefits of caching these images, since
                * we're using them over and over.
                */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
		writeMenu();
		
    }
    
    var rect = canvas.getBoundingClientRect();

    canvas.addEventListener('click', function() {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        if(playerSelected == false && y >550 && x>0 && x <500){
			select();
            main();
        }
    });

    function select() {
        if (x>0 && x<100){
            player = player1;
        }
        else if (x>=100 && x<200) {
            player = player2;
        }
        else if (x>=200 && x<300) {
            player = player3;
        }
        else if (x>=300 && x<400) {
            player = player4;
        }
        else if (x>=400 && x<500) {
            player = player5;
        }
		reset();
        playerSelected = true;
        player.x = 200;
        		
    }
	
	function writeMenu () {
		if(playerSelected == false){
            ctx.font = "50px Arial";
            ctx.textAlign = "center";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.strokeText("Choose your hero!", 252, 300);
			
            ctx.fillStyle = "white";
            ctx.fillText("Choose your hero!", 252, 300);
			players.forEach(function(prePlayer) {
				prePlayer.render();
        });
        } 
			if (player) {
				score = player.score;
			}
			else {
				score = 0;
			}
			 //player.render();
			ctx.font = "50px Arial";
			ctx.textAlign = "center";
			ctx.strokeStyle = "black";
			ctx.lineWidth = 3;
			ctx.strokeText("Score: "+score, 400, 100);
			ctx.fillStyle = "white";
			ctx.fillText("Score: "+score, 400, 100);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 3;
			ctx.strokeText("Record: "+record, 120, 100);
			ctx.fillStyle = "white";
			ctx.fillText("Record: "+record, 120, 100);
			
	}
    /* This function is called by the render function and is called on each game
    * tick. Its purpose is to then call the render functions you have defined
    * on your enemy and player entities within app.js
    */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
        * the render function you have defined.
        */
       
		if (playerSelected == true) {
			allEnemies.forEach(function(enemy) {
				enemy.render();
			});
			player.render();
		} else{
			var positionY = 60;
			var positionX = 0;
			allEnemies.forEach(function(enemy) {
				enemy.reset(positionY);
				positionY += 83;
			});
			players.forEach(function(prePlayer) {
				prePlayer.x = positionX;
				positionX += 100;
			});
		}
    }
	
	var checkHeal = function () {
		if(player.heal ==0){
			ctx.font = "50px Arial";
            ctx.textAlign = "center";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.strokeText("Game Over!", 252, 300);
			ctx.strokeText("F2 for new game!", 252, 400);

            ctx.fillStyle = "white";
            ctx.fillText("Game Over!", 252, 300);
			ctx.fillText("F2 for new game!", 252, 400);
			checkRecord();
			gameOver = true;
		}
	}
	
	var checkRecord = function() {		
		if (player.score > record) {
			record = player.score;
			window.localStorage.setItem('record', record);
			alert("You broke the record! Congrulations!")
		}
	}
	
    var checkVictory = function() {
			if (player.y < 60) {
				alert("Victory!");
				var positionY = 60;
			allEnemies.forEach(function(enemy) {
				enemy.reset(positionY);
				positionY += 83;
			});
				player.reset();
				player.score++;
			}
	}
	
	var checkCollisions = function() {
		allEnemies.forEach(function(enemy) {
			if (player.y == enemy.y && ((player.x > enemy.x && player.x < (enemy.x+81)) || ((player.x+81) < (enemy.x+81) && (player.x+81) > enemy.x))) {
				alert ("colision");
				var positionY = 60;
				allEnemies.forEach(function(enemy) {
					enemy.reset(positionY);
					positionY += 83;
				});
				player.heal -= 1;
				console.log(player.heal);
				player.reset();
			}
		});
	}
	
	/* This function does nothing but it could have been a good place to
    * handle game reset states - maybe a new game menu or a game over screen
    * those sorts of things. It's only called once by the init() method.
    */
	document.addEventListener('keyup', function(e) {
		var allowedKeys = {
			113: 'f2'
		};
		if (allowedKeys[e.keyCode] == "f2") {
			reset();
		}
	});
	
    function reset() {
		gameOver = false;
		player.heal = 2;
		player.score = 0;
		var positionY = 60;
		playerSelected = false;
		allEnemies.forEach(function(enemy) {
            enemy.reset(positionY);
			positionY += 83;
        });
		init();
	};

	
    

    /* Go ahead and load all of the images we know we're going to need to
    * draw our game level. Then set init as the callback method, so that when
    * all of these images are properly loaded our game will start.
    */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
		'images/Selector.png',
        'images/GemBlue.png'
        ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
    * object when run in a browser) so that developers can use it more easily
    * from within their app.js files.
    */
    global.ctx = ctx;
})(this);
