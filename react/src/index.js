
const { useState } = React;  
const ReactDOM = window.ReactDOM; 
/* Ez a ketto mini alkalmazas keszult, todo lista és szam kitalalo */
import TodoList from './components/TodoList/TodoList.js';
import NumberGuessingGame from './components/NumberGuessingGame/NumberGuessingGame.js';

function App() {
  const [currentPage, setCurrentPage] = useState("todolist");  

  return React.createElement(
    'div',
    null,
    React.createElement(
      'nav',
      null,
      React.createElement('button', { onClick: () => setCurrentPage("todolist") }, 'Todo List'),
      React.createElement('button', { onClick: () => setCurrentPage("numberGuessingGame") }, 'Szám kitaláló')
    ),
    currentPage === "todolist"
      ? React.createElement(TodoList)  
      : React.createElement(NumberGuessingGame)  
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));