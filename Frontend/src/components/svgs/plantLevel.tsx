import React from 'react';

interface iPlantLevel {
    level?: number;
    fill?: string;
    size?: string | number;
}

function PlantLevel({fill = "#63863A", level=1, size="100%"}: iPlantLevel) {
    const levelViewBox = level === 1 ? "0 0 35 35" : "0 0 50 50";
    const levelTransform = level === 1 ? "translate(-5px, -10px)" : "translate(0, 0)";
    return (
        <svg
            version="1.1"
            baseProfile="tiny"
            id="PlantLevel"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox={levelViewBox}
            style={{transform: levelTransform}}
            overflow="visible"
            xmlSpace="preserve"
            width={typeof size == "string" ? size : `${size}px`}
            height={typeof size == "string" ? size : `${size}px`}
        >
            <path fill={fill}
                  d="M38.1,19.5v2.7c0,2.5-1,4.9-2.8,6.7c-1.8,1.8-4.3,2.8-6.9,2.8H27V33H34v9.5c0,0.7-0.3,1.4-0.8,1.9
                c-0.5,0.5-1.2,0.8-2,0.8H20.1c-0.7,0-1.4-0.3-2-0.8c-0.5-0.5-0.8-1.2-0.8-1.9V33h6.9v-4.1c0-2.5,1-4.9,2.8-6.7
                c1.8-1.8,4.3-2.8,6.9-2.8H38.1z"/>
            {level >= 2
                ? <path fill={fill}
                    d="M24.9,22.2l-0.1,0.3c-0.3,0.6-0.8,1.8-1.2,3.2c-0.5,1.7-0.7,3.1-0.7,4.3v0.5l-0.5,0h-0.5
                    c-4.2,0-6.1-1.3-6.7-1.8c-4-2.7-4.1-6.4-4.2-9.4l0-0.8l0.5,0c4.9-0.3,7.3-0.3,9,0.3c1.5,0.5,2.3,1.3,3.6,2.5L24.9,22.2z"/>
                : null}
            {level >= 3
                ? <path fill={fill}
                    d="M32.8,16.7l-0.3,0.1c-0.6,0.3-1.8,0.8-3.1,1.5c-1.5,0.9-2.7,1.8-3.5,2.6l-0.3,0.4L25.2,21
                    c-3.4-3-3.9-5.5-4.1-6.2c-1-4.7,1.4-7.5,3.4-9.7l0.5-0.6l0.4,0.3c3.8,3.1,5.5,4.8,6.4,6.4c0.7,1.3,0.8,2.5,0.9,4.2L32.8,16.7z"/>
                : null}
        </svg>
    );
}


export default PlantLevel;