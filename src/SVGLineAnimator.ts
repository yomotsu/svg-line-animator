import {
	EasingFunction,
	linear,
	exponentialOut,
	sineOut,
} from './easing';

type LineAnimatableElement =
	SVGPathElement |
	SVGLineElement |
	SVGPolygonElement |
	SVGPolylineElement |
	SVGCircleElement |
	SVGEllipseElement |
	SVGRectElement;

export class SVGLineAnimator {

	static get EASE() {

		return {
			linear,
			exponentialOut,
			sineOut,
		};

	}

	static isLineAnimatableElement( element: Element ): boolean {

		return (
			element instanceof SVGPathElement ||
			element instanceof SVGLineElement ||
			element instanceof SVGPolygonElement ||
			element instanceof SVGPolylineElement ||
			element instanceof SVGCircleElement ||
			element instanceof SVGEllipseElement ||
			element instanceof SVGRectElement
		);

	}

	progress = 0;
	easing: EasingFunction;

	private _startTime = 0;
	private _elapsedTime = 0;

	constructor(
		public element: LineAnimatableElement,
		public duration = 1000,
		easing = SVGLineAnimator.EASE.linear,
	) {

		this.element = element;
		this.duration = duration;
		this.easing = easing;

		const lineLength = this.element.getTotalLength();
		this.element.setAttribute( 'stroke-dasharray', `${ lineLength }` );
		this.element.setAttribute( 'stroke-dashoffset', `${ lineLength }` );

	}

	play() {

		return new Promise( ( resolve ) => {

			const lineLength = this.element.getTotalLength();

			this.element.style.display = 'inline';
			this._startTime = performance.now();

			const animate = () => {

				this._elapsedTime = performance.now() - this._startTime;
				this.progress = Math.max( Math.min( this._elapsedTime / this.duration, 1 ), 0 );

				if ( this.progress < 1 ) requestAnimationFrame( animate );

				const eased = 1 - this.easing( this.progress );
				this.element.setAttribute( 'stroke-dashoffset', `${ lineLength * eased }` );

				if ( this.progress === 1 ) resolve();

			};

			animate();

		} );

	}

}
