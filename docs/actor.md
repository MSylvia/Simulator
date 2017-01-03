# Actor

The objects which are rendered on the HTML Canvas Element are initiated from subclasses of the `Actor` class.

Typically, you would create a new `Actor` like this:

```javascript
// Import the Actor class from the library
import {Actor} from 'canvas-simulator';

class Bird extends Actor{
    constructor(){
        // Initiate the super class
        super();
    }
}
```

Right now, if would add a bird to the world by creating a new instance of the `Bird` class (e.g. `let bird = new Bird()`), you would see nothing because you have not set an image yet.

To do so, use either the `setImageSrc(src: string)` or the `setImage(img: HTMLImageElement)` method in the constructor of the `Actor` subclass to either pass the path to an image file or to pass an HTMLImageElement which was created beforehand (`let image = new Image()`).

 ```javascript
import {Actor} from 'canvas-simulator';

class Bird extends Actor{
    constructor(){
        super();
        // Set Image Src
        super.setImageSrc('path/to/image.png');
    }
}
```

## Special Methods

The `Actor` class and therefore all it's subclasses can use special methods which are being called automatically.

These special methods have to be set to `public` in order for them to be called automatically.

### animate

The `animate` method is called before each frame is being rendered. In this method you can — as the name already suggests — animate the `Actor` by changing it's parameters, e.g. the x and y coordinates (more on that later).

 ```javascript
import {Actor} from 'canvas-simulator';

class Bird extends Actor{
    constructor(){
        super();
        super.setImageSrc('path/to/image.png');
    }
    public animate(){
        // Animation goes here
    }
}
```