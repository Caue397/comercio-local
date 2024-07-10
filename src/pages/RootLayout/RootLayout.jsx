import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Nav, Navbar, NavbarText, Popover, PopoverBody, PopoverHeader } from "reactstrap"
import Logo from "../../assets/logo.png"
import { Link, Outlet, useNavigate } from "react-router-dom"
import LoginModal from "../../components/LoginModal";
import { useState } from "react";
import "../../styles/main.scss"
import useUser from "../../hooks/useUser";
import { BsArrowDownShort, BsBoxArrowRight, BsWindowFullscreen, BsTrash3 } from "react-icons/bs";
import api from "../../services/api";

export default function RootLayout() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [dropdown, setDropdown] = useState(false)
    const toggleDropdown = () => setDropdown(!dropdown)
    const [ deleteUserModal, setDeleteUserModal ] = useState(false)
    const toggleDeleteUserModal = () => setDeleteUserModal(!deleteUserModal)
    const navigate = useNavigate()

    const { userData, setUserData } = useUser()

    async function handleLogout (ev) {
        ev.preventDefault()
        
        setUserData((prevState) => ({
            ...prevState,
            isLogged: false,
            email: '',
            name: ''
        }))

    }

    async function deleteUser() {
        try {
            await api.delete(`/user/${userData.id}`, {
                headers: {
                    auth: userData.id
                }
            })
            toggleDeleteUserModal()
            alert('Usuário excluído com sucesso')
            navigate(0)
        } catch (err) {
            alert('Não foi possível deletar o usuário')
        }
    }

    return (
        <>
            <Container className="header">
                <Navbar className="px-4" >
                    <Link to="/" className="logo">
                        <img src={Logo} alt="Logo" style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10
                        }}/>
                    </Link>
                    <Nav>
                    { 
                    userData.isLogged ?
                    <> 
                        <Dropdown
                        isOpen={dropdown} 
                        toggle={toggleDropdown}
                        >
                            <DropdownToggle className="login-button">
                                Olá, {userData.name} <BsArrowDownShort style={{fontSize: '20px'}}/>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <Link 
                                    to='/dashboard'
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}
                                    >
                                        <BsWindowFullscreen /> Dashboard
                                    </Link>
                                </DropdownItem>
                                <DropdownItem
                                    onClick={toggleDeleteUserModal}
                                >
                                    <BsTrash3 /> Excluir conta
                                </DropdownItem>
                                <DropdownItem 
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    <BsBoxArrowRight /> Sair
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Modal 
                        isOpen={deleteUserModal} 
                        toggle={toggleDeleteUserModal}
                        centered
                        >
                            <ModalHeader className="d-flex justify-content-center">
                                Tem certeza que deseja excluir sua conta?
                            </ModalHeader>
                            <ModalBody className="d-flex justify-content-center gap-4">
                                <Button onClick={deleteUser} color="danger">Sim, tenho certeza</Button>
                                <Button onClick={toggleDeleteUserModal} color="success">Cancelar</Button>
                            </ModalBody>
                        </Modal>
                    </> 
                    : 
                    <button className="login-button" onClick={toggle}>Entrar</button> 
                    }
                    </Nav>
                </Navbar>
            </Container>
            <div>
                <Outlet />
                <LoginModal toggle={toggle} modal={modal} />
            </div>
        </>
    )
}
