import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex bg-gray-100  sm:justify-center ">
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
