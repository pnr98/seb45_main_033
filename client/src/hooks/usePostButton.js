import { useState, useCallback } from 'react';

export default function usePostButton() {
    const [ isClick, setIsClick ] = useState(false)

    const setEdit = useCallback(() => {
        setIsClick(true)
    })

    const setCancel = useCallback(() => {
        setIsClick(false)
    })

    return {
        isClick,
        setEdit,
        setCancel,
    }
}