import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Frontend MVC</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
