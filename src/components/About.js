import React, {useEffect, useRef} from "react";
import { Text, View, StyleSheet, TouchableOpacity, BackHandler, Animated, Linking} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IconZocial from "react-native-vector-icons/Fontisto"
import IconOcticons from "react-native-vector-icons/Octicons"
import IconIonicons from "react-native-vector-icons/Ionicons"
import IconFontAwesome from "react-native-vector-icons/FontAwesome5"
import { useNavigate } from "react-router-native";
import icons from "../img";

const About = () => {

    const IconFadeIn = useRef(new Animated.Value(0)).current;
    const IconMoveIn = useRef(new Animated.Value(30)).current;
    const TextFadeIn = useRef(new Animated.Value(0)).current;
    const TextMoveIn = useRef(new Animated.Value(30)).current;
    const TextTwoFadeIn = useRef(new Animated.Value(0)).current;
    const TextTwoMoveIn = useRef(new Animated.Value(30)).current;
    const TextThreeFadeIn = useRef(new Animated.Value(0)).current;
    const TextThreeMoveIn = useRef(new Animated.Value(30)).current;
    const IconsFadeIn = useRef(new Animated.Value(0)).current;
    const IconsMoveIn = useRef(new Animated.Value(30)).current;
    const navigate = useNavigate()
    const backAction = () => {navigate(-1); return true}

    useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    useEffect(() => {
        Animated.stagger(50, [
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
            Animated.timing(TextTwoFadeIn, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }),
            Animated.timing(TextTwoMoveIn, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true
            })
          ]),
          Animated.parallel([
            Animated.timing(TextThreeFadeIn, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }),
            Animated.timing(TextThreeMoveIn, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true
            })
          ]),
          Animated.parallel([
            Animated.timing(IconsFadeIn, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }),
            Animated.timing(IconsMoveIn, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true
            })
          ])
        ]).start()
      }, [])

    return (
        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={["#936bd1", "#9167d6", "#8f62db", "#8d5ee0", "#8b59e5", "#8857e8", "#8455eb", "#8053ee", "#7953ef", "#7253f0", "#6a53f1", "#6153f2"]} style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.iconButton} onPress={backAction}>
                    <IconOcticons name="arrow-left" color={"#FFF"} size={24}/>
                </TouchableOpacity> 
            </View>
            <View style={styles.body}>
                <View style={{...styles.logoContainer}}>
                    <Animated.Image style={{...styles.logoImage, opacity: IconFadeIn, transform:[{translateY: IconMoveIn}] }} source={icons["02d"]}/>
                    <Animated.Text style={{...styles.logoText, opacity: TextFadeIn, transform:[{translateY: TextMoveIn}] }}>mitWeather</Animated.Text>
                </View>
                <Animated.Text style={{...styles.text, opacity: TextTwoFadeIn, transform:[{translateY: TextTwoMoveIn}]}}>
                    Designed and Built by Mariano Ibarra
                </Animated.Text>
                <Animated.Text style={{...styles.text, opacity: TextThreeFadeIn, transform:[{translateY: TextThreeMoveIn}]}}>
                    Version: 0.8.0
                </Animated.Text>
            </View>

            <Animated.View style={{...styles.footer, opacity: IconsFadeIn, transform:[{translateY: IconsMoveIn}]}}>
                <TouchableOpacity style={{...styles.iconCont, paddingTop:0}} onPress={() => Linking.openURL('https://www.linkedin.com/in/marianoibarra') }>
                    <IconZocial style={styles.icon} name={"linkedin"} color={"#FFFA"} size={28}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCont} onPress={() => Linking.openURL('mailto:marianoibarratesta@outlook.com') }>
                    <IconIonicons style={styles.icon} name={"mail"} color={"#FFFA"} size={34}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCont} onPress={() => Linking.openURL('https://www.github.com/MarianoIT1') }>
                    <IconOcticons style={styles.icon} name={"mark-github"} color={"#FFFA"} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCont} onPress={() => Linking.openURL('https://www.marianoibarra.com/') }>
                    <IconFontAwesome style={styles.icon} name={"link"} color={"#FFFA"} size={30}/>
                </TouchableOpacity>
            </Animated.View>

        </LinearGradient>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    navbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 36,
        paddingLeft: '3%'
    },
    body: {
        justifyContent: 'center',
        flex:1,
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    iconButton: {
        padding: 8,
        height: '100%',

    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 20
      },
      logoText: {
        color: "#FFF",
        fontSize: 40,
        marginTop: -6,
        marginHorizontal: 5
      },
      logoImage: {
        width: 120,
        height: 120,
        marginHorizontal: 5
      },
      footer: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center'

      },
      iconCont: {
        padding:8,
        marginHorizontal:8
      }

})

export default About