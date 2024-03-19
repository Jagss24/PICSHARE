import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CustomWebcam from './components/CustomWebcam';
import SignIn from './components/SignIn';
import YourPics from './components/YourPics';
import SignUp from './components/SignUp';
import UploadPics from './components/UploadPics';
import ShareWithOthers from './components/ShareWithOthers';
import Modal from './components/Modal';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/camera' element={<CustomWebcam />} />
          <Route path='/your-pics' element={<YourPics />} />
          <Route path='/upload-pics' element={<UploadPics />} />
          <Route path='share-with-others' element={<ShareWithOthers />} />
          <Route path='/modal' element={<Modal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
