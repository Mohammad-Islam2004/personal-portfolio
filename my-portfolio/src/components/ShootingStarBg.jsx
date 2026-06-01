import React, { useEffect, useRef } from 'react';

const ShootingStarBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    let stars = [];
    let shootingStars = [];
    const starsCount = 120; 
    const maxShootingStars = 25; // Optimized down from 70 to keep performance pristine within a single section bounds

    // --- Background Twinkling Star Class ---
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.5; 
        this.alpha = Math.random(); 
        this.twinkleSpeed = Math.random() * 0.02 + 0.005; 
        this.brightnessDirection = Math.random() > 0.5 ? 1 : -1;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        if (this.alpha > 0.7) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
        }
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.alpha += this.twinkleSpeed * this.brightnessDirection;
        if (this.alpha >= 1 || this.alpha <= 0.2) {
          this.brightnessDirection *= -1; 
        }
        this.draw();
      }
    }

    // --- Shooting Star Class ---
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width + canvas.width * 0.2;
        this.y = Math.random() * (canvas.height * 0.4);
        this.length = Math.random() * 80 + 40; 
        this.speedX = -(Math.random() * 8 + 6); 
        this.speedY = Math.random() * 4 + 3;    
        this.alpha = 1; 
        this.fade = Math.random() * 0.02 + 0.015; 
        this.active = false; 
        this.delay = Math.random() * 300; 
      }

      draw() {
        if (!this.active) return;

        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x - this.speedX * 2, this.y - this.speedY * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - (this.speedX * (this.length / 50)), this.y - (this.speedY * (this.length / 50)));
        ctx.stroke();
        ctx.restore();
      }

      update() {
        if (!this.active) {
          this.delay--;
          if (this.delay <= 0) this.active = true;
          return;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.fade; 

        if (this.alpha <= 0 || this.x < 0 || this.y > canvas.height) {
          this.reset();
        }

        this.draw();
      }
    }

    function initSky() {
      stars = [];
      shootingStars = [];
      
      for (let i = 0; i < starsCount; i++) {
        stars.push(new Star());
      }
      for (let i = 0; i < maxShootingStars; i++) {
        shootingStars.push(new ShootingStar());
      }
    }

    // --- Dynamic Section Container Tracking Mechanism ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Obtains real-time dimensional scales directly from your section container parent bounds
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
        initSky();
      }
    });

    if (parent) {
      resizeObserver.observe(parent);
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => star.update());
      shootingStars.forEach((ss) => ss.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    // FIX: Element tracking swapped to absolute with lower z-index limits to avoid text-layer obstruction
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default ShootingStarBg;