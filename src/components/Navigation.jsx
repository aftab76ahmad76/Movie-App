import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg="light" className='px-3'>
      <Container>
        <Navbar.Brand className='cursor'>{'Vidly'}</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/movies">{'Movies'}</NavLink>
          <NavLink to="/customers">{'Customers'}</NavLink>
          <NavLink to="/rentals">{'Rentals'}</NavLink>
          <NavLink to="/login">{'Login'}</NavLink>
          <NavLink to="/registration">{'Register'}</NavLink>
        </Nav>
      </Container>
    </Navbar>

  )
}

export default Navigation
