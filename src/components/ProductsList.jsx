import { Col, Container, Row, Spinner } from "reactstrap";
import ProductCard from "./ProductCard";
import { BsSearch } from "react-icons/bs";

export default function ProductsList({ productData, filteredProductsData }) {
    return (
    <Container className="products-container">
        {productData.length > 0 ? 
        (
            filteredProductsData.length > 0 ? (
                <Row className="g-2">
                    {filteredProductsData.map((product) => (
                                <Col md={6} lg={4} xl={3} key={product._id} className="d-flex justify-content-center">
                                    <ProductCard 
                                        productImg={{ 
                                        src: '',
                                        alt: '' 
                                        }}
                                        id={product._id}
                                        title={product.name}
                                        price={product.price}
                                        name={product.user.name}
                                        whatsapp={product.user.whatsapp}
                                    />
                                </Col> 
                        ))}
                </Row>
            ) :
            <Container className="text-center pt-5">
                <h1><BsSearch /> Nenhum anúncio encontrado...</h1>
            </Container>
        )        
        : 
            <Container className="text-center"> 
                <h3>Nenhum produto disponível...</h3>
            </Container>
        }
    </Container>
    )
}