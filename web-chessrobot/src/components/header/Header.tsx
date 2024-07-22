import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate()
  const handleCompanyPressed = () => {
    navigate('/')
  }
  return (
    <header id="header">
      <div id="company" onClick={handleCompanyPressed}>
        hvl<span className="bold">robotics</span>
      </div>
      <div id="about">about us</div>
    </header>
  );
}