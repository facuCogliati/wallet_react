import React, {useState, useContext, useEffect} from 'react';
import './style.css';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import {incomeCategories , expenseCategories} from '../../../constants/categories'
import { useSpeechContext } from '@speechly/react-client';
import formatDate from '../../../utils/formatDate';
import toast from 'react-hot-toast';


const initialState = {
    amount: '',
    category: 'Categorias',
    type: 'Income',
    date: formatDate(new Date()),
  };

const Form = () => {
    const [formData, setFormData] = useState(initialState)     
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();


    const createTransaction = () => {
      if (formData.category === 'Categorias' || !formData.date.includes('-') || formData.amount < 1) return;

      addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
      setFormData(initialState);
      toast.success('Informacion Guardada.')
    };

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;


    useEffect(() => {
        if (segment) {
          if (segment.intent.intent === 'add_expense') {
            setFormData({ ...formData, type: 'Expense' });
          } else if (segment.intent.intent === 'add_income') {
            setFormData({ ...formData, type: 'Income' });
          } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
            return createTransaction();
          } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
            return setFormData(initialState);
          }
    
          segment.entities.forEach((s) => {
            const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
    
            switch (s.type) {
              case 'amount':
                setFormData({ ...formData, amount: s.value });
                break;
              case 'category':
                if (incomeCategories.map((iC) => iC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Income', category });
                } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Expense', category });
                }
                break;
              case 'date':
                setFormData({ ...formData, date: s.value });
                break;
              default:
                break;
            }
          });
    
          if (segment.isFinal && formData.amount && formData.category !== 'Categorias' && formData.type && formData.date) {
            createTransaction();
          }
        }
      }, [segment]);
  return (
    <>
      <div className='segment'>
              {segment && (
              <p>{segment.words.map((w) => w.value).join(" ")}</p>
              )}
      </div>

      <div className='grid-form'>
          <div className='input-form'>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
              </select>
          </div>

          <div className='input-form'>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value='Categorias' disabled>Category</option>
              {selectedCategories.map(c => (
                  <option value={c.type} key={c.type}>{c.type}</option>
              ))}            
              </select>
          </div>

          <div className='input-form'>
              <input placeholder='Amount' min={1} type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
          </div>

          <div className='input-form'>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: formatDate(e.target.value)})} />
          </div>
          <button onClick={createTransaction}>Subir</button>
          
      </div>
    </>
  )
}

export default Form