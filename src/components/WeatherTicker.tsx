"use client";

import { useEffect, useState } from "react";

const CITIES = [
  { name: "東京", lat: 35.6762, lon: 139.6503 },
  { name: "大阪", lat: 34.6937, lon: 135.5023 },
  { name: "札幌", lat: 43.0618, lon: 141.3545 },
  { name: "福岡", lat: 33.5904, lon: 130.4017 },
  { name: "名古屋", lat: 35.1815, lon: 136.9066 },
  { name: "仙台", lat: 38.2682, lon: 140.8694 },
  { name: "那覇", lat: 26.2124, lon: 127.6809 },
];

function weatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code <= 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 55) return "🌦️";
  if (code <= 65) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

type CityWeather = {
  name: string;
  emoji: string;
  temp: number;
};

export default function WeatherTicker() {
  const [data, setData] = useState<CityWeather[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    Promise.all(
      CITIES.map((city) =>
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&timezone=Asia%2FTokyo`
        ).then((r) => r.json())
      )
    )
      .then((results) => {
        setData(
          results.map((r, i) => ({
            name: CITIES[i].name,
            emoji: weatherEmoji(r.current.weather_code),
            temp: Math.round(r.current.temperature_2m),
          }))
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % data.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="hidden sm:flex items-center min-w-[120px]">
        <span className="text-xs text-slate-400 font-mono">--</span>
      </div>
    );
  }

  const current = data[index];

  return (
    <div
      className="hidden sm:flex items-center min-w-[120px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
    >
      <span className="text-xs font-mono text-slate-500">
        {current.emoji} {current.name} {current.temp}°C
      </span>
    </div>
  );
}
