import React, {ReactNode} from 'react';

interface iSvgIcons {

}

type posibleSize = {
    width: number | string;
    height: number | string;
}

interface iSVGicons {
    fill?: string;
    backgroundFill?: string;
    size?: posibleSize | string | number;
}

const defaultFill = "#010101"
const defaultBackgroundFill = "#ffffff"
const defaultSize = {
    width: "24px",
    height: "24px"
}

// props.size ? props.size || defaultSize;
/*
props.size
? typeof props.size === "object"
    ? typeof props.size.width === "number"
        ? `${props.size.width}px`
        : props.size.width
    : props.size
: defaultSize.width


props.size
? typeof props.size === "object"
    ? typeof props.size.height === "number"
        ? `${props.size.height}px`
        : props.size.height
    : props.size
: defaultSize.width

* */


interface iSVGbase {
    size?: posibleSize | string | number;
    viewBox?: string;
    children?: ReactNode;
}

export function returnCorrectSize(dimension: "height" | "width", size?: posibleSize | string | number ) {
    return (
        size
        ? typeof size === "object"
            ? typeof size[dimension] === "number"
                ? `${size[dimension]}px`
                : size[dimension]
            : size
        : defaultSize[dimension]
    )

}

export const SvgBase = (props:iSVGbase) => {
    return (
        <svg version="1.2"
             baseProfile="tiny"
             xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             xmlSpace="preserve"

             width={returnCorrectSize("width", props.size)}
             height={returnCorrectSize("height", props.size)}
             viewBox={props.viewBox || "0 0 50 50"} >
            {props.children}
        </svg>
    )
}

export const SunIcon = (props: iSVGicons) => {
    return (
        <SvgBase size={props.size}>
        <path style={{fill: props.fill ? props.fill : defaultFill}} d="M27.1,47.5h-4v-6.1h4V47.5z M39.3,42.3l-3.6-3.7l2.9-2.9l3.7,3.7L39.3,42.3z M10.7,42.3l-2.9-2.9l3.6-3.7
            l2.9,2.9L10.7,42.3z M25,37.4c-6.8,0-12.3-5.5-12.3-12.4c0-6.8,5.5-12.4,12.3-12.4S37.3,18.1,37.3,25C37.3,31.8,31.8,37.4,25,37.4z
             M25,15.3c-5.3,0-9.6,4.3-9.6,9.7s4.3,9.7,9.6,9.7s9.6-4.3,9.6-9.7S30.3,15.3,25,15.3z M47.5,27.1h-6.2v-4h6.2V27.1z M8.7,27.1H2.5
            v-4h6.2V27.1z M38.6,14.3l-2.9-2.9l3.6-3.6l2.9,2.9L38.6,14.3z M11.4,14.3l-3.6-3.6l2.9-2.9l3.7,3.6L11.4,14.3z M27.1,8.6h-4V2.5h4
            V8.6z"/>
        </SvgBase>
)}


