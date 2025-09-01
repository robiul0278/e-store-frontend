'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify';

interface Props {
    children: React.ReactNode;
    role?: 'admin' | 'user' | 'superAdmin';
}

const PrivateRoute = ({ children, role }: Props) => {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isChecking, setIsChecking] = useState(true);
    const toastShownRef = useRef(false);

    useEffect(() => {
        const checkAccess = () => {
            if (!user) {
                router.replace('/');
                if (!toastShownRef.current) {
                    toast.error('প্রথমে লগইন করুন!');
                    toastShownRef.current = true;
                }
                setIsChecking(false);
                return;
            }

            if (role && user.role !== role) {
                router.replace('/unauthorized');
                setIsChecking(false);
                return;
            }

            setIsChecking(false);
        };

        checkAccess();
    }, [user, role, router]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 gap-3">
                <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground text-lg">লোড হচ্ছে, অপেক্ষা করুন...</p>
            </div>
        );
    }


    if (!user || (role && user.role !== role)) {
        // Redirecting, nothing to show here
        return null;
    }

    return <>{children}</>;
};

export default PrivateRoute;