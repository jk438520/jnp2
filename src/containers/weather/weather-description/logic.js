const R = require("ramda");

const isNotRainy = (weather) => {
    const conditions =
        R.map((forcastday) => forcastday.day.condition.text.toLowerCase(), weather.forecast.forecastday);
    const keywords = ['rain', 'sleet', 'snow', 'thunderstorm', 'drizzle'];
    return (
        !R.any((keyword) =>
                R.any((condition) =>
                        condition.indexOf(keyword) !== -1,
                    conditions),
            keywords)
    )
}

const avgIsGood = (weather) => {
    const avgTemp = R.pipe(
        R.map((forcastday) => forcastday.day.avgtemp_c),
        R.mean,
    )(weather.forecast.forecastday);
    return (18 <= avgTemp && avgTemp <= 25)
}

const tempsNotExtreme = (weather) => {
    const minTemps = R.map((forcastday) => forcastday.day.mintemp_c, weather.forecast.forecastday);
    const maxTemps = R.map((forcastday) => forcastday.day.maxtemp_c, weather.forecast.forecastday);
    const minTemp = R.reduce(R.min, Infinity, minTemps);
    const maxTemp = R.reduce(R.max, -Infinity, maxTemps);
    return (15 <= minTemp && maxTemp <= 30)
}

export const scoreWeather = (weather) => {
    let score = 0;
    if(isNotRainy(weather)) score += 1;
    if(avgIsGood(weather)) score += 1;
    if(tempsNotExtreme(weather)) score += 1;
    switch (score) {
        case 0:
        case 1:
            return "not nice";
        case 2:
            return "passable";
        case 3:
            return "nice";
        default:
            return "out of scale";
    }
}
