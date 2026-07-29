<?php

use App\Http\Controllers\CourseMaterialController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'milda')->name('home');
Route::get('/course-materials/milda-syllabus', [CourseMaterialController::class, 'syllabus'])
    ->name('course-materials.syllabus');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
