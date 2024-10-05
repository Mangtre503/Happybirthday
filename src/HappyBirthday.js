import React, { useEffect, useRef } from 'react';

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const ballsArray = useRef([]);
  const circlesArray = useRef([]);
  const colors = ['#d300a2', '#f3c5e8', '#7e52f7', '#52f7e7'];

 
  const audio = useRef(new Audio('/happybirthday.mp3'));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    function Balls(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.x0 = x;
      this.y0 = y;
      this.speedX = Math.random() * 2 - 1.5;
      this.speedY = Math.random() * 2 - 1.5;

      this.update = () => {
        this.x += this.speedX * 1.5;
        this.y += this.speedY * 1.5;
      };

      this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
      };
    }

    
    function Circle(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 1;
      this.color = `rgba(255,255,255,.3)`;
      this.lineWidth = 2;

      this.update = () => {
        if (this.radius < 60) {
          this.radius += 10;
        } else {
          this.radius += 2;
          this.color = `rgba(255,255,255,.1)`;
        }
      };

      this.draw = () => {
        context.strokeStyle = this.color;
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
      };
    }

   
    const renderBalls = () => {
      ballsArray.current = ballsArray.current.filter((ball) => {
        ball.draw();
        ball.update();

        const distanceX = Math.abs(ball.x - ball.x0);
        const distanceY = Math.abs(ball.y - ball.y0);

        return distanceX < 400 && distanceY < 400;
      });
    };

   
    const renderCircles = () => {
      circlesArray.current = circlesArray.current.filter((circle) => {
        circle.draw();
        circle.update();
        return circle.radius < 400;
      });
    };

   
    const animate = () => {
      context.fillStyle = `rgba(17 ,17 ,22, 1)`;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      
      context.fillStyle = '#ffffff';
      context.font = '30px Arial';
      context.textAlign = 'center';
      context.fillText('HAPPY BIRTHDAY TO THIEN KY', canvas.width / 2, canvas.height / 2);
      
      renderBalls();
      renderCircles();
      requestAnimationFrame(animate);
    };

    
    const createFireworks = () => {
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < 4; i++) {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;

        circlesArray.current.push(new Circle(randomX, randomY));

        for (let j = 0; j < 30; j++) {
          ballsArray.current.push(new Balls(randomX, randomY));
        }
      }
    };

   
    const interval = setInterval(createFireworks, 1000);

    
    const playAudio = () => {
      audio.current.play();
    };

    
    audio.current.addEventListener('ended', () => {
      audio.current.currentTime = 0; 
      audio.current.play();
    });

  
    const audioTimeout = setTimeout(playAudio, 3000);

    animate();

    
    return () => {
      clearInterval(interval);
      clearTimeout(audioTimeout);
      audio.current.removeEventListener('ended', () => {});
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasAnimation;
