var speeds = [100, 120, 140, 160, 180, 200, 220, 240, 260, +
280, 300, 320, 340, 360, 400, 420, 440, 460];
var player;

// Enemy 'class'
var Enemy = function(enemyX, enemyY) {
    // Variable for enemy position x
    this.x = enemyX;
    // Variable for enemy position y
    this.y = enemyY;
    // Variable for enemy speed
    this.speed = this.selectSpeed();
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}


// Method for random speed and return value.
Enemy.prototype.selectSpeed = function () {
    this.speedSelector = Math.round(Math.random()*17);
    return speeds[this.speedSelector];
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 800) {
        this.x = -101;
        this.speed = this.selectSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy position and speed.
Enemy.prototype.revive = function(position) {
    this.y = position;
    this.speed = this.selectSpeed();
    this.x = -100;
}

// Player class
var Player = function (posX, posY, player) {
    // Variable define numbers of colisions for game over
    this.heal = 2;
    // Variable for player score
    this.score = 0;
    // Variable for player position x
    this.x = posX;
    // Variable for player position y
    this.y = posY;
    // Variable for player image
    this.sprite = 'images/'+player+'.png';
};

// Method reset number of colisions for game over and player score
Player.prototype.reset = function() {
    player.heal = 2;
    player.score = 0;
}

// Method define initial position for player object
Player.prototype.revive = function() {
    this.x = 200;
    this.y = 475;
}

// Method for choice image for player object,
// change status of game to 'onGame',
// and define player position x to initial position
Player.prototype.select = function(x) {
    if (x>=0 && x<100){
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
    status = "onGame";
    player.x = 200;
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

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(key) {
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
};

var Selector = function () {
    this.x = 200;
    this.y = 475;
    this.sprite = 'images/Selector.png';
};

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


Selector.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
        this.x = this.x-100
        break;

        case "right":
        this.x = this.x+100;
        break;

        case "space":
        x = selector.x;
        player.select(x);
        reset();
        status = "onGame";
        player.x = 200;
        break;
    }

};

Selector.prototype.select = function(x) {
    if (x>0 && x<100){
        this.x = 0;
    }
    else if (x>=100 && x<200) {
        this.x = 100;
    }
    else if (x>=200 && x<300) {
        this.x = 200;
    }
    else if (x>=300 && x<400) {
        this.x = 300;
    }
    else if (x>=400 && x<500) {
        this.x = 400;
    }
}

Selector.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
if(this.x < 0) {
    this.x = 0;
}
else if(this.x >400) {
    this.x = 400;
}
};

Selector.prototype.reset = function() {
    this.x = 200;
};

// Now instantiate your objects.


var player1 = new Player(0, 475, "char-boy");
var player2 = new Player(0, 475, "char-horn-girl");
var player3 = new Player(0, 475, "char-pink-girl");
var player4 = new Player(0, 475, "char-cat-girl");
var player5 = new Player(0, 475, "char-princess-girl");

player = player1;

var players = [player1, player2, player3, player4, player5];

var selector = new Selector();

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
        40: 'down',
        32: 'space',
        113: 'f2',
        115: 'f4'
    };
    if (allowedKeys[e.keyCode] == "f2") {
        reset();
    }
    else if (allowedKeys[e.keyCode] == "f4") {
        if (status == "onGame") {
            status = "pause";
        }
        else if (status == "pause") {
            status = "onGame";
            main();
        }
    }
    if(status == "onGame") {
        player.handleInput(allowedKeys[e.keyCode]);
    } else if (status == "selectPlayer"){
        selector.handleInput(allowedKeys[e.keyCode]);
    }
});


rect = canvas.getBoundingClientRect();

document.addEventListener('click', function() {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    if (status == "selectPlayer" && y > 550 && y < 633&& x > 0 && x < 500) {
        player.select(x);
    }
});

document.addEventListener('mousemove', function() {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    if(status == "selectPlayer" && y >550 && x>0 && x <500){
        selector.select(x);
    }
});
