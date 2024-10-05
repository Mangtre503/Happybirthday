import './Happy.css';
import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import Dandelions from './Dandelions.mp3'; 
import sky from './sky.jpg';
import Swal from 'sweetalert2';
function Happy() {
    const [isGiftVisible, setGiftVisible] = useState(false);
    const audioRef = useRef(null); 
    const navigate = useNavigate();

    const handleAudioStart = () => {
        if (audioRef.current) {
            audioRef.current.play(); 
        }
        
      
        const timer = setTimeout(() => {
            setGiftVisible(true); 
        }, 20000); 

        return () => clearTimeout(timer); 
    };

    const handleNavigate = () => {
        alert("Còn 1 page thôi, qua hàm bị lỗi nên đến tay Kỳ trễ T.T, get go nè.");
        navigate('/happyBirthday'); 
    };

    return (
        <div className='web'>
        <div className='web_happy_page'>
            <div className='head_of_happypage'>
                <p>Want to know something about yourself?</p>
                <button id='audioStart' onClick={handleAudioStart}>
                    Click đây nè! (Giảm âm lượng 20 @@) 
                </button>
                <audio ref={audioRef}>
                    <source src={Dandelions} type="audio/mpeg" />
                   
                </audio>
            </div>
            
            <div id='st_about_you'>
                <a>
                    I've never known anybody like you <br />
                    I've never dreamed of nobody like you <br />
                    And I've heard of a love that comes once in a lifetime <br />
                    And I'm pretty sure that you are that love of mine <br />
                </a>
            </div>
            {isGiftVisible && ( 
                <div className='Go_to_Gift'>
                    Cắt nhạc hơi @@ . Click để đi tiếp nè.
                    <button id='Gift' onClick={handleNavigate}>
                        CLICK
                    </button>
                </div>
            )}
        </div>
        </div>
    );
};

export default Happy;
