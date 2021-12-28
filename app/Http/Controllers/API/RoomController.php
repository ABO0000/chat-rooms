<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\RoomRequest;
use App\Http\Resources\Room\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function addRoom(RoomRequest $request)
    {
        $room = Room::select('id','name')->where('name' , $request->input('name'))->first();; 
        // dd($room);
        if(!$room){
            Room::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                
            ]);
        }

        

        $rooms = Room::select('id','name')->get();
            
        return response()->json(RoomResource::collection($rooms));
        response()->json([
            'status'=>200,
            'message'=>'Room Added Successfully',
            'rooms'=> $rooms,
            ]);
    }

    public function roomInfo(Request $request){
        $room_id=$request->all();
        $room = Room::find($room_id)[0];
        return response()->json([
            'status'=>200,
            'room' => $room
        ]);
    }
    // public function updateRoomInfo(Request $request){
    //     $room_name=$request->all()[0]['name'];
    //     $room_description=$request->all()[1]['description'];
    //     $room_id=$request->all()[2];
    //     // dump($room_name);
    //     // dump($room_id);
    //     $roomall = Room::select('id','name')->where('name' , $room_name)->first();; 
    //     // dd($room);
    //     if(!$roomall){
    //         $room = Room::where('id', $room_id)->update(['name' => $room_name ,'description'=>$room_description]);
    //     }
    //     return response()->json([
    //         'status'=>200,
    //         'message'=>'OK'
    //     ]);
    // }

    public function updateRoomInfo(Request $request, Room $room){
        $room_name=$request->all()['name'];
        $room_description=$request->all()['description'];
        $room_id=$request->all()['id'];
        // dump($room_name);
        // dump($room['id']);
        $room_all = Room::select('id','name')->where('name' , $room_name)->first();
        if(!$room_all || $room['id']==$room_all['id']){
            // $roomup = Room::where('id', $room_id)->update(['name' => $room_name ,'description'=>$room_description]);
            // // dd('$room');
            $room->update($request->all());
            return response()->json([
                'status' => 200,
                'room' => $room,
            ]);
        }
        
    }
}
