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
    "heavy intensity rain": "Pioggia intensa",
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
      "heavy intensity rain",
    ],
    pioggiaTuoni: ["thunderstorm"],
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
        "linear-gradient(198deg, #6d6d6d, #a0a0a0, #c2c2c2, #8b8b8b, #595959, #3e3e3e)",
      backgroundSize: "600% 600%",
      animation: "gradient-animation 30s ease infinite",
    },
    pioggia: {
      background:
        "linear-gradient(198deg, #5d7c8a, #3b4d61, #1e2c3b, #101820, #2c5364, #0f2027, #5d7c8a, #3b4d61)",
      backgroundSize: "600% 600%",
      animation: "gradient-animation 30s ease infinite",
      overlayClass: "rain",
    },
    pioggiaTuoni: {
      background:
        "linear-gradient(198deg, #3a4b57, #1b2735,#3a4b57, #1b2735, #111926, #080d13, #0a1014)",
      backgroundSize: "600% 600%",
      animation: "gradient-animation 30s ease infinite",
      overlayClass: "rain thunderstorm",
    },
    neve: {
      background:
        "linear-gradient(198deg, #e0f7ff, #cce7f0, #e0f7ff, #cce7f0, #b3d9e6, #8eb9d0, #709eb5, #587f94)",
      backgroundSize: "600% 600%",
      animation: "gradient-animation 30s ease infinite",
      overlayClass: "snow",
    },
    nebbia: {
      background:
        "linear-gradient(198deg, #d3d3d3, #c0c0c0, #a8a8a8, #8c8c8c, #727272)",
      backgroundSize: "560% 560%",
      animation: "gradient-animation 30s ease infinite",
    },
    estremi: {
      background:
        "linear-gradient(198deg, #8b0000, #ff4500, #ffa500, #d62828, #9b2226, #661010, #d62828, #ffa500)",
      backgroundSize: "600% 600%",
      animation: "gradient-animation 30s ease infinite",
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
    "clear sky": <WiDaySunny size={120} color="orange" />,
    "few clouds": <WiCloud size={120} color="gray" />,
    "scattered clouds": <WiCloudy size={120} color="darkgray" />,
    "broken clouds": <WiCloudy size={120} color="darkgray" />,
    "overcast clouds": <WiCloudy size={120} color="black" />,
    "shower rain": <WiShowers size={120} color="lightblue" />,
    "light rain": <WiShowers size={120} color="blue" />,
    "moderate rain": <WiRain size={120} color="steelblue" />,
    "heavy rain": <WiRain size={120} color="darkblue" />,
    "heavy intensity rain": <WiRain size={120} color="blue" />,
    rain: <WiRain size={120} color="steelblue" />,
    thunderstorm: <WiThunderstorm size={120} color="purple" />,
    "light snow": <WiSnow size={120} color="lightblue" />,
    snow: <WiSnow size={120} color="white" />,
    "heavy snow": <WiSnow size={120} color="gray" />,
    sleet: <WiSnow size={120} color="lightgray" />,
    mist: <WiFog size={120} color="gray" />,
    smoke: <WiSmoke size={120} color="gray" />,
    haze: <WiDayHaze size={120} color="goldenrod" />,
    "sand/dust whirls": <WiDust size={120} color="sandybrown" />,
    fog: <WiFog size={120} color="gray" />,
    sand: <WiSandstorm size={120} color="sandybrown" />,
    dust: <WiDust size={120} color="sandybrown" />,
    "volcanic ash": <WiDust size={120} color="darkgray" />,
    squalls: <WiThunderstorm size={120} color="blue" />,
    tornado: <WiTornado size={120} color="black" />,
  };

  return (
    meteoMap[descrizione.toLowerCase()] || (
      <WiDaySunny size={50} color="orange" />
    )
  );
};

export const getWeatherIconUrl = (url) => {
  const iconCode = url.split("/").pop().split("@")[0];

  const meteoMap = {
    "01d": <WiDaySunny size={120} color="orange" />,
    "01n": <WiDaySunny size={120} color="orange" />,
    "02d": <WiCloud size={120} color="gray" />,
    "02n": <WiCloud size={120} color="gray" />,
    "03d": <WiCloudy size={120} color="darkgray" />,
    "03n": <WiCloudy size={120} color="darkgray" />,
    "04d": <WiCloudy size={120} color="black" />,
    "04n": <WiCloudy size={120} color="black" />,
    "09d": <WiShowers size={120} color="lightblue" />,
    "09n": <WiShowers size={120} color="blue" />,
    "10d": <WiShowers size={120} color="steelblue" />,
    "10n": <WiShowers size={120} color="darkblue" />,
    "11d": <WiThunderstorm size={120} color="purple" />,
    "11n": <WiThunderstorm size={120} color="purple" />,
    "13d": <WiSnow size={120} color="lightblue" />,
    "13n": <WiSnow size={120} color="lightblue" />,
    "50d": <WiFog size={120} color="gray" />,
    "50n": <WiFog size={120} color="gray" />,
  };

  return meteoMap[iconCode] || <WiDaySunny size={50} color="orange" />;
};
