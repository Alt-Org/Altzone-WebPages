'use client';
import { useLayoutEffect, useRef } from 'react';
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
    characterDefault: PieSliceProps;
    characterUpgrade: PieSliceProps;
    borderwidth: number;
    bordercolor: string;
    radius: number;
};

/**
 *
 * draws an attributes pie using Canvas
 * from two PieSliceProps
 *
 * @param props
 */
export const AttributesPie = (props: Props) => {
    const ref = useRef(null);

    const { radius, borderwidth, bordercolor, characterDefault, characterUpgrade } = props;

    useLayoutEffect(() => {
        const canvas: any = ref.current;

        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            return;
        }

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        if (borderwidth >= radius) {
            return;
        }

        renderBackground(ctx);

        renderSlice(ctx, characterDefault, Math.PI / 2);
        renderSlice(ctx, characterUpgrade, Math.PI / 2 + Math.PI);
    });

    const renderSlice = (
        context: CanvasRenderingContext2D,
        slice: PieSliceProps,
        angle: number,
    ) => {
        const { max, sections } = slice;

        const render = (
            context: CanvasRenderingContext2D,
            angle: number,
            section: PieSectionProps,
        ) => {
            const { value, color } = section;
            const x = radius,
                y = radius;
            const alpha = value / max;
            const currentangle = alpha * Math.PI;

            const renderBorder = (
                context: CanvasRenderingContext2D,
                angle: number,
                radius: number,
            ) => {
                context.beginPath();

                context.moveTo(x, y);
                context.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);

                context.stroke();
            };

            context.fillStyle = color;
            context.beginPath();

            context.moveTo(x, y);
            context.arc(x, y, radius - borderwidth, angle, angle + currentangle);

            context.fill();

            renderBorder(context, angle, radius);
            angle += currentangle;
            renderBorder(context, angle, radius);

            return angle;
        };

        context.strokeStyle = bordercolor;
        context.lineWidth = borderwidth;
        for (const section of sections) {
            angle = render(context, angle, section);
        }
    };
    const renderBackground = (context: CanvasRenderingContext2D) => {
        context.fillStyle = bordercolor;
        context.clearRect(0, 0, radius * 2, radius * 2);

        context.beginPath();
        context.arc(radius, radius, radius, 0, Math.PI * 2);
        context.fill();
    };

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
type PieSectionProps = {
    value: number;
    color: string;
};

/**
 * attribute pie slice.
 * consists of PieSectionProps
 *
 * each PieSliceProps is 180 degrees
 *
 * @param max
 * maximum value of pie
 *
 * maximum value should be greater or equal
 * to the sum of PieSectionProps.Values
 *
 * @param sections
 * an array of PieSectionProps
 */
type PieSliceProps = {
    max: number;
    sections: Array<PieSectionProps>;
};
