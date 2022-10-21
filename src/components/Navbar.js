import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Outlet, useParams } from "react-router-native";
import NavbarCard from "./NavbarCard";
import SearchBar from "./SearchBar";
import icons from "../img";
import Icon from "react-native-vector-icons/Octicons"
import { LinearGradient } from "expo-linear-gradient";
import { clearError } from "../redux/actions";




const Navbar = (props) => {

    const [searchOpen, setSearchOpen] = useState(false);
    const scrollViewRef = useRef()

    let { id } = useParams(), city;  
    if (id === 'current') city = props.currentLocation;
    else city = props.cities.find(city => city.id == id)

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


    useEffect(() => {
        if(searchOpen && !props.isFetching && !props.error && props.cities.length + (props.currentLocation ? 1 : 0) > 1) setTimeout(() => {setSearchOpen(!searchOpen)}, 100)

    },[props.cities])

    useEffect(() => {
        if(!searchOpen) props.clearError()
    })

    return (
        <LinearGradient colors={gradient[city.img]} style={styles.container}>
            <View style={{...styles.navbar, height: searchOpen && props.suggestions.length > 0 ? '100%' : (props.cities.length !== 0 ? 130 : 85)}}>
                <View style={styles.inputContainer}>
                    {!searchOpen && 
                    <View style={styles.logoContainer}>
                        <Image style={styles.logoImage} source={icons["02d"]}/>
                        <Text style={styles.logoText}>mitWeather</Text>
                    </View>
                    }
                    <TouchableOpacity style={styles.iconButton} onPress={() => {setSearchOpen(!searchOpen)}} >
                        <Icon name={searchOpen ? "arrow-left" : "search"} color={"#FFF"} size={searchOpen ? 24 : 20}/>
                    </TouchableOpacity>
                    {searchOpen && 
                    <View style={styles.searchContainer}>
                        <SearchBar autofocus={true}/>
                    </View>
                    }
                </View>
                {/* {props.cities.length + (props.currentLocation ? 1 : 0) > 1 && */}
                {props.cities.length !== 0 &&
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                {props.currentLocation !== null && <NavbarCard key={props.currentLocation.apiId} img={props.currentLocation.img} name={props.currentLocation.name} temp={props.currentLocation.temp} id='current' />}
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: false})}
                        horizontal
                        style={{...styles.cardScroll }}
                        contentContainerStyle={{paddingRight:'4%', alignItems: 'center'}}
                        fadingEdgeLength={50}
                    >
                                        
                        {props.cities.map(city => <NavbarCard key={city.apiId} img={city.img} name={city.name} temp={city.temp} id={city.id} /> )
                        }
                    </ScrollView>
                </View>
                }   
            </View>
            <Outlet />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        alignItems: "center",
        paddingTop: 36,
        backgroundColor: "#rgba(255, 255, 255, 0.1)",
        justifyContent: "space-between"
    },
    searchContainer: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 8,
        height: '100%',

    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "92%",
    },
    cardScroll: {
        width: '100%',
        height: 52,
        flexGrow: 0,
        marginLeft: 4
        
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center"
      },
    logoText: {
        color: "#FFF",
        fontSize: 20,
        marginLeft: 6
    },
    logoImage: {
        width: 38,
        height: 38,
    }
})

const mapStateToProps = (state) => {
    return {
        cities: state.data,
        isFetching: state.isFetching,
        error: state.error,
        suggestions: state.suggestions,
        currentLocation: state.currentLocation,
        id: state.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(clearError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)