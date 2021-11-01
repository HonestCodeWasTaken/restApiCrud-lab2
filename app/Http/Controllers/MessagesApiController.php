<?php

namespace App\Http\Controllers;
use App\Models\messages;
use Illuminate\Http\Request;

class MessagesApiController extends Controller
{
    public function index()
    {
        return messages::all();
    }

    public function store()
    {
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
    }

    public function update(messages $message)
    {
        request()->validate([
            'message' => 'required'
        ]);

        $success = $message->update([
            'message' => request('message')
        ]);

        return [
            'success' => $success
        ];
    }

    public function destroy(messages $message)
    {
        $success = $message->delete();

        return [
            'success' => $success,
        ];
    }
}
