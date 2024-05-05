import { useEffect, useState, useRef } from "react"

export const useHover = () => { 
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<HTMLElement>(null);

    const cleanupRef = useRef(() => {});

    useEffect(() => {
    const element = ref.current;

    if (element) {
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      cleanupRef.current = () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return cleanupRef.current;
  }, [ref]); 

  return {ref, isHovered};
}