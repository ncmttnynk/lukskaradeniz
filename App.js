import React, { Component } from 'react';
import { Container } from 'native-base';
import Ekmek from './src/screens/ekmek';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Ekmek />
      </Container>
    )
  }
}