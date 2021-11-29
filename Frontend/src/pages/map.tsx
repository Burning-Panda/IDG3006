import React, {useEffect, useRef, useState } from 'react';
import ReactMapGL, {AttributionControl, Layer, Marker, Source} from 'react-map-gl';
import Box from '@mui/material/Box';

interface iMap {
    
}
//let i = new Date().toISOString()
function Map(props: iMap) {
    const MapBoxAPI = process.env.REACT_APP_MAPBOX_API

    const attributionStyle= {
        right: 0,
        top: 0
    };


    const [viewport, setViewport] = React.useState({
        latitude: 60.789510,
        longitude: 10.675589,
        zoom: 17.5
    });

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675389,60.789310]}},
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675889,60.789811]}},
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675159,60.789812]}},
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675389,60.789613]}},
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675459,60.789684]}},
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675489,60.789110]}},
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675289,60.789310]}},
            {type: 'Feature', geometry: {type:'Point', coordinates:[10.675900,60.789642]}}
        ]
    }
    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    }

    const plants = [
        {name: "a", latitude: 60.789310, longitude: 10.675389},
        {name: "b", latitude: 60.789811, longitude: 10.675889},
        {name: "c", latitude: 60.789812, longitude: 10.675159},
        {name: "d", latitude: 60.789613, longitude: 10.675389},
        {name: "e", latitude: 60.789684, longitude: 10.675459},
        {name: "f", latitude: 60.789110, longitude: 10.675489},
        {name: "g", latitude: 60.789310, longitude: 10.675289},
        {name: "h", latitude: 60.789642, longitude: 10.675900},
    ]

    const markers = React.useMemo(() => plants.map(
        plant => (
            <Marker
                key={plant.name}
                longitude={plant.longitude}
                latitude={plant.latitude}
            >
                <Box
                    style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#ff0000',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }}>
                    {plant.name}
                    </Box>
            </Marker>
        )
    ), [plants]);



    return (
        <Box sx={{width:"100vw", height: "calc(100vh - 56px)", top:0, left:0, position:"fixed"}}>
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={(viewport: any) => setViewport(viewport)}
                attributionControl={false}
            >
                {/* @ts-ignore */}
                <Source id={"plantsLayer"} type={"geojson"} data={geojson}>
                    {/* @ts-ignore */}
                    <Layer {...layerStyle} />
                </Source>
                <AttributionControl compact={true} style={attributionStyle} />
            </ ReactMapGL>
        </Box>
    );
}

export default Map;