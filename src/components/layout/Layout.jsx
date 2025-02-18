import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
`;

const MainContent = styled.main`
  flex: 1 0 auto; /* Allows content to grow but not shrink */
  padding: ${props => props.theme.spacing.xl};

  ${props => props.theme.media.sm} {
    padding: ${props => props.theme.spacing.md};
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout; 