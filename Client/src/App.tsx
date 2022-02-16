import React, { useState } from "react";
import { Calculator } from '../src/models/calculator';
import './App.css';

export default function App()  {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState("");
  const [operator, setOperator] = useState("+");
  const [listExerciseCalculator, setUpdatedList] = useState<Array<Calculator>>(localStorage.getItem('listExerciseCalculator') !=null ? JSON.parse(localStorage.getItem('listExerciseCalculator') || JSON.parse('[]')) :  []); // check if localStorage isn't null, if not null is show calculation history
  const [updateItemInList, setUpdateItemInList] = useState(false);
  const [updateIndexInList, setUpdateIndexInList] = useState(0);
  const [messageError, setMessageError] = useState("");

  const updateExercise = (index: number) => {
    setNumber1(listExerciseCalculator[index].number1);
    setNumber2(listExerciseCalculator[index].number2);
    setResult(listExerciseCalculator[index].result);
    setOperator(listExerciseCalculator[index].operator);
    setUpdateItemInList(true);
    setUpdateIndexInList(index);
  }

  const deleteFromList = (index: number) => { // delete item from calculation history
    listExerciseCalculator.splice(index, 1);
    resetNumbers();
    localStorage.setItem("listExerciseCalculator", JSON.stringify(listExerciseCalculator));
  }

  const CalculateApi = async (operator:string) => {// get result from server
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,'accept': 'text/plain'},
      body: JSON.stringify({ "number1": number1,
      "number2": number2, "operator": operator })
    };
    
    const response = await fetch('https://localhost:7282/Calculator', requestOptions);
    const responseData = await response.json();
    if (responseData) {
      setMessageError("");
      setResult(responseData);
      addToList(responseData); 
    }
    else {
      setMessageError("This exercise cannot be calculated");
    }
  }
   
  const addToList = (calcRes:number) => {// add exercise calculator to calculation history
    if (updateItemInList) {
      listExerciseCalculator[updateIndexInList] = {
        number1: number1,
        number2: number2,
        operator: operator,
        result: calcRes.toString(),
      }
      setUpdateIndexInList(0);
      setUpdateItemInList(false);
    } 
    else if (listExerciseCalculator.length <= 2) {
      listExerciseCalculator.push({
        number1: number1,
        number2: number2,
        operator: operator,
        result: calcRes.toString(),
      })
      setUpdatedList(listExerciseCalculator);
    } 
    else {
      listExerciseCalculator.shift();
      listExerciseCalculator.push({
        number1: number1,
        number2: number2,
        operator: operator,
        result: calcRes.toString(),
      });
    }
    localStorage.setItem(
      'listExerciseCalculator',
      JSON.stringify(listExerciseCalculator),
    )
    showResult(calcRes);
  }

  const showResult = (calcRes: number) => {
    setResult(calcRes.toString());
  }

  const resetNumbers = () => {
    setNumber1(0);
    setNumber2(0);
    setResult("");
  }

  const ClearHistory = () => {// clear all calculation history
    localStorage.clear();
    setUpdatedList([]);
  }
  return (
    <div className="App">
      <div>
        <input className="inputStyle" type="number" value={number1} onChange={(e) => setNumber1(e.target.valueAsNumber)}></input>
        <select className="inputStyle" onChange={(e) => setOperator(e.target.value)} value={operator}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input className="inputStyle" type="number" value={number2} onChange={(e) => setNumber2(e.target.valueAsNumber)} />
        <span>=</span>
        <span>{result}</span>
        <p>{messageError}</p>
        <button className="buttonStyle" onClick={() => {CalculateApi(operator)}}>Calculate</button>
      </div>
      <div className="divTableStyle">
        <table className="tableStyle">
          <tbody>
            {listExerciseCalculator.map((item: Calculator, i: number) => (
                <tr className="tableStyle" key={i}>
                <td className="tableStyle">{item.number1} {item.operator} {item.number2} = {item.result}</td>
                <td className="tableStyle"><button className="buttonStyle" onClick={() => updateExercise(i)}>update</button></td>
                <td className="tableStyle"><button className="buttonStyle" onClick={() => deleteFromList(i)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="buttonStyle" onClick={() => {ClearHistory()}}>Clear History</button>
      </div>
    </div>
  );
}

