const { useState } = React; 

function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);  //szam generalasa
  const [userGuess, setUserGuess] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [attempts, setAttempts] = useState(0); 

  function handleGuess() {
    const guess = parseInt(userGuess, 10);

    if (isNaN(guess)) {
      setMessage("Kérlek, adj meg egy számot!");
      return;
    }

    setAttempts(attempts + 1);

    if (guess < targetNumber) {
      setMessage("A próbált szám kisebb. Próbálj meg nagyobbat!");
    } else if (guess > targetNumber) {
      setMessage("A próbált szám nagyobb. Próbálj meg kisebbet!");
    } else {
      setMessage(`Gratulálok! Eltaláltad a számot ${attempts + 1} próbálkozás után.`);
    }
  }

  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Számkitaláló Játék'),
    React.createElement('input', {
      type: 'number',
      value: userGuess,
      onChange: (e) => setUserGuess(e.target.value),
      placeholder: 'Tippelj egy számot 1 és 100 között'
    }),
    React.createElement('button', { onClick: handleGuess }, 'Próbálkozás'),
    React.createElement('p', null, message),
    React.createElement('p', null, `Próbálkozások száma: ${attempts}`)
  );
}

export default NumberGuessingGame;
