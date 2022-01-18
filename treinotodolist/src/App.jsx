import "./App.css";
import { React, useState, useEffect } from "react";
import { TiDelete, TiEdit } from "react-icons/ti";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Boa from "./Components/Boa";

function App() {
  let [todoList, setTodoList] = useState([]);
  let [taskInput, settaskInput] = useState("");
  const [togleSubmit, setTogleSubmit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todoList");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodoList(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todoList);
    localStorage.setItem("todoList", json);
  }, [todoList]);

  function adicionarNovoItem() {
    if (!taskInput) {
      alert("Escreava uma Tarefa📝");
    } else if (taskInput && togleSubmit) {
      setTodoList(
        todoList.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: taskInput };
          }
          return elem;
        })
      );
      setTogleSubmit(false);
      settaskInput("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: taskInput,
      };
      setTodoList([...todoList, allInputData]);
      settaskInput("");
    }
  }

  function deletarItem(index) {
    const updateTodo = todoList.filter((elem) => {
      return index !== elem.id;
    });

    setTodoList(updateTodo);
  }

  const inputKeyDown = (e) => {
    if (e.keyCode === 13) adicionarNovoItem();
  };

  const edititem = (id) => {
    const newEditItem = todoList.find((elem) => {
      return elem.id === id;
    });

    setTogleSubmit(true);
    settaskInput(newEditItem.name);
    setIsEditItem(id);
  };

  return (
    <Router>
      <div className="app">
        <Route
          path="/"
          exact
          render={() => {
            return (
              <>
                <h1>Lista de Tarefas</h1>
                <input
                  placeholder="Escreva uma Tarefa"
                  onKeyDown={inputKeyDown}
                  value={taskInput}
                  onChange={(value) => settaskInput(value.target.value)}
                />
                {togleSubmit ? (
                  <button
                    className="btnEdit"
                    onClick={() => adicionarNovoItem()}
                  >
                    Editar
                  </button>
                ) : (
                  <button onClick={() => adicionarNovoItem()}>Adicionar</button>
                )}
                <div className="div2">
                  <ul>
                    {todoList?.length ? (
                      todoList.map((elem) => (
                        <div className="li" key={elem.id}>
                          <li>{elem.name}</li>
                          <TiEdit onClick={() => edititem(elem.id)}></TiEdit>
                          <TiDelete
                            className="delete"
                            onClick={() => deletarItem(elem.id)}
                          >
                            Delete
                          </TiDelete>
                        </div>
                      ))
                    ) : (
                      <img src="https://media4.giphy.com/media/3ohs4lMc4Vm8JMQog0/giphy.gif?cid=790b76119326892436bfab53187c5b61a0a643e02b828ec2&rid=giphy.gif&ct=s" />
                    )}
                  </ul>
                </div>
                
                <button className="btnBoa"><Link className="link" to="/Boa">Clique Aqui!</Link></button>
              </>
            );
          }}
        />
        <Route path="/:Boa" exact component={Boa} />
      </div>
    </Router>
  );
}
export default App;
