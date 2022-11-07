import React, {useState, useEffect, useRef} from "react";
import { AppState, ToastAndroid, Vibration } from "react-native";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-native";
import { changeAllowRedirect, refreshCities, setCurrentRendered } from "../redux/actions";


const Index = (props) => {

    const navigate = useNavigate();
    const goHome = () => navigate('/')
    const goToCity = (id) => { Vibration.vibrate(5); props.changeAllowRedirect(false); navigate(`/detail/${id}`)}
    const goToCurrent = () => {Vibration.vibrate(5); navigate(`/detail/current`)}
    const [lastId, setLastId] = useState(0)

     
    useEffect(() => {
        props.changeAllowRedirect(false)    
        if(props.saveData.length > 0) {
            if(props.saveData.some(entry => entry.id === 'current')) goToCurrent();
            else goToCity(props.saveData[0].id)
            props.refreshCities(props.cities, props.currentLocation)
        } else {
            goHome()
        }

      return () => {
        props.changeAllowRedirect(false)
      }
    }, [])




    useEffect(() =>
    {   
        if(props.id > lastId){
            if(props.allowRedirect) {console.log('pasa por aca'); goToCity(props.id-1)};
        }
        setLastId(props.id)
    }, [props.id])

    useEffect(() => {
        if(props.currentLocation !== null && !props.currentWasRendered){
        props.setCurrentRendered()
        goToCurrent()
        }
    }, [props.currentLocation])

    useEffect(() =>
    { 
        if(typeof props.indexRep == 'number') {
            if(props.indexRep === -1) goToCurrent();
            else goToCity(props.cities[props.indexRep].id)
        }
    }, [props.indexRep])

    useEffect(() => {
        console.log(props.saveData)
    },[props.saveData])


    return (
        <>
            <Outlet />
        </>
    )
    
}

const mapStateToProps = (state) => {
    return {
        id: state.id,
        cities: state.data,
        currentWasRendered: state.currentWasRendered,
        currentLocation: state.currentLocation,
        indexRep: state.indexRep,
        saveData: state.saveData,
        allowRedirect: state.allowRedirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentRendered: () => dispatch(setCurrentRendered()),
        refreshCities: (payload, currentLocation) => dispatch(refreshCities(payload, currentLocation)),
        changeAllowRedirect: (payload) => dispatch(changeAllowRedirect(payload)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)