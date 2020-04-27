import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Ekmek from './src/screens/ekmek';
import Pide from './src/screens/pide';
import Yuzde from './src/screens/yuzde';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Pide') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Ekmek') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'Yuzde') {
                iconName = focused
                  ? 'ios-add-circle'
                  : 'ios-add-circle-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Ekmek" component={Ekmek} />
          <Tab.Screen name="Pide" component={Pide} />
          <Tab.Screen name="Yuzde" component={Yuzde} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
