import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${props => props.size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem'};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => props.theme.media.sm} {
    padding: ${props => props.size === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem'};
    font-size: 0.9rem;
    width: 100%; // Make all buttons full width on mobile
  }

  // Add touch state for mobile
  &:active {
    transform: scale(0.98);
  }

  // Increase touch target size on mobile
  ${props => props.theme.media.sm} {
    min-height: 44px; // Minimum touch target size
  }
  
  ${props => {
    switch(props.variant) {
      case 'primary':
        return `
          background: ${props.theme.colors.primary};
          color: white;
          border: none;
          &:hover {
            background: ${props.theme.colors.secondary};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${props.theme.colors.primary};
          border: 2px solid ${props.theme.colors.primary};
          &:hover {
            background: ${props.theme.colors.primary};
            color: white;
          }
        `;
      default:
        return '';
    }
  }}
`;

const Button = ({ children, variant = 'primary', size = 'medium', ...props }) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button; 