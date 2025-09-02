'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';

interface PrivateRouteProps {
    role: string | string[];
    children: React.ReactNode;
}

export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isChecking, setIsChecking] = useState(true);
    const toastShownRef = useRef(false);

    useEffect(() => {
        if (!user) {
            router.replace('/');
            if (!toastShownRef.current) {
                toast.error('প্রথমে লগইন করুন!');
                toastShownRef.current = true;
            }
            return; // exit immediately, don't set isChecking
        }

        if (role) {
            const rolesArray = Array.isArray(role) ? role : [role];
            if (!rolesArray.includes(user.role)) {
                router.replace('/unauthorized');
                return; // exit immediately
            }
        }

        // only set isChecking false if user exists and role is allowed
        setIsChecking(false);
    }, [user, role, router]);

    // Show loader **only while checking**
    if (isChecking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 gap-6">
                {/* Spinning loader with bouncing dots */}
                <div className="flex space-x-2">
                    <span className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce delay-150"></span>
                    <span className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce delay-300"></span>
                    <span className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce delay-450"></span>
                </div>

                {/* Message */}
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                    Loading, please wait...
                </p>
            </div>

        );
    }

    // At this point, user exists and role is allowed
    return <>{children}</>;
};
