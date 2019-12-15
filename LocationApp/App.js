import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

import AutoCompleteTextInput from './AutoComplete';

const App = () => {
  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Lets get started</Text>
          <View style={styles.dots}>
            <View style={styles.selectedDot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>Enter your location</Text>
          <View>
            <AutoCompleteTextInput />
          </View>
        </View>
        <View style={styles.nextContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
  },
  card: {
    elevation: 5,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    height: '99%',
    marginTop: '0.5%',
    marginBottom: '0.5%',
    marginLeft: '3.5%',
    marginRight: '3.5%',
    top: 0,
    left: 0,
  },
  titleContainer: {
    marginTop: '5%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    marginVertical: '8%',
  },
  dots: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '15%',
  },
  dot: {
    backgroundColor: 'lightgrey',
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: '4%',
    marginVertical: 1,
  },
  selectedDot: {
    backgroundColor: '#9932CC',
    height: 12,
    width: 12,
    borderRadius: 10,
    marginHorizontal: '4%',
  },
  locationContainer: {
    paddingTop: 18,
    alignItems: 'center',
  },
  locationTitle: {
    marginBottom: '5%',
    fontSize: 18,
  },
  nextContainer: {
    width: '100%',
    height: 70,
    bottom: '41.9%',
  },
  button: {
    alignItems: 'center',
    color: '#fff',
    flex: 1,
    backgroundColor: '#9932CC',
  },
  buttonText: {
    color: '#fff',
    textAlignVertical: 'center',
    flex: 1,
    fontSize: 18,
  },
});

export default App;
