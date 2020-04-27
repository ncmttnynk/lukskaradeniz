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

export default class YuzdeForm extends Component {
  state = {
    yuzde: 25,
    yuzdeTutar: 0,
    fark: 0,
  };

  _handleSubmit = async values => {
    try {
      const {tutar, yuzde} = values;
      const yuzdeTutar = (tutar * yuzde) / 100;
      const fark = tutar - yuzdeTutar;
      this.setState({
        yuzde,
        yuzdeTutar,
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
          tutar: '',
          yuzde: '25',
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
              <Label>Tutar (₺):</Label>
              <Input
                ref={ref => (this.pide = ref)}
                returnKeyType={'next'}
                onChangeText={handleChange('tutar')}
                value={values.tutar}
                onBlur={() => setFieldTouched('tutar')}
                onSubmitEditing={() => this.yuzde._root.focus()}
                keyboardType={'numeric'}
              />
            </Item>
            <Item fixedLabel style={style.exItem}>
              <Label>Yüzde (%):</Label>
              <Input
                ref={ref => (this.yuzde = ref)}
                returnKeyType={'go'}
                onChangeText={handleChange('yuzde')}
                value={values.yuzde}
                onBlur={() => setFieldTouched('yuzde')}
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
                  <Text style={style.iskonto}>%{this.state.yuzde}:</Text>
                </Left>
                <Right>
                  <Text style={style.iskonto}>{this.state.yuzdeTutar} ₺</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={style.fark}>Toplam - %{this.state.yuzde}:</Text>
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
