import React, {useContext} from 'react';
import './style.css';
import Form from './Form/Form';
import List from './List/List';
import {ExpenseTrackerContext} from '../../context/context'
import InfoCard from '../InfoCard';

const Main = () => {
    const {balance} = useContext(ExpenseTrackerContext)
  return (
    <div className='main'>
        <h1>Speechly Wallet</h1>
        <h5 style={{textAlign : 'center'}}>Total: ${balance}</h5>
        <div className='card-content'>
            <small style={{lineHeight : '1.5rem', marginTop : '20px', color : 'gray'}}>
                <InfoCard/>
            </small>
        </div>
        <hr />
        <Form/>
        <div className='card-content-bottom'>
                <List/>
        </div>
    </div>
  )
};

export default Main