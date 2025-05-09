const { useState } = React; 
function TodoList() {
  const [tasks, setTasks] = useState([]);  
  const [newTask, setNewTask] = useState(""); 

  function addTask() {
    if (newTask !== "") {
      setTasks([...tasks, newTask]); 
      setNewTask("");  
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);  
    setTasks(updatedTasks);  
  }

  return React.createElement(
    'div', 
    null, 
    React.createElement('h2', null, 'Todo List'), 
    React.createElement('input', {
      type: 'text',
      value: newTask,
      onChange: (e) => setNewTask(e.target.value),  
      placeholder: 'Írj be egy feladatot'  
    }),
    React.createElement('button', { onClick: addTask }, 'Feladat hozzáadása'),  
    React.createElement(
      'ul',
      null,
      tasks.map((task, index) =>  
        React.createElement(
          'li',
          { key: index },
          task,
          React.createElement('button', { onClick: () => deleteTask(index) }, 'Törlés') 
        )
      )
    )
  );
}

export default TodoList;