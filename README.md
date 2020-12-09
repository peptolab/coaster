# Coaster
Coaster is a dependency-free ES6 Javascript carousel. Designed to be lightly built with JS and HTML with CSS transitions and animations to provide maximum flexibility and customisation.

## Documentation

To come.

## Donation

Coaster is an open source project licensed under the MIT license. It's completely free to use, but if you find it useful a donation would be gratefully received.

- [PayPal](https://www.paypal.me/peptolab)

## Getting started

Pull-in a latest version with NPM ...

```bash
npm install @peptolab/coaster
```

... provide `<link>` to the required core stylesheet. You can also optionally add an included theme stylesheet ...

```html
<!-- Required Core stylesheet -->
<link rel="stylesheet" href="node_modules/@peptolab/coaster/dist/css/coaster.css">
```

... then, prepare a little bit of necessary markup ...

```html
<div id="carousel" class="carousel" data-carousel>

    <header data-carousel-caption class="carousel__caption"></header>

    <div data-carousel-window class="carousel__window">

        <div data-carousel-track class="carousel__track">

            <figure data-carousel-slide class="carousel__slide">Slide 1</figure>
            <figure data-carousel-slide class="carousel__slide">Slide 2</figure>
            <figure data-carousel-slide class="carousel__slide">Slide 3</figure>

        </div>

        <nav data-carousel-nav class="carousel__nav">
            <button data-carousel-nav="prev" class="carousel__button carousel__button--prev">Prev Slide</button>
            <button data-carousel-nav="next" class="carousel__button carousel__button--next">Next Slide</button>
        </nav>

    </div>

    <!-- Ensure pagination buttons match the slide count --> 
    <nav data-carousel-pagination class="carousel__pagination">
        <button data-carousel-nav="1" class="carousel__pagination--item">View Slide 1</button>
        <button data-carousel-nav="2" class="carousel__pagination--item">View Slide 2</button>
        <button data-carousel-nav="3" class="carousel__pagination--item">View Slide 3</button>
    </nav>

</div>
```

... then create a new instance of the carousel.

```js
import Coaster from '@peptolab/coaster'

new Coaster(document.getElementById('carousel'))
```

## Contributing

Yet to come

## Browser Support

Minimal visual testing only performed on Chrome & Safari
 - Chrome 10+
 - Safari 5.1+
 - Safari iOS 9+

## Building

Build using NPM scripts. The following scripts are available:
- `build:css` - Outputs CSS files from SASS files.
- `build:js` - Outputs all destination variants of the script.
- `build` - Comprehensively builds the entire library.
- `test` - Runs complete test suite.
- `lint` - Lints library JavaScript files.

## Credits

- [Simon Mundy](https://github.com/simon-mundy) - Creator

## Acknowledgements

The build framework and deployment has been based on the excellent work of [Jędrzej Chałubek](https://github.com/jedrzejchalubek) on the @glidejs/glide project. 

## License

Copyright (c) 2020-present, [Simon Mundy](https://peptolab.com). Licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).
