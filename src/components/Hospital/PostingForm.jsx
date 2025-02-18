import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const FormContainer = styled.form`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  max-width: 800px;
  margin: 2rem auto;

  ${props => props.theme.media.sm} {
    padding: ${props => props.theme.spacing.md};
    margin: 1rem;
    border-radius: ${props => props.theme.borderRadius.md};
  }

  h2 {
    font-size: 1.5rem;
    
    ${props => props.theme.media.sm} {
      font-size: 1.25rem;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  ${props => props.theme.media.sm} {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid #E2E8F0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;

  ${props => props.theme.media.sm} {
    padding: ${props => props.theme.spacing.sm};
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  ${props => props.theme.media.sm} {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const PostingForm = () => {
  const [formData, setFormData] = useState({
    specialty: '',
    numberOfStaff: '',
    startDate: '',
    endDate: '',
    location: '',
    qualifications: '',
    payRate: '',
    contactInfo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Post New Staff Requirement</h2>
      
      <FormGroup>
        <Label>Specialty Required</Label>
        <Input
          type="text"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          placeholder="e.g., Cardiology, Surgery, Pediatrics"
        />
      </FormGroup>

      <FormGroup>
        <Label>Number of Staff Needed</Label>
        <Input
          type="number"
          name="numberOfStaff"
          value={formData.numberOfStaff}
          onChange={handleChange}
          min="1"
        />
      </FormGroup>

      <FormGroup>
        <Label>Start Date</Label>
        <Input
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </FormGroup>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Button type="submit">Post Requirement</Button>
        <Button variant="outline" type="button">Cancel</Button>
      </div>
    </FormContainer>
  );
};

export default PostingForm; 