import { useCallback, useState } from "react"

export const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((state) => !state), []);

    return {isOpen, open, close, toggle};
    
}