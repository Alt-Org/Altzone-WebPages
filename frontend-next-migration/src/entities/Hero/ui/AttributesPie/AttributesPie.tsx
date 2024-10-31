'use client';
import { useRef, useEffect, MutableRefObject } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AttributesPie.module.scss';

/**
 * @param characterDefault the left side of the pie, for character-specific attributes
 * @param characterUpgrade the right side of the pie, for upgradable attributes
 * @param radius sets the total radius of the pie
 * @param borderwidth sets the width of the area between the slices and the border
 * @param bordercolor sets the border color
 */
type Props = {
    characterDefault: PieSlice;
    characterUpgrade: PieSlice;
    radius: number;
    borderwidth: number;
    bordercolor: string;
};

/**
 *
 * draws an attributes pie using Canvas
 * from two PieSlices
 *
 * @param props
 */
export const AttributesPie = (props: Props) => {
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

    const { radius, characterDefault, characterUpgrade } = props;

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (!canvas) {
            return;
        }

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        renderBackground(ctx, props);

        characterDefault.renderSlice(ctx, props, Math.PI / 2);
        characterUpgrade.renderSlice(ctx, props, Math.PI / 2 + Math.PI);
    }, []);

    return (
        <div className={classNames(cls.Container)}>
            <canvas
                ref={canvasRef}
                width={radius * 2}
                height={radius * 2}
            />
        </div>
    );
};

const renderBackground = (context: CanvasRenderingContext2D, props: Props) => {
    const { bordercolor, radius } = props;

    context.fillStyle = bordercolor;
    context.clearRect(0, 0, radius * 2, radius * 2);

    context.beginPath();
    context.arc(radius, radius, radius, 0, Math.PI * 2);
    context.fill();
};

/**
 * @param color
 * sets the color of the pie
 *
 * @param value
 * sets the value of the pie (eg. how much space it will take from the max)
 *
 * for example: value of 20 with a max of 40 will take half of the space (90 degrees)
 */
export class PieSection {
    constructor(value: number, color: string) {
        this.value = value;
        this.color = color;
    }
    public value: number;
    public color: string;

    private x: number = 0;
    private y: number = 0;
    private max: number = 0;

    public setposition(x: number, y: number, max: number) {
        this.x = x;
        this.y = y;
        this.max = max;
    }
    private renderBorder(context: CanvasRenderingContext2D, angle: number, radius: number) {
        context.beginPath();

        context.moveTo(this.x, this.y);
        context.lineTo(this.x + Math.cos(angle) * radius, this.y + Math.sin(angle) * radius);

        context.stroke();
    }

    public render(context: CanvasRenderingContext2D, angle: number, radius: number) {
        const alpha = this.value / this.max;
        const currentangle = alpha * Math.PI;

        context.fillStyle = this.color;
        context.beginPath();

        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, radius, angle, angle + currentangle);

        context.fill();

        this.renderBorder(context, angle, radius);
        angle += currentangle;
        this.renderBorder(context, angle, radius);

        return angle;
    }
}

/**
 * attribute pie slice.
 * consists of PieSections
 *
 * each PieSlice is 180 degrees
 *
 * @param max
 * maximum value of pie
 *
 * maximum value should be greater or equal
 * to the sum of PieSections.Values
 *
 * @param sections
 * an array of PieSections
 */
export class PieSlice {
    constructor(maximum: number, sections: Array<PieSection>) {
        this.max = maximum;
        this.sections = sections;
    }
    public max: number;
    public sections: Array<PieSection>;

    public renderSlice(context: CanvasRenderingContext2D, props: Props, angle: number) {
        const { bordercolor, radius, borderwidth } = props;

        context.strokeStyle = bordercolor;
        context.lineWidth = borderwidth;

        for (const section of this.sections) {
            section.setposition(radius, radius, this.max);

            angle = section.render(context, angle, radius - borderwidth);
        }
    }
}
