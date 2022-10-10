import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Card, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import {useGetCryptosQuery} from '../services/cryptoApi'
import Loader from './Loader';


const Cryptocurrencies = ({simplified}) => {
  const count = (simplified) ? 10 : 100;
  const { data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData =cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData);
  }, [cryptosList, searchTerm])
  
  
  if(isFetching) return <Loader />

  return (
    <>
      { (!simplified) ? 
      <div className='search-crypto'>
        <Input suffix={<SearchOutlined />} placeholder='Search Cryptocurrencies' onChange={(e) => setSearchTerm(e.target.value) }/>
      </div> : '' }
      <Row className="crypto-card-container" gutter={[32, 32]}>
        {cryptos?.map((crypto) => (
          <Col className="crypto-card" xs={24} sm={12} lg={6} key={crypto?.uuid}>
            <Link key={crypto?.uuid} to={`/crypto/${crypto.uuid}`}>
              <Card
                key={crypto?.id}
                style={{borderRadius: 14}}
                hoverable
                title={`${crypto.rank}. ${crypto.name}`}
                extra={<img className="crypto-image" src={crypto.iconUrl} alt="" />}
              >
                <p>Price: ${millify(crypto.price)}</p>
                <p>Market Cap: ${millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies