import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { BsX } from "react-icons/bs";
import useUser from "../hooks/useUser";
import api from "../services/api";

export default function DeletableCard({ id, title, price, email, whatsapp, productImg }) {
    const { userData } = useUser()

    async function deleteUserProduct() {
        try {
            await api.delete(`/${userData.id}/product/${id}`, {
                headers: {
                    auth: userData.id
                }
            })
        } catch (err) {
            alert('Erro ao deletar o produto')
        }
    }

    return (
        <Card
            style={{
                width: '18rem'
            }}
            className="card"
        >
            <div className="container-btn">
                <button
                    className="delete-card-button"
                    onClick={deleteUserProduct}
                >
                    <BsX />
                </button>
            </div>
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
                    <span><strong>Nome:</strong> {userData.name}</span>
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