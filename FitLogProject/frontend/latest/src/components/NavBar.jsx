import React from "react";
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";

const NavBar = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '75px',
  backgroundColor: '#C70039',
  padding: '0 20px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '20px',
});

const NavGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const NavLink = styled('a')({
  color: 'black',
  textDecoration: 'none',
  marginLeft: '15px',
  fontSize: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
});

const UserSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const LogoutButton = styled('button')({
  background: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '6px 12px',
  fontSize: '14px',
  cursor: 'pointer',
});

function Navigator() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/LogIn');
  };

  return (
    <NavBar>
      <NavGroup>
        <NavLink href="/home">Home</NavLink>
        <NavLink href='/calculator'>Calculator</NavLink>
        <NavLink href='/meal-plan'>MealPlan</NavLink>
        <NavLink href='/gemini-chat'>Gemini</NavLink>
        {!isAuthenticated && (
          <>
            <NavLink href='/LogIn'>LogIn</NavLink>
            <NavLink href='/register'>Registration</NavLink>
          </>
        )}
      </NavGroup>

      {isAuthenticated && (
        <UserSection>
          <span style={{ fontSize: '20px', color: 'white' }}>👤 {username}</span>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserSection>
      )}
    </NavBar>
  );
}

export default Navigator;
