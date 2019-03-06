import React, { Component } from "react";
import Parallax from "./Parallax";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  useTrail,
  animated,
} from "react-spring";

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);

    const fetchResp = await fetch(`https://swapi.co/api/people/`);
    const fetchJson = await fetchResp.json();

    setData(fetchJson.results);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // const transRef = React.useRef();
  // const transitions = useTransition(data, person => person.name, {
  //   ref: transRef,
  //   unique: true,
  //   trail: 4000,
  //   from: { opacity: 0, fontSize: "10px" },
  //   enter: { opacity: 1, fontSize: "24px" },
  //   leave: { opacity: 0, fontSize: "10px" },
  // });

  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(data.length, {
    config,
    from: { opacity: 0, fontSize: "10px" },
    to: { opacity: 1, fontSize: "60px" },
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Title</h1>
      </header>

      {/* <Parallax /> */}

      <button onClick={() => fetchData()}>Load</button>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        // data.length &&
        trail.map((props, index) => (
          <animated.div key={index} style={props}>
            {data[index].name}
          </animated.div>
        ))
      )}
    </div>
  );
}

export default App;
