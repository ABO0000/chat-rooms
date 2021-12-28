import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../Api'

const Users = () => {
    let user = JSON.parse(localStorage.getItem("userData"))[0];

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

  
    
    return (
        
        <div className="profile-page sidebar-collapse">
            <div className="wrapper">
                <div className="page-header clear-filter" filter-color="orange">
                    <div className="page-header-image" data-parallax="true" style={{backgroundImage:`url('https://images.unsplash.com/photo-1557053819-aa6046add523?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80')`}}>
                    </div>
                    <div className="container">
                    <Link to='/'  href="#button" className="btn btn-primary btn-round btn-lg" style={{marginLeft:'98%' , marginTop:-50}}> Logout</Link>


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

                            <Link to='/adminprofile'  href="#button" className="btn btn-primary btn-round btn-lg"> Admin</Link>
                                
                            <Link to='/users'  href="#button" className="btn btn-primary btn-round btn-lg"><u> Users</u></Link>

                            <Link to='/rooms'  href="#button" className="btn btn-primary btn-round btn-lg"> Rooms</Link>

                            <div id="notebooks2" ng-app="notebooks2" ng-controller="NotebookListCtrl">
                                <ul id="notebook_ul">
                                    <li ng-repeat="notebook in notebooks | filter:query | orderBy: orderList">
                                        {users.map(({name,surname,id}) => (
                                            <div key={id}>
                                                <h6>
                                                    {name} {surname} 
                                                    <button className="btn btn-danger m-3" onClick={() => deleteUser({id})}>Delete</button>
                                                    <Link to={`/setingusers/${id}`} ><button className="btn btn-success m-3" >Update</button></Link>
                                                </h6>
                                            </div>
                                        ))}
                                    </li>
                                <span>All users: {users.length}</span>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          
    );
};
export default Users;
