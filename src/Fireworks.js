import React, { useEffect, useRef } from 'react';
import './Fireworks.css'; // Nếu bạn có file CSS riêng

const Fireworks = () => {
    const canvasRef = useRef(null);
    const colors = ['#d300a2', '#f3c5e8', '#7e52f7', '#52f7e7'];

    const animate = (context, ballsArray, circlesArray) => {
        context.fillStyle = `rgba(17 ,17 ,22, 1)`;
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        renderBalls(context, ballsArray);
        renderCircles(context, circlesArray);
        requestAnimationFrame(() => animate(context, ballsArray, circlesArray));
    };

    const renderBalls = (context, ballsArray) => {
        for (let i = 0; i < ballsArray.length; i++) {
            ballsArray[i].draw(context);
            ballsArray[i].update();
            if (Math.abs(ballsArray[i].x - ballsArray[i].x0) >= 200 || Math.abs(ballsArray[i].y - ballsArray[i].y0) >= 200) {
                ballsArray.splice(i, 1);
                i--;
            }
        }
    };

    const renderCircles = (context, circlesArray) => {
        for (let i = 0; i < circlesArray.length; i++) {
            circlesArray[i].draw(context);
            circlesArray[i].update();
            if (circlesArray[i].radius >= 100) {
                circlesArray.splice(i, 1);
                i--;
            }
        }
    };

    const Balls = function (x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.x0 = x;
        this.y0 = y;
        this.speedX = Math.random() * 2 - 1.5;
        this.speedY = Math.random() * 2 - 1.5;

        this.update = () => {
            if (this.radius >= 10) {
                this.x += this.speedX * 5;
                this.y += this.speedY * 5;
            }
        };

        this.draw = (ctx) => {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        };
    };

    const Circle = function (x, y) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.color = `rgba(255,255,255,.3)`;
        this.lineWidth = 2;

        this.update = () => {
            if (this.radius < 60) {
                this.radius += 10;
            }
            if (this.radius > 60) {
                this.radius += 2;
                this.color = `rgba(255,255,255,.1)`;
            }
        };

        this.draw = (ctx) => {
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const ballsArray = [];
        const circlesArray = [];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleClick = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            circlesArray.push(new Circle(mouseX, mouseY));
            for (let i = 0; i < 30; i++) {
                ballsArray.push(new Balls(mouseX, mouseY));
            }
        };

        canvas.addEventListener('click', handleClick);
        animate(context, ballsArray, circlesArray);

        return () => {
            canvas.removeEventListener('click', handleClick); // Clean up
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} />
            <div>
                <p className="backgroundText">Click Here</p>
            </div>
        </div>
    );
};

export default Fireworks;
