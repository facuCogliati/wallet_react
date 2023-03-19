import React from 'react';
import './styles.css';
import 'chart.js/auto'
// import {Chart,ArcElement, Title} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import useTransactions from '../../useTransactions';

const DetailsCard = ({title}) => {
  // Chart.register(ArcElement, Title)
  const { total, chartData } = useTransactions(title);

  return (
    <div className={title === 'Income' ? 'card-container-income' : 'card-container-expense'}>
        {title}
        <h5>${total}</h5>
    
        {total > 0 && (
        <div className='canvas-div'>
            <Doughnut data={chartData} />
        
      </div>
      )} 
    </div>
  );
};

export default DetailsCard;