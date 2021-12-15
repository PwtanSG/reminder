import './App.css';
import { useState, useEffect} from "react";
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
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

  const addTask = (task) => {
    console.log(task)
    const id=Math.floor(Math.random() * 1000 + 1);
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
    //console.log(newTask)
  }

  const deleteTask = (id) => {
    //console.log("delete",id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    console.log(id)
    setTasks(
      tasks.map((task)=>
        task.id===id? {...task, reminder:!task.reminder} : task
      )
    )
  }

  return (
    <div className="container">
        <Header title='Task tracker' onAdd={()=>setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
        {showAddTask && <AddTask onAdd = {addTask}/>}
        {tasks.length>0? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : 'No tasks found.'}
    </div>

  );
}

export default App;
