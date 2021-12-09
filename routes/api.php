<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\messages;
use App\Models\users;
use App\Http\Controllers\MessagesApiController;
use App\Http\Controllers\UsersApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobPostsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/messages', [MessagesApiController::class, 'index']);
Route::get('/messages/{message}', [MessagesApiController::class, 'getWithID']);
Route::get('/messages/query', [MessagesApiController::class, 'indexQuery']);
Route::get('/users', [UsersApiController::class, 'index']);
Route::get('/users/{message}', [UsersApiController::class, 'getWithID']);

Route::get('/jobs', [JobPostsController::class, 'index']);
Route::get('/jobs/{id}', [JobPostsController::class, 'getWithID']);

Route::post('/messages', [MessagesApiController::class, 'store']);
Route::put('/messages/{message}', [MessagesApiController::class, 'update']);
Route::delete('/messages/{message}', [MessagesApiController::class, 'destroy']);


Route::post('/users', [UsersApiController::class, 'store']);
Route::put('/users/{user}', [UsersApiController::class, 'update']);
Route::delete('/users/{user}', [UsersApiController::class, 'destroy']);

Route::post('/jobs', [JobPostsController::class, 'store']);
Route::put('/jobs/{user}', [JobPostsController::class, 'update']);
Route::delete('/jobs/{user}', [JobPostsController::class, 'destroy']);
