import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Container } from "reactstrap";

export default function ProductCard({ productImg, title, price, name, whatsapp }) {

    return (
        <Card
            style={{
                width: '18rem'
            }}
            className="card"
        >
            <img
                alt={productImg.alt}
                src={productImg.src}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {title}
                </CardTitle>
                <CardSubtitle
                    className="mb-2"
                    tag="h3"
                >
                    R$ {price}
                </CardSubtitle>
                <CardText>
                    <span><strong>Nome:</strong> {name}</span>
                    <br />
                    <span><strong>Telefone:</strong> {whatsapp}</span>
                </CardText>
                <Button className="card-btn">
                    Comprar
                </Button>
            </CardBody>
        </Card>
    )
}