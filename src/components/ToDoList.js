import React, { useState, useEffect } from "react";
import AddToDo from "./AddTodo";
import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
  const [loading, setLoading] = useState(false);

  const [path, setPath] = useState(`${props.dataDomain}/todos`);

  const [todoList, setTodoList] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const sendDataToNetwork = async (newData) => {
    try {
      const { data, dataLink } = await props.mySky.setJSON(path, newData);
      console.log("Data after setJSON:", data);
      console.log("DataLink after setJSON: ", dataLink);

      const response = await props.mySky.getJSON(path);
      console.log("Data After getJSON: ", response.data);
      console.log("DataLink after getJSON: ", dataLink);

      setTodoList(response.data.todos);

      // console.log("Data After posting: ", data2);
      // console.log("Data Link after posting: ", dataLink2);
    } catch (err) {
      console.log(err);
    }
  };

  const getMaxId = (todos) => {
    if (todoList.length === 0) {
      return 0;
    }
    let maxId = 0;
    var i;
    for (i = 0; i < todoList.length; i++) {
      if (todoList[i].id > maxId) {
        maxId = todoList[i].id;
      }
    }
    return maxId;
  };

  const addToDo = async (todo) => {
    setLoading(true);
    let newTodos = [
      ...todoList,
      {
        id: getMaxId() + 1,
        todoName: todo,
        completed: false,
      },
    ];
    setTodoList(newTodos);
    let newData = {
      todos: newTodos,
    };
    sendDataToNetwork(newData);
    setLoading(false);
  };

  const handleDelete = (_id) => {
    let newTodos = todoList.filter((todo) => todo.id !== _id);
    setTodoList(newTodos);
    let newData = {
      todos: newTodos,
    };
    sendDataToNetwork(newData);
  };

  //Mark todo as complete.
  const handleComplete = (_id) => {
    let newTodos = todoList.map((todo) => {
      if (todo.id == _id) {
        return {
          id: _id,
          todoName: todo.todoName,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });

    let completedTodos = todoList.filter((todo) => todo.completed == true);
    setTodoList(completedTodos);
    let newData = {
      todos: newTodos,
    };
    sendDataToNetwork(newData);
  };

  //Initailly get all Todos.
  useEffect(async () => {
    setLoading(true);
    try {
      // Get discoverable JSON data from the given path.
      const response = await props.mySky.getJSON(path);
      console.log("Initial Todos: ", response.data);
      //Show only those not completed.

      setTodoList(response.data.todos);
    } catch (error) {
      console.log("Error with getJSON: ", error);
    }
    setLoading(false);
  }, []);

  return (
    <div>
      <AddToDo addToDo={addToDo}></AddToDo>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <input
            id="complete"
            type="checkbox"
            onChange={() => {
              setShowCompleted(!showCompleted);
            }}></input>
          <label htmlFor="complete">Show Completed</label>
          {todoList.length > 0 ? (
            todoList.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                showCompleted={showCompleted}
                handleDelete={handleDelete}
                handleComplete={handleComplete}></ToDoItem>
            ))
          ) : (
            <p>No ToDo's Created</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ToDoList;
