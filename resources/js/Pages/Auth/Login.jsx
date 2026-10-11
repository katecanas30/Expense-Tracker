
import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PhilippinePeso } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const labelClass =
        'mb-2 block text-sm font-semibold text-gray-800';

    const inputClass =
        'block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200';

    return (
        <GuestLayout>
            <Head title="Log in | Expense Tracker" />

            <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200">
                        <PhilippinePeso size={28} strokeWidth={2.5} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to manage your expenses.
                    </p>
                </div>

                {status && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                        {status}
                    </div>
                )}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className={labelClass}
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                required
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="you@example.com"
                                className={inputClass}
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className={`${inputClass} pr-20`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-3 text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />

                            <label
                                htmlFor="remember"
                                className="ms-2 cursor-pointer text-sm font-medium text-gray-700"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-indigo-700 hover:text-indigo-900"
                    >
                        Create an account
                    </Link>
                </p>

                <p className="mt-8 text-center text-xs text-gray-500">
                    Expense Tracker · Manage your money with confidence
                </p>
            </div>
        </GuestLayout>
    );
}