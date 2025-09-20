import { useCallback, useRef } from 'react';

/* (хук с intersectionObserver отследит появление заданных элементов на экране и вызовет переданный в нее сallback) */
export function useIntersection(onIntersect: () => void) {
    const unsubscribe = useRef(
        () => {},
    ); /* (реф с пустой функцией понадобится для отписки от слежения) */

    return useCallback((el: HTMLDivElement | null) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((intersection) => {
                if (intersection.isIntersecting) {
                    onIntersect();
                }
            });
        });

        if (el) {
            observer.observe(el);
            unsubscribe.current = () => observer.disconnect();
        } else {
            unsubscribe.current();
        }
    }, []);
}
