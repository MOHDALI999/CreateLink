import { useState, useCallback,useEffect,useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberallow, setNumberallow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");
  ///useRef hook
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallow) string = string + "0123456789";
    if (charallow) string = string + "!@#$%^&*()_+{}[]|:;'<>,.?/~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      pass =pass+string.charAt(char);
    }

    setPassword(pass)
  }, [length, numberallow, charallow, setPassword]);

  const copy=useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
      passwordGenerator()
  },[length,numberallow,charallow,passwordGenerator])
  
  return (
    <>
      <div className="main">
        <div className="mainbox">
          <h1 className="h1">Password Genarator</h1>
          <div className="box">
            <input
              type="text"
              className="input"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
              ></input>
            <button className="button1"
            onClick={copy}
            >Copy</button>
          </div>
          <div className="box1">
            <div className="length">
              <input
                type="range"
                min="6"
                max="50"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length ({length})</label>
            </div>
            <div className="time">
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => {
                  setCharallow((prev) => !prev);
                }}></input>
              <label>Charachter</label>
            </div>
            <div className="pass">
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked={numberallow}
                onChange={() => {
                  setNumberallow((prev) => !prev);
                }}></input>
              <label>Number</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
