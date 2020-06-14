import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Linking, Text, Dimensions, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

import { Title, Subheading, Button, Card, Paragraph, Chip, Badge } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import axios from 'axios';

import MapView from 'react-native-maps';
import { ProgressBar, Colors } from 'react-native-paper';


export default function HomeScreen({ route }) {
  const [points, setPoints] = React.useState(false)
  const { params } = route
  const [text, setText] = React.useState('')
  const [destination, setDestination] = React.useState(params.destination)

  React.useEffect(() => {
    (async () => {
      const data = await axios.post('http://c645c3b534fc.ngrok.io/integrations', {
        waypoints: params.waypoints
      })
      setPoints(data.data.lugares)
    })();
  });

  console.log('params: ', params)
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.search} >
          {/* <TextInput
            label='Origem'
            value={text}
            onChangeText={text => setText(text)}
          /> */}
          <TextInput
            label='Destino'
            value={destination}
            onChangeText={text => setText(text)}
          />
        </View>
        {/* <View>
          <Title>
            Saída <Subheading>08:25 </Subheading>
          </Title>
        </View> */}
        {
          points ? points.map(item => <View key={item.id} style={styles.points}>
            <Card style={styles.point}>
              <Card.Title subtitle={String(parseInt(item.distFromStart) / 100 + ' km')} />
            </Card>
            <Card style={styles.pointLarger}>
              <Card.Title title="Parada" subtitle="30min"  />
              <Card.Content>
                <Subheading style={styles.pointsTips}>
                  + { item.score } pontos 
                </Subheading>
                <View>
                  <Subheading>{item.nome}</Subheading>
                  <Chip>
                    {item.servicos}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          </View>) : null
        }
        

        {/* <View>
          <Title>
            Chegada <Subheading>17:25 </Subheading>
          </Title>
        </View> */}
      </ScrollView>

      <View style={styles.footer}>
        <Button mode="contained" style={styles.buttonFooter} onPress={() => {
          const url = `https://www.google.com/maps/dir/?api=1&origin=${params.origin}&destination=${params.destination}&travelmode=driving&waypoints=${points.reduce((acc, item) => {
            console.log('clg:: ', item)
            acc += '' + item.latitude + ',' + item.longitude + '%7C'
            console.log('acc: ', acc)
            return acc
          }, '')}`.replace(' ', '')

          console.log('url formated: ', url)
          Linking.openURL(url)
        }}>
          INICIAR ROTA
        </Button>
      </View>
    </View>
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
  contentContainer: {
    paddingTop: 30,
    marginHorizontal: 30
  },
  points: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  pointsTips: {
    fontWeight: "700",
    color: "#6c63ff"
  },
  point: {
    width: 90
  },
  pointLarger: {
    width: 250
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
  footer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    alignItems: 'center',
    // backgroundColor: '#fbfbfb',
    paddingBottom: 20,
    
  },
  buttonFooter: {
    width: 300
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
