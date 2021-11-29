import React from 'react';
import TextField from "@mui/material/TextField";
import StartLayout from "../../_layouts/StartLayout";

interface iUserForm {
    
}

function UserForm(props: iUserForm) {
    return (
        <StartLayout>
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </StartLayout>
    );
}

export default UserForm;