import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errs = {};
    if (credential.length < 4) errs.credential = " ";
    if (password.length < 6) errs.password = " ";
    setErrors(errs);
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          setErrors({message: "The provided credentials were invalid"});
        }
      });
  };

  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(closeModal)
  }

  return (
    <div className='login_form_container'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          {/* Username or Email */}
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
          />
        </label>
        <label>
          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
          {/* {errors.credential && (
//           <p>{errors.credential}</p>
//         )} */}
        {errors.message && (
          <p className='error_message'>{errors.message}</p>
        )}
        <button 
        type="submit"
        disabled={Object.values(errors).length}
        >Log In
        </button>
        <button onClick={handleDemoLogin}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;