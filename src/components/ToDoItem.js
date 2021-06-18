import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    margin: "auto",
  },
  todoContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  deleteButton: {
    textAlign: "none",
    textDecoration: "none",
    marginRight: "20px",
    border: "1px solid Red",
    padding: "6px 15px",
    borderRadius: "0.1rem",
    backgroundColor: "Red",
    fontSize: "15px",
    transition: "0.6",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
      cursor: "pointer",
    },
  },
}));

const ToDoItem = ({ showCompleted, todo, handleDelete, handleComplete }) => {
  let textdecor = todo.completed ? "line-through" : "none";

  const classes = useStyles();

  if (!showCompleted && todo.completed) {
    return null;
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.todoContent}>
          <div>
            <input
              id={`complete_${todo.id}`}
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                handleComplete(todo.id);
              }}
            />
            <lablel htmlFor={`complete_${todo.id}`}>Complete</lablel>
          </div>
          <p
            className={classes.todoName}
            style={{ textDecoration: `${textdecor}` }}>
            {todo.todoName}
          </p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
        <hr></hr>
      </div>
    );
  }
};

export default ToDoItem;
