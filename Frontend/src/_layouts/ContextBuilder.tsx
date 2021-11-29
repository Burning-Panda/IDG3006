import React, {ReactChildren, ReactNode} from "react";
import { UserContext } from "../context/userContext";
import {userStore} from "../stores/user";

interface iContextBuilder {
    children: ReactNode | ReactChildren | ReactNode[] | ReactChildren[];
}

class ContextBuilder extends React.Component<any, any> {
    private children: ReactNode | ReactChildren | ReactNode[] | ReactChildren[];

    constructor(props:iContextBuilder) {
        super(props);
        this.children = props.children;
        this.state = {
            user: {}
        }

    }




    componentDidMount() {
        this.setState({user: userStore.getUser()});
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.user !== this.state.user) {
            this.setState({user: userStore.getUser()});
        }
    }

    componentWillUnmount() {
        userStore.saveUser()
    }


    render() {
        //console.log(this.state.user);
        return (
            <UserContext.Provider value={this.state.user}>
                {this.children}
            </UserContext.Provider>
        )
    }
}

export default ContextBuilder;