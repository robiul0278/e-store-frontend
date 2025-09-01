'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { persistor, store } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

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
                        {children}
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}