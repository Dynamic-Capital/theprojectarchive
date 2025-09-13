export const SessionProvider = ({ children }) => children;
export const useSession = () => ({ data: null, status: 'unauthenticated' });
