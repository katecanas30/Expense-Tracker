import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Expense Tracker" />

            <div className="min-h-screen bg-gray-50 text-gray-900">

                <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/"
                            className="text-xl font-bold text-indigo-600"
                        >
                            Expense Tracker
                        </Link>

                        <div className="flex items-center gap-6 text-sm">
                            <a
                                href="#features"
                                className="font-medium text-gray-700 transition hover:text-indigo-600"
                            >
                                Features
                            </a>

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="font-medium text-gray-700 transition hover:text-indigo-600"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="font-medium text-gray-700 transition hover:text-indigo-600"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
                    <div className="grid items-center gap-16 lg:grid-cols-2">

                        <div>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Personal Expense Tracker
                            </p>

                            <h1 className="text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
                                Manage your money
                                <span className="block text-indigo-600">
                                    with better records.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
                                Record your daily expenses, organize your
                                spending, and keep track of where your money
                                goes.
                            </p>

                            <div className="mt-8 flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
                                    >
                                        Get Started
                                    </Link>
                                )}

                                <a
                                    href="#features"
                                    className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-lg">

                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Monthly Overview
                                    </p>

                                    <h2 className="mt-2 text-4xl font-bold">
                                        ₱4,500
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Total expenses this month
                                    </p>
                                </div>

                                <div className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                                    This Month
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">

                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="font-medium">
                                            Food
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Daily expenses
                                        </p>
                                    </div>

                                    <p className="font-semibold">
                                        ₱2,300
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="font-medium">
                                            Transportation
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Daily travel
                                        </p>
                                    </div>

                                    <p className="font-semibold">
                                        ₱1,200
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="font-medium">
                                            School
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            School expenses
                                        </p>
                                    </div>

                                    <p className="font-semibold">
                                        ₱500
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            Internet
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Monthly bill
                                        </p>
                                    </div>

                                    <p className="font-semibold">
                                        ₱500
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                <section
                    id="features"
                    className="border-y bg-white"
                >
                    <div className="mx-auto max-w-6xl px-6 py-20">

                        <div className="max-w-xl">
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Features
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Everything you need to manage your expenses.
                            </h2>

                            <p className="mt-4 text-gray-600">
                                Keep your expense records organized and
                                easily accessible.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-3">

                            <div className="rounded-xl border border-gray-200 p-7">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-600">
                                    01
                                </div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    Add Expenses
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Record the description, amount, category,
                                    and date of every expense.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-7">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-600">
                                    02
                                </div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    Manage Records
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    View, edit, and delete your expense
                                    records whenever you need to.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-7">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-600">
                                    03
                                </div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    Monitor Spending
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    View your spending totals and understand
                                    which categories use your money.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="bg-indigo-600">
                    <div className="mx-auto max-w-6xl px-6 py-20 text-center text-white">

                        <h2 className="text-3xl font-bold">
                            Keep your expenses organized.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-indigo-100">
                            Create an account and start keeping track of
                            your expenses in one place.
                        </p>

                        {!auth.user && (
                            <Link
                                href={route('register')}
                                className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-medium text-indigo-600 transition hover:bg-gray-100"
                            >
                                Create an Account
                            </Link>
                        )}

                    </div>
                </section>

                <footer className="bg-gray-950">
                    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-center text-sm text-gray-400 md:flex-row md:items-center md:justify-between md:text-left">

                        <p className="font-medium text-gray-300">
                            Expense Tracker
                        </p>

                        <p>
                            © 2026 Expense Tracker. All rights reserved.
                        </p>

                    </div>
                </footer>

            </div>
        </>
    );
}