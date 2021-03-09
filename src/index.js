import React, { useState } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import data from "./data.json";

const options = {
  xAxis: { title: "dzień" },
  yAxis: [
    {
      title: {
        text: "Ile mielimy przepracować",
      },
    },
    {
      title: {
        text: "Ile przepracowalismy",
      },
      opposite: true,
    },
  ],
  title: {
    text: "Godziny na BRZW",
  },
  series: [
    {
      yAxis: 0,
      name: "Ile mamy przepracować",
      data: data.map((el) => el["łączna ilość godzin do przepracownia"]),
    },
    {
      yAxis: 1,
      type: "spline",
      connectNulls: true,
      connectEnds: true,
      name: "Razem dotychczas",
      data: data.map((el) => el["razem dotychczas"] || null),
    },
  ],
};

const App = () => {
  const [name, setName] = useLocalStorage("name", "Bob");

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <hr></hr>
      <label>Kto to stworzył!?</label>
      <input
        type="text"
        placeholder="Kto to stworzył"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

render(<App />, document.getElementById("root"));
