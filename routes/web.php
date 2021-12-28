<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;


Route::get('/logout', [UserController::class, 'logout']);

/**
 * Let react-route handle all the app routes
 */
Route::get('/{path?}', function () {
    return view('welcome');
})->where('path', '^(?!api).*$');


// Route::get('user/create', [ UserController::class, 'create' ]);

// Route::post('user/store', [ UserController::class, 'store' ]);
