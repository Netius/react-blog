import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  
  const navigate = useNavigate();



  const logIn = async (event) => {
    event.preventDefault();
    try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        navigate("/articles");
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        }
    }
}

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={logIn} className='mb-3'>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Email address</label>
          <input type='email' id='userEmail' className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">Password</label>
          <input type='password' className="form-control" id="userPassword" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to={"/create-account"}>Not registrered? Create a account here</Link>
      {error && <div className="mt-4 alert alert-danger" role="alert">{error}</div>}

    </>
  )
}

export default LoginPage