export const HomeIcon = (props: iSVGicons) => {
    return (
        <SvgBase size={props.size}>
            <g>
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M18.1,6.6c1.8,0.9,3.4,2.2,4.6,3.8c-2,3-3.1,6.6-3.1,10.3v0.8c-3.8-0.1-7.3-1.6-10-4.3
		c-2.7-2.8-4.3-6.5-4.3-10.4V5h6.1l0,0C13.7,5,16,5.6,18.1,6.6z M27.4,28.5h9.3v13.6c0,0.8-0.3,1.5-0.8,2.1c-0.5,0.5-1.3,0.8-2,0.8
		H16.7c-0.8,0-1.5-0.3-2-0.8c-0.5-0.5-0.9-1.3-0.9-2.1V28.5h9.3h1.4v-1.4v-6.4c0-3.6,1.4-7.1,4-9.6c2.5-2.6,6-4,9.6-4h5v2.9
		c0,3.6-1.4,7.1-4,9.6c-2.5,2.5-6,4-9.6,4h-2.1H26V25v2.1v1.4C26,28.5,27.4,28.5,27.4,28.5z"/>
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M33.8,46H16.7c-1,0-2-0.4-2.7-1.1c-0.7-0.7-1.1-1.7-1.1-2.8V27.5h10.7v-6.8c0-3.9,1.6-7.6,4.3-10.3
		c2.7-2.7,6.4-4.3,10.3-4.3h6V10c0,3.9-1.6,7.6-4.3,10.3c-2.7,2.7-6.4,4.3-10.3,4.3H27v2.9h10.7v14.6c0,1-0.4,2-1.1,2.8
		C35.8,45.6,34.8,46,33.8,46z M14.8,29.5v12.6c0,0.5,0.2,1,0.6,1.4c0.3,0.3,0.8,0.5,1.3,0.5h17.1c0.5,0,1-0.2,1.3-0.5
		c0.4-0.4,0.6-0.8,0.6-1.4V29.5H14.8z M25.5,22.6h4c3.3,0,6.5-1.3,8.9-3.7c2.3-2.3,3.7-5.6,3.7-8.9V8.1h-4c-3.3,0-6.5,1.3-8.9,3.7
		c-2.3,2.3-3.7,5.6-3.7,8.9V22.6z M20.6,22.5l-1,0c-4-0.1-7.8-1.7-10.7-4.6c-2.9-2.9-4.6-7-4.6-11.1V4h7.1c2.5,0,5,0.6,7.2,1.7l0,0
		c1.9,1,3.6,2.4,5,4l0.5,0.6L23.5,11c-2,2.9-3,6.3-3,9.7V22.5z M6.3,6v0.8c0,3.6,1.5,7.1,4,9.7c2.2,2.2,5.2,3.6,8.3,3.9
		c0-3.5,1-6.9,2.9-9.9c-1.1-1.2-2.4-2.2-3.9-3c-1.9-1-4.1-1.5-6.3-1.5H6.3z"/>
            </g>
        </SvgBase>
    )
}

export const CelciusIcon = (props:iSVGicons) => {
    return (
        <SvgBase size={props.size}>
            <g>
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M48.1,28.1h-9.7c-0.9,0-1.7-0.3-2.2-0.9s-0.9-1.5-0.9-2.2V8.7c0-0.9,0.3-1.7,0.9-2.2s1.5-0.9,2.2-0.9h9.7
		v3.3h-9.7v16.1h9.7V28.1z"/>
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M28.9,8.7c1.8,0,3.3-1.5,3.3-3.3s-1.6-3.1-3.3-3.1c-1.8,0-3.3,1.5-3.3,3.3S27.1,8.7,28.9,8.7z"/>
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M15.9,31.6V18.4h-3.3v13.2c-1.1,0.3-2,1.1-2.6,2.1c-0.6,1-0.8,2.1-0.6,3.3c0.2,1.1,0.8,2.1,1.7,2.9
		c0.9,0.8,2,1.1,3.1,1.1s2.3-0.5,3.2-1.1c0.9-0.8,1.5-1.8,1.7-2.9c0.2-1.1,0-2.2-0.6-3.3C17.9,32.7,17,31.9,15.9,31.6z"/>
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M14.3,47.3c-2.2,0-4.4-0.7-6.2-1.9S4.9,42.5,4,40.3c-0.9-2-1.1-4.3-0.7-6.4c0.5-2.1,1.5-4.2,3-5.7V10.3
		c0-2.1,0.9-4.2,2.4-5.7c1.5-1.5,3.6-2.4,5.7-2.4s4.2,0.9,5.7,2.4c1.5,1.5,2.4,3.6,2.4,5.7v17.9c1.6,1.6,2.6,3.6,3,5.7
		c0.5,2.1,0.2,4.4-0.7,6.4s-2.3,3.8-4.2,5.1C18.7,46.6,16.6,47.3,14.3,47.3z M14.3,5.6c-1.2,0-2.5,0.6-3.4,1.5
		c-0.9,0.9-1.5,2.1-1.5,3.4v19.2l-0.6,0.4c-1.2,1.1-2,2.5-2.5,4c-0.3,1.6-0.2,3.3,0.3,4.7c0.6,1.6,1.6,2.8,2.9,3.7s2.9,1.5,4.6,1.5
		c1.6,0,3.3-0.5,4.6-1.5c1.4-0.9,2.4-2.2,2.9-3.7c0.6-1.6,0.7-3.2,0.3-4.7c-0.3-1.6-1.2-3-2.5-4.1l-0.6-0.4V10.3
		c0-1.2-0.6-2.5-1.5-3.4C16.8,6,15.6,5.6,14.3,5.6z"/>
            </g>
        </SvgBase>
    )
}

