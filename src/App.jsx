import { useState, useEffect } from 'react';
import Die from './components/Die';
import Confetti from 'react-confetti'
import {nanoid} from 'nanoid';
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);


  useEffect(() => {
    if(dice.every(die => die.isHeld && die.value === dice[0].value)){
      setTenzies(true);
      console.log("win")
    }
  }, [dice]);


  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function allNewDice(){
    const dice=[]
    for (let i =0; i<10 ;i++){
      let die = generateNewDie();
      // dice.push(<Die key={i}value={value}/>);
      dice.push(die);
    }
    return dice;
  }
  const diceElements = dice.map(die => (
        <Die 
            key={die.id}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={holdDice}
        />));

  function reRollDice(){
    if(tenzies){
      setDice(allNewDice());
      setTenzies(false);
    }else{
      setDice(oldDice => {
        return oldDice.map(dice => {
          return dice.isHeld ?
          dice : generateNewDie();
        })
      });
  }
  }
  function holdDice(id){
      setDice( oldDice => oldDice.map(dice => {
        return dice.id === id ? 
        {...dice, isHeld: !dice.isHeld} : dice;
        }
      ));
  }
  return (
    
    <main>
      {tenzies && <Confetti height={window.innerHeight}/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>
          {diceElements}
      </div>
      <button className='roll-dice' onClick={reRollDice}>{tenzies? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App;
