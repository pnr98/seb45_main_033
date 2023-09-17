import React, { useState, useEffect, useRef } from 'react';
import { Button } from './UpBtn.Styled';

const UpBtn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef(null);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        if (footerRef.current) {
            const footerTop = footerRef.current.getBoundingClientRect().top;
            if (footerTop < window.innerHeight) {
                const overlap = window.innerHeight - footerTop + 20;
                document.documentElement.style.setProperty('--footer-height', `calc(${overlap}px + 10px)`);
            } else {
                document.documentElement.style.setProperty('--footer-height', '20px');
            }
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div>
            <div ref={footerRef}></div>
            {isVisible && 
                <Button onClick={scrollToTop} />
            }
        </div>
    );
};

export default UpBtn;
