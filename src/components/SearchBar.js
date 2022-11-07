import {  useState, useEffect, useRef } from "react";
import { TextInput, StyleSheet, View, Text, ActivityIndicator, Animated, TouchableOpacity, Keyboard, Vibration } from "react-native"
import { fetchCityByName, fetchCurrentCity, getSuggestions, clearSuggestions, fetchCityByCoordinates, setCurrentRendered, changeAllowRedirect } from "../redux/actions";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Octicons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import getCountryName from "../constants/countryCodes";

const SearchBar = (props) => {

    const [value, setValue] = useState('')
    const [shaker, setShaker] = useState(0)
    const shakeBar = useRef(new Animated.Value(0)).current;


    useEffect(() => {
      if(shaker > 0) {
        Vibration.vibrate([60,5,125,5,125,5,125,5,125,5])
        Animated.loop(
          Animated.sequence([
            Animated.timing(shakeBar, {
              toValue: -5,
              duration: 65,
              useNativeDriver: true
            }),
            Animated.timing(shakeBar, {
              toValue: 5,
              duration: 130,
              useNativeDriver: true
            }),
            Animated.timing(shakeBar, {
              toValue: 0,
              duration: 65,
              useNativeDriver: true
            })
          ]), {iterations: 2}
        ).start()
      }
    }, [shaker])

    useEffect(() => {
      if(props.error) setShaker(shaker + 1)
    }, [props.error])

    
    useEffect(() => {
      if(value.length >= 3) props.getSuggestions(value);
      else props.clearSuggestions()
    }, [value])



    
    const submitSearch = () => {
      props.changeAllowRedirect(true)
      props.searchCityByName(value, props.id, props.cities, props.currentLocation)
      Keyboard.dismiss()
      setValue('')
    }

    const handleSearchCurrent = () => {
      props.searchCurrentCity(props.cities)
      Keyboard.dismiss()
      setValue('')
   }

   const handleSearchSuggestion = (location) => {
    props.changeAllowRedirect(true)
    props.fetchCityByCoordinates(location, props.id, props.cities, props.currentLocation)
    Keyboard.dismiss()
    setValue('')
 }

   

    return (
      <>
      <Animated.View style={{...styles.searchBar, transform:[{translateX: shakeBar}]}}>
        <Icon style={styles.icon} name={"search"} color={"#FFF"} size={16}/>
        <TextInput 
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor= "#FFF"
            returnKeyType={"search"}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={() => {submitSearch()}}
            autoFocus={props.autofocus}
            editable={!props.isFetching}
        />
        <TouchableOpacity onPress={() => handleSearchCurrent() }>
          {props.currentLocation === null && !props.isFetching && value.length === 0 && <Icon2 style={styles.icon} name={"my-location"} color={"#FFF"} size={16}/>}
        </TouchableOpacity>
        {props.isFetching ? <ActivityIndicator style={styles.icon} color='#FFF' size={"small"}/> : null}
      </Animated.View>
      {value.length >= 3 && props.suggestions.length > 0 ? <View style={styles.sugContainer}>
        {props.suggestions.map((sug, key) => 
          <TouchableOpacity key={key} style={styles.sugTouch} onPress={() => { Vibration.vibrate(10) ;handleSearchSuggestion({latitude: sug.lat, longitude: sug.lon})}}>
            <Text style={styles.sugText}>{sug.name},{sug.state && ` ${sug.state},`} {getCountryName(sug.country)} </Text>
          </TouchableOpacity>
          )}
      </View> : null}
      </>
    )
}

const styles = StyleSheet.create ({
  searchBar: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#FFF3",
    paddingHorizontal: 4
  },
  icon: {
    padding: 10
  },
  input: {
      color: "#FFF",
      flex: 1
  },
  sugTouch: {
    paddingVertical: 16,
    paddingLeft: 36

  },
  sugText: {
    color: '#FFF'
  },
  sugContainer: {
    paddingTop: 16
  }
})

const mapStateToProps = (state) => {
    return {
      isFetching: state.isFetching,
      error: state.error,
      placeholder: state.placeholder,
      cities: state.data,
      indexRep: state.indexRep,
      id: state.id,
      suggestions: state.suggestions,
      currentLocation: state.currentLocation,
      currentWasRendered: state.currentWasRendered
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      searchCityByName: (city, id, currentState, currentLocation) => dispatch(fetchCityByName(city, id, currentState, currentLocation)),
      searchCurrentCity: (currentState) => dispatch(fetchCurrentCity(currentState)),
      fetchCityByCoordinates: (location, id, currentState, currentLocation) => dispatch(fetchCityByCoordinates(location, id, currentState, currentLocation)),
      getSuggestions: (cityName) => dispatch(getSuggestions(cityName)),
      clearSuggestions: () => dispatch(clearSuggestions()),
      setCurrentRendered: () => dispatch(setCurrentRendered()),
      changeAllowRedirect: (payload) => dispatch(changeAllowRedirect(payload))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)