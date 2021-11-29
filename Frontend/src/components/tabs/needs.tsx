import Box from '@mui/material/Box';
import React from 'react';
import TaskCard, {iTaskCard} from "../cards/taskCard";
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
const isArray = require('lodash/isArray');


interface iNeeds {
    Cards:iTaskCard[] | null;
}

function Needs(props: iNeeds) {
    return (
        <Box pb={2}>
            <TransitionGroup>
                {props.Cards
                    ? props.Cards.map((card, index) => <Collapse key={index}><TaskCard key={index} {...card} /></Collapse>)
                    : null}
            </TransitionGroup>
        </Box>
    );
}

export default Needs;