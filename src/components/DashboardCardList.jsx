import { Col, Container, Row } from "reactstrap";
import DeletableCard from "./DeletableCard";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function DashboardCardList() {
    const { userData } = useUser()
    const [ productData, setProductData ] = useState([])

    useEffect(() => {
        getUserProducts()
    }, [productData])

    async function getUserProducts() {
        try {
            const userProducts = await api.get(`/product/${userData.id}`, {
                headers: {
                    auth: userData.id
                }
            })
            setProductData(userProducts.data)
        } catch (err) {
            console.log(err)
        }   
    }

    return (
        <Container className="products-container">
            <Row className="g-3">
                {productData.map((product) => (
                    <Col md={6} lg={4} xl={3} className="d-flex justify-content-center">
                        <DeletableCard 
                            productImg={{ 
                            src: '',
                            alt: '' 
                            }}
                            id={product._id}
                            title={product.name}
                            price={product.price}
                            email={userData.email}
                            whatsapp={userData.whatsapp}
                        />
                    </Col> 
                ))}
            </Row>
        </Container>        
    )
}