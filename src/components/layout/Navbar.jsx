import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${props => props.theme.media.md} {
    padding: ${props => props.theme.spacing.sm};
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};

  ${props => props.theme.media.md} {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};

  ${props => props.theme.media.md} {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: ${props => props.theme.spacing.md};
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  ${props => props.theme.media.md} {
    padding: ${props => props.theme.spacing.md};
    width: 100%;
    text-align: center;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarWrapper>
      <NavContainer>
        <Logo>MedStaff</Logo>
        
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </MenuButton>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink href="/hospitals">For Hospitals</NavLink>
          <NavLink href="/professionals">For Professionals</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/register">Register</NavLink>
        </NavLinks>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar; 