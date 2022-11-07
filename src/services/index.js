export const fetchCityAPIByName = (cityName, id) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d163345ee8814c0ee3025942e6b63ce2`)
        .then(r => r.json())
        .then((res) => {
            const city = {
                min: Math.round(res.main.temp_min),
                max: Math.round(res.main.temp_max),
                temp: Math.round(res.main.temp),
                img: res.weather[0].icon,
                apiId: res.id,
                id: id,
                name: res.name,
                weather: res.weather[0].description,
                lat: res.coord.lat,
                lon: res.coord.lon,
                timezone: res.timezone
            };
            return city;
        })
        .then((city) => {
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=d163345ee8814c0ee3025942e6b63ce2`)
                .then(r => r.json())
                .then((res) => {
                    const newCity ={
                        ...city,
                        ext: res.list
                    }
                return newCity
                })
            })
    }

export const fetchCityAPIByCoordinates = (location, id) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=d163345ee8814c0ee3025942e6b63ce2`)
        .then(r => r.json())
        .then((res) => {
            const city = {
                min: Math.round(res.main.temp_min),
                max: Math.round(res.main.temp_max),
                temp: Math.round(res.main.temp),
                img: res.weather[0].icon,
                apiId: res.id,
                id: id,
                weather: res.weather[0].description,
                lat: res.coord.lat,
                lon: res.coord.lon,
                timezone: res.timezone
            };
            return city;
        })
        .then((city) => {
            return fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=d163345ee8814c0ee3025942e6b63ce2`)
                .then(r => r.json())
                .then((res) => {
                    const newCity ={
                        ...city,
                        name: res[0].name
                    }
                return newCity
                })
            })
        .then((city) => {
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=d163345ee8814c0ee3025942e6b63ce2`)
                .then(r => r.json())
                .then((res) => {
                    const newCity ={
                        ...city,
                        ext: res.list
                    }
                return newCity
            
                })
            })
    }