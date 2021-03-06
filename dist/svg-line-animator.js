/*!
 * svg-line-animator
 * https://github.com/yomotsu/svg-line-animator
 * (c) 2020 @yomotsu
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SVGLineAnimator = factory());
}(this, (function () { 'use strict';

	const PI_HALF = Math.PI * 0.5;
	const linear = (t) => {
	    return t;
	};
	const exponentialOut = (t) => {
	    return t === 1 ? t : 1 - Math.pow(2, -10 * t);
	};
	const sineOut = (t) => {
	    return Math.sin(t * PI_HALF);
	};

	class SVGLineAnimator {
	    constructor(element, duration = 1000, easing = SVGLineAnimator.EASE.linear) {
	        this.element = element;
	        this.duration = duration;
	        this.progress = 0;
	        this._startTime = 0;
	        this._elapsedTime = 0;
	        this.element = element;
	        this.duration = duration;
	        this.easing = easing;
	        const lineLength = this.element.getTotalLength();
	        this.element.setAttribute('stroke-dasharray', `${lineLength}`);
	        this.element.setAttribute('stroke-dashoffset', `${lineLength}`);
	    }
	    static get EASE() {
	        return {
	            linear,
	            exponentialOut,
	            sineOut,
	        };
	    }
	    static isLineAnimatableElement(element) {
	        return (element instanceof SVGPathElement ||
	            element instanceof SVGLineElement ||
	            element instanceof SVGPolygonElement ||
	            element instanceof SVGPolylineElement ||
	            element instanceof SVGCircleElement ||
	            element instanceof SVGEllipseElement ||
	            element instanceof SVGRectElement);
	    }
	    play() {
	        return new Promise((resolve) => {
	            const lineLength = this.element.getTotalLength();
	            this.element.style.display = 'inline';
	            this._startTime = performance.now();
	            const animate = () => {
	                this._elapsedTime = performance.now() - this._startTime;
	                this.progress = Math.max(Math.min(this._elapsedTime / this.duration, 1), 0);
	                if (this.progress < 1)
	                    requestAnimationFrame(animate);
	                const eased = 1 - this.easing(this.progress);
	                this.element.setAttribute('stroke-dashoffset', `${lineLength * eased}`);
	                if (this.progress === 1)
	                    resolve();
	            };
	            animate();
	        });
	    }
	}

	return SVGLineAnimator;

})));
