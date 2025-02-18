import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  flex-shrink: 0; /* Prevents footer from shrinking */
  background-color: ${props => props.theme.colors.text};
  color: white;
  padding: ${props => props.theme.spacing.xl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};

  ${props => props.theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.lg};
  }

  ${props => props.theme.media.sm} {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.accent};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1.1rem;

    ${props => props.theme.media.sm} {
      margin-bottom: ${props => props.theme.spacing.sm};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: ${props => props.theme.spacing.sm};
    
    ${props => props.theme.media.sm} {
      margin-bottom: ${props => props.theme.spacing.xs};
    }

    a {
      display: block;
      padding: ${props => props.theme.spacing.xs} 0;
      // Increase touch target size
      min-height: 44px;
      display: flex;
      align-items: center;
    }
  }

  a {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <ul>
            <li><a href="/about">Our Mission</a></li>
            <li><a href="/team">Our Team</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>For Hospitals</h3>
          <ul>
            <li><a href="/post-job">Post a Requirement</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/hospital-resources">Resources</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>For Professionals</h3>
          <ul>
            <li><a href="/find-jobs">Find Jobs</a></li>
            <li><a href="/create-profile">Create Profile</a></li>
            <li><a href="/career-tips">Career Tips</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact</h3>
          <ul>
            <li><a href="/support">Support</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} Medical Staffing Platform. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer; 