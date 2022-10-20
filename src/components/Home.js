import React, {  useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import icons from "../img";
import SearchBar from "./SearchBar";



const Home = () => {

  const IconFadeIn = useRef(new Animated.Value(0)).current;
  const IconMoveIn = useRef(new Animated.Value(30)).current;
  const TextFadeIn = useRef(new Animated.Value(0)).current;
  const TextMoveIn = useRef(new Animated.Value(30)).current;
  const SearchFadeIn = useRef(new Animated.Value(0)).current;
  const SearchMoveIn = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(IconFadeIn, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(IconMoveIn, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        Animated.timing(TextFadeIn, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(TextMoveIn, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        Animated.timing(SearchFadeIn, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(SearchMoveIn, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ]).start()
  }, [])


    return (
    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={["#936bd1", "#9167d6", "#8f62db", "#8d5ee0", "#8b59e5", "#8857e8", "#8455eb", "#8053ee", "#7953ef", "#7253f0", "#6a53f1", "#6153f2"]} style={styles.container}>
        <View style={styles.logoContainer}>
            <Animated.Image style={{...styles.logoImage, opacity: IconFadeIn, transform:[{translateY: IconMoveIn}] }} source={icons["02d"]}/>
            <Animated.Text style={{...styles.logoText, opacity: TextFadeIn, transform:[{translateY: TextMoveIn}] }}>mitWeather</Animated.Text>
        </View>
        <Animated.View style={{...styles.inputContainer, opacity: SearchFadeIn, transform:[{translateY: SearchMoveIn}] }}>
          <SearchBar /> 
        </Animated.View>    
    </LinearGradient>

)}

const styles = StyleSheet.create ({
  inputContainer: {
    height: 40,
    width: "90%",
  },
  container: {
    backgroundColor: "#8b59e5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center"
  },
  logoText: {
    color: "#FFF",
    fontSize: 40,
    marginTop: -6,
    marginBottom: 40
  },
  logoImage: {
    width: 120,
    height: 120,
  }
})


export default Home