import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from '../components/Login';
import Profile from '../components/Profile';
import AdminProfile from '../components/AdminProfile';
import ChatRoom from '../components/ChatRoom';
import Rooms from '../components/Rooms';
import Users from '../components/Users';
import UpdateUser from '../components/UpdateUser';
import UpdateRoom from '../components/UpdateRoom';

const Router = (props) => (
        <div>
            <BrowserRouter>
                <div className="py-4">
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/adminprofile" component={AdminProfile}/>
                        <Route path="/chatroom/:id" component={ChatRoom}/>
                        <Route path="/rooms" component={Rooms}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/setingusers/:id" component={UpdateUser}/>
                        <Route path="/setingrooms/:id" component={UpdateRoom}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );


 

export default Router;