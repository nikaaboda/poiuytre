import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getFromStorage, setInStorage } from '../utils/storage'

export const usePersistentState = <T>(
    key: string,
    defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState(() => getFromStorage<T>(key) || defaultValue)

    useEffect(() => {
        setInStorage(key, state)
    }, [key, state])

    return [state, setState]
}
