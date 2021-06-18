import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: "5px 35px 5px 5px",
    marginRight: "10px",
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

const AddTodo = ({ addToDo }) => {
  const classes = useStyles();

  const [todoName, setTodoName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addToDo(todoName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        input="text"
        className={classes.input}
        onChange={(e) => setTodoName(e.target.value)}
        required
        // style={{ padding: "5px 30px 5px 5px" }}
        value={todoName}></input>
      <button type="submit" className={classes.button} disabled={!todoName}>
        Add ToDo
      </button>
    </form>
  );
};

export default AddTodo;
