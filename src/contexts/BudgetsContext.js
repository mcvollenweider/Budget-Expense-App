import React, { useContext, useState } from "react";
import {v4 as uuidV4} from 'uuid' //calls to create uniqueID


const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

/*
{
budget
    id:
    name:
    max
}
{
expense
    id:
    budgetId:
    amount:
    description:
} 
*/

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
  function addExpense({description, amount, budgetId}) {
    setExpenses(prevExpenses =>{
      
        return [...prevExpenses, {id: uuidV4(), description, amount, budgetId }]
    })
}

  function addBudget({name, max}) {
    setBudgets(prevBudgets =>{
        if (prevBudgets.find(budget => budget.name === name)){
            return prevBudgets
        }//checking for another budget w/same name and not add duplicate
        return [...prevBudgets, {id: uuidV4(), name, max }]
    })
  }
  function deleteBudget({id}) {

    //deal with uncategorized expenses

    setBudgets(prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteExpense({id}) {
    setExpenses(prevExpenses => {
        return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
