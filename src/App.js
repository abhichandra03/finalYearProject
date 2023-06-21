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
  console.log(light);
  return (
    <div className="overflow-y-hidden">
      <div className="bg-gray-800 flex-col w-screen h-full py-10">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-4xl">CROP MONITORING SYSTEM</h1>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-white text-2xl">Light</h1>
          <div className="flex items-center">
            <p className="mr-5 text-2xl">Current value</p>
            <div className="box-border h-32 w-32 p-2 items-center text-2xl border-2 justify-start ...">
              {light && <p>{light[49].y}%</p>}
            </div>
            <LineChart width={1200} height={300} data={light}>
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-white text-2xl">Temperature</h1>
          <div className="flex items-center">
            <p className="mr-5 text-2xl">Current value</p>
            <div className="box-border h-32 w-32 p-2 text-2xl border-2 justify-start ...">
              {temp && <p>{temp[49].y}%</p>}
            </div>
            <LineChart width={1200} height={300} data={temp}>
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-white text-2xl">Humidity</h1>

          <div className="flex items-center">
            <p className="mr-5 text-2xl">Current value</p>
            <div className="box-border h-32 w-32 p-2 text-2xl border-2 justify-start ...">
              {humidity && <p>{humidity[49].y}%</p>}
            </div>
            <LineChart width={1200} height={300} data={humidity}>
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-white text-2xl">Moisture</h1>
          <div className="flex items-center">
            <p className="mr-5 text-2xl">Current value</p>
            <div className="box-border h-32 w-32 p-2 text-2xl border-2 justify-start ...">
              {moisture && <p>{moisture[49].y}%</p>}
            </div>
            <LineChart width={1200} height={300} data={moisture}>
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
