'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
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
    borderwidth: number;
    bordercolor: string;
    radius: number;
};

class Pie {
    constructor(props: Props) {
        this.characterDefault = props.characterDefault;
        this.characterUpgrade = props.characterUpgrade;
        this.borderwidth = Math.abs(props.borderwidth);
        this.bordercolor = props.bordercolor;
        this.radius = Math.abs(props.radius);
    }

    public canvas?: HTMLElement | null;

    public characterDefault: PieSlice;
    public characterUpgrade: PieSlice;
    public borderwidth: number;
    public bordercolor: string;
    public radius: number;

    public render() {
        if (!this.canvas || !(this.canvas instanceof HTMLCanvasElement)) {
            return;
        }

        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        if (this.borderwidth >= this.radius) {
            return;
        }

        this.renderBackground(ctx);

        this.characterDefault.renderSlice(ctx, this, Math.PI / 2);
        this.characterUpgrade.renderSlice(ctx, this, Math.PI / 2 + Math.PI);
    }
    public renderBackground(context: CanvasRenderingContext2D) {
        context.fillStyle = this.bordercolor;
        context.clearRect(0, 0, this.radius * 2, this.radius * 2);

        context.beginPath();
        context.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

/**
 *
 * draws an attributes pie using Canvas
 * from two PieSlices
 *
 * @param props
 */
export const AttributesPie = (props: Props) => {
    const ref = useRef(null);

    const { radius } = props;

    const obj = new Pie(props);

    useLayoutEffect(() => {
        obj.canvas = ref.current;
        obj.render();
    });

    return (
        <div className={classNames(cls.Container)}>
            <canvas
                ref={ref}
                width={radius * 2}
                height={radius * 2}
            />
        </div>
    );
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

    public renderSlice(context: CanvasRenderingContext2D, props: Pie, angle: number) {
        const { bordercolor, radius, borderwidth } = props;

        context.strokeStyle = bordercolor;
        context.lineWidth = borderwidth;

        for (const section of this.sections) {
            section.setposition(radius, radius, this.max);

            angle = section.render(context, angle, radius - borderwidth);
        }
    }
}
