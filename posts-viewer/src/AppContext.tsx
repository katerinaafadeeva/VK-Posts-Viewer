import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Post = {
  id: number;
  text: string;
  date: number;
  views: { count: number };
  likes: { count: number };
  reposts: { count: number };
};

type State = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'FETCH_SUCCESS'; payload: Post[] }
  | { type: 'FETCH_ERROR'; payload: string };

type AppContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: State = {
  posts: [],
  loading: false,
  error: null,
};

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, posts: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, posts: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
