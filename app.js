// Enemy constructor
// x and y parameters are used to give the individual Enemy object an initial x and y position
// speed 
const Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // X pos
    // Y pos
    this.x = x;
    // start off from the center on the Y axix
    this.y = y + 55;
    this.step = 101
    // Move forward & off screen
    this. boundry = this.step * 5;
    // one block off-screen
    this.resetPosition = - this.step;
    this.speed = speed;
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    // If enemy isn't passed boundries
    if (this.x < this.boundry){
        // Increment X by speed * dt to give the enemy a constant speed across the gameboard 
        this.x += this.speed * dt;
    } else {
        // reset the position to start
        this.x = this.resetPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// instantiate bug objects
// add the 3 arguments to the new Enemy calls
const bug1 = new Enemy(-101,0,200);
const bug2 = new Enemy(-101,83,300);
const bug3 = new Enemy((-101 * 2.5), (83 * 2),300);
const bug4 = new Enemy((-101 * 5),(83 * 3),300);

// Place all enemy objects in an array called allEnemies and push the bug1 object into it
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);
console.log(allEnemies);

// Hero
class Hero {
    // Hero constructor
    constructor(){
        // increment by the distance of next block
        this.step = 101;
        this.jump = 83;
        // start off 2 blocks to the right on the x axis
        this.startX = this.step * 2;
        // start off 5 blocks down from the top row on the y axis
        // 10 px off center on the y axis
        this.startY = (this.jump * 5) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        this.sprite = 'images/char-boy.png';
    }
    // Update
    update(){
        for (let Enemy of allEnemies){
            // if player collide with emeny on x & y 
            // the enemy.x + enemy.step (right side) > the player’s this.x (left side)
            // the enemy.x (left side) < the player’s this.x + this.step (right side). 
            if (this.y === Enemy.y && (Enemy.x + Enemy.step/2 > this.x && Enemy.x < this.x + this.step/2)){
                // alert('SAME ROW!');
                // alert('COLLIDE!');
                this.reset(); // reset() function needed
            }
            //console.log(this.y, Enemy.y)
            // win if player reach final tile on y axis
            if (this.y === 55){
                //console.log('WIN!');
                this.victory = true;
            }
        }
    }
    // Reset game function
    reset(){
        // reset x & y
        this.x = this.startX;
        this.y = this.startY;
        modal.classList.toggle('hdie');
    }
    // Render
    render(){
        // Draw player sprite on X & Y
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Handle Keyboard Input 
    // Update X & Y property avoiding to input
    handleInput(input){
        switch(input){
            case 'left':
                if (this.x>0){
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y>this.jump){
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x< this.step * 4){
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y< this.jump * 4){
                    this.y += this.jump;
                }
                break;
        }
    }

}

// Place the player object in a variable called player
const player = new Hero();

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
