export const getSuggestionsAPI = (cityName) => {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=d163345ee8814c0ee3025942e6b63ce2`)
        .then(res => res.json())
}