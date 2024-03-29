// global variables
let canvas;
let ctx;
//setting object size to 64
let TILESIZE = 64;
//setting width of boundary 22 times tilesize
let WIDTH = TILESIZE * 22;
//setting height of boundary 9 times tilesize
let HEIGHT = TILESIZE * 9;
//setting allSpriites and walls with empty arrays
let allSprites = [];
let walls = [];



// get user input from keyboard
let keysDown = {};
let keysUp = {};
//setting grid for the game and placement of walls
let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;


//creating function for when down key is pressed
addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    // console.log("key down is " + keysDown[event.key]);
}, false);

//creating function for when the up key is pressed
addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
}, false);

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    //shorting call terms for width and height of the canvas
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}
//creating largest first class which is sprite
class Sprite {
    //adding constructor with descriptors of the object
    constructor(x, y, w, h, color) {
        //shortening call terms for x,y,w,h,color
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        //pushing this class to all
        allSprites.push(this);
    }
    get type() {
        return "sprite";
    }
    //establisheing parameters 
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    //drawing the initial object
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

//creating a subclass of Sprite:  player 
class Player extends Sprite {
    //creating players constructor with its parameters
    constructor(x, y, speed, w, h, color, hitpoints) {
        //all players have these parameters 
        super(x, y, w, h, color);
        //establishing full definition of the parameters 
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    //creating fucntion allowing the game to understand when the player collides with a wall
    collideWith(obj) {
        //if the player crosses the x and y of the wall then 
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h
        ) {
            //print in console 
            console.log(this.type + ' collides with ' + obj.type);
            return true;
        }
    }
    get type() {
        return "player";
    }
    //setting function for WASD input, allowing for input to retun as motion as change in direction 
    input() {
        //conditional staement for upward movement
        if ('w' in keysDown) {
            this.dy = -1;
            this.dx = 0;
            // console.log("dy is: " + this.dy)
            this.y -= this.speed;
        }
        //conditional staement for left movement 
        if ('a' in keysDown) {
            this.dx = -1;
            // console.log("dx is: " + this.dx)
            this.x -= this.speed;
        }
        //conditional statement for downward movement
        if ('s' in keysDown) {
            this.dy = 1
            // console.log("dy is: " + this.dy)
            this.y += this.speed;

        }
        //conditional staement for right movement
        if ('d' in keysDown) {
            this.dx = 1;
            // console.log("dx is: " + this.dx)
            this.x += this.speed;
        }

    }
    //udate function for player 
    update() {
        this.input();
        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
    };
}
//creating subclass of player: ENEMY
class Enemy extends Player {
    //creating constructors with its parameters 
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, speed, w, h, color, hitpoints);
        //establish parameters 
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }

    get type() {
        return "enemy";
    }

}

let badguy = new Enemy();
console.log("here's the example of a sub-sub class " + badguy.type);
console.log("badguy stats " + badguy.speed);

// creating a seperate sub class of Sprite: Wall
class Wall extends Sprite {
    //create constructors of Wall with its parameters 
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color);
        //establish parameters 
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    create(x, y, w, h, color) {
        return new Wall(x, y, w, h, color);
    }
    get type() {
        return "wall";
    }
}

//set the definition of the original array for the grid of the game
const levelChars = {
    ".": "empty",
    "#": Wall,
};
//creating a fucntion in which constructs the grid
function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}

console.log("here's the grid...\n" + makeGrid(gamePlan, 22));

function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {
                    let t = new type;
                    // let id = Math.floor(100*Math.random());
                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log('current level');
console.log(currentLevel);

// instantiations...
//set orgins of player one as you first load the page
let player1 = new Player(WIDTH / 2, HEIGHT / 2, 10, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);
// let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
// let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
// let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

console.log(allSprites);
console.log(walls);

//creating collide function to set in place realites use of a wall
function update() {
    for (i of allSprites) {
        if (i.type == "wall") {
            // if console.log(i) is discorved (from previous function) then do ...
            if (player1.collideWith(i)) {
                //change veloctiy upon collision to 0 for when going right
                if (player1.dx == 1){
                    player1.dy = 0;
                    player1.x = i.x - player1.w;
                }
                //change veloctiy upon collision to 0 for when going left
                else if (player1.dx == -1){
                    player1.dy = 0;

                    player1.x = i.x + i.w;
                }
                //change veloctiy upon collision to 0 for when going down
                else if (player1.dy == 1){
                    player1.dx = 0;
                    player1.y = i.y - player1.h;
                }
                //change veloctiy upon collision to 0 for when going up
                else if (player1.dy == -1){
                    player1.y = i.y + i.h;
                }
                // console.log("player collided with walls")
                console.log("player1 dx is:" + player1.dx);
            }
        }
    }

    player1.update();

    // oneSquare.update();
    // twoSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}