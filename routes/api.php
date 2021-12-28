<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\MessagesController;

Route::post('/add-user',[UserController::class,'store']);
Route::post('/search-user',[UserController::class,'login']);

Route::post('/chat/{user}' , [UserController::class,'chat']);

Route::post('/users_chat/{room}' , [UserController::class,'usersChat']);

Route::get('/all_users',[UserController::class,'allUsers']);

Route::post('/delete_user',[UserController::class,'deleteUser']);

Route::get('/all_rooms',[UserController::class,'allRooms']);

Route::post('/delete_room',[UserController::class,'deleteRoom']);

Route::post('/add_room',[RoomController::class,'addRoom']);

Route::post('/users_room',[UserController::class,'usersRoom']);

Route::post('/add_users_room',[UserController::class,'addUsersRoom']);

Route::post('/delete_users_room', [UserController::class,'deleteUsersRoom']);

Route::post('/user_info',[UserController::class,'userInfo']);

Route::post('/update_user_info/{user}', [UserController::class, 'updateUserInfo']);

Route::post('/room_info',[RoomController::class,'roomInfo']);

Route::post('/update_room_info/{room}',[RoomController::class,'updateRoomInfo']);

Route::post('/allmsg_chat/{room}', [MessagesController::class,'allMsgChat']);

Route::post('/send_msg/{room}', [MessagesController::class,'sendMsg']);

// Route::post('/get_user_info_for_update', [UserController::class, 'getUserInfoForUpdate']);


Route::middleware('auth:sanctum')->group(function() {

});
