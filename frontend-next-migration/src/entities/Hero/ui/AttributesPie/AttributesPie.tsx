'use client';
import { useLayoutEffect, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AttributesPie.module.scss';

/**
 * Interface representing properties for pie chart slices.
 *
 * @interface Props
 *
 * @property {SliceState} characterDefault - The properties for the default state of the pie slice.
 * @property {SliceState} characterUpgrade - The properties for the upgraded state of the pie slice.
 * @property {number} borderwidth - The width of the border for the pie slice.
 * @property {string} bordercolor - The color of the border for the pie slice.
 * @property {number} radius - The radius of the pie slice.
 */
interface Props {
    characterDefault: SliceState;
    characterUpgrade: SliceState;
    borderwidth: number;
    bordercolor: string;
    radius: number;
}

/**
 * A React functional component that renders a pie chart with customizable attributes.
 *
 * @param {Props} props - The properties passed to the component.
 *
 * @returns {JSX.Element} A JSX element representing the pie chart wrapped in a div container.
 *
 * @example
 * ```typescript jsx
 * const defaultSlice = {
 *   max: 100,
 *   sections: [
 *     { value: 50, color: '#ff0000' },
 *     { value: 50, color: '#00ff00' }
 *   ]
 * };
 *
 * const upgradeSlice = {
 *   max: 200,
 *   sections: [
 *     { value: 100, color: '#0000ff' },
 *     { value: 100, color: '#ffff00' }
 *   ]
 * };
 *
 * <AttributesPie
 *   characterDefault={defaultSlice}
 *   characterUpgrade={upgradeSlice}
 *   borderwidth={5}
 *   bordercolor="#000000"
 *   radius={100}
 * />
 * ```
 */
export const AttributesPie = (props: Props): JSX.Element => {
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

    const renderSlice = (context: CanvasRenderingContext2D, slice: SliceState, angle: number) => {
        const { max, sections } = slice;

        const render = (context: CanvasRenderingContext2D, angle: number, section: PieSection) => {
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
 * Interface representing the properties for a section of a pie chart.
 *
 * @interface PieSection
 *
 * @property {number} value - The numerical value that the pie section represents.
 * @property {string} color - The color associated with the pie section in hexadecimal, RGB, or named color formats.
 */
interface PieSection {
    value: number;
    color: string;
}

/**
 * Interface representing the properties for a pie slice.
 *
 * @interface SliceState
 * @property {number} max - The maximum value of the pie slice.
 * @property {Array<PieSection>} sections - An array of section properties for the pie slice.
 */
interface SliceState {
    max: number;
    sections: Array<PieSection>;
}
