import React, { useState, useEffect } from 'react';
import './Login.css';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import Logo from '../Assets/Home Page Assets/Logo.png';
import { FaUserAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { RiLockPasswordFill } from 'react-icons/ri'


let credential = true;



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [authDetails, setAuthDetails] = useState([]);
  const navigate = useNavigate();
  const [fEmail, setFEmail] = useState('');


  useEffect(() => {
    authDetails?.map((data) => {
      localStorage.setItem("adminEmail", data.email);
      localStorage.setItem("adminId", data.id);

    })

  }, [authDetails])


  const handleClose = () => {
    setShow(false);
    reset1({
      email: ""

    })
  };

  const notify = () => toast.info('Successfully Login', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const loginError = (err) => toast.error(`${err}`, {
    position: "top-center",
    autoClose: 5023,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const passwordUpdate = (err) => toast.info('Password Reset Successfully & sent on your email', {
    position: "top-center",
    autoClose: 5023,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = () => {
    axios.post('/adminLogin2', { email: email, password: password }, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      if (response.status === 200) {
        setAuthDetails(response.data.data);
        notify();
        navigate('/');
        window.location.reload(false);
      }

    }).catch((err) => {
      loginError(err.response.data.message);
    })

  }

  const { register: register1, handleSubmit: handleSubmit1, reset: reset1, formState: { errors: errors1 } } = useForm();


  const onUpdate = () => {
    axios.post('/forgotPass2', {
      email: fEmail,
    }, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      if (response.status === 200) {
        handleClose();
        passwordUpdate();
      }
    }).catch((err) => {

      console.log(err);
    })

  }


  return (
    <>

      <div className='_bg'>
        <div className="container main_div">
          <div className="form-box">
            <div className="header-form text-center mb-3">
              <img src={Logo} />
            </div>
            <ToastContainer />
            <div className="body-form">
              <Form className='adminlogin' onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Form.Group className="input-group" controlId="formBasicEmail">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><FaUserAlt /></span>
                  </div>
                  <Form.Control type="email" placeholder="Enter email"
                    value={email}
                    {...register("email", {
                      required: true,
                      onChange: (e) => setEmail(e.target.value)
                    })}
                  />

                </Form.Group>
                <small className="text-danger">
                  {errors?.email && <span>Please Enter Your Email Address</span>}
                </small>

                <Form.Group className="mt-3 input-group" controlId="formBasicPassword">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
                  </div>
                  <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="new-password"
                    {...register("password", {
                      required: true,
                      onChange: (e) => setPassword(e.target.value)
                    })}
                    value={password}
                  />
                  <div className='input-group-append' style={{ position: 'absolute', right: '0', zIndex: '1000' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span class="input-group-text" style={{ cursor: 'pointer' }} id="basic-addon1">  {showPassword ? <FaEye /> : <FaEyeSlash />}</span>

                  </div>
                </Form.Group>
                <small className="text-danger">
                  {errors?.password && <span>Please Enter Your Password</span>}
                </small>

                <div className='login_btn mt-3'>
                  <Button type="submit" className="Add_btn_">SIGN IN</Button>
                </div>

                <div className='forpass text-center'><p style={{ cursor: 'pointer' }} onClick={handleShow}>Forgot your password ?</p></div>
              </Form>
            </div>

            <Modal show={show} onHide={handleClose}>
            
              <Modal.Header closeButton className='adminpass'>
                <Modal.Title>Forget Your Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit1(onUpdate)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                      value={fEmail}
                      {...register1("email", {
                        required: true,
                        onChange: (e) => setFEmail(e.target.value)
                      })}
                    />

                    {errors1?.email && <span className='err'>Please Enter Your Email Address</span>}

                  </Form.Group>

                  <div className='text-center'>
                    <Button variant="primary" type="submit" className='Add_btn_'>
                      Submit
                    </Button></div>

                </Form>
              </Modal.Body>

            </Modal>

          </div>
        </div>
      </div>

    </>

  )
}

export default Login
export { credential }