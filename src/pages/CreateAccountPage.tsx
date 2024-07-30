import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();
    
    try {
      // Checking if passwords are equal
      if(password !== confirmPassword) return setError("Password and confirm password does not match");

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Create account</h1>
      <form onSubmit={createAccount} className='mb-3'>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Email address</label>
          <input type='email' id='userEmail' className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">Password</label>
          <input type='password' className="form-control" id="userPassword" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="reEnterPassword" className="form-label">Re-enter password</label>
          <input type='password' className="form-control" id="reEnterPassword" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-primary'>Create account</button>
      </form>  
      <Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to={"/login"}>Have an account? Log in here</Link>
      {error && <div className="mt-4 alert alert-danger" role="alert">{error}</div>}
    </>
  )
}

export default CreateAccountPage