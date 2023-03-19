import React, {useContext} from 'react';
import { MoneyOff, Delete } from '@mui/icons-material';
import './style.css';
import { ExpenseTrackerContext } from '../../../context/context';


const List = () => {
    const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

    
  return (
    <div className='list-container'>
        {transactions.map(transaction => (
            <div className='list-items' key={transaction.id}>

                <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                <MoneyOff className={transaction.type === 'Income' ? 'money-income' : 'money-expense'}/>                  
                
                <div className='list-middle'>
                  <p style={{height: '4px'}}>{transaction.category}</p>
                  <div className='list-amount-date'>
                    <p>${transaction.amount}</p>
                    <p>- {transaction.date}</p> 
                  </div>

                </div>
                </div>
                     
                <Delete style={{cursor : 'pointer'}} onClick={()=> deleteTransaction(transaction.id)}/>
            </div>
        ) )}
    </div>
  )
}

export default List