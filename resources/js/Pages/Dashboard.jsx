import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ expenses }) {
    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthExpenses = expenses
        .filter((expense) => {
            const expenseDate = new Date(expense.expense_date);

            return (
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear
            );
        })
        .reduce(
            (total, expense) => total + Number(expense.amount),
            0
        );

    const foodExpenses = expenses
        .filter((expense) => expense.category === 'Food')
        .reduce(
            (total, expense) => total + Number(expense.amount),
            0
        );

    const transportationExpenses = expenses
        .filter((expense) => expense.category === 'Transportation')
        .reduce(
            (total, expense) => total + Number(expense.amount),
            0
        );

    const recentExpenses = expenses.slice(0, 5);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        Personal Expense Tracker
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                Expense Overview
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Keep track of your spending and manage your expenses.
                            </p>
                        </div>

                        <Link
                            href={route('expenses.index')}
                            className="inline-flex w-fit items-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Add Expense
                        </Link>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <p className="text-sm font-medium text-gray-500">
                                Total Expenses
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                ₱{totalExpenses.toFixed(2)}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                All recorded expenses
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <p className="text-sm font-medium text-gray-500">
                                This Month
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                ₱{thisMonthExpenses.toFixed(2)}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                Expenses this month
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <p className="text-sm font-medium text-gray-500">
                                Food
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                ₱{foodExpenses.toFixed(2)}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                Total food expenses
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <p className="text-sm font-medium text-gray-500">
                                Transportation
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                ₱{transportationExpenses.toFixed(2)}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                Total transportation
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Recent Expenses
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your latest recorded transactions.
                                </p>
                            </div>

                            <Link
                                href={route('expenses.index')}
                                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                            >
                                View All
                            </Link>
                        </div>

                        {recentExpenses.length === 0 ? (
                            <div className="p-10 text-center">
                                <p className="font-semibold text-gray-800">
                                    No expenses recorded yet.
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    Add your first expense to start tracking your spending.
                                </p>

                                <Link
                                    href={route('expenses.index')}
                                    className="mt-5 inline-flex rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    Add Your First Expense
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50 text-left">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Description
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Category
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentExpenses.map((expense) => (
                                            <tr
                                                key={expense.id}
                                                className="border-b border-gray-100 transition last:border-b-0 hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {expense.description}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                    ₱{Number(
                                                        expense.amount
                                                    ).toFixed(2)}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                                                        {expense.category}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {String(
                                                        expense.expense_date
                                                    ).slice(0, 10)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}