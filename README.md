# Simulator
A modern game and simulation library for the HTML Canvas element targeted for the use with ES6, TypeScript or Babel.

## Getting Started

This library uses the modern ES6 class syntax, so before getting started you should learn to use tools like TypeScript or Babel to compile ES6 to ES5 or below.

## Creating the World

Everything that happens during the simulation or game is contained in a **World** which is created by creating a class which inherits from the `World` class. In the world is named `NightSky`.

```javascript

// Import the World class from the library
import {World} from 'canvas-simulator';

// Create a new subclass
class NightSky extends World{
    // The constructor needs to be passed the Canvas 2D rendering context
    constructor(ctx){
        // Initiate the super class by passing the rendering context (you can forget about it now 🎉) and width and height of the canvas (optional)
        super(ctx, 400, 300);

        // Set background color
        super.setBackgroundColor('black');
    }
}


// Create a new new instance of the class

// Get context
let ctx = document.getElementById('canvas').getContext('2d');

//Initiate class
let sky = new NightSky(ctx);

```

## Adding Life to the World

Now that the `NightSky` world is ready to use, we can add objects to it which are also instances of classes which inherit from the `Actor` class of the library.

Here we create an object with the name of `Bird`.

```javascript

// Import the Actor class from the library
import {Actor} from 'canvas-simulator';

class Bird extends Actor{
    constructor(){
        // Initiate the super class
        super();

        // Setup image
        this.setupImage();
    }

     private setupImage(){
        // Set image
        let url = 'https://cdn.pixabay.com/photo/2014/04/02/17/03/bird-307767_640.png';
        super.setImageSrc(url);

        // Scale image while maintainig aspect ratio to 50px width
        super.scaleImageProportionateToWidth(50);
    }
}

```

To add a bird to the `NightSky` world, you have to call the `addToWorld` method as follows in the `NightSky` class.

```javascript

import {World} from 'canvas-simulator';

class NightSky extends World{

    constructor(ctx){
        super(ctx, 400, 300);
        super.setBackgroundColor('black');

        // Initiate new instance of Bird
        let bird = new Bird();

        // Add bird to world
        // super.addToWorld(<Actor>, <x>, <y>)

        super.addToWorld(bird, 50, 50);
    }
}

```

The whole script, after combinig the imports properly, would look something like this right now:

```javascript

import {Actor, World} from 'canvas-simulator';

// Bird class
class Bird extends Actor{
    constructor(){
        super();
        this.setupImage();
    }

     private setupImage(){
        let url = 'https://cdn.pixabay.com/photo/2014/04/02/17/03/bird-307767_640.png';
        super.setImageSrc(url);
        super.scaleImageProportionateToWidth(50);
    }
}

// NightSky class
class NightSky extends World{

    constructor(ctx){
        super(ctx, 400, 300);
        super.setBackgroundColor('black');
        let bird = new Bird();
        super.addToWorld(bird, 50, 50);
    }
}

// Initiate NightSky
let ctx = document.getElementById('canvas').getContext('2d');
let sky = new NightSky(ctx);

```


## Animating!

To make the bird move each actor can implement a method which is called `animate` (must be `public`).
We can make our bird fly over the screen like this

```javascript
class Bird extends Actor{
    constructor(){
        super();
        this.setupImage();
    }

    public animate(){
        super.setX(super.getX() + 1);
    }

     private setupImage(){
        let url = 'https://cdn.pixabay.com/photo/2014/04/02/17/03/bird-307767_640.png';
        super.setImageSrc(url);
        super.scaleImageProportionateToWidth(50);
    }
}
```

Now the bird moves quite slowly to the right of the screen.
