import React, {Component} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import {
  Button,
  Content,
  Input,
  Item,
  Label,
  Text,
  ListItem,
  List,
  Left,
  Right,
  Icon,
} from 'native-base';
import {Formik} from 'formik';

import validations from './validations';

export default class PideForm extends Component {
  state = {
    toplam: 0,
    iskonto: 0,
    fark: 0,
  };

  _handleSubmit = async values => {
    try {
      const {pide} = values;
      const toplam = pide * 3;
      const iskonto = (toplam * 25) / 100;
      const fark = toplam - iskonto;
      this.setState({
        toplam,
        iskonto,
        fark,
      });
      Keyboard.dismiss();
    } catch (e) {}
  };

  _handleReset = async () => {
    this.setState({
      toplam: 0,
      iskonto: 0,
      fark: 0,
    });
    Keyboard.dismiss();
  };

  render() {
    return (
      <Formik
        initialValues={{
          pide: '',
        }}
        onSubmit={this._handleSubmit}
        onReset={this._handleReset}
        validationSchema={validations}>
        {({
          values,
          handleChange,
          handleSubmit,
          handleReset,
          setFieldTouched,
        }) => (
          <Content style={style.container}>
            <Item fixedLabel style={style.exItem}>
              <Label>Pide (3 ₺):</Label>
              <Input
                ref={ref => (this.pide = ref)}
                returnKeyType={'go'}
                onChangeText={handleChange('pide')}
                value={values.pide}
                onBlur={() => setFieldTouched('pide')}
                onSubmitEditing={handleSubmit}
                keyboardType={'numeric'}
              />
            </Item>
            <Button
              block
              success
              rounded
              onPress={handleSubmit}
              style={{marginTop: 10}}>
              <Text>Hesapla</Text>
            </Button>
            <Button
              block
              danger
              rounded
              onPress={handleReset}
              style={{marginTop: 10}}>
              <Text>Temizle</Text>
            </Button>
            <List>
              <ListItem>
                <Left>
                  <Text style={style.toplam}>Toplam:</Text>
                </Left>
                <Right>
                  <Text>{this.state.toplam} ₺</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={style.iskonto}>%25:</Text>
                </Left>
                <Right>
                  <Text style={style.iskonto}>{this.state.iskonto} ₺</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={style.fark}>Toplam - %25:</Text>
                </Left>
                <Right>
                  <Text style={style.fark}>{this.state.fark} ₺</Text>
                </Right>
              </ListItem>
            </List>
          </Content>
        )}
      </Formik>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  exItem: {
    marginVertical: 5,
  },
  toplam: {},
  iskonto: {
    fontWeight: 'bold',
  },
  fark: {
    fontWeight: 'bold',
  },
});
