import React, { useState } from 'react';
import {  Col, Row, Typography, Collapse } from 'antd';
import Loader from './Loader';
import Slider from "react-slick";
import Carousel from 'react-elastic-carousel';
import Item from './Item';

import { useGetResentlyAddedQuery } from '../services/cryptoApiTrends'
const { Title, Text } = Typography;
const { Panel } = Collapse;
const Trands = () => {
  const {data: recentlyAdded } = useGetResentlyAddedQuery()
  console.log(recentlyAdded)

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <Col className='trends-container'>
      <div className='trend-heading-container'>
      <Title level={2} >Cryptocurrencies Trands</Title>
      </div>
      <Title className='home-title' level={3}>Resently added cryptocurrencies</Title>
      <div className='carousel-container'>
            <Row gutter={[32,32]}>
              <Col className='trend-card-names-headers' span={4}><Text><strong>Name</strong></Text></Col>
              <Col className='trend-card-names-headers' span={4}><Text><strong>Price</strong></Text></Col>
              <Col className='trend-card-names-headers' span={4}><Text><strong>MarketCap</strong></Text></Col>
              <Col className='trend-card-names-headers' span={4}><Text><strong>Volume</strong></Text></Col>
              <Col className='trend-card-names-headers' span={4}><Text><strong>Blockchain</strong></Text></Col>
              <Col className='trend-card-names-headers' span={4}><Text><strong>Added</strong></Text></Col>
            </Row>
            {recentlyAdded?.result.map((item) => (
              <div>
              <Col span={24}>
               {/* <Collapse> */}
                <Panel
                  key={item?.rank}
                  showArrow={false}
                  header={(
                    <Row gutter={[32,32]} key={item?.rank}>
                      <Col span={4}>{item?.name}</Col>
                      <Col span={4}>{item?.price}</Col>
                      <Col span={4}>{item?.marketCap}</Col>
                      <Col span={4}>{item?.Blockchain}</Col>
                      <Col span={4}>{item?.volume}</Col>
                      <Col span={4}>{item?.added}</Col>
                    </Row>
                    )}
                >
                                      <Row gutter={[32,32]} key={item?.rank}>
                      <Col span={4}>{item?.name}</Col>
                      <Col span={4}>{item?.price}</Col>
                      <Col span={4}>{item?.marketCap}</Col>
                      <Col span={4}>{item?.Blockchain}</Col>
                      <Col span={4}>{item?.volume}</Col>
                      <Col span={4}>{item?.added}</Col>
                    </Row>
                </Panel>
              {/* </Collapse> */}
            </Col>
            </div>
            ))}
            
        {/* <Carousel className='carousel' dotPosition='botton'  > */}
          {/* {recentlyAdded?.result.map((item) => (
            <Col className='caurousel-card' key={item.rank} >
              <Col className='trend-card-names-start'>
                <Text className='trend-card-text' level={5} >{item?.name}</Text>
              </Col>
              <Col className='trend-card-names'>
                <Text level={5} >{item?.price}</Text>
              </Col>
              <Col className='trend-card-names'>
                <Text level={5} >{item?.marketCap}</Text>
              </Col>
              <Col className='trend-card-names'>
                <Text level={5} >{item?.Blockchain}</Text>
              </Col>
              <Col className='trend-card-names'>
                <Text level={5} >{item?.volume}</Text>
              </Col>
            </Col>
          ))} */}
        {/* </Carousel> */}
      </div>
    </Col>
  )
}

export default Trands
