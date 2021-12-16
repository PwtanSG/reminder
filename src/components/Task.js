import { FaTimes } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"


const Task = ({ task, onDelete, onEdit, onToggle }) => {

    return(
        <div className={`task ${task.reminder? 'reminder':''}`} onDoubleClick={()=>onToggle(task.id)}>
            <h3>
                {task.title} 
                <FaTimes style={deleteStyle} onClick={()=>onDelete(task.id)} />
                <FaEdit onClick={()=>onEdit(task)}/>

            </h3>
            <p>{task.day}</p>
        </div>
    );
}

const deleteStyle = {
    color:'red',
    cursor: 'pointer'
}

export default Task;