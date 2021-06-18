import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "50px",
    background: "none",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appTitle: {
    marginLeft: "20px",
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "25px",
  },
  button: {
    textAlign: "none",
    textDecoration: "none",
    marginRight: "20px",
    border: "1px solid black",
    padding: "6px 15px",
    borderRadius: "0.1rem",
    backgroundColor: "white",
    fontSize: "15px",
    transition: "0.6",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
      cursor: "pointer",
    },
  },
}));

const Header = ({ loggedIn, handleSkyLogin, handleSkyLogout }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.appTitle}>
          <span className={classes.title}>To Do App</span>
        </div>
        {loggedIn ? (
          <button className={classes.button} onClick={handleSkyLogout}>
            Log Out
          </button>
        ) : (
          <button className={classes.button} onClick={handleSkyLogin}>
            Log In With Skynet
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
