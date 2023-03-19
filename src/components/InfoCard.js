import React from 'react';

const isIncome = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div elevation={3} style={{ textAlign: 'center', padding: '0', fontSize : '14px' ,color: 'black',  }}>
      Proba diciendo: <br /> 
      "Add {isIncome ? 'Income ' : 'Expense '} 
      for {isIncome ? '100 dollars ' : '50 dollars '}  
      in Category {isIncome ? 'Salary ' : 'Travel '}
      for {isIncome ? 'Monday ' : 'Thursday '}" 
    </div>
  );
};

export default InfoCard;