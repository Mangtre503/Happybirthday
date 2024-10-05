import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Swal from 'sweetalert2'; // Import SweetAlert2
import meme1 from './meme1.jpg';
import meme3 from './meme3.jpg';
import meme4 from './meme4.png';

function App() {
  const [Pass, setPass] = useState('');
  const navigate = useNavigate();

  const getValue = (event) => {
    setPass(event.target.value);
  };

  const Login = () => {
    if (Pass === '0510') {
      Swal.fire({
        title: 'Congratulation!',
        text: "You're the most important.",
        imageUrl: meme3,  // Sử dụng hình ảnh
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Meme3',
      }).then(() => {
        navigate('/happy'); // Điều hướng sau khi đóng thông báo
      });
    } else if (Pass === '1707') {
      Swal.fire({
        title: 'Ok, thanks.',
        text: 'You are valued too!',
        imageUrl: meme4,  // Sử dụng hình ảnh
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Meme4',
      });
    } else {
      Swal.fire({
        title: 'Not me?',
        text: 'Please try again!',
        imageUrl: meme1,  // Sử dụng hình ảnh
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Meme1',
      });
    }
  };

  return (
    <div className='web'>
      <div className='part1'>
        <div className='log'>
          <p>Enter password to start!</p>
          <input id='password' type='text' value={Pass} onChange={getValue} />
          <button id='submit_password' onClick={Login}>Login!</button>
          <p>Hint: Birthday of a person who is very, very important. (EX: 1/1/2000: 0101).</p>
        </div>
      </div>
    </div>
  );
}

export default App;
