import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, Vibration } from "react-native";
import { connect } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-native";
import NavbarCard from "./NavbarCard";
import SearchBar from "./SearchBar";
import icons from "../img";
import Icon from "react-native-vector-icons/Octicons"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import { LinearGradient } from "expo-linear-gradient";
import { clearError, changeAllowScroll, changeUnit } from "../redux/actions";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import SwitchSelector from 'react-native-switch-selector'



const Navbar = (props) => {

    const [searchOpen, setSearchOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const hideMenu = () => setMenuVisible(false);
    const showMenu = () => setMenuVisible(true);
    const scrollViewRef = useRef()
    const navigate = useNavigate()

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

    const options = [
        { label: "°C", value: "celsius" },
        { label: "°F", value: "fahrenheit" },
      ];

    useEffect(() => {
        if(searchOpen && !props.isFetching && !props.error && props.cities.length + (props.currentLocation ? 1 : 0) > 1) setTimeout(() => {setSearchOpen(!searchOpen)}, 100)

    },[props.cities, props.currentLocation])

    useEffect(() => {
        if(!searchOpen) props.clearError()
    })

    const scrollOnChanges = () => {

        if(props.allowScroll === 2) {scrollViewRef.current.scrollToEnd({animated: false}); props.changeAllowScroll(0)}
        if(props.allowScroll === 1) {scrollViewRef.current.scrollTo({x:0, animated: false}); props.changeAllowScroll(0)}
    }

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

                    <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => { Vibration.vibrate(5) ;setSearchOpen(!searchOpen)}} >
                            <Icon name={searchOpen ? "arrow-left" : "search"} color={"#FFF"} size={searchOpen ? 24 : 20}/>
                        </TouchableOpacity>
                        {!searchOpen && 
                            <Menu
                                visible={menuVisible}
                                anchor={<IconMaterial style={{padding:8, paddingRight:0}} onPress={showMenu} name="more-vert" color={"#FFF"} size={24} />}
                                onRequestClose={hideMenu}
                            >
                                <MenuItem onPress={() => {hideMenu, props.changeUnit()}}>Change unit: <Text style={{fontWeight:'bold'}}>{props.unit === 'celsius' ? '°C' : '°F'}</Text></MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={() => {hideMenu, navigate('/about')}}>About</MenuItem>
                            </Menu>
                        }

                    </View>
                    {searchOpen && 
                    <View style={styles.searchContainer}>
                        <SearchBar autofocus={true}/>
                    </View>
                    }
                </View>
                {props.cities.length !== 0 &&
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                {props.currentLocation !== null && <NavbarCard key={props.currentLocation.apiId} img={props.currentLocation.img} name={props.currentLocation.name} temp={props.currentLocation.temp} id='current' />}
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={scrollOnChanges}
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
        justifyContent: "space-between",
        zIndex: 10
    },
    searchContainer: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 8,
        height: '100%'
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "94%",
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
        marginLeft: 4,
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
        id: state.id,
        allowRedirect: state.allowRedirect,
        allowScroll: state.allowScroll,
        unit: state.unit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(clearError()),
        changeAllowScroll: (s) => dispatch(changeAllowScroll(s)),
        changeUnit: () => dispatch(changeUnit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)




                                    