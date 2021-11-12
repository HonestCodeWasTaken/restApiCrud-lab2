<?php

namespace App\Http\Controllers;

use App\Models\messages;
use Illuminate\Http\Request;

class MessagesApiController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $limit =  $request->query('limit', 10);
        $isWhoSentId = $request->get("whoSentId");
        $isReceiverId = $request->get("receiverId");
        if ($isWhoSentId) {
            $fromUser = $request->query("whoSentId");
            $messages = messages::skip($page * $limit)->take($limit)->where('whoSent_ID', '=', $fromUser)->get();
        } else if ($isReceiverId) {
            $receiverUser = $request->query("receiverId");
            $messages = messages::skip($page * $limit)->take($limit)->where('receiver_ID', '=', $receiverUser)->get();
        } else {
            $messages = messages::skip($page * $limit)->take($limit)->get();
        }


        $jsonData = ['status' => 'SUCCESS', 'messages' => []];

        foreach ($messages as $message) {

            $jsonData['messages'][] = [
                'id' => $message->id,
                'created_at' => $message->created_at,
                'updated_at' => $message->updated_at,
                'message' => $message->message,
                'whoSent_ID' => $message->whoSent_ID,
                'receiver_ID' => $message->receiver_ID,
                'XDDD' => $message->XDDD,
            ];
        }

        return response()->json($jsonData);
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
                'XDDD' => request('XDDD'),
            ]
        );
    }
    public function indexQuery(Request $request)
    {
        $page = $request->query('page', 0);
        $limit =  $request->query('limit', 10);
        // $fromUser = $request->query("whoSentId");
        //->where('whoSent_ID', '=', $fromUser)
        $messages = messages::skip($page * $limit)->take($limit)->get();

        $jsonData = ['status' => 'SUCCESS', 'messages' => []];

        foreach ($messages as $message) {

            $jsonData['messages'][] = [
                'id' => $message->id,
                'created_at' => $message->created_at,
                'updated_at' => $message->updated_at,
                'message' => $message->message,
                'whoSent_ID' => $message->whoSent_ID,
                'receiver_ID' => $message->receiver_ID,
            ];
        }

        return response()->json($jsonData);
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
    public function getWithID(messages $message)
    {
        // return messages::where('id', $message)->firstOrFail();

        return messages::query('id', $message)->firstOrFail();
    }
}
