import './App.css';
import { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';
import About from './components/About';
import EditTask from './components/EditTask';


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [edTask, setEdTask] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(()=> {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  },[]);


  //async await fetch api 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    //console.log(data);
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    //console.log(data);
    return data;
  };

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type':'application/json',
      },
      body:JSON.stringify(task)
    });
    const newTask = await res.json();
    //console.log(task)
    // const id=Math.floor(Math.random() * 1000 + 1);
    // const newTask = {id, ...task};
    const allTasks = await fetchTasks();
    //setTasks([...tasks, newTask]);
    setTasks(allTasks);
    setShowAddTask(false);
    //console.log(newTask)
  }

  const deleteTask = async (id) => {
    //console.log("delete",id)
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE'
    });
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (task) => {
    setEdTask(task);
    setShowEditTask(!showEditTask);
    setShowAddTask(false);
  }

  const onSaveEditTask = async(task) => {
    setShowEditTask(false);
    const editedTask = {title:task.title, day:task.day, reminder:task.reminder} 
    const res = await fetch(`http://localhost:5000/tasks/${task.taskId}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body:JSON.stringify(editedTask)
    })
    const allTasks = await fetchTasks();
    setTasks(allTasks);
  }

  const toggleReminder = async (id) => {
    //console.log(id)
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder:!taskToToggle.reminder}
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body:JSON.stringify(updatedTask)
    })
    
    const data = await res.json();

    setTasks(
      tasks.map((task)=>
        task.id===id? {...task, reminder:data.reminder} : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
          <Header title='Task tracker' onAdd={()=>setShowAddTask(!showAddTask)} showAddTask={showAddTask} showEditTask={showEditTask} onBack={()=>setShowEditTask(!showEditTask)}/>
          {showEditTask && <EditTask editTask = {edTask} onSaveEditTask={onSaveEditTask} />}
          {showAddTask && <AddTask onAdd = {addTask}/>}
          {!showEditTask && tasks.length>0? (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} onToggle={toggleReminder}/>) : showEditTask? '' : 'No tasks found.'}         
          <Footer />

      </div>
    </Router>
  );
}

export default App;
