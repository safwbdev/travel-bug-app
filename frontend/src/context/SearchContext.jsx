import { createContext, useReducer } from "react"

const INIT_STATE = {
    city: undefined,
    dates: {
        "startDate": "2025-05-12T16:00:00.000Z",
        "endDate": "2025-05-14T16:00:00.000Z",
    },
    options: {
        adult: 1,
        children: 0,
        room: 1,
    }
}

export const SearchContext = createContext(INIT_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
            break;
        case "LINK":
            return action.payload
            break;
        case "RESET_SEARCH":
            return INIT_STATE
            break;

        default:
            return state
            break;
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INIT_STATE);

    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
