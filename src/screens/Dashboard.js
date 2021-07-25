import React from 'react'
import { Text, View } from 'react-native'
import Logo from '../components/Logo'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'

export default function Dashboard({ navigation }) {
  return (
    <View>
      <TopNav />
      <Logo />
      <Text style={Styles.header}>Good Morning, Aamir!</Text>
      <Paragraph>
        Dashboard Page Checking
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </View>
  )
}
// import React, { useState } from 'react';
// import { Button, Text, StyleSheet, StatusBar, View } from 'react-native';

// import Constants from 'expo-constants';

// export default function Dashboard() {
//   const styleTypes = ['default', 'dark-content', 'light-content'];
//   const [visibleStatusBar, setVisibleStatusBar] = useState(false);
//   const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);

//   const changeVisibilityStatusBar = () => {
//     setVisibleStatusBar(!visibleStatusBar);
//   };

//   const changeStyleStatusBar = () => {
//     const styleId = styleTypes.indexOf(styleStatusBar) + 1;

//     if (styleId === styleTypes.length) {
//       return setStyleStatusBar(styleTypes[0]);
//     }
//     return setStyleStatusBar(styleTypes[styleId]);
//   };

//   return (
//     <View style={styles.container}>
//       <View>
//         <Text style={styles.textStyle}>StatusBar Style: {styleStatusBar}</Text>
//         <Text style={styles.textStyle}>
//           StatusBar Visibility: {!visibleStatusBar ? 'Visible' : 'Hidden'}
//         </Text>
//       </View>
//       <StatusBar backgroundColor="blue" barStyle={styleStatusBar} />
//       <View>
//         <StatusBar hidden={visibleStatusBar} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Toggle StatusBar" onPress={() => changeVisibilityStatusBar()} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Change StatusBar Style" onPress={() => changeStyleStatusBar()} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ECF0F1',
//     padding: 8,
//   },
//   buttonContainer: {
//     padding: 10,
//   },
//   textStyle: {
//     textAlign: 'center',
//   },
// });
