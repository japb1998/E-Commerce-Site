import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../store';
import { registerUser, setErrors } from '../../store/actions/authActions';
import classnames from 'classnames';
import "./Register.css"

const Register = props => {
  const { state, dispatch } = useContext(Store);
  const errors = state.error;
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  useEffect(() => {
    if (state.auth.isAuthenticated)
      props.history.push('/shoppingCart');
  }, [state, props]);

  const onSubmit = e => {
    e.preventDefault();

    dispatch(setErrors({ response: { data: {} } }));

    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password2: password2Ref.current.value,
    };

    registerUser(userData, props.history)(dispatch);
  };

  return (
    <div className="container">
      <Link to="/">
        <img
          src="https://trufit-assets.s3.amazonaws.com/003Project/images/images.png"
          alt=""
          className="login_logo"
        />
      </Link>
      <div className="containerSection">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              Back to home
          </Link>
            <div className="col s12" style={{ paddingLeft: '11.250px', paddingBottom: '2em' }}>
              <h4>
                <b>Register</b> below
            </h4>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input ref={nameRef} error={errors.name} name="name" type="text"
                  className={classnames('', { invalid: errors.name })} />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input ref={emailRef} error={errors.email} name="email" type="email"
                  className={classnames('', { invalid: errors.email })} />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input ref={passwordRef} error={errors.password} name="password" type="password"
                  className={classnames('', { invalid: errors.password })} />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input ref={password2Ref} error={errors.password2} name="password2" type="password"
                  className={classnames('', { invalid: errors.password2 })} />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                <button className="btn btn-large waves-effect waves-light hoverable blue accent-3" style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }} type="submit">
                  Sign Up
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