export const UtensilsIcon = (props:iSVGicons) => {
    return (
        <SvgBase size={props.size}>
            <g>
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M23.9,4.9v10.5c0,4.5-3.5,6.2-6.3,6.6v23.7c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6V22
			c-2.7-0.4-6.3-2.2-6.3-6.6V4.9c0-0.9,0.7-1.6,1.6-1.6c0.9,0,1.6,0.7,1.6,1.6v10.5c0,2.2,1.8,3.1,3.2,3.5v-15
			c0-0.9,0.7-1.6,1.6-1.6c0.9,0,1.6,0.7,1.6,1.6v15c1.4-0.3,3.1-1.2,3.1-3.5V4.9c0-0.9,0.7-1.6,1.6-1.6C23.2,3.3,23.9,4,23.9,4.9z"
                />
                <path style={{fill: props.fill ? props.fill : defaultFill}} d="M41.2,47.3c-0.9,0-1.6-0.7-1.6-1.6V23.2h-6.8c-0.9,0-1.6-0.7-1.6-1.6v-9.4c0-7.9,6.5-9.9,9.9-9.9
			c0.9,0,1.6,0.7,1.6,1.6v41.8C42.7,46.6,42,47.3,41.2,47.3z M34.4,20.1h5.3V5.6c-2,0.4-5.3,1.9-5.3,6.6V20.1z"/>
            </g>
        </SvgBase>
    )
}

export const BackButtonIcon = (props: iSVGicons) => {
    return (
        <SvgBase size={props.size} viewBox="0 0 7 15">
        <path style={{fill: props.fill ? props.fill : defaultFill}} d="M5.8,14c-0.1,0-0.3,0-0.4-0.1c-0.1-0.1-0.3-0.2-0.3-0.3l-4.8-6C0.1,7.5,0,7.2,0,7c0-0.2,0.1-0.5,0.2-0.6l5-6
            C5.4,0.2,5.6,0,5.9,0c0.3,0,0.5,0.1,0.7,0.2C6.8,0.4,7,0.6,7,0.9c0,0.3-0.1,0.5-0.2,0.7L2.3,7l4.3,5.4c0.1,0.1,0.2,0.3,0.2,0.5
            c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.4,0.4C6.2,14,6,14,5.8,14z"/>
        </SvgBase>
    )
}

