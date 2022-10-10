import React, { useState }from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import moment from 'moment';
import HTMLReactParser from 'html-react-parser';
import { Col, Row, Typography, Select, Card, Avatar } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('30d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod});
  const cryptoDetails = data?.data?.coin;

  const newsCategory = cryptoDetails?.name;
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 6 });

  // console.log(cryptoDetails)
  console.log(coinHistory);

  if(isFetching) return 'Loading...';

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Market Cap', value: `$${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];


  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Total Supply', value: `$${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
        <Col className='details-header-container'>
          <Title style={{marginBottom: 10}} className='details-header-title'>{cryptoDetails?.name}({cryptoDetails?.symbol})</Title>
          <Text className='details-header-text'>{cryptoDetails?.name} live price in US dollars. View value statistics, market cap and supply.</Text>
        </Col>
        <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart  coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
      <Col className="stats-container">
        <Col  className="coin-value-statistics">
          <Col xs={24} className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
          <p dangerouslySetInnerHTML={{ __html: cryptoDetails?.description }} />
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
      {(!cryptoNews?.value) ? '' : <Col className='coin-news' >
          <Title className='coin-details-heading' level={3}>{cryptoDetails?.name} News</Title>
            <Row gutter={[18, 18]} >
            {cryptoNews?.value?.map((news, i) => (
              <Col xs={24} sm={12} lg={8} key={i} style={{marginBottom: '10px'}}>
                <Card hoverable className='news-card' bodyStyle={{padding: 15}}>
                  <a href={news?.url} target='_blank' rel='noreferrer' >
                    <div className='news-image-container'>
                      <Title level={4} className='news-title'>
                        {news?.name}
                      </Title>
                      <img src={news?.image?.thumbnail?.contentUrl  || demoImage} alt='' style={{maxHeight: 100, maxWidth: 100, margin: 5, borderRadius: 10, width: '30%'}}/>
                    </div>
                    <div className='provider-container'>
                        <Paragraph italic >
                          {(news?.description.length > 120  ? `${news?.description.substring(0, 120)} ...` : `${news?.description}...` )}
                        </Paragraph>
                    </div>
                    <div className="provider-container">
                      <div>
                        <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                      </div>
                      <p>{moment(news?.datePublished).startOf('ss').fromNow()}</p>
                    </div>
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
      </Col> }
    </Col>
  )
}

export default CryptoDetails