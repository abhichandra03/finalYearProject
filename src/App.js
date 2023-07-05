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
      <div className="bg-gradient-to-r from-green-500 flex-col w-screen h-full py-10 font-sans  ">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-black-900 text-6xl  font-serif italic">
            CROP MONITORING SYSTEM
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-black-900 text-4xl italic">Light</h1>
          <div className="flex items-center">
            <div className="box-border h-350 w-25 p-2 items-center text-2xl border-gray-500 border-2 justify-start ...">
              <p className="mr-5 text-4xl text-black-900 italic">
                Current value
              </p>
              {light && <p className="text-center">{light[49].y}%</p>}
            </div>
            <LineChart width={1200} height={300} data={light}>
              <Line type="monotone" dataKey="y" stroke="#7f00ff" />
              <CartesianGrid stroke="#000000" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-black-900 text-4xl italic">Temperature</h1>
          <div className="flex items-center">
            <div className="box-border h-350 w-25 p-2 text-2xl border-2 border-gray-500 justify-start ...">
              <p className="mr-5 text-4xl text-black-900 italic">
                Current Value
              </p>
              {temp && <p className="text-center">{temp[49].y}C</p>}
            </div>
            <LineChart width={1200} height={300} data={temp}>
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
              <CartesianGrid stroke="#000000" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-black-900 text-4xl italic">Humidity</h1>

          <div className="flex items-center">
            <div className="box-border h-350 w-25 p-2 text-2xl border-2 border-gray-500 justify-start ...">
              <p className="mr-5 text-4xl text-black-900 italic">
                Current value
              </p>
              {humidity && <p className="text-center">{humidity[49].y}%</p>}
            </div>
            <LineChart width={1200} height={300} data={humidity}>
              <Line type="monotone" dataKey="y" stroke="#51087E" />
              <CartesianGrid stroke="#000000" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-10">
          <h1 className="text-black-900 text-4xl italic">Soil Moisture</h1>
          <div className="flex items-center">
            <div className="box-border h-350 w-25 p-2 text-2xl border-2 border-gray-500 justify-start ...">
              <p className="mr-5 text-4xl text-black-900 italic">
                Current value
              </p>
              {moisture && <p className="text-center">{moisture[49].y}%</p>}
            </div>
            <LineChart width={1200} height={300} data={moisture}>
              <Line type="monotone" dataKey="y" stroke="#A020F0" />
              <CartesianGrid stroke="#000000" />
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
