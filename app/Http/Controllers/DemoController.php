<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DemoController extends Controller
{
    /**
     * To display the show page
     *
     * @return \Illuminate\Http\Response
     */
    public function viewOnlineVisitors() 
    {    
        return view('demos.onlineVisitors');
    }

}