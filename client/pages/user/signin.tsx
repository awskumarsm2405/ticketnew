import react, {useState } from 'react';
import axios from 'axios';
function SignIn() {
    const [email, setEmail] = useState('')
    
    const [password, setPassword] = useState('')
    async function submitHandler(e) {
        e.preventDefault();
        let data=await axios.post('http://localhost:4000/api/users/signin', {email, password}, {
            headers: {
              'content-type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }
          })
        console.log(email, data)
    }
    return (
        <div className="container">
                    
        <main className="form-signin w-50 pt-100 m-auto">
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <form onSubmit={submitHandler}>
               <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>   </main>
      </div>
      
  )
  }
  
export default SignIn