import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
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
      {error && <p className='error'>{error}</p>}
      <input placeholder='Your email' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Your password' value={password} onChange={e => setPassword(e.target.value)} />
      <input type='password' placeholder='Re-enter password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button type='button' onClick={createAccount}>Create account</button>
      <Link to={"/login"}>Have an account? Log in here</Link>
    </>
  )
}

export default CreateAccountPage