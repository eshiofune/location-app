import React, {useState} from 'react';
import {Text, Alert} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from './GooglePlacesAutocomplete';
import Icon from 'react-native-vector-icons/Entypo';

const AutoCompleteTextInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [locationText, setLocationText] = useState('');
  const styles = {
    label: {
      width: '60%',
      position: 'absolute',
      top: !isFocused ? 18 : 0,
      fontSize: !isFocused ? 18 : 14,
      color: !isFocused ? '#aaa' : '#000',
      marginLeft: '10%',
      zIndex: -1,
    },
    autocomplete: {
      container: {
        width: '100%',
      },
      textInputContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingBottom: '20%',
        width: '100%',
      },
      textInput: {
        height: 30,
        color: '#000',
        fontSize: 18,
        marginLeft: '6%',
        marginTop: '6%',
        opacity: !isFocused ? 0 : 1,
      },
      description: {
        fontSize: 16,
        paddingLeft: '4%',
      },
      listView: {
        height: 100,
        minHeight: 100,
        maxHeight: 100,
      },
    },
    button: {
      position: 'absolute',
      left: '80%',
      top: 12,
      fontSize: 30,
      color: 'lightgreen',
    },
  };

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    if (locationText === '') {
      setIsFocused(false);
    }
  }

  function handleTextChange(newText) {
    setLocationText(newText);
  }

  function handlePress() {
    setLocationText(currentLocation);
    handleFocus();
  }

  return (
    <GooglePlacesAutocomplete
      text={locationText}
      placeholder=""
      minLength={2} // minimum length of text to search
      autoFocus={false}
      fetchDetails={true}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyApho5gze9a7EisJSrFKthqDHun65Tp3MU',
        language: 'en', // language of the results
        types: '(cities)', // default: 'geocode'
      }}
      styles={styles.autocomplete}
      onTextInputFocus={handleFocus}
      onTextInputBlur={handleBlur}
      onTextInputTextChange={handleTextChange}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe',
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3',
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={['']}
      renderLeftButton={() => <Text style={styles.label}>Location</Text>}
      renderRightButton={() => (
        <Icon name="direction" style={styles.button} onPress={handlePress} />
      )}
    />
  );
};

let currentLocation = '';

function getCurrentLocation() {
  Geolocation.getCurrentPosition(
    async position => {
      let queryParams = {
        key: 'AIzaSyApho5gze9a7EisJSrFKthqDHun65Tp3MU',
        latlng: `${position.coords.latitude},${position.coords.longitude}`,
        result_type: 'locality',
      };
      const url = `https://maps.google.com/maps/api/geocode/json?${toQueryParams(
        queryParams,
      )}`;
      let response, data;

      // fetch
      try {
        response = await fetch(url);
      } catch (error) {
        console.error(error);
      }

      // parse
      try {
        data = await response.json();
      } catch (error) {
        console.error(error);
      }

      // check response's data
      if (data.status !== 'OK') {
        console.error(data);
        return;
      }

      let addressComponent = data.results[0].address_components[0];

      currentLocation = addressComponent.long_name;
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
}

function toQueryParams(object) {
  return Object.keys(object)
    .filter(key => !!object[key])
    .map(key => key + '=' + encodeURIComponent(object[key]))
    .join('&');
}

getCurrentLocation();

export default AutoCompleteTextInput;
