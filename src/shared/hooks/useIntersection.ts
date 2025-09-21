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

        console.log(el?.getBoundingClientRect().top);
        console.log(document.documentElement.clientHeight);
        if (el) {
            if (
                el.getBoundingClientRect().top <
                document.documentElement.clientHeight / 2
            ) {
                el.style.marginTop = '100vh';
                setTimeout(() => (el.style.marginTop = '20px'), 50);
            }
            observer.observe(el);
            unsubscribe.current = () => observer.disconnect();
        } else {
            unsubscribe.current();
        }
    }, []);
}
