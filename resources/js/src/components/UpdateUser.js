
import{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import api from '../../Api';




if(JSON.parse(localStorage.getItem('userData'))){
  var admin = JSON.parse(localStorage.getItem('userData'))[0]
}

function UpdateUser() {
  
  const { id: userId } = useParams()
  
  const [isUpdated, setIsUpdated] = useState(true);
  
  const [defoult, setDefoult] = useState({});
  
  useEffect(() => {
    if (!defoult.length)
    {
      api.post("/user_info",+userId)
      .then((res) => {
        setDefoult({ name: res.user.name, surname: res.user.surname }) 
      });
    }
  }, [setDefoult]);

  
  
  console.log(defoult)

  const handleChange = (e) => {
    setIsUpdated(false)
    setDefoult({
      ...defoult,
      [e.target.name]: e.target.value,
    });
  };
  
  const updateUserInfo=()=>{
    api.post("/update_user_info/" + userId, defoult)
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
                            <img src={admin.avatar} width="100%" className="rounded-circle"/>
                        </div>
                        <h3 className="title">{admin.name} {admin.surname}</h3>
                        <p className="category">Admin</p>
                    </div>
                </div>

                <div className="section">
                    <div className="container">
                        <div className="button-container">

                          <Link to='/adminprofile'  href="#button" className="btn btn-primary btn-round btn-lg"> Admin</Link>
                              
                          <Link to='/users'  href="#button" className="btn btn-primary btn-round btn-lg">Users</Link>

                          <Link to='/rooms'  href="#button" className="btn btn-primary btn-round btn-lg"> Rooms</Link>


                          <div style={{width:'100%',display:'flax',justifyContent:'center',marginTop:'15px'}}>
                            <input name='name'  placeholder='Name' className="user-name" style={{border:'2px solid black'}} defaultValue={defoult?.name} onChange={handleChange}></input>
                            <input  name='surname' placeholder='Surname' className="user-surname" style={{border:'2px solid black'}} defaultValue={defoult?.surname} onChange={handleChange} ></input>
                            <button disabled={isUpdated} style={{border:'2px solid black'}} onClick={() => updateUserInfo()}><Link to='/users'>Update</Link></button>
                          </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );

}
export default UpdateUser;
