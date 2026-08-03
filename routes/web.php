<?php

use App\Http\Controllers\CourseMaterialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('landing'))->name('home');

Route::get('/milda', fn () => Inertia::render('milda', [
    'syllabusUrl' => route('course-materials.syllabus'),
]))->name('milda');

Route::get('/course-materials/milda-syllabus', [CourseMaterialController::class, 'syllabus'])
    ->name('course-materials.syllabus');

Route::get('/milda', fn () => Inertia::render('milda'))->name('milda');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';