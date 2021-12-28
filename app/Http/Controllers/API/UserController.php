<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChatRequest;
use App\Http\Requests\User\CreateRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\MessagesRequest;
use App\Http\Requests\User\UsersRequest;
use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    
    public function store(CreateRequest $request)
    {
        
        $user = User::where('email', $request->input('email'))->first(['id','name','surname','email', 'type','avatar']);

        if(!$user){
            User::create([
                'name' => $request->input('name'),
                'surname' => $request->input('surname'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'gender' => $request->input('gender'),
            ]);

            return response()->json([
                'status'=>200,
                'message'=>'User Added Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>400,
                'error'=>'Email is busy',
            ]);
        }
    } 
    
    public function login(LoginRequest $request)
    {
        
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->input('email'))->first(['id','name','surname','email', 'type','avatar']);
        
        if (Auth::attempt($credentials)) {
            return response()->json([
                'status' => 200,
                'message'=>'User Loggined Successfully',
                'user'   => $user,
            ]);
        }
        elseif (!$user) {
            return response()->json([
                'status'=> 400,
                'errors'=> 'Wrong your email'
            ]);
        }
        else{
            return response()->json([
                'status'=> 400,
                'errors'=> 'Wrong your password'
            ]);
        }

    }

        
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }

   
    public function allUsers()
    {
        $users = User::where('type', 0)->paginate(10);
        return response()->json([
            'status'=>200,
            'users' => $users,
            
        ]);
    }
    public function deleteUser(Request $request){
        $user = User::find($request->id)->first()->delete();
        $users = User::where('type', 0)->paginate(10);
        
        return response()->json([
            'status'=>200,
            'message' => 'user is deleted',
            'users' => $users,

        ]);
    }

    public function allRooms()
    {
        $rooms = Room::all();
        // dd($rooms);
        return response()->json([
            'status'=>200,
            'rooms' => $rooms,
            
        ]);

        // $rooms = Room::select('id','name')->get();
        // return response()->json([
        //     'status'=>200,
        //     'rooms' => $rooms,
        //     ]);
        
    }

    public function deleteRoom(Request $request){
        $room = Room::find($request->id['id']);
        $room->delete();
        $rooms = Room::select('id','name')->get();
        
        return response()->json([
            'status'=>200,
            'message' => 'room is deleted',
            'rooms' => $rooms,

        ]);
    }


    public function usersRoom(Request $request){
        $room_id=$request->id;
        $users_rooms = UserRoom::where('room_id', $room_id)->get();
        $users_id= [];
        foreach($users_rooms as $users_room){
            $users_id[] = $users_room->user_id;
        }
        $usersin = User::where('type', 0)->whereIn('id', $users_id)->get();
        $users = User::where('type', 0)->whereNotIn('id', $users_id)->get();

        return response()->json([
            'status'=>200,
            'users' => $users,
            'usersin' => $usersin,
            'room_id'=>$room_id,
            ]);
    }

    public function userInfo(Request $request){
        $user_id=$request->all();
        $user = User::find($user_id)[0];
        return response()->json([
            'status'=>200,
            'user' => $user
        ]);
    }

    public function updateUserInfo(UsersRequest $request, User $user){
        $user->update($request->all());

        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }
    
    public function addUsersRoom(Request $request){
        $UserRoom = new UserRoom;
        $UserRoom->user_id = $request->id;
        $UserRoom->room_id = $request->room_id['id'];
       
       
        $UserRoom->save();

        $room_id=$request->room_id;
        $users_rooms = UserRoom::where('room_id', $room_id)->get();
        $users_id= [];
        foreach($users_rooms as $users_room){
            $users_id[] = $users_room->user_id;
        }
        $users = User::where('type', 0)->whereNotIn('id', $users_id)->get();
        $usersin = User::where('type', 0)->whereIn('id', $users_id)->get();
        
        return response()->json([
            'status'=>200,
            'users' => $users,
            'usersin' =>$usersin
            
        ]);

    }

    
    public function deleteUsersRoom(Request $request){

        $UserRoom = new UserRoom;
        $room_id=$request->room_id;
        $user_id=$request->id;
        UserRoom::where('user_id', $user_id)->delete();
        $users_rooms = UserRoom::where('room_id', $room_id)->get();

        $users_id= [];
        foreach($users_rooms as $users_room){
            $users_id[] = $users_room->user_id;
        }
        $users = User::where('type', 0)->whereNotIn('id', $users_id)->get();
        $usersin = User::where('type', 0)->whereIn('id', $users_id)->get();

        return response()->json([
            'status'=>200,
            'users' => $users,
            'usersin' =>$usersin

            
            ]);
        dd($users);
    }


    public function chat(ChatRequest $request , User $user)
    {
        
        $room_id = UserRoom::select('room_id')->where('user_id',$user->id)->get();
        $rooms=Room::whereIn('id',$room_id)->get();
        return response()->json([
            'status'=>200,
            'rooms' => $rooms,
        ]);
    }


    public function usersChat(UsersRequest $request,Room $room)
    {
        
        $user_id = UserRoom::select('user_id')->where('room_id', $room->id)->get();
        $users= User::whereIn('id',$user_id)->get();
        return response()->json([
            'status'=>200,
            'users' => $users,
        ]);
    }


}
