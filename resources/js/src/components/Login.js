import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Navbar,Route,Link, Redirect} from 'react-router-dom';
import {  Container, Row, Col, FormInput, FormGroup, Button } from 'shards-react';
import api from '../../Api'
import '../../../css/login.sass'


function Login() {

    const [user,setUser] = useState({
        email:'',
        password:'',
    })
    
    
    const [errors, setErrors] = useState({})
    const [error, setError] = useState('')
    

    const Login=()=>{
        const res =  api.post('/search-user',user)
        .then((data) => {
            if (data.status == 200) {
                if(localStorage.getItem('userData')){
                    localStorage.removeItem('userData')
                }
                var oldItems = JSON.parse(localStorage.getItem('userData')) || [];
                
                oldItems.push(data.user);
                console.log(oldItems)
                
                
                if(data.user.type==0){
                    localStorage.setItem('userData', JSON.stringify(oldItems));
                    return window.location.href = '/profile'
                }
                
                localStorage.setItem('userData', JSON.stringify(oldItems));
                return window.location.href = '/adminprofile'
            }
            if (data.status == 400) {
                setErrors({
                    email:'',
                    password:'',
                })
                setError(data.errors)
            }
        })
        .catch((errors) => {
            setError('')
            setErrors(errors.response && errors.response.data.errors ? errors.response.data.errors : [])
        })
        
        
    }



    const [regUser,setRegUser] = useState({
        name:'',
        surname:'',
        email:'',
        gender:'',
        password:'',
    })

    const [regErrors, setRegErrors] = useState({})
    const [regError, setRegError] = useState()
    
    const saveUser = (e) =>{
        const res =  api.post('/add-user',regUser)
        
        .then(data => {
            if (data.status == 200) {
                {
                    setRegUser({
                        name:'',
                        surname:'',
                        email:'',
                        gender:'',
                        password:''
                    })
                    setRegErrors({}),
                    setRegError('')
                }
            }
            else(
                setRegErrors({}),
                setRegError(data.error)
            )
        })
        .catch((errors) => {
            console.log(errors.response.data.errors)
            setRegError('')
            setRegErrors(errors.response.data.errors)
        })
    }


    
    // const userForms = document.getElementById('user_options-forms')

  
    // const signupButton = () => {
    // userForms.classList.remove('bounceRight')
    // userForms.classList.add('bounceLeft')
    // }

    
    // const loginButton = () => {
    // userForms.classList.remove('bounceLeft')
    // userForms.classList.add('bounceRight')
    // }

    const userForm = useRef(null)
    

    const loginButton = () => {
        userForm.current.classList.add('bounceRight')
        userForm.current.classList.remove('bounceLeft')
    }
    
    const signupButton = () => {
        userForm.current.classList.add('bounceLeft')
        userForm.current.classList.remove('bounceRight')
    }


    return (
        

        <section className="user">
            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Don't have an account?</h2>
                        <p className="user_unregistered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={()=>signupButton()}>Sign up</button>
                    </div>

                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Have an account?</h2>
                        <p className="user_registered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
                        <button className="user_registered-login" id="login-button" onClick={()=>loginButton()}>Login</button>
                    </div>
                </div>
                
                <div className="user_options-forms" name='user_options-forms' id="user_options-forms" ref={userForm}>
                    <div className="user_forms-login">
                        <h2 className="forms_title">Login</h2>
                        <div className="forms_form">
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                <h5 style={{color:'red',marginTop:'10px',marginBottom:'10px'}}>{error}</h5>
                                <label htmlFor="#username" style={{color:'red'}}>{errors.email}</label>
                                <input type="email" placeholder="Email" minLength="2" maxLength="25" className="forms_field-input" required autoFocus value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                                </div>
                                <div className="forms_field">
                                <label htmlFor="#password" style={{color:'red'}}>{errors.password}</label>
                                <input type="password" id="#password" minLength="8" maxLength="16" placeholder="Password" className="forms_field-input" required value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Log In" className="forms_buttons-action" onClick={()=>Login()}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="user_forms-signup regForm" style={{minHeight: 600}}>
                        <h2 className="forms_title" style={{marginBottom:'25px',marginTop:'-30px'}}>Sign Up</h2>
                        <div className="forms_form">
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="text" placeholder="Full Name" minLength="2" maxLength="16" className="forms_field-input" required value={regUser.name} onChange={(e)=>setRegUser({...regUser,name:e.target.value.replace(/[^A-z]/g, "")})}/>
                                    <p style={{color:'red' , marginBottom:'-10px'}}>{regErrors.name}</p>
                                </div>
                                <div className="forms_field">
                                    <input type="text" placeholder="Surname" minLength="2" maxLength="16" className="forms_field-input" required value={regUser.surname} onChange={(e)=>setRegUser({...regUser,surname:e.target.value.replace(/[^A-z]/g, "")})}/>
                                    <p style={{color:'red' , marginBottom:'-10px'}}>{regErrors.surname}</p>
                                </div>
                                <div className="forms_field">
                                    <input type="email" placeholder="Email"  minLength="2" maxLength="25" className="forms_field-input" required value={regUser.email} onChange={(e)=>setRegUser({...regUser,email:e.target.value})}/>
                                    <p style={{color:'red' , marginBottom:'-10px'}}>{regErrors.email} {regError}</p>
                                </div>
                                <div className="forms_field">
                                    <select name='gender' value={regUser.gender} onChange={(e)=>setRegUser({...regUser,gender:e.target.value})}>
                                        <option disabled value="">Select Your Gender</option>
                                        <option>Man</option>
                                        <option>Woman</option>
                                    </select>
                                    <p style={{color:'red' , marginBottom:'-10px'}}>{regErrors.gender}</p>
                                </div>
                                <div className="forms_field">
                                    <input type="password" placeholder="Password"  minLength="8" maxLength="16" className="forms_field-input" required value={regUser.password} onChange={(e)=>setRegUser({...regUser,password:e.target.value})}/>
                                    <p style={{color:'red' , marginBottom:'-10px'}}>{regErrors.password}</p>
                                </div>
                            </fieldset>
                            <div className="forms_buttons">

                                <input type="submit" value="Sign up" className="forms_buttons-action" style={{marginTop:'-10px'}} onClick={() => saveUser()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>






    );

}

export default Login;




        
         {/* <Container className="dr-example-container">
             <Row>
                 <Col sm={{ size: 8, order: 2, offset: 2 }}>
                     <h1>This is Login</h1>
                     <divGroup>
                         <label htmlFor="#username">{errors.email}</label>
                         <divInput  placeholder='E-mail' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
                     </divGroup>
                     <divGroup>
                         <label htmlFor="#password">{errors.password}</label>
                         <divInput type="password" id="#password"  placeholder='Password'  value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
                     </divGroup>
                     <Button theme="success" onClick={()=>Login()}>Login</Button>
                     <Link to='/register'>Register</Link>
                    
                 </Col>
             </Row>
         </Container> */}
        




