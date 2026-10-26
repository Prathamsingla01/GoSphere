/* eslint-disable react-refresh/only-export-components */
// Re-export TicketContext from AppContext to support both Context naming conventions
import { useContext } from 'react';
import { AppContext, AppProvider, useAppContext } from './AppContext.jsx';

export const TicketContext = AppContext;
export const TicketProvider = AppProvider;
export const useTicketContext = useAppContext;

export { AppContext, AppProvider, useAppContext };
