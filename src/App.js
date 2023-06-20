import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const App = () => {
  const [light, setLight] = useState();
  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [moisture, setMoisture] = useState();
  useEffect(() => {
    console.log("fetching data");
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let lightArr = data.light.map((elem) => {
          return { x: elem[0], y: elem[1] };
        });
        lightArr.reverse();
        setLight(lightArr);
        const tempArr = data.temperature.map((elem) => {
          return { x: elem[0], y: elem[1] };
        });
        tempArr.reverse();
        setTemp(tempArr);
        const humidityArr = data.humidity.map((elem) => {
          return { x: elem[0], y: elem[1] };
        });
        humidityArr.reverse();
        setHumidity(humidityArr);
        const moistureArr = data.moisture.map((elem) => {
          return { x: elem[0], y: elem[1] };
        });
        moistureArr.reverse();
        setMoisture(moistureArr);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <LineChart width={1200} height={300} data={light}>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="x" />
        <YAxis />
      </LineChart>
      <LineChart width={1200} height={300} data={temp}>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="x" />
        <YAxis />
      </LineChart>
      <LineChart width={1200} height={300} data={humidity}>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="x" />
        <YAxis />
      </LineChart>
      <LineChart width={1200} height={300} data={moisture}>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="x" />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default App;
