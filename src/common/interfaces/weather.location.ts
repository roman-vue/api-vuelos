export interface IWeather {
    id:                     number;
    weather_state_name:     WeatherStateName;
    weather_state_abbr:     WeatherStateAbbr;
    wind_direction_compass: WindDirectionCompass;
    created:                Date;
    applicable_date:        Date;
    min_temp:               number;
    max_temp:               number;
    the_temp:               number;
    wind_speed:             number;
    wind_direction:         number;
    air_pressure:           number;
    humidity:               number;
    visibility:             number | null;
    predictability:         number;
}

export enum WeatherStateAbbr {
    C = "c",
    Hc = "hc",
    Hr = "hr",
    Lc = "lc",
    S = "s",
}

export enum WeatherStateName {
    Clear = "Clear",
    HeavyCloud = "Heavy Cloud",
    HeavyRain = "Heavy Rain",
    LightCloud = "Light Cloud",
    Showers = "Showers",
}

export enum WindDirectionCompass {
    Nne = "NNE",
    SSE = "SSE",
    Sw = "SW",
    W = "W",
    Wnw = "WNW",
    Wsw = "WSW",
}
