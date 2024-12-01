import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div
            className="absolute w-6 h-6 bg-white rounded-full z-50 pointer-events-none mix-blend-difference transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
        />);
};

export default CustomCursor;
