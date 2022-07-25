import React, { useState, useEffect } from 'react';
import './App.css';
import Teste from './Teste.jsx'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [dataBackup, setDataBackup] = useState([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(data => {
      setData(data.data)
      setDataBackup(data.data)
    })
  }, [])

  const showFinalizadas = () => {
    setData([])
    const finalizadas = dataBackup.filter(d => d.completed)
    setData(finalizadas)
  }

  const showNaoFinalizadas = () => {
    setData([])
    const finalizadas = dataBackup.filter(d => !d.completed)
    setData(finalizadas)
  }

  const showAll = () => {
    setData(dataBackup)
  }

  return (
    <>
      <h1>Lista de Tarefas</h1>
      <button className="btn btn-info" onClick={() => showAll()}>Todas</button>
      <button className="btn btn-success" onClick={() => showFinalizadas()}>Fializadas</button>
      <button className="btn btn-danger" onClick={() => showNaoFinalizadas()}>Nao Finalizadas</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Titulo</th>
            <th>Status</th>
            <th>UserID</th>
          </tr>
        </thead>
        <tbody>
          {data.map(el =>
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.title}</td>
              <td>{el.completed ? <b style={{ color: "green" }}>OK</b> :
                <b style={{ color: "red" }}>Aberta</b>}</td>
              <td>{el.userId}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}



export default App;