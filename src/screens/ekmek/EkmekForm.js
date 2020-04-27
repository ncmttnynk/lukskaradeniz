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

export default class EkmekForm extends Component {
  state = {
    toplam: 0,
    iskonto: 0,
    fark: 0,
  };

  _handleSubmit = async values => {
    try {
      const {pide, normalEkmek, kepekliEkmek, tamBugday, sariBugday} = values;
      const toplam =
        pide * 3 +
        normalEkmek * 1.25 +
        kepekliEkmek * 2 +
        tamBugday * 2.5 +
        sariBugday * 2.5;
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
          normalEkmek: '',
          kepekliEkmek: '',
          tamBugday: '',
          sariBugday: '',
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
                onChangeText={handleChange('pide')}
                onSubmitEditing={() => this.normalEkmek._root.focus()}
                value={values.pide}
                onBlur={() => setFieldTouched('pide')}
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                returnKeyType={'next'}
              />
            </Item>
            <Item fixedLabel style={style.exItem}>
              <Label>Normal Ekmek (1,25 ₺):</Label>
              <Input
                onChangeText={handleChange('normalEkmek')}
                ref={ref => (this.normalEkmek = ref)}
                onSubmitEditing={() => this.kepekliEkmek._root.focus()}
                value={values.normalEkmek}
                onBlur={() => setFieldTouched('normalEkmek')}
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                returnKeyType={'next'}
              />
            </Item>
            <Item fixedLabel style={style.exItem}>
              <Label>Kepekli Ekmek (2,00 ₺):</Label>
              <Input
                onChangeText={handleChange('kepekliEkmek')}
                ref={ref => (this.kepekliEkmek = ref)}
                onSubmitEditing={() => this.tamBugday._root.focus()}
                returnKeyType={'next'}
                value={values.kepekliEkmek}
                onBlur={() => setFieldTouched('kepekliEkmek')}
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                returnKeyType={'next'}
                placeholderTextColor={'#AE300A'}
              />
            </Item>
            <Item fixedLabel style={style.exItem}>
              <Label>Tam Buğday (2,5 ₺):</Label>
              <Input
                onChangeText={handleChange('tamBugday')}
                ref={ref => (this.tamBugday = ref)}
                onSubmitEditing={() => this.sariBugday._root.focus()}
                returnKeyType={'next'}
                value={values.tamBugday}
                onBlur={() => setFieldTouched('tamBugday')}
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                returnKeyType={'next'}
              />
            </Item>
            <Item fixedLabel style={style.exItem}>
              <Label>Sarı Buğday (2,5 ₺):</Label>
              <Input
                ref={ref => (this.sariBugday = ref)}
                returnKeyType={'go'}
                onChangeText={handleChange('sariBugday')}
                value={values.sariBugday}
                onBlur={() => setFieldTouched('sariBugday')}
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
