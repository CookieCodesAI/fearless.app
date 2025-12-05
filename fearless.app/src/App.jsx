import { useState } from 'react' 
import './App.css' 
import ProfilePic from "./components/ProfilePic.jsx"
import useWindowSize from './components/WindowSize.jsx'
import Scrollbar from './components/Scrollbar.jsx'
import ButtonPanel from './components/ButtonPanel.jsx'
import Call from "./pages/Call.jsx"
import Text from "./pages/Text.jsx"
import LiveStream from "./pages/LiveStream.jsx"
import Location from "./pages/Location.jsx"
import {Routes, Route} from 'react-router-dom'

function App() { 

  return ( 
    <Routes>
      <Route path="/" element={
        <div className='container'>
          <ProfilePic/>
          <Scrollbar/>
          <ButtonPanel/>
        </div> 
      }/>
      <Route path = '/call' element = {<Call/>} />
      <Route path = '/text' element = {<Text/>} />
      <Route path = '/livestream' element = {<LiveStream/>} />
      <Route path = '/location' element = {<Location/>} />
    </Routes>
  ) } 
export default App