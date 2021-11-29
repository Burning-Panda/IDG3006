import React from 'react';
import Button from "@mui/material/Button";

interface iFilledButton {
    text: string;
    fullWidth?: boolean;
}

function FilledButton(props: iFilledButton) {
    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: '20px',
                py: '8px',
                typography: 'body1',
                textTransform: 'capitalize'
            }}
            fullWidth={props.fullWidth}
        >
            {props.text}
        </Button>
    );
}

export default FilledButton;