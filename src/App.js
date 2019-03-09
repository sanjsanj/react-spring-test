import React from "react";
import Parallax from "./Parallax";
import "whatwg-fetch";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  useTrail,
  animated,
} from "react-spring";

function App() {
  const [data, setData] = React.useState({ people: [] });
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    setData({ people: [] });

    const fetchResp = await fetch(`https://swapi.co/api/people/`);
    const fetchJson = await fetchResp.json();

    setData({ people: fetchJson.results });
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

  const config = { mass: 20, tension: 1200, friction: 200 };
  const peopleTrail = useTrail(data.people.length, {
    config: config.gentle,
    from: { opacity: 0, fontSize: "10px" },
    to: { opacity: 1, fontSize: "60px" },
  });

  // console.log(data);

  const imageSpringStyleProps = useSpring({
    config: config.gentle,
    from: { opacity: 0, transform: "translateX(100px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 2000,
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
        peopleTrail.map((props, index) => (
          <animated.div key={index} style={props}>
            <>
              {data.people[index].name}
              <animated.img
                style={{ ...imageSpringStyleProps, height: "100px" }}
                alt={data.people[index].name}
                src={`https://source.unsplash.com/1600x900/?${
                  data.people[index].name
                }`}
              />
            </>
          </animated.div>
        ))
      )}
    </div>
  );
}

export default App;
