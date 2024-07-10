import React, { useEffect, useState } from "react"
import { Container, Form, FormGroup, Input } from "reactstrap"
import ProductsList from "../../components/ProductsList"
import Map from "../../components/Map"
import api from "../../services/api"

export default function Home() {
    const defaultSearch = { name: '', price: 1000 }
    const [ latitude, setLatitude ] = useState()
    const [ longitude, setLongitude ] = useState()
    const [ productData, setProductData ] = useState([])
    const [ filteredProductsData, setFilteredProductsData ] = useState([])
    const [ searchProducts, setSearchProducts ] = useState(defaultSearch)
    const [ showMap, setShowMap ] = useState(false)
    const [ viewport, setViewport ] = useState({
        latitude: 0,
        longitude: 0,
        width: '100%',
        height: '100%',
        zoom: 15
    })

    useEffect(() => {
        getUserLocation()
    }, [])

    useEffect(() => {
        getNearByProducts()
    }, [latitude, longitude])

    useEffect(() => {
        getFilteredProducts()
    }, [productData, searchProducts])

    async function getUserLocation() {
        navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
        setViewport({ ...viewport, latitude, longitude })
        }, (err) => {
          alert(err)
        }, { timeout: 10000})
      }

    async function getNearByProducts() {
        try {
            const products = await api.get(`/product?latitude=${latitude}&longitude=${longitude}`)
            const { data } = products
            setProductData(data)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    function getFilteredProducts() {
        const filteredProducts = productData.filter(product => 
            (product.name.toLowerCase().includes(searchProducts.name.toLowerCase())) &&
            (product.price <= searchProducts.price)
            )
            setFilteredProductsData(filteredProducts)
    }

    async function handleChange(ev) {
        setSearchProducts(currentState => {
            return {
              ...currentState,
              [ev.target.name]: ev.target.value
            }
          })
      }
      
    return (
        <>
            <Container className="input-container">
                <Form className="text-center">
                    <h1>Pesquisar Produtos</h1>
                    <FormGroup className="d-flex gap-3">
                        <Input 
                        name="name"
                        type="text" 
                        placeholder="Pesquisar por nome" 
                        value={searchProducts.name}
                        onChange={handleChange}
                        className="home-input"
                        />
                        <Input 
                        name="price"
                        type="number" 
                        placeholder="Preço máximo" 
                        value={searchProducts.price}
                        onChange={handleChange}
                        className="home-input"
                        />
                    </FormGroup>
                </Form>
            </Container>
            <Container className="toggle-btn">
                <button 
                className={showMap ? '' : 'active'}
                onClick={() => setShowMap(false)}
                >
                    Produtos
                </button>
                <button 
                className={showMap ? 'active' : ''}
                onClick={() => setShowMap(true)
                }
                >
                    Mapa
                </button>
            </Container>
            {showMap ? 
                <Map viewport={viewport} setViewport={setViewport} filteredProductsData={filteredProductsData} />
            :
                <ProductsList productData={productData} filteredProductsData={filteredProductsData}/>
            }   
        </>
    )
  }