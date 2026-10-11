<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Expenses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|gt:0',
            'category' => 'required|string|max:100',
            'expense_date' => 'required|date',
        ]);

        Expense::create([
            'user_id' => Auth::id(),
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'category' => $validated['category'],
            'expense_date' => $validated['expense_date'],
        ]);

        return redirect()
            ->route('expenses.index')
            ->with('success', 'Expense added successfully.');
    }

    public function show(Expense $expense)
    {
        abort_unless($expense->user_id === Auth::id(), 403);

        return Inertia::render('Expenses/Show', [
            'expense' => $expense,
        ]);
    }

    public function edit(Expense $expense)
    {
        abort_unless($expense->user_id === Auth::id(), 403);

        return Inertia::render('Expenses/Edit', [
            'expense' => $expense,
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        abort_unless($expense->user_id === Auth::id(), 403);

        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|gt:0',
            'category' => 'required|string|max:100',
            'expense_date' => 'required|date',
        ]);

        $expense->update($validated);

        return redirect()
            ->route('expenses.index')
            ->with('success', 'Expense updated successfully.');
    }

    public function destroy(Expense $expense)
    {
        abort_unless($expense->user_id === Auth::id(), 403);

        $expense->delete();

        return redirect()
            ->route('expenses.index')
            ->with('success', 'Expense deleted successfully.');
    }
}