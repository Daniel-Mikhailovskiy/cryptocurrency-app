import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {  Menu, Avatar, Typography } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  useEffect(() => {

    (screenSize < 801) ? setActiveMenu(false) : setActiveMenu(true)
  }, [screenSize])


  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className='logo'>
          <Link to="/"> Cryptoverse</Link>
        </Typography.Title>
        <span className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}> 
          <MenuOutlined className='menu-icon' />
        </span>
      </div>
      { activeMenu && (
        <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined />}>
              <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
              <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
              <Link to='/trands'>Trands</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
              <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}  
    </div>
  );
};

export default Navbar