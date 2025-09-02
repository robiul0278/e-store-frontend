'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { persistor, store } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthModalProvider } from '@/context/AuthModalContext';
import AuthModal from '@/components/auth/auth-modal';

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AuthModalProvider>
                        {children}
                        <AuthModal />  
                    </AuthModalProvider>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}