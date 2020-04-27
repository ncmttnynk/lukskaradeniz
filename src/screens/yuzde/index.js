import React, {Component} from 'react';
import {
  Body,
  Header,
  Title,
  Container,
  Left,
  Right,
  Button,
  Icon,
  Text,
} from 'native-base';

import YuzdeForm from './YuzdeForm';

export default class Yuzde extends Component {
  render() {
    return (
      <Container style={{backgroundColor: '#F2F2F2'}}>
        <Header style={{backgroundColor: '#0c0c0c'}}>
          <Left style={{flex: 0.3}} />
          <Body
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Title>Lüks Karadeniz Cafe Fırın</Title>
          </Body>
          <Right style={{flex: 0.3}} />
        </Header>
        <YuzdeForm />
      </Container>
    );
  }
}
