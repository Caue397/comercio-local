import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, InputGroup, FormFeedback } from 'reactstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import api from '../services/api';

export default function RegisterModal ({ toggleNested, nestedModal }) {
    const defaultUser = {
      name: '',
      whatsapp: '',
      email: '',
      password: ''
    }
    const [ view, setView ] = useState(false)
    const [ newUser, setNewUser ] = useState({})
    const [ invalidEmail, setInvalidEmail ] = useState(false)
    const [ invalidPassword, setInvalidPassword ] = useState(false)

    useEffect(() => {
      getUserLocation()
    }, [])

    function handlePhone(ev) {
      let formatedPhone = ""
      const phone = ev.target.value.replace(/\D/g, "").substring(0,11)
      const phoneArray = phone.split("")
      if (phoneArray.length > 0) {
        formatedPhone += `(${phoneArray.slice(0,2).join("")})`
      } if (phoneArray.length > 2) {
        formatedPhone += ` ${phoneArray.slice(2,7).join("")}`
      } if (phoneArray.length > 7) {
        formatedPhone += `-${phoneArray.slice(7,11).join("")}`
      }
      ev.target.value = formatedPhone
    }

    async function handleChange(ev) {
      setNewUser(currentState => {
        return {
          ...currentState,
          [ev.target.name]: ev.target.value
        }
      })
    }

    async function handleRegister(ev) {
      ev.preventDefault()
      try {
        if (newUser.password !== newUser.repeatPassword) {
          setInvalidPassword(true)
          setInvalidEmail(false)
        } else {
          await api.post('/user', newUser)
          setNewUser(defaultUser)
          toggleNested()
          setInvalidEmail(false)
          setInvalidPassword(false)
        }
      } catch (err) {
        setInvalidEmail(true)
        setInvalidPassword(false)
      }
    }

    async function getUserLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setNewUser(currentState => {
          return {
            ...currentState,
            latitude,
            longitude
          }
        })
      }, (err) => {
        alert('Erro ao obter a sua localização')
      }, { timeout: 10000})
    }

    return (
    <div className='register-container'>
        <Modal isOpen={nestedModal} toggle={toggleNested} centered size="md" className='modal'>
          <ModalHeader>
            Cadastrar
            </ModalHeader>
          <ModalBody>
            <Form>
                <FormGroup floating>
                    <Input 
                      name="name" 
                      placeholder='Nome' 
                      type='text' 
                      value={newUser.name}
                      onChange={handleChange}
                    />
                    <Label for="name">
                        Nome
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input 
                      name="whatsapp" 
                      placeholder='Whatsapp' 
                      type='tel' 
                      value={newUser.whatsapp} 
                      onChange={(ev) => {
                        handlePhone(ev)
                        handleChange(ev)
                      }}
                    />
                    <Label for="whatsapp">
                        Whatsapp
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input 
                      name="email" 
                      placeholder='Email' 
                      type='email' 
                      value={newUser.email} 
                      invalid={invalidEmail}
                      onChange={handleChange}
                    />
                    <Label for="email">
                        Email
                    </Label>
                    <FormFeedback>
                        Este email já está cadastrado.
                    </FormFeedback>
                </FormGroup>
                <FormGroup floating className='d-flex'>
                    <Input 
                      name="password" 
                      placeholder='Senha' 
                      type={view ? 'text' : 'password'} 
                      value={newUser.password} 
                      invalid={invalidPassword}
                      onChange={handleChange}
                    />
                    <Label for="password">
                        Senha
                    </Label>
                    <Button onClick={() => setView((change) => !change)} className='password-button'>
                        {view ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                </FormGroup>
                <FormGroup floating className='d-flex'>
                    <Input 
                      name="repeatPassword" 
                      placeholder='Repita sua senha' 
                      type={view ? 'text' : 'password'} 
                      value={newUser.repeatPassword} 
                      invalid={invalidPassword}
                      onChange={handleChange}
                    />
                    <Label for="repeatPassword">
                        Repita sua senha
                    </Label>
                    <Button onClick={() => setView((change) => !change)} className='password-button'>
                        {view ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className='buttons d-flex justify-content-center'>
            <Button className='login-button' onClick={handleRegister}>
              Cadastrar
            </Button>{' '}
            <Button className='cancel-button' onClick={toggleNested}>
              Já tenho uma conta
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}