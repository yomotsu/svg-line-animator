# svg-line-animator

svg-line-animator is a SVG line animation lib.
Easy to make a timeline set with async/await.

```js
import SVGLineAnimator from 'svg-line-animator';

( async() => {

	const $line1 = document.getElementById( 'line1' );
	const $line2 = document.getElementById( 'line2' );
	const $line3 = document.getElementById( 'line3' );

	function easeOutBack( x ) {

		const c1 = 1.70158;
		const c3 = c1 + 1;

		return 1 + c3 * Math.pow( x - 1, 3 ) + c1 * Math.pow( x - 1, 2 );

	}

	const lineAnimator1 = new SVGLineAnimator( $line1, 2000, SVGLineAnimator.EASE.sineOut );
	const lineAnimator2 = new SVGLineAnimator( $line2, 2000, SVGLineAnimator.EASE.exponentialOut );
	const lineAnimator3 = new SVGLineAnimator( $line3, 2000, easeOutBack );

	await lineAnimator1.play();
	await lineAnimator2.play(); // wait for anim1 end, then start anim2
	await lineAnimator3.play(); // wait for anim2 end, then start anim3

	console.log( 'done' );

} )();
```

[![Latest NPM release](https://img.shields.io/npm/v/svg-line-animator.svg)](https://www.npmjs.com/package/svg-line-animator)

## examples

- [basic](https://yomotsu.github.io/svg-line-animator/examples/basic.html)
