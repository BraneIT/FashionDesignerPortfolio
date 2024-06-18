<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\CertificateController;
use App\Http\Controllers\api\V1\ReviewController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'v1'], function () {
    // Auth routes
    Route::post('login', [AuthController::class, 'login'])->name('login');

    // Routes that require authentication
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/home', [AuthController::class, 'home']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Projects routes
        Route::apiResource('/projects', ProjectController::class);
        Route::delete('/image/{image}', [ProjectController::class, 'destroyImage']);

        // Reviews routes
        Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);

        // Certificates routes
        Route::apiResource('/certificates', CertificateController::class);
    });

    // Public Reviews routes
    Route::post('/store', [ReviewController::class, 'store']);
    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::get('/reviews/{review}', [ReviewController::class, 'show']);
    Route::post('/reviews', [ReviewController::class, 'store']);
});
