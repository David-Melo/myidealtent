import React, {Fragment} from "react";

import Form from '../components/Form';
import Waves from "../components/Waves";
import Network from "../components/Network";

class Block extends React.Component {
    render() {
        return(
            <Fragment>

                {this.props.data.element === 'div' &&
                    <div className={this.props.data.class} dangerouslySetInnerHTML={{__html:this.props.data.content}} />
                }

                {this.props.data.element === 'h1' &&
                    <h1 className={this.props.data.class} dangerouslySetInnerHTML={{__html:this.props.data.content}} />
                }

                {this.props.data.element === 'h2' &&
                    <h2 className={this.props.data.class} dangerouslySetInnerHTML={{__html:this.props.data.content}} />
                }

                {this.props.data.element === 'form' &&
                    <Form className={this.props.data.class} config={this.props.data.content}/>
                }

                {this.props.data.element === 'waves' &&
                    <Waves className={this.props.data.class} config={this.props.data} />
                }

            </Fragment>
        )
    }
}

export default Block;
