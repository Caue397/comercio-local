import React, { useRef, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, InputGroup, FormFeedback } from 'reactstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import RegisterModal from './RegisterModal';
import api from '../services/api';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function LoginModal ({ toggle, modal }) {
    const [ view, setView ] = useState(false)
    const [ nestedModal, setNestedModal ] = useState(false);
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ inputInvalid, setInputInvalid ] = useState(false)
    const { setUserData } = useUser()
    const navigate = useNavigate()

    const toggleNested = () => setNestedModal(!nestedModal);

    async function handleLogin(ev) {
      ev.preventDefault()
      try {
          const userData = await api.post('/session', {
          email,
          password
        })

        const userInfo = userData.data

        setUserData(currentState => ({
          ...currentState, 
          isLogged: true,
          id: userInfo._id,
          email: userInfo.email,
          name: userInfo.name,
          whatsapp: userInfo.whatsapp
        }))
        setEmail('')
        setPassword('')
        toggle()
        navigate('/dashboard')
        setInputInvalid(false)
      } catch (error) {
        setInputInvalid(true)
      }
    }

    return (
    <div className='login-container'>
        <Modal isOpen={modal} toggle={toggle} centered size="md" className='modal'>
          <ModalHeader toggle={toggle}>
            Entrar
            </ModalHeader>
          <ModalBody>
            <Form>
                <FormGroup floating>
                    <Input name="loginEmail" 
                      placeholder='Email' 
                      type='email' 
                      value={email}
                      invalid={inputInvalid}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <Label for="loginEmail">
                        Email
                    </Label>
                    <FormFeedback>
                        Email ou senha incorretos.
                    </FormFeedback>
                </FormGroup>
                <FormGroup floating className='d-flex'>
                    <Input 
                      name="loginPassword" 
                      placeholder='Senha' 
                      type={view ? 'text' : 'password'} 
                      value={password} 
                      invalid={inputInvalid}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <Label for="loginEmail">
                        Senha
                    </Label>
                    <Button onClick={() => setView(!view)} className='password-button'>
                        {view ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className='buttons d-flex justify-content-center'>
            <Button className='login-button' onClick={handleLogin}>
              Entrar
            </Button>{' '}
            <Button className='cancel-button' onClick={toggleNested}>
              Criar conta
            </Button>
          </ModalFooter>
        </Modal>
        <RegisterModal nestedModal={nestedModal} toggleNested={toggleNested} />
      </div>
    );
}