import {Container} from "reactstrap";

export default ({data}) => (
    <section className="bg-secondary">
        <Container>
            <div className="text-center">&copy; 2019 - {data.name}</div>
        </Container>
    </section>
)
