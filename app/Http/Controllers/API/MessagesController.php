<?php

namespace App\Http\Controllers\API;

use App\Events\NewMessage;
use App\Http\Controllers\Controller;

use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;


class MessagesController extends Controller
{

  public function allMsgChat(Request $request ,Room $room)
  {
    $message = Message::where('room_id', $room->id)->get();


    return response()->json([
        'status'=>200,
        'messages' => $message,
        ]);

  }


  public function sendMsg(Request $request ,Room $room)
  {

    $Message = new Message;
        $Message->user_id = $request->user_id;
        $Message->room_id = $room->id;
        $Message->message =$request->msg;       
        $Message->save();
    
        broadcast(new NewMessage($Message))->toOthers();
        $messageRoom = Message::where('room_id', $room->id)->get();
    

    return response()->json([
        'status'=>200,
        'messages'=>$messageRoom,
    ]);
    

  }




}