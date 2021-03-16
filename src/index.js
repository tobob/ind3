import React, { useState, useMemo, useEffect, useRef } from "react";
import { render } from "react-dom";
import { useObservable, useSubscription } from "observable-hooks";
import { map } from "rxjs/operators";
import { interval } from "rxjs";
import takeRight from "lodash/takeRight";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const App = () => {
  const [bt, setBt] = useState([]);
  const [et, setEt] = useState([]);

  const sub = useRef();
  const bt$ = useObservable(() =>
    interval(1000).pipe(map(() => getRandomInt(100, 1000)))
  );

  const et$ = useObservable(() =>
    interval(1000).pipe(map(() => getRandomInt(10, 50)))
  );

  const pushtoBT = (val) => setBt(takeRight([...bt, val], 30));
  const pushtoET = (val) => setEt(takeRight([...et, val], 30));

  useSubscription(bt$, pushtoBT);
  useSubscription(et$, pushtoET);

  const options = useMemo(() => ({
    title: {
      text: "Bitcoin and Etherium",
    },
    xAxis: {
      type: "datetime",
    },
    series: [
      {
        data: bt,
        name: "BT",
        type: "area",
      },
      {
        data: et,
        name: "Et",
        type: "area",
      },
    ],
  }));

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

render(<App />, document.getElementById("root"));
