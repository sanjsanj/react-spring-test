import React, { Component } from "react";
import Parallax from "./Parallax";

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchData() {
    setLoading(true);

    const fetchResp = await fetch(`https://swapi.co/api/people/`);
    const fetchJson = await fetchResp.json();

    setData(fetchJson.results);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Title</h1>
      </header>
      {/* <Parallax /> */}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data.map(person => {
          console.log(person);
          return <p key={person.name}>{person.name}</p>;
        })
      )}
    </div>
  );
}

export default App;
