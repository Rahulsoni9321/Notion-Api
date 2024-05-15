import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [dbname, setdbname] = useState<string | null>(null);
  const [responserecevied, setresponse] = useState("");
  useEffect(() => {}, []);

  const handleclick = async () => {
    const reponse = await axios.post("http://localhost:4000/databases", {
      data: {
        dbName:dbname,
      },

      headers: {
        "Content-Type": "application/json",
      },
    });

    setresponse(reponse.data.data.url);
  };
  return (
    <>
      <table>
        <tr>
          <td>
            <h3>1. Create a new database</h3>

            <label>Database name</label>
            <input
              type="text"
              placeholder="Enter Database Name"
              onChange={(e) => {
                setdbname(e.target.value);
              }}
            />
            <button onClick={handleclick}>Submit</button>
          </td>
        
        </tr>
      </table>
      <div>{responserecevied ?<> <a href={responserecevied} target="_blank">{responserecevied}</a> <div>{responserecevied}</div></> : ""}</div>
    </>
  );
}

export default App;
