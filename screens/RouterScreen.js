import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import * as Location from 'expo-location';
import { Image, Platform, StyleSheet, Text, Dimensions, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

import { Title, Subheading, Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

import MapView from 'react-native-maps';
import { ProgressBar, Colors } from 'react-native-paper';


export default function HomeScreen({ navigation }) {
  const [text, setText] = React.useState('')
  const [textLocatio, setTextLocation] = React.useState('')
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  // if (errorMsg) {
  //   setTextLocation(errorMsg);
  // } else if (location) {
  //   setTextLocation(location)
  //   // text = JSON.stringify(location);
  // }

  return (
    
    <>
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>
            <Subheading> Bem vindo</Subheading>
            {/* <Text>{JSON.stringify(location)}</Text> */}
          </Text>
          <Text>
            <Title> Rodrigo</Title>
          </Text>
          <View style={styles.search} >
            <TextInput
              label='Local de destino'
              value={text}
              onChangeText={text => setText(text)}
            />
          </View>
          <View style={styles.welcomeContainer}>
            <MapView style={styles.mapStyle} />
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
        <Button mode="contained" onPress={() => 
        navigation.push('PreviewRouter', {
          destination: text,
          origin: `${location.coords.latitude}, ${location.coords.longitude}`,
          waypoints: [`${location.coords.latitude},${location.coords.longitude}`, text]
        })}>
          Iniciar
        </Button>
          <ProgressBar progress={0.5} color={Colors.red800} />
        </View>
      </View>
    </>
  );
}

HomeScreen.navigationOptions = {
  header: 'TESTEE',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal: 15
  },
  search: {
    marginVertical: 20
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 0.8 * Dimensions.get('window').height,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    marginHorizontal: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
