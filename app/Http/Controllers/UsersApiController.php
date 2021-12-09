<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\users;
class UsersApiController extends Controller
{
    public function index()
    {
        //$paginatedUsers = users::paginate(2);
        return users::all();
    }


    public function store()
    {
        request()->validate([
            'username' => 'required',
            'email' => 'required',
            'certifiedToPost' => 'required',
            'role' => 'required',
        ]);
        return users::create(
            [
                'username' => request('username'),
                'certifiedToPost' => request('certifiedToPost'),
                'role' => request('role'),
                'email' => request('email')
            ]
        );
    }

    public function update(users $user)
    {
        request()->validate([
            'username' => 'required',
            'email' => 'required',
            'certifiedToPost' => 'required',
            'role' => 'required',
        ]);

        $success = $user->update([
            'username' => request('username'),
            'certifiedToPost' => request('certifiedToPost'),
            'role' => request('role'),
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
    public function getWithID(users $user){
        // return messages::where('id', $message)->firstOrFail();
        return users::query('id', $user)->firstOrFail();
        
    }
}
