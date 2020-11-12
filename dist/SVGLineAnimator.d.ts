import { EasingFunction } from './easing';
declare type LineAnimatableElement = SVGPathElement | SVGLineElement | SVGPolygonElement | SVGPolylineElement | SVGCircleElement | SVGEllipseElement | SVGRectElement;
export declare class SVGLineAnimator {
    element: LineAnimatableElement;
    duration: number;
    static readonly EASE: {
        linear: (t: number) => number;
        exponentialOut: (t: number) => number;
        sineOut: (t: number) => number;
    };
    static isLineAnimatableElement(element: Element): boolean;
    progress: number;
    easing: EasingFunction;
    private _startTime;
    private _elapsedTime;
    constructor(element: LineAnimatableElement, duration?: number, easing?: (t: number) => number);
    play(): Promise<unknown>;
}
export {};
