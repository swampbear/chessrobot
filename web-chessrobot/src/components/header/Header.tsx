import React, {useState} from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import AdminModal from '../adminmodal/AdminModal';


export default function Header() {
  const navigate = useNavigate()
  const handleCompanyPressed = () => {
    navigate('/')
  }
  const[modalVisible, setModalVisible] = useState(false)
  const handleSettingsClick = () => {
    setModalVisible(true)
  }

  const handleClosePress = () => {
    setModalVisible(false)
  }
  return (
    <header id="header">
      {modalVisible ? <AdminModal onClose={handleClosePress}/> : <></>}
      <div id="company" onClick={handleCompanyPressed}>
        hvl<span className="bold">robotics</span>
      </div>
      <button id="settings" onClick={handleSettingsClick}>settings</button>
    </header>
  );
}