export const OverviewIcon = (props: iSVGicons) => {
    return (
        <SvgBase size={props.size} viewBox="0 0 50 50">
            <g id="OverViewIconRight">
                <path id="OverViewIconBackgroundRight" style={{fill: props.backgroundFill ? props.backgroundFill : defaultBackgroundFill}} d="M37.6,23.9h6.7V34c0,0.6-0.2,1.1-0.6,1.5c-0.4,0.4-0.9,0.6-1.4,0.6H29.9
		c-0.5,0-1-0.2-1.4-0.6c-0.4-0.4-0.6-1-0.6-1.5V23.9h6.7h1.1v-1.1V18c0-2.7,1-5.3,2.9-7.2c1.8-1.9,4.3-3,6.9-3h3.6V10
		c0,2.7-1,5.3-2.9,7.2c-1.8,1.9-4.3,3-6.9,3h-1.5h-1.1v1.1v1.6v1.1L37.6,23.9L37.6,23.9z M26,6.2L26,6.2c1.7,0,3.3,0.4,4.8,1.2
		c1.3,0.7,2.4,1.6,3.3,2.8c-1.5,2.3-2.3,5-2.3,7.7v0.5c-2.7-0.1-5.2-1.2-7.1-3.2c-2-2.1-3.1-4.9-3.1-7.8V6.2H26z"/>
                <path id="OverViewIconOutlineRight" style={{fill: props.fill ? props.fill : defaultFill}} d="M42.2,37.2H29.9c-0.8,0-1.5-0.3-2.1-0.9c-0.6-0.6-0.9-1.4-0.9-2.2V22.9h7.7V18
		c0-2.9,1.1-5.8,3.1-7.9c2-2.1,4.7-3.3,7.6-3.3h4.6V10c0,2.9-1.1,5.8-3.1,7.9c-2,2.1-4.7,3.3-7.6,3.3h-1.6v1.7l7.7,0V34
		c0,0.8-0.3,1.6-0.9,2.2C43.8,36.8,43,37.2,42.2,37.2z M28.8,24.9V34c0,0.3,0.1,0.6,0.3,0.8c0.2,0.2,0.4,0.3,0.7,0.3h12.3
		c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.8v-9.2H28.8z M36.5,19.1h2.6c2.3,0,4.5-0.9,6.1-2.7c1.6-1.7,2.6-4.1,2.6-6.5V8.8
		h-2.6c-2.3,0-4.5,0.9-6.2,2.7c-1.6,1.7-2.6,4.1-2.6,6.5V19.1z M32.9,19.6l-1,0c-3-0.1-5.7-1.3-7.8-3.5c-2.1-2.2-3.4-5.3-3.4-8.5
		V5.2H26c1.8,0,3.7,0.5,5.3,1.3c1.4,0.8,2.7,1.8,3.6,3.1l0.4,0.6L35,10.8c-1.4,2.1-2.1,4.6-2.1,7.2V19.6z M22.7,7.2v0.3
		c0,2.6,1,5.2,2.8,7.1c1.5,1.5,3.4,2.5,5.4,2.8c0.1-2.5,0.8-4.9,2-7.1c-0.7-0.8-1.6-1.5-2.6-2C29,7.6,27.5,7.2,26,7.2H22.7z"/>
            </g>
            <g id="OverViewIconLeft">
                <path id="OverViewIconBackgroundLeft" style={{fill: props.backgroundFill ? props.backgroundFill : defaultBackgroundFill}} d="M15.5,32.8h5.9v9c0,0.5-0.2,1-0.5,1.4c-0.3,0.4-0.8,0.5-1.3,0.5H8.7
		c-0.5,0-0.9-0.2-1.3-0.5c-0.3-0.4-0.5-0.8-0.5-1.4v-9h5.9h0.9v-0.9v-4.3c0-2.4,0.9-4.7,2.5-6.4c1.6-1.7,3.8-2.6,6.1-2.6h3.2v1.9
		c0,2.4-0.9,4.7-2.5,6.4c-1.6,1.7-3.8,2.6-6.1,2.6h-1.4h-0.9v0.9v1.4v0.9L15.5,32.8L15.5,32.8z M5.3,17.1L5.3,17.1
		c1.5,0,3,0.4,4.3,1.1c1.1,0.6,2.1,1.5,3,2.5c-1.3,2-2,4.4-2,6.9V28C8.1,28,5.8,27,4.1,25.2c-1.8-1.8-2.7-4.3-2.7-6.9v-1.2H5.3z"/>
                <path id="OverViewIconOutlineLeft" style={{fill: props.fill ? props.fill : defaultFill}} d="M19.6,44.6H8.7c-0.7,0-1.4-0.3-1.9-0.8c-0.5-0.5-0.8-1.3-0.8-2v-9.9h6.8v-4.3
		c0-2.6,1-5.2,2.8-7c1.8-1.9,4.2-2.9,6.7-2.9h4.1v2.8c0,2.6-1,5.2-2.8,7c-1.8,1.9-4.2,2.9-6.7,2.9h-1.4v1.5l6.8,0v9.9
		c0,0.7-0.3,1.5-0.8,2C21,44.3,20.4,44.6,19.6,44.6z M7.8,33.7v8.1c0,0.3,0.1,0.5,0.3,0.7c0.2,0.2,0.4,0.3,0.6,0.3h10.9
		c0.2,0,0.5-0.1,0.6-0.3c0.2-0.2,0.3-0.5,0.3-0.7v-8.1H7.8z M14.6,28.6h2.3c2.1,0,4-0.8,5.5-2.4c1.5-1.5,2.3-3.6,2.3-5.8v-1h-2.3
		c-2.1,0-4,0.8-5.5,2.4c-1.5,1.5-2.3,3.6-2.3,5.8V28.6z M11.4,28.9l-0.9,0c-2.6-0.1-5.1-1.2-6.9-3.1c-1.9-2-3-4.7-3-7.5v-2.1h4.7
		c1.6,0,3.2,0.4,4.7,1.2c1.2,0.7,2.4,1.6,3.2,2.7l0.4,0.5l-0.3,0.5c-1.2,1.9-1.9,4.1-1.9,6.4V28.9z M2.3,18v0.3
		c0,2.3,0.9,4.6,2.5,6.3c1.3,1.4,3,2.2,4.8,2.5c0.1-2.2,0.7-4.4,1.8-6.3c-0.7-0.7-1.4-1.3-2.3-1.8c-1.2-0.6-2.5-1-3.9-1H2.3z"/>
            </g>
        </SvgBase>
    )
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {SunIcon, HomeIcon, BackButtonIcon, OverviewIcon};