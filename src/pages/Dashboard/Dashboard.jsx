import React, { useState } from "react"
import { Form } from "react-router-dom"
import { Button, Container, FormGroup, Input } from "reactstrap"
import useUser from "../../hooks/useUser"
import DashboardCardList from "../../components/DashboardCardList"
import api from "../../services/api"

export default function Dashboard() {
    const defaultProduct = {
      name: '',
      price: ''
    }
    const [product, setProduct] = useState({})
    const { userData } = useUser()

    async function handleChange(ev) {
        setProduct(currentState => {
          return {
            ...currentState,
            [ev.target.name]: ev.target.value
          }
        })
      }

      async function handleSubmit(ev) {
        ev.preventDefault()

        try {
            await api.post(`/${userData.id}/product`, product, {
                headers: {
                    auth: userData.id
                }
            })
            setProduct(defaultProduct)
        } catch (err) {
            alert('Falha ao adicionar um produto')
        }
      }

    return (
      <>
            <Container className="input-container">
                <Form className="text-center">
                    <h1>Cadastrar Produtos</h1>
                    <FormGroup className="d-flex gap-3">
                        <Input 
                        type="text" 
                        placeholder="Nome do produto"
                        name="name"
                        value={product.name} 
                        className="home-input"
                        onChange={handleChange}
                        />
                        <Input 
                        type="number" 
                        placeholder="Preço do produto"
                        name="price" 
                        value={product.price}
                        className="home-input"
                        onChange={handleChange}
                        />
                    </FormGroup>
                    <Button className="add-product-btn" onClick={handleSubmit}>Adicionar produto</Button>
                </Form>
            </Container>
            <DashboardCardList />
      </>
    )
  }