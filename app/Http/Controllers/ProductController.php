<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = $request->user()
            ->products()
            ->latest()
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'quantity' => ['required', 'integer', 'min:0'],
        ]);

        $request->user()->products()->create($validated);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product added successfully.');
    }

    public function show(Request $request, Product $product): Response
    {
        $product = $request->user()
            ->products()
            ->findOrFail($product->id);

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    public function edit(Request $request, Product $product): Response
    {
        $product = $request->user()
            ->products()
            ->findOrFail($product->id);

        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(
        Request $request,
        Product $product
    ): RedirectResponse {
        $product = $request->user()
            ->products()
            ->findOrFail($product->id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'quantity' => ['required', 'integer', 'min:0'],
        ]);

        $product->update($validated);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(
        Request $request,
        Product $product
    ): RedirectResponse {
        $product = $request->user()
            ->products()
            ->findOrFail($product->id);

        $product->delete();

        return redirect()
            ->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }
}