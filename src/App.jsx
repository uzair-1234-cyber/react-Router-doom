import {Routes,Route} from 'react-router-dom';

import ButtonAppBar from './assets/components/navbar';
import Home from './assets/components/home';
import Login from './assets/components/login';

import React from 'react'

const App = () => {

<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>



  return (
    <div>
      <ButtonAppBar/>

      
    </div>
  )
}

export default App
