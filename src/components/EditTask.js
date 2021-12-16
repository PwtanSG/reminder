import { useState } from 'react';

const EditTask = ({ editTask,  onSaveEditTask}) => {
    //const [taskId, setTaskId] = useState(editTask.id);
    const taskId = editTask.id;
    const [title, setTitle] = useState(editTask.title);
    const [day, setDay] = useState(editTask.day);
    const [reminder, setReminder] = useState(editTask.reminder);

    const onSubmit = (e) => {
        //prevent submit to a page
        e.preventDefault() 
        //validate data
        if(!title || !day){
            alert('Please enter all fields');
            return;
        }
        //console.log({title:title, day:day, reminder: reminder})
        //console.log(title)
        onSaveEditTask({taskId, title, day, reminder});

        //clear form input
        setTitle('');
        setDay('');
        setReminder(false);
    }

    return(
        
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>{'id:' + taskId}</label>
            </div>
            <div className="form-control">
                <label>Task</label>
                <input 
                    type='text' 
                    placeholder="title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Day & time</label>
                <input 
                    type='text' 
                    placeholder="date/time"
                    value={day}
                    onChange={(e)=>setDay(e.target.value)}                    
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input 
                    type='checkbox'
                    value={reminder}
                    checked={reminder}
                    onChange={(e)=>setReminder(e.currentTarget.checked)}         
                />
            </div>
            <input type='submit' value='Save' className="btn btn-block"/>
        </form>
    );
}

export default EditTask;