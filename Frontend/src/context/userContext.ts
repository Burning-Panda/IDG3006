import React from 'react';
import {iUser, userStore} from "../stores/user";

const UserContext = React.createContext({
    user: {},
    loginUser: () => {},
});

export { UserContext };