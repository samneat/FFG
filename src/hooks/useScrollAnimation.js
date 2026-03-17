import { useEffect } from 'react';
import { gsap } from '../utils/gsapConfig';

const defaultOptions = {};

export const useScrollAnimation = (ref, options = defaultOptions) => {
  useEffect(() => {
    if (!ref.current) return;
    
    // Use gsap.context to make cleanup easy
    const ctx = gsap.context(() => {
      // By default animate children fading up
      const targets = options.targets || ref.current.children;
      
      gsap.from(targets, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: options.stagger !== undefined ? options.stagger : 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || 'top 80%',
          ...options.scrollTrigger,
        },
        ...options.animationProps
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
};
