import React, { useEffect, useRef } from 'react';

export default function ScrollableComponent({
    showNext,
    isLast,
    children,
}) {
    /**
     * Select the Card component with useRef
     */
    const ref = useRef();

    /**
     * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
     */
    useEffect(() => {
        if (!ref?.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                showNext();
                observer.unobserve(entry.target);
            }
        });

        observer.observe(ref.current);
    }, [isLast]);

    return (
        <div ref={ref}>
            {children}
        </div>
    );
}