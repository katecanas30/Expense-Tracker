
import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PhilippinePeso } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const labelClass =
        'mb-2 block text-sm font-semibold text-gray-800';

    const inputClass =
        'block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200';

    return (
        <GuestLayout>
            <Head title="Create Account | Expense Tracker" />

            <div className="mx-auto w-full max-w-md">
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200">
                        <PhilippinePeso size={28} strokeWidth={2.5} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Create an account
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Start managing your expenses today.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className={labelClass}
                            >
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="name"
                                autoFocus
                                required
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Enter your full name"
                                className={inputClass}
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

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
                            <label
                                htmlFor="password"
                                className={labelClass}
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="Create a password"
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

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className={labelClass}
                            >
                                Confirm password
                            </label>

                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={
                                        showPasswordConfirmation
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Re-enter your password"
                                    className={`${inputClass} pr-20`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPasswordConfirmation(
                                            !showPasswordConfirmation,
                                        )
                                    }
                                    className="absolute inset-y-0 right-3 text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                                >
                                    {showPasswordConfirmation
                                        ? 'Hide'
                                        : 'Show'}
                                </button>
                            </div>

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing
                                ? 'Creating account...'
                                : 'Create account'}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        href={route('login')}
                        className="font-semibold text-indigo-700 hover:text-indigo-900"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}