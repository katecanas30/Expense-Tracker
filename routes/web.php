<?php

use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $expenses = \App\Models\Expense::where(
        'user_id',
        Auth::id()
    )
        ->latest()
        ->get();

    return Inertia::render('Dashboard', [
        'expenses' => $expenses,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [
        ProfileController::class,
        'edit',
    ])->name('profile.edit');

    Route::patch('/profile', [
        ProfileController::class,
        'update',
    ])->name('profile.update');

    Route::delete('/profile', [
        ProfileController::class,
        'destroy',
    ])->name('profile.destroy');
});

    Route::resource('expenses', ExpenseController::class)
    ->middleware('auth');

    Route::resource('products', ProductController::class)
    ->middleware('auth');

require __DIR__.'/auth.php';