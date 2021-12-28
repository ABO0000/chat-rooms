
import React, { useEffect, useState } from 'react';
import {Link , useHistory} from 'react-router-dom';
import api from '../../Api'

import '../../../css/profile.css'
import { isSet } from 'lodash';




function Profil() {

    const [user, setUser] = useState([])

    const history = useHistory()

  const [rooms, setRooms] = useState([])
  
  
  useEffect(() => {
    if (user.length == 0) return setUser(JSON.parse(localStorage.getItem('userData'))[0])


    if (rooms.length == 0) {
      api.post('/chat/' + user.id)   
        .then(res => {
            if (res.rooms.length != 0) {
                setRooms(res.rooms)
            }
        })
    }
  }, [user, setUser, rooms])
    
//   const redirectHandler = (id) => history.push('/chatroom/{id}')
  const redirectHandler = (id) => history.push(`/chatroom/${id}`)
  


    return (

        <div className="profile-page sidebar-collapse">
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Select Room</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span >All rooms:{rooms.length} </span>

                            <ul id="notebook_ul">
                                {
                                    (rooms.length>0)?
                                    rooms.map(({ id, name, surname })=>{
                                        { 
                                            return(
                                                <div key={id} >
                                                    {/* <Link to={`/chatroom/${id}`}> <li ng-repeat="notebook in notebooks | filter:query | orderBy: orderList" style={{width:'300px',backgroundColor:'darkgray',marginTop:'10px',height:'50px',display:'flex',justifyContent:'center',alignItems:'center'}} >{name}  {surname}</li> </Link>                      */}
                                                
                                                    <li ng-repeat="notebook in notebooks | filter:query | orderBy: orderList" style={{width:'300px',backgroundColor:'darkgray',marginTop:'10px',height:'50px',display:'flex',justifyContent:'center',alignItems:'center'}} ><button type="button" className="btn btn-secondary" data-dismiss="modal" style={{width:'110%'}} onClick={() => redirectHandler(`${id}`)} >{name}</button></li>                     
                                                </div>
                                            )
                                        }
                                    }):''
                                }
                            </ul>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
            
            <div className='ext' style={{width:'100%',height:'66px', display:'flex',justifyContent:'space-between',alignItems:' center', padding:' 20px',background:'#563d7c', position:'sticky',top:'0',zIndex: '1071'}}>
                <Link to='/profile' href="profile.php" style={{textDecoration:'none'}}><h1 style={{color:'white' ,marginLeft: '25px',fontSize:'40px'}}>Profile</h1></Link>
                    {
                       (user)? 
                                <div style={{ display:'flex',justifyContent: 'center',alignItems: 'center'}}>
                                    <h1 style={{color:'white' ,marginLeft: '25px'}}>{user.name}</h1>
                                    <h1 style={{color:'white',marginLeft: '10px'}}>{user.surname}</h1>
                                    {/* <p style={{marginLeft: '25px'}}><a href='addproduct.php' style="color:white "> Add Product</a> </p> */}
                                    <p style={{marginLeft: '25px',marginop: '10px' , paddingRight: '30px'}} ><Link to='/' style={{color:'white' }}> Logout</Link> </p>
                                </div>
                        :
                        <p style={{paddingRight: '30px'}}><Link to='/' style={{color:'white' }}> Login</Link> </p>
                    }   
            </div>

            <div className="wrapper">
                <div className="page-header clear-filter" filter-color="orange">
                    <div className="page-header-image" data-parallax="true" style={{backgroundImage:`url('https://images.unsplash.com/photo-1557053819-aa6046add523?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80')`}}>
                    </div>
                    <div className="container">
                        <div className="photo-container">
                            <img src={user.avatar} width="100%" className="rounded-circle"/>
                        </div>
                        <h3 className="title">{user.name} {user.surname}</h3>
                        <p className="category">User</p>
                    </div>
                </div>

                <div className="section">
                    <div className="container">
                        <div className="button-container">
                            <button type="button" className="btn btn-primary btn-round btn-lg" data-toggle="modal" data-target="#exampleModalCenter">
                                Rooms
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="section">
                    <div className="container">
                        <div className="button-container" style={{marginTop:'-160px'}}>

                               

                            <div id="notebooks2" ng-app="notebooks2" ng-controller="NotebookListCtrl">
                                <h5>Chat Rooms</h5>
                                <ul id="notebook_ul">
                                    {
                                        (rooms.length>0)?
                                        rooms.map(({ id, name, surname })=>{
                                            { 
                                                return(
                                                    <div key={id} >
                                                    
                                                    <Link to={`/chatroom/${id}`}> <li ng-repeat="notebook in notebooks | filter:query | orderBy: orderList" style={{width:'300px',backgroundColor:'darkgray',marginTop:'10px',height:'50px',display:'flex',justifyContent:'center',alignItems:'center'}} >{name}  {surname}</li> </Link>                     
                                                </div>
                                                )
                                            }
                                        }):''
                                    }
                                <span >All rooms:{rooms.length} </span>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
export default Profil;
