import React from 'react';
import Button from "@mui/material/Button";

interface iOutlinedButton {
    text: string;
    fullWidth?: boolean;
}

function OutlinedButton(props: iOutlinedButton) {

    return (
        <Button
            variant="outlined"
            sx={{
                borderRadius: '20px',
                py: '8px',
                typography: 'body1',
                textTransform: 'capitalize',
                borderWidth: '2px',
                '&:hover': {
                    borderWidth: '2px',
                    bgcolor: 'primary.background',
                }
            }}
            fullWidth={props.fullWidth}
        >
            {props.text}
        </Button>
    );
};

export default OutlinedButton;
