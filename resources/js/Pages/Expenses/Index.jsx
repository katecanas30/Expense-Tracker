import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ expenses }) {
    const [editingExpense, setEditingExpense] = useState(null);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        description: '',
        amount: '',
        category: '',
        expense_date: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('expenses.store'), {
            onSuccess: () => reset(),
        });
    };

    const startEdit = (expense) => {
        setEditingExpense(expense);

        setData({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            expense_date: expense.expense_date,
        });
    };

    const cancelEdit = () => {
        setEditingExpense(null);
        reset();
    };

    const updateExpense = (e) => {
        e.preventDefault();

        put(route('expenses.update', editingExpense.id), {
            onSuccess: () => {
                setEditingExpense(null);
                reset();
            },
        });
    };

    const deleteExpense = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            router.delete(`/expenses/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const filteredExpenses = expenses.filter((expense) => {
        const matchesSearch =
            expense.description
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === '' ||
            expense.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Expenses
                </h2>
            }
        >
            <Head title="Expenses" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">
                            {editingExpense
                                ? 'Edit Expense'
                                : 'Add Expense'}
                        </h1>

                        <form
                            onSubmit={
                                editingExpense
                                    ? updateExpense
                                    : submit
                            }
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>

                                    <input
                                        type="text"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="e.g. Lunch"
                                    />

                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData(
                                                'amount',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="0.00"
                                    />

                                    {errors.amount && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.amount}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Category
                                    </label>

                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData(
                                                'category',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        <option value="Food">
                                            Food
                                        </option>

                                        <option value="Transportation">
                                            Transportation
                                        </option>

                                        <option value="School">
                                            School
                                        </option>

                                        <option value="Shopping">
                                            Shopping
                                        </option>

                                        <option value="Bills">
                                            Bills
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>

                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        value={data.expense_date}
                                        onChange={(e) =>
                                            setData(
                                                'expense_date',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.expense_date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.expense_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : editingExpense
                                            ? 'Update Expense'
                                            : 'Add Expense'}
                                </button>

                                {editingExpense && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="rounded-md bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Expense Records
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Search and filter your expenses.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search expenses..."
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />

                                <select
                                    value={categoryFilter}
                                    onChange={(e) =>
                                        setCategoryFilter(e.target.value)
                                    }
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        All Categories
                                    </option>

                                    <option value="Food">
                                        Food
                                    </option>

                                    <option value="Transportation">
                                        Transportation
                                    </option>

                                    <option value="School">
                                        School
                                    </option>

                                    <option value="Shopping">
                                        Shopping
                                    </option>

                                    <option value="Bills">
                                        Bills
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>
                        </div>

                        {filteredExpenses.length === 0 ? (
                            <div className="rounded-md border border-dashed border-gray-300 p-8 text-center">
                                <p className="font-medium text-gray-700">
                                    No expenses found.
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Try changing your search or category filter.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="p-3">
                                                Description
                                            </th>

                                            <th className="p-3">
                                                Amount
                                            </th>

                                            <th className="p-3">
                                                Category
                                            </th>

                                            <th className="p-3">
                                                Date
                                            </th>

                                            <th className="p-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredExpenses.map((expense) => (
                                            <tr
                                                key={expense.id}
                                                className="border-b last:border-b-0"
                                            >
                                                <td className="p-3">
                                                    {expense.description}
                                                </td>

                                                <td className="p-3 font-medium">
                                                    ₱{Number(
                                                        expense.amount
                                                    ).toFixed(2)}
                                                </td>

                                                <td className="p-3">
                                                    {expense.category}
                                                </td>

                                                <td className="p-3">
                                                    {String(
                                                        expense.expense_date
                                                    ).slice(0, 10)}
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                startEdit(
                                                                    expense
                                                                )
                                                            }
                                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteExpense(
                                                                    expense.id
                                                                )
                                                            }
                                                            className="text-sm font-medium text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
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