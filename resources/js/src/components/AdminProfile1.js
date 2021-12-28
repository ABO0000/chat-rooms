
import {Link , useHistory,useParams} from 'react-router-dom';
import { useState, useEffect, useReducer } from "react";
import api from '../../Api'
import '../../../css/profile.css'
import { update } from 'lodash';
import { title } from 'process';




function AdminProfile() {

    let user = JSON.parse(localStorage.getItem('userData'))[0]

    const history = useHistory()

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (users.length == 0) {
            api.get("/all_users").then((res) => {
                if(!res.users.data.length) return;
                setUsers(res.users.data)
            });
        }
    }, [users]);
    
    function deleteUser(id){
        api.post("/delete_user", {id: id})
        .then((res) => {
            setUsers(res.users.data);
        })
    }
    


  
    const [isUpdated, setIsUpdated] = useState(true);
    
    const [defoult, setDefoult] = useReducer((state, payload) => ({
        ...state,
        ...payload,
    }), {
        name: '',
        surname: '',
        description:''
    });

    const [updateset, setUpdateset] = useState({});
    
    const updateUserInfo = () => {
        api.post("/update_user_info/" + defoult.id, defoult)
            .then(({ user }) => {
                setUsers(users.map((u) => (u.id === user.id ? user : u)))
            })
        
    }





    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        if (!rooms.length) {
            api.get("/all_rooms").then((res) => {
                if(!res.rooms.length) return;
                setRooms(res.rooms)
            });
        }
    }, [rooms]);


    

    
    
    // const [users, setUsers] = useState([]);
    
    const [roomId, setRoomId] = useState([]);
    const [usersin, setUsersin] = useState([]);
    
    
    function deleteRoom(id){
        api.post("/delete_room", {id: id})
        .then((res) => {
            console.log(res)
            setRooms(res.rooms);
        })
    }

    const updateRoomInfo = () => {
        api.post("/update_room_info/" + defoult.id, defoult)
            .then(({ room }) => {
                setRooms(rooms.map((u) => (u.id === room.id ? room : u)))
            })
        
    }
    

    // function deleteRoom(id){
    //     console.log('id',id)
    //     // api.post("/delete_room", {id: id})
    //     // .then((res) => {
    //     //     setRooms(res.rooms);
    //     // })
    // } 
    
    // const DeleteUsers=(id)=>{
    //     api.post("/delete_users_room", {id: id,room_id:roomId})
    //     .then((res) => {
    //         setUsers(res.users)
    //         setUsersin(res.usersin)
    //     })
    // }

    const AddUsers=(id)=>{
        setUsers([])
        setUsersin([])
        
        api.post("/users_room", {id: id}).then((res) => {
            setUsers(res.users)
            setUsersin(res.usersin)
            
            setRoomId(res.room_id)
        })
    }
    
    const AddUsersInRoom=(id)=>{
        
        api.post("/add_users_room", {id: id,room_id:roomId})
        .then(res => {
            setUsers(res.users)
            setUsersin(res.usersin)
        })
    }

    const[new_room,setNew_room]=useState({
        name:'',
        description:''
    })
    

    const Add=()=>{
        console.log(new_room)
        const res =  api.post('/add_room',new_room)
        .then(res => {
            setRooms(res)
            
            setNew_room({
                name:'',
                description:''
            })
        })
        
        
    }

    return (
        <div className="profile-page sidebar-collapse">

            

            <div className="modal fade" id="usersModalCenter" tabIndex="-1" role="dialog" aria-labelledby="usersModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="usersModalLongTitle">Select Room</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span >All users:{users.length} </span>

                            <ul id="notebook_ul">
                                {
                                    users.map((user) => (
                                        <div key={user.id}>
                                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                                {user.name} {user.surname} 
                                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                                {
                                                users.map(({name,id}) => (
                                                    (id==user.id)?
                                                    <div key={id}>
                                                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                                            <div>
                                                            <button className="btn btn-danger m-3" onClick={() => deleteUser({id})}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>:''
                                                 ))
                                                }

                                                {/* <button className="btn btn-danger m-3" onClick={() => deleteUser({id})}>Delete</button> */}
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateModalCenter"
                                                    onClick={()=> setDefoult(user)}>
                                                    Update
                                                </button>
                                                {/* <Link to={`/setingusers/${id}`} ><button className="btn btn-success m-3" >Update</button></Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            

            <div className="modal fade" id="updateModalCenter" style={{background:'gray'}} tabIndex="-1" role="dialog" aria-labelledby="updateModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLongTitle">Update</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{display:'flax',justifyContent:'center'}}>
                            <div style={{width:'50%',display:'flax',justifyContent:'center',flexWrap:'wrap',marginTop:'15px' ,marginLeft:'25%'}}>
                                <input name='name'  placeholder='Name' className="user-name" style={{width:'240px',border:'2px solid black' , borderRadius:'100px', height:'50px', paddingLeft:'15px'}}
                                    value={defoult.name} onChange={(e) => setDefoult({ name: e.target.value })}></input>
                                <input  name='surname' placeholder='Surname' className="user-surname" style={{width:'240px',border:'2px solid black' , borderRadius:'100px',marginTop:'15px', height:'50px', paddingLeft:'15px'}}
                                    value={defoult.surname} onChange={(e) => setDefoult({ surname: e.target.value })} ></input>
                                {/* <button disabled={isUpdated} style={{border:'2px solid black'}} onClick={() => updateUserInfo()}><Link to='/users'>Update</Link></button> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => updateUserInfo()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="roomsModalCenter" tabIndex="-1" role="dialog" aria-labelledby="roomsModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="roomsModalLongTitle">Rooms</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span  style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                All rooms:{rooms.length}  
                                <button style={{width:'20px',height:'20px',background:'gray', fontSize:'24px' , marginRight:'15px',marginBottom:'2px'}} data-toggle="modal" data-target="#addRoomModalCenter"onClick={()=> setDefoult(user)}>+</button>
                            </span>

                            <ul id="notebook_ul">
                                {
                                    rooms.map((room) => (
                                        <div key={room.id}>
                                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                                {room.name} 
                                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

                                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateRoomModalCenter"
                                                        onClick={()=> setDefoult(room)}>
                                                        Update
                                                    </button>

                                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#UsersInRoomModalCenter"
                                                        onClick={()=> setDefoult(room)}>
                                                        Users In Room
                                                    </button>
                                                    
                                                    {
                                                        rooms.map(({name,id}) => (
                                                            (id==room.id)?
                                                            <div key={id}>
                                                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                                                    <div>
                                                                    <button className="btn btn-danger m-3" onClick={() => deleteRoom({id})}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>:''
                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addRoomModalCenter" style={{background:'gray'}} tabIndex="-1" role="dialog" aria-labelledby="addRoomModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addRoomModalLongTitle">Add Room</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{display:'flax',justifyContent:'center'}}>
                            <div style={{width:'50%',display:'flax',justifyContent:'center',flexWrap:'wrap',marginTop:'15px' ,marginLeft:'25%'}}>
                                <input name='name'  placeholder='Name' className="user-name" style={{width:'240px',border:'2px solid black' , borderRadius:'100px', height:'50px', paddingLeft:'15px'}}
                                    value={new_room.name} onChange={(e)=>setNew_room({...new_room,name:e.target.value})}></input>
                                <input  name='description' placeholder='Description' className="user-description" style={{width:'240px',border:'2px solid black' , borderRadius:'100px',marginTop:'15px', height:'50px', paddingLeft:'15px'}}
                                    value={new_room.description} onChange={(e)=>setNew_room({...new_room,description:e.target.value})} ></input>
                                {/* <button disabled={isaddRoomd} style={{border:'2px solid black'}} onClick={() => addRoomUserInfo()}><Link to='/users'>addRoom</Link></button> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>Add()}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="UsersInRoomModalCenter" style={{background:'gray' }} tabIndex="-1" role="dialog" aria-labelledby="UsersInRoomModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{width:'80%'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="UsersInRoomModalLongTitle">Add Room</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ width:'800px',height:"400px" }}>
                            <div id="notebooks1" ng-app="notebooks" ng-controller="NotebookListCtrl" style={{display:'flax',justifyContent:'center',minHeight:'250px'}}>
                                <ul id="notebook_ul">
                                    <li ng-repeat="notebook in notebooks | filter:query | orderBy: orderList">
                                    {users.map((user,i) => (
                                            <div key={i} style={{border:'2px solid black' , marginTop:'5px'}} >
                                                <h6>{user.name} {user.surname} <button style={{border:'2px solid black'}} onClick={()=>AddUsersInRoom(user.id)}>Add</button></h6>
                                            </div>
                                        ))}
                                
                                        
                                    </li>
                                </ul>  
                                </div>
                            <div id="notebooks1" ng-app="notebooks" ng-controller="NotebookListCtrl" style={{display:'flax',justifyContent:'center',minHeight:'250px',marginLeft:0}}>

                                <ul id="notebook_ul">
                                    <li ng-repeat="notebook in notebooks | filter:query | orderBy: orderList">
                                    {usersin.map((user,i) => (
                                            <div key={i} style={{border:'2px solid black' , marginTop:'5px'}} >
                                                <h6>{user.name} {user.surname} <button style={{border:'2px solid black'}} onClick={()=>DeleteUsers(user.id)}>Delete</button></h6>
                                            </div>
                                        ))}
                                
                                        
                                    </li>
                                </ul>                                
                                <span>Users in room: {usersin.length}</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>Add()}>Add</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade modal-dialog modal-xl" id="updateRoomModalCenter" style={{background:'gray'}} tabIndex="-1" role="dialog" aria-labelledby="updateRoomModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLongTitle">Update</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{display:'flax',justifyContent:'center'}}>
                            <div style={{width:'50%',display:'flax',justifyContent:'center',flexWrap:'wrap',marginTop:'15px' ,marginLeft:'25%'}}>
                                <input name='name'  placeholder='Title' className="user-name" style={{width:'240px',border:'2px solid black' , borderRadius:'100px', height:'50px', paddingLeft:'15px'}}
                                    value={defoult.name} onChange={(e) => setDefoult({ name: e.target.value })}></input>
                                <input  name='description' placeholder='Description' className="user-description" style={{width:'240px',border:'2px solid black' , borderRadius:'100px',marginTop:'15px', height:'50px', paddingLeft:'15px'}}
                                    value={defoult.description} onChange={(e) => setDefoult({ description: e.target.value })} ></input>
                                {/* <button disabled={isUpdated} style={{border:'2px solid black'}} onClick={() => updateUserInfo()}><Link to='/users'>Update</Link></button> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => updateRoomInfo()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='ext' style={{width:'100%',height:'66px', display:'flex',justifyContent:'space-between',alignItems:' center', padding:' 20px',background:'#563d7c', position:'sticky',top:'0',zIndex: '1071'}}>
                <Link to='/adminprofile' href="profile.php" style={{textDecoration:'none'}}><h1 style={{color:'white' ,marginLeft: '25px',fontSize:'40px'}}>Profile</h1></Link>
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
                    {/* <Link to='/'  href="#button" className="btn btn-primary btn-round btn-lg" style={{marginLeft:'98%' , marginTop:-50}}> Logout</Link> */}

                        <div className="photo-container">
                            <img src={user.avatar} width="100%" className="rounded-circle"/>
                        </div>
                        <h3 className="title">{user.name} {user.surname}</h3>
                        <p className="category">Admin</p>
                    </div>
                </div>

                <div className="section">
                    <div className="container">
                        <div className="button-container">

                            <Link to='/adminprofile'  href="#button" className="btn btn-primary btn-round btn-lg"> <u>Admin</u></Link>
                                
                            {/* <Link to='/users'  href="#button" className="btn btn-primary btn-round btn-lg"> Users</Link> */}

                            <button type="button" className="btn btn-primary btn-round btn-lg" data-toggle="modal" data-target="#usersModalCenter">
                                Users
                            </button>

                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#roomsModalCenter">
                                Rooms
                            </button>

                            <Link to='/rooms'  href="#button" className="btn btn-primary btn-round btn-lg"> Rooms</Link>
                    
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default AdminProfile;
