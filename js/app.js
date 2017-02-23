// Enemies our player must avoid
var Enemy = function(enemyX, enemyY) {
    // Variables applied to each of our instances go here,
    this.x = enemyX;
    this.y = enemyY;
    this.speeds = [100, 120, 140, 160, 180, 200, 220, 240, 260, 280];
    this.speed = this.selectSpeed();
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.selectSpeed = function () {
	this.speedSelector = Math.round(Math.random()*9);
    return this.speeds[this.speedSelector];
}

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 500) {
        this.x = -101;
		this.speed = this.selectSpeed();        
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(position) {
	this.y = position;
	this.x = -100;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (posX, posY, player) {
	this.heal = 2;
	this.score = 0;
    this.x = posX;
    this.y = posY;
    this.sprite = 'images/'+player+'.png';
};



Player.prototype.reset = function() {
    this.x = 300;
    this.y = 475;
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
    if(this.x < 0){
        this.x = 0;
    }
    else if(this.x >400){
        this.x = 400;
    }
    else if(this.y < 0){
        this.y = 0;
    }
    else if(this.y > 475){
        this.y = 475;
    }
	
};

Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
};

Player.prototype.handleInput = function(key) {
    if (gameOver == false) {
	switch (key) {
        case "left":
        this.x = this.x-100
        break;

        case "right":
        this.x = this.x+100;
        break;

        case "up":
        this.y = this.y-83;
        break;

        case "down":
        this.y = this.y+83;
        break;
    }
	}
};

var Selector = function () {
	this.x = 300;
    this.y = 475;
    this.sprite = 'images/Selector.png';
};

Selector.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
};


// Now instantiate your objects.

var player;

var player1 = new Player(0, 475, "char-boy");
var player2 = new Player(0, 475, "char-horn-girl");
var player3 = new Player(0, 475, "char-pink-girl");
var player4 = new Player(0, 475, "char-cat-girl");
var player5 = new Player(0, 475, "char-princess-girl");

var players = [player1, player2, player3, player4, player5];



var enemy1 = new Enemy(-101, 60);
var enemy2 = new Enemy(-101, 143);
var enemy3 = new Enemy(-101, 226);
var enemy4 = new Enemy(-101, 309);

// Place all enemy objects in an array called allEnemies

var allEnemies = [enemy1, enemy2, enemy3, enemy4];
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

