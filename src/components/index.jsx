import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data && data.products && data.products.length) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error! " + error);
    }
  }

  //useEffect(fetchData(url), [url]);

  function handleScrollPercent() {
    const scrollLength =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollPercent((scrollLength / height) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercent);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
    
    if (errorMessage) (<div>Error ! { errorMessage}</div>)

  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
        <div className="progress-container">
          <div
            className="current-progress"
            style={{ width: `${scrollPercent}%` }}
          ></div>
        </div>
      </div>
      <div className="data-container">
        <button onClick={() => fetchData(url)}>Load list</button>
        {loading ? (
          <h2>Loading... Please wait</h2>
        ) : (
          data.map((dataItem) => <p key={dataItem.id}>{dataItem.title}</p>)
        )}
      </div>
    </div>
  );
}
