export const getFromStorage = <T>(key: string): T | null => {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
}

export const setInStorage = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value))
}
