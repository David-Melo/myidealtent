import React, { Fragment } from "react";

class Page extends React.Component {
    render() {
        return (
            <Fragment>
                { this.props.children }

            </Fragment>
        )
    }
}

export default Page;
