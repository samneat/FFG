import { useEffect, useRef } from 'react';

export const useNetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Optional fallback for very low power devices
    if (navigator.hardwareConcurrency < 4) {
      console.warn("Low power device detected, using CSS fallback for canvas if implemented.");
    }

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let mouse = { x: null, y: null };
    
    const handleResize = () => {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Node definitions
    const numNodes = 40; 
    const nodes = [];

    // Central hub node
    nodes.push({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      radius: 12,
      isHub: true,
      timeOffset: Math.random() * 100
    });

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // very slow
        vy: (Math.random() - 0.5) * 0.2,
        radius: 8,
        isHub: false,
        timeOffset: Math.random() * 100
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Update nodes
      nodes.forEach((node) => {
        if (node.isHub) {
          // Hub drifts slightly around center
          node.x = width / 2 + Math.sin(time * 0.5) * 20;
          node.y = height / 2 + Math.cos(time * 0.4) * 20;
          node.radius = 12 + Math.sin(time * 2) * 3; // Pulse
        } else {
          // Organic drift using sine waves
          node.x += node.vx + Math.sin(time + node.timeOffset) * 0.15;
          node.y += node.vy + Math.cos(time + node.timeOffset) * 0.15;

          // Wrap around edges
          if (node.x < -100) node.x = width + 100;
          if (node.x > width + 100) node.x = -100;
          if (node.y < -100) node.y = height + 100;
          if (node.y > height + 100) node.y = -100;
        }

        // Mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            node.x += dx * 0.03;
            node.y += dy * 0.03;
          }
        }
      });

      // Draw lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            // Fades out as distance increases
            const opacity = (1 - dist / 200) * 0.3;
            ctx.strokeStyle = `rgba(43, 89, 162, ${opacity})`; // --ffg-blue #2B59A2
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76, 175, 80, ${node.isHub ? 1 : 0.8})`; // #4CAF50 at 80%
        ctx.fill();
        
        if (node.isHub) {
          // Inner core for hub
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return canvasRef;
};
