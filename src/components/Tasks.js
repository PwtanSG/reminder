import Task from "./Task";

const Tasks = ({ tasks, onDelete, onEdit, onToggle }) => {
 
    return (
        <>
            {tasks.map(task=>
                <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle}/>
            )}
        </>
    );
}

export default Tasks;

