import { useState, useEffect } from 'react'

export const useSessionStorage = (key, defaultValue) => {
    const stored = sessionStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [value, setValue] = useState(initial);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue]
}