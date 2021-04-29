import React, {useLayoutEffect, useState} from 'react';

const Dialog = () => {

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const [width, height] = useWindowSize();

    return (
        <div className={'chatMessages'}
        style={{height: height-200}}
        >
            Dialog

        </div>
    );
};

export default Dialog;