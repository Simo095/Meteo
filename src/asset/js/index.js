import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiDayHaze,
  WiSmoke,
  WiDust,
  WiSandstorm,
  WiTornado,
} from "react-icons/wi";
export const getWeatherTranslation = (weatherDescription) => {
  const translations = {
    "clear sky": "Cielo sereno",
    "few clouds": "Poche nuvole",
    "scattered clouds": "Nuvolosità sparsa",
    "broken clouds": "Nuvoloso",
    "overcast clouds": "Cielo coperto",
    "shower rain": "Rovesci di pioggia",
    "light rain": "Pioggia leggera",
    "moderate rain": "Pioggia moderata",
    "heavy rain": "Pioggia intensa",
    rain: "Pioggia",
    thunderstorm: "Temporale",
    "light snow": "Neve leggera",
    snow: "Neve",
    "heavy snow": "Neve abbondante",
    sleet: "Nevischio",
    mist: "Nebbia leggera",
    smoke: "Fumo",
    haze: "Foschia",
    "sand/dust whirls": "Vortici di sabbia",
    fog: "Nebbia",
    sand: "Tempesta di sabbia",
    dust: "Polvere",
    "volcanic ash": "Cenere vulcanica",
    squalls: "Raffiche di vento",
    tornado: "Tornado",
  };

  return translations[weatherDescription] || weatherDescription;
};
export const getWeatherGradient = (weatherDescription) => {
  const weatherGroups = {
    sereno: ["clear sky"],
    nuvoloso: [
      "few clouds",
      "scattered clouds",
      "broken clouds",
      "overcast clouds",
    ],
    pioggia: [
      "shower rain",
      "light rain",
      "moderate rain",
      "heavy rain",
      "rain",
      "thunderstorm",
    ],
    neve: ["light snow", "snow", "heavy snow", "sleet"],
    nebbia: ["mist", "smoke", "haze", "fog"],
    estremi: [
      "sand/dust whirls",
      "sand",
      "dust",
      "volcanic ash",
      "squalls",
      "tornado",
    ],
  };

  const gradients = {
    sereno: {
      background:
        "linear-gradient(198deg , #4fdbfa, #f8ff3c, #a9b981, #0293f1, #fcd77a, #10c3ff, #7c5c0b, #342d01)",
      backgroundSize: "560% 560%",
      animation: "gradient-animation 30s ease infinite",
    },
    nuvoloso: {
      background:
        "linear-gradient(to bottom, #a0a0a0, #d3d3d3, #808080, #585858)",
    },
    pioggia: {
      background: "linear-gradient(to bottom, #5d7c8a, #3b4d61, #1e2c3b)",
    },
    neve: {
      background: "linear-gradient(to bottom, #dff6ff, #b0e0e6, #8ecae6)",
    },
    nebbia: {
      background: "linear-gradient(to bottom, #d3d3d3, #a9a9a9, #808080)",
    },
    estremi: {
      background: "linear-gradient(to bottom, #8b0000, #ff4500, #ffa500)",
    },
  };

  for (const [categoria, condizioni] of Object.entries(weatherGroups)) {
    if (condizioni.includes(weatherDescription)) {
      return gradients[categoria];
    }
  }

  return gradients.sereno;
};

export const getWeatherIcon = (descrizione) => {
  const meteoMap = {
    "clear sky": <WiDaySunny size={50} color="orange" />,
    "few clouds": <WiCloud size={50} color="gray" />,
    "scattered clouds": <WiCloudy size={50} color="darkgray" />,
    "broken clouds": <WiCloudy size={50} color="darkgray" />,
    "overcast clouds": <WiCloudy size={50} color="black" />,
    "shower rain": <WiShowers size={50} color="blue" />,
    "light rain": <WiShowers size={50} color="blue" />,
    "moderate rain": <WiRain size={50} color="blue" />,
    "heavy rain": <WiRain size={50} color="darkblue" />,
    rain: <WiRain size={50} color="blue" />,
    thunderstorm: <WiThunderstorm size={50} color="purple" />,
    "light snow": <WiSnow size={50} color="lightblue" />,
    snow: <WiSnow size={50} color="white" />,
    "heavy snow": <WiSnow size={50} color="gray" />,
    sleet: <WiSnow size={50} color="lightgray" />,
    mist: <WiFog size={50} color="gray" />,
    smoke: <WiSmoke size={50} color="gray" />,
    haze: <WiDayHaze size={50} color="goldenrod" />,
    "sand/dust whirls": <WiDust size={50} color="sandybrown" />,
    fog: <WiFog size={50} color="gray" />,
    sand: <WiSandstorm size={50} color="sandybrown" />,
    dust: <WiDust size={50} color="sandybrown" />,
    "volcanic ash": <WiDust size={50} color="darkgray" />,
    squalls: <WiThunderstorm size={50} color="blue" />,
    tornado: <WiTornado size={50} color="black" />,
  };

  return (
    meteoMap[descrizione.toLowerCase()] || (
      <WiDaySunny size={50} color="orange" />
    )
  ); // Default soleggiato
};
