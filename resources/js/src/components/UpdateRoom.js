
import{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import api from '../../Api';
import '../../../css/profile.css'




if(JSON.parse(localStorage.getItem('userData'))){
  var admin = JSON.parse(localStorage.getItem('userData'))[0]
}

function UpdateRoom() {

  const { id: roomId } = useParams()
  
  const [isUpdated, setIsUpdated] = useState(true);

  const [defoult, setDefoult] = useState({
    name:'',
    description:'',
  });

  useEffect(() => {
      api.post("/room_info",+roomId)
      .then((res) => {
        setDefoult(res.room) 
      });
  }, []);

  const [name,setName] = useState({
    name:'',
  })

  const [description,setDescription] = useState({
    description:'',
  })

  const update = (e, field) => {
    if(field == 'name') {
      setIsUpdated(!(e.target.value !== defoult.name));
      {
        setName({
            name:e.target.value,
        })
      }
    }
    else{
      if(name.name==''){
        {
          setName({
            name:defoult.name,
          })
        }
      }
    }

    if(field == 'description'){
      setIsUpdated(!(e.target.value !== defoult.description)); 
      description.description=e.target.value
      {
        setDescription({
          description:e.target.value,
        })
      }
    }
    else{
      if(description.description==''){
        {
          setDescription({
            description:defoult.description,
          })
        }
      }
    }
    
  }
  console.log(name, description,+roomId)

  const updateRoomInfo=()=>{
    api.post("/update_room_info", [name,description, +roomId])
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


                            <div>
                              <input  placeholder='Name' className="user-name" style={{border:'2px solid black'}} defaultValue={defoult?.name} onChange={(e) => update(e,'name')} ></input>
                              <input  placeholder='Description' className="user-description" style={{border:'2px solid black'}} defaultValue={defoult?.description} onChange={(e) => update(e, 'description')} ></input>
                              <button disabled={isUpdated} style={{border:'2px solid black'}} onClick={() => updateRoomInfo()}><Link to='/rooms'>Update</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );

}
export default UpdateRoom;
