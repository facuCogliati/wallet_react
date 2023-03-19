import React from 'react';
import DetailsCard from './components/Details/Details';
import Main from './components/Main/Main';
import { PushToTalkButton, BigTranscript, IntroPopup, PushToTalkButtonContainer} from "@speechly/react-ui";
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>
    <Toaster position="top-left"/>
    <div className='container'>
       <div className='grid-container'>
        
        <div className='card'>
          <DetailsCard title={'Income'}/>
        </div>

        <div className='card'>
          <Main />
        </div>

        <div className='card'>
        <DetailsCard title={'Expense'}/>
        </div>
       </div>

    
    </div>
    <PushToTalkButtonContainer>
    <PushToTalkButton size='70px'  />
    </PushToTalkButtonContainer>
    </>
  )
}

export default App