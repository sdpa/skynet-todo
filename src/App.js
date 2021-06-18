import { SkynetClient } from "skynet-js";

import ToDoList from "./components/ToDoList";
import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";

// const hostApp = "localhost";
const portal = "https://siasky.net/";

const client = new SkynetClient(portal);

function App() {
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState();

  const dataDomain = "localhost";
  // console.log("dataDomain: ", dataDomain);

  useEffect(() => {
    const mySkyinit = async () => {
      try {
        const mysky = await client.loadMySky(dataDomain);
        // console.log("Logged In: ", loggedIn);
        console.log("Client: ", client);
        console.log("My Sky: ", mysky);

        const loggedIn = await mysky.checkLogin();

        setMySky(mysky);
        setLoggedIn(loggedIn);

        if (loggedIn) {
          setUserID(await mysky.userID());
        }
      } catch (err) {
        console.log("Error with Skyinit: ", err);
      }
    };

    mySkyinit();
  }, []);

  const handleSkyLogin = async () => {
    const status = await mySky.requestLoginAccess();

    setLoggedIn(status);

    if (status) {
      // console.log("My Sky"mySky);
      setUserID(await mySky.userID());
    }
  };

  const handleSkyLogout = async () => {
    await mySky.logout();
    setLoggedIn(false);
    setUserID("");
  };

  return (
    <div className="App">
      {/* {loggedIn ? (
        <>
          <Button
            onClick={handleSkyLogout}
            variant="contained"
            colot="primary"
            style={{ marginTop: "10px" }}>
            Log Out
          </Button>
          <ToDoList
            client={client}
            mySky={mySky}
            portal={portal}
            handleSkyLogin={handleSkyLogin}
            dataDomain={dataDomain}></ToDoList>
        </>
      ) : (
        <Button onClick={handleSkyLogin} variant="filled">
          Log In with Skynet
        </Button>
      )} */}
      {/* <ToDo client={client} handleSkyLogin={handleSkyLogin}></ToDo> */}
      <Header
        loggedIn={loggedIn}
        handleSkyLogin={handleSkyLogin}
        handleSkyLogout={handleSkyLogout}
      />
      {loggedIn ? <ToDoList mySky={mySky} dataDomain={dataDomain} /> : null}
    </div>
  );
}

export default App;
