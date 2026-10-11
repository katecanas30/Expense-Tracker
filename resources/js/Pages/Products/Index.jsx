
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";

export default function Index({ products }) {
    const [editingProduct, setEditingProduct] = useState(null);
    const { flash = {} } = usePage().props;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        category: "Other",
        description: "",
        price: "",
        quantity: "0",
    });

    function startEdit(product) {
        setEditingProduct(product);
        setData({
            name: product.name,
            category: product.category,
            description: product.description || "",
            price: product.price,
            quantity: String(product.quantity),
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function cancelEdit() {
        setEditingProduct(null);
        reset();
        setData({
            name: "",
            category: "Other",
            description: "",
            price: "",
            quantity: "0",
        });
    }

    function submit(event) {
        event.preventDefault();

        if (editingProduct) {
            put(route("products.update", editingProduct.id), {
                onSuccess: cancelEdit,
            });
        } else {
            post(route("products.store"), {
                onSuccess: () => {
                    reset();
                    setData({
                        name: "",
                        category: "Other",
                        description: "",
                        price: "",
                        quantity: "0",
                    });
                },
            });
        }
    }

    function deleteProduct(product) {
        if (window.confirm(`Delete "${product.name}"?`)) {
            router.delete(route("products.destroy", product.id));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Products Management" />

            <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-violet-600">
                                Expense Tracker
                            </p>
                            <h1 className="mt-1 text-3xl font-bold text-gray-900">
                                Products Management
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                Manage your product records in one place.
                            </p>
                        </div>

                        <Link
                            href={route("dashboard")}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Back to Dashboard
                        </Link>
                    </div>

                    {flash.success && (
                        <div className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-lg font-semibold text-gray-900">
                            {editingProduct ? "Edit Product" : "Add Product"}
                        </h2>

                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData("category", e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                        required
                                    >
                                        {["Other", "Food", "School", "Electronics", "Clothing", "Household"].map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Price (₱)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData("price", e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                        required
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={data.quantity}
                                        onChange={(e) => setData("quantity", e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                        required
                                    />
                                    {errors.quantity && (
                                        <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Saving..."
                                        : editingProduct
                                          ? "Update Product"
                                          : "Add Product"}
                                </button>

                                {editingProduct && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Product Records
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    {products.length} {products.length === 1 ? "product" : "products"} recorded
                                </p>
                            </div>
                        </div>

                        {products.length === 0 ? (
                            <div className="px-6 py-14 text-center">
                                <h3 className="text-base font-semibold text-gray-900">
                                    No products yet
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Add your first product using the form above.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {["Product", "Category", "Price", "Quantity", "Actions"].map((heading) => (
                                                <th
                                                    key={heading}
                                                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                                >
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-gray-900">{product.name}</p>
                                                    {product.description && (
                                                        <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
                                                            {product.description}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.category}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    ₱{Number(product.price).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.quantity}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => startEdit(product)}
                                                            className="font-medium text-violet-600 hover:text-violet-800"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteProduct(product)}
                                                            className="font-medium text-red-600 hover:text-red-800"
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