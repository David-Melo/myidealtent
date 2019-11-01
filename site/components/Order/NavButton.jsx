import React from 'react';
import {Button} from "reactstrap";

export const NavButton = ({type,action,children}) => {
    return (
        <React.Fragment>
            {type==='back'&&<Button onClick={action} size="lg" outline color="secondary">{children}</Button>}
            {type==='next'&&<Button onClick={action} size="lg" color="primary">{children}</Button>}
        </React.Fragment>
    )
};