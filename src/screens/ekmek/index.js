import React, { Component } from 'react';
import { Body, Header, Title, Container, Left, Right, Button, Icon, Text } from "native-base";

import EkmekForm from './EkmekForm';

export default class Ekmek extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Header style={{ backgroundColor: '#0c0c0c' }}>
                    <Left style={{ flex: .3 }}>
                    </Left>
                    <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Title>Lüks Karadeniz Cafe Fırın</Title>
                    </Body>
                    <Right style={{ flex: .3 }}>
                    </Right>
                </Header>
                <EkmekForm />
            </Container>
        );
    }
}