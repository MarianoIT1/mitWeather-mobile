import React from "react";
import {  StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Link, useLocation, useNavigate, useParams } from "react-router-native"
import { connect } from "react-redux";
import { removeCity } from "../redux/actions";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/Octicons"

const NavbarCard = (props) => {

    const { pathname } = useLocation();
    const active = pathname === `/detail/${props.id}`

    const navigate = useNavigate();
    const goHome = () => navigate('/')
    const goToCity = (id) => navigate(`/detail/${id}`)
    const { id } = useParams()

    const redirect = () => {
        let r, index;
        if(props.cities.length <= 1) goHome();
        else if(props.id == id) {
          index = props.cities.findIndex(city => city.id == id)
          if(index < props.cities.length-1) r = props.cities[index+1].id;
          else r = props.cities[props.cities.length-2].id;
          goToCity(r)
        }
      }

    return (
        <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={gradient[props.img]} style={active? styles.activeContainer : styles.container}>
            <Link underlayColor="#DDDDDD00" activeOpacity={1} style={styles.link} to={`/detail/${props.id}`}>
                <View style={styles.textContainer}>
                    {props.id === 'current' && <Icon2 style={styles.icon} name={"location"} color={"#FFF"} size={12}/>}
                    <Text style={styles.cityName}>{props.name}</Text>
                    <Text style={styles.cityTemp}>{props.temp}°</Text>
                </View>
            </Link>
            {props.id !== 'current' && <TouchableOpacity onPress={() => {redirect(); props.removeCity(props.id)}}>
                <View style={styles.close}>
                    <Icon style={styles.closeText} name={"md-close"} color={"#FFF"} size={12}/>
                </View>
            </TouchableOpacity>}
        </LinearGradient>
    )
}

const gradient = {
    "01d": ['#2165a8', '#6896c5'],
    "01n": ['#070e21', '#2e3844'],
    "02d": ['#187eb2', '#65a3c5'],
    "02n": ['#070e21', '#2e3844'],
    "03d": ['#597388', '#80a9be'],
    "03n": ['#070e21', '#2e3844'],
    "04d": ['#3f5161', '#597585'],
    "04n": ['#070e21', '#2e3844'],
    "09d": ['#3f5161', '#597585'],
    "09n": ['#070e21', '#2e3844'],
    "10d": ['#3f5161', '#597585'],
    "10n": ['#070e21', '#2e3844'],
    "11d": ['#3f5161', '#597585'],
    "11n": ['#070e21', '#2e3844'],
    "13d": ['#3f5161', '#597585'],
    "13n": ['#070e21', '#2e3844'],
    "50d": ['#3f5161', '#597585'],
    "50n": ['#070e21', '#2e3844'],
}

const mapStateToProps = (state) => {
    return {
      cities: state.data
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        removeCity: (id) => dispatch(removeCity(id))
    }
}

const styles = StyleSheet.create({
    activeContainer: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "space-between",
        height: 36,
        overflow: "hidden",
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 18,
        padding: 0,
        paddingLeft: 9,
        marginRight: 4,
        
    },
    container: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "space-between",
        height: 36,
        borderRadius: 18,
        padding: 1,
        paddingLeft: 10,
        marginRight: 4,
        overflow: "hidden"
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        marginRight: 8,
    },
    cityName: {
        color: '#fff',
        marginRight: 6,
        fontSize: 13
        
    },
    cityTemp: {
        color: '#fff',
        fontSize: 18

    },
    close: {
        backgroundColor: "rgba(255, 255, 255, .25)",
        width: 17,
        height: 17,
        borderRadius: 10,
        color: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    closeText: {
        color: "#FFF",
    },
    icon: {
        paddingRight: 6
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarCard)
