import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';

import { Navbar, Trands, Homepage, Cryptocurrencies, News, CryptoDetails,  } from './components'


function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/trands" element={<Trands />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
          Cryptoverse <br />
          All rights reserved
        </Typography.Title>
        <Space>
          <Link to='/' >Home</Link>
          <Link to='/trands' >Trands</Link>
          <Link to='/news' >News</Link>
        </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
