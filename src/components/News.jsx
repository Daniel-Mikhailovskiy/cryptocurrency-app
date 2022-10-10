import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Input } from 'antd'
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const [searchNews, setSearchNews] = useState('')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  const [getNews, setGetNews] = useState([]);
  const { data } = useGetCryptosQuery(100);

  useEffect(() => {
    const filteredData =cryptoNews?.value?.filter((news) => news.name.toLowerCase().includes(searchNews.toLowerCase()))

    setGetNews(filteredData);
  }, [cryptoNews, searchNews, newsCategory])
  
  console.log(cryptoNews)
  if (!cryptoNews?.value) return <Loader />
 

  return (
    <>
    <div className='search-select-container'>
        {(!simplified) ?  <div className='search-news'>
          <Input suffix={<SearchOutlined />} placeholder='Search News' onChange={(e) => setSearchNews(e.target.value) }/>
        </div> : '' }
        {(!simplified) ? <div className='select-news'>
        <Select defaultValue='Cryptocurrency' placeholder='Filter' className='select-news' onChange={(value) => setNewsCategory(value)}>
          <Option value="Cryptocurrency" >All Cryptocurrencies</Option>
          {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
        </Select>
      </div> : '' }
    </div>
      <Row gutter={[24, 24]} >
        {getNews?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card' bodyStyle={{padding: 15}}>
              <a href={news.url} target='_blank' rel='noreferrer' >
                <div className='news-image-container'>
                  <Title level={4} className='news-title'>
                    {news.name}
                  </Title>
                  <img src={news?.image?.thumbnail?.contentUrl  || demoImage} alt='' style={{maxHeight: 100, maxWidth: 100, margin: 5, borderRadius: 10, width: '30%'}}/>
                </div>
                <div className='provider-container'>
                    <Paragraph italic >
                      {(news?.description.length > 120 && simplified ? `${news?.description.substring(0, 120)} ...` : `${news?.description}...` )}
                    </Paragraph>
                </div>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News;