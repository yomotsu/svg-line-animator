const PI_HALF = Math.PI * 0.5;

export type EasingFunction = ( t: number ) => number;

export const linear = ( t: number ) => {

	return t;

};

export const exponentialOut = ( t: number ) => {

	return t === 1 ? t : 1 - Math.pow( 2, - 10 * t );

};

export const sineOut = ( t: number ) => {

	return Math.sin( t * PI_HALF );

};
