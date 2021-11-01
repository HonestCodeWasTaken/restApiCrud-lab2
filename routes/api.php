<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\messages;
use App\Models\users;
use App\Http\Controllers\MessagesApiController;
use App\Http\Controllers\UsersApiController;
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

Route::get('/messages', function () {
    return messages::all();
});
Route::get('/users', function () {
    return users::all();
});
Route::post('/messages', function () {
    request()->validate([
        'message' => 'required',
        'whoSent_ID' => 'required',
        'receiver_ID' => 'required',
    ]);
    return messages::create(
        [
            'message' => request('message'),
            'whoSent_ID' => request('whoSent_ID'),
            'receiver_ID' => request('receiver_ID'),
        ]
    );
});
Route::post('/users', function () {
    request()->validate([
        'username' => 'required',
        'email' => 'required'
    ]);
    return users::create(
        [
            'username' => request('username'),
            'email' => request('email')
        ]
    );
});
Route::put('/messages/{message}', function (messages $message) {
    request()->validate([
        'message' => 'required'
    ]);
    $message->update([
        'message' => request('message')
    ]);
});
Route::put('/users/{user}', function (users $user) {
    request()->validate([
        'username' => 'required',
        'email' => 'required'
    ]);
    $user->update([
        'username' => request('username'),
        'email' => request('email')
    ]);
});
Route::delete('/users/{user}', function (users $user) {
    $success = $user->delete();

    return [
        'success' => $success,
    ];
});
Route::delete('/messages/{message}', function (messages $message) {
    $success = $message->delete();

    return [
        'success' => $success,
    ];
});

Route::get('/messages', [MessagesApiController::class, 'index']);
Route::post('/messages', [MessagesApiController::class, 'store']);
Route::put('/messages/{message}', [MessagesApiController::class, 'update']);
Route::delete('/messages/{message}', [MessagesApiController::class, 'destroy']);

Route::get('/users', [UsersApiController::class, 'index']);
Route::post('/users', [UsersApiController::class, 'store']);
Route::put('/users/{user}', [UsersApiController::class, 'update']);
Route::delete('/users/{user}', [UsersApiController::class, 'destroy']);


