export const tempConvert = function(k, unit){
    if(unit === 'celsius') {
        return Math.round(k - 273.15)
    } else if(unit === 'fahrenheit') {
        return Math.round((k - 273.15) * 1.8 + 32)
    }
}