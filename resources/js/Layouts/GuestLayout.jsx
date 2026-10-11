import { Link } from '@inertiajs/react';
import { PhilippinePeso } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                            <PhilippinePeso size={22} strokeWidth={2.5} />
                        </span>
                        <span className="text-lg font-bold tracking-tight text-gray-900">
                            Expense Tracker
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </header>

            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>

            <footer className="border-t border-gray-200 bg-white px-4 py-5 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Expense Tracker. All rights reserved.
            </footer>
        </div>
    );
}