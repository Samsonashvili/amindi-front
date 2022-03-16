import { createContext, useContext, useState } from "react";

const Context = createContext()

export function Store({ children }) {
    const [cityObject, setCityObject] = useState({})
    const [airPollution, setAirPollution] = useState('')
    const [cityName, setCityName] = useState('tbilisi')


    return (
        <Context.Provider value={{ setCityObject, cityObject, airPollution, setAirPollution, cityName, setCityName }}>
            {children}
        </Context.Provider>
    )
}


export function useAppContext() {
    return useContext(Context)
}