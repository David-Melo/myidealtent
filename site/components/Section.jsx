import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { Container} from 'reactstrap';

import Block from '../components/Block';

class Section extends React.Component {
    render() {
        let style = {};
        if (this.props.data.background) {
            style.backgroundImage = `url('https://s3.amazonaws.com/spectre-uploads/${this.props.data.background }')`;
        }
        return(
            <section className={this.props.data.class} style={style}>

                {this.props.data.container === 'true' &&
                    <Container>
                        {this.props.children}
                        {this.props.data.blocks.map((i,k)=>(
                            <Block key={k} data={i} />
                        ))}
                    </Container>
                }

                {this.props.data.container === 'false' &&
                    <Fragment>
                        {this.props.children}
                        {this.props.data.blocks.map((i,k)=>(
                            <Block key={k} data={i} />
                        ))}
                    </Fragment>
                }

            </section>
        )
    }
}







Section.propTypes = {
    data: PropTypes.shape({
        class: PropTypes.string,
        background: PropTypes.string,
        container: PropTypes.string,
        blocks: PropTypes.array
    })
};

export default Section;
