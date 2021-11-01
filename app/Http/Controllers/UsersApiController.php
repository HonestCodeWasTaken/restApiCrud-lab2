<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\users;
class UsersApiController extends Controller
{
    public function index()
    {
        return users::all();
    }

    public function store()
    {
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
    }

    public function update(users $user)
    {
        request()->validate([
            'username' => 'required',
            'email' => 'required'
        ]);

        $success = $user->update([
            'username' => request('username'),
            'email' => request('email')
        ]);

        return [
            'success' => $success
        ];
    }

    public function destroy(users $user)
    {
        $success = $user->delete();

        return [
            'success' => $success,
        ];
    }
}
