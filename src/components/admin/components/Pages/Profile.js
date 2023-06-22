import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Profile = () => {

    const [adminProfile, setAdminProfile] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [passShow, setPassShow] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [pending, setPending] = useState(true);
    const [password, setPassword] = useState('');

    const getData = () => {
       
        axios.get(`/usersList/${localStorage.getItem("adminId")}`).then((response) => {
            if (response.status === 200) {
                setAdminProfile(response.data.data);
                setPending(false);
                console.log(response.data.data)
            }

        }).catch((err) => {
            console.log(err)
        })



    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        adminProfile?.map((admin) => {
            setId(admin.id);
            setName(admin.name);
            setEmail(admin.email);
            setPhone(admin.phone);
        })

    }, [adminProfile]);



    const notify = () => toast.info("Profile Update Successfully", { position: "top-center" });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {

        setPending(true);
        axios.post('/updateProfile', {
            id: id,
            name: name,
            email: email,
            password: password,
            phone: phone,

        }, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            }

        }).then((response) => {
            if (response.status === 200) {
                notify();
                setPending(false);
            }

        }).catch((err) => {
            setPending(false);
            console.log(err);
        })
    }

    const onUpdate = (data) => {

        axios.post('/updateProfile', {
            id: id,
            admin_type: localStorage.getItem("adminType"),
            name: name,
            email: email,
            password: password,
            phone: phone,

        }, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            }

        }).then((response) => {
            if (response.status === 200) {
                notify();
                setPending(false);

            }

        }).catch((err) => {
            setPending(false);
            console.log(err);
        })
    }




    return (
        <>

            <Helmet>

                <title>To Do List | Profile</title>

            </Helmet>

            <div className={pending ? 'spinner_d' : 'd-none'}>
                <Spinner animation="border" className='mySpinner' />
            </div>
            <section id="main-content" style={pending ? { opacity: '0.5' } : { opacity: '1' }}>
                <section class="wrapper">
                    <div class="row">
                        <div class="col-lg-12">
                            <span className="p-3">Profile</span>
                            <section class="card m-3">

                                <div class="card-body">
                                    <ToastContainer />
                                    <Form className='row' autoComplete="off" onSubmit={handleSubmit(localStorage.getItem("adminType") == 0 ? onUpdate : onSubmit)}>
                                        <Form.Group className="col-md-6 pb-4" >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder='Please enter Your name'
                                                value={name}
                                                {...register('name', {
                                                    required: false,
                                                    onChange: (e) => setName(e.target.value),
                                                })}
                                            />
                                            {errors.name && errors.name.type === "required" && <span className='errMsg'>Please Enter Your Name</span>}
                                        </Form.Group>

                                        <Form.Group className="col-md-6 pb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" value={email} autoComplete="off"
                                                {...register('email', {
                                                    required: false, maxLength: 30,
                                                    onChange: (e) => setEmail(e.target.value),
                                                })}
                                            />
                                            {errors.email && errors.email.type === "required" && <span className='errMsg'>Please Enter email Address</span>}
                                        </Form.Group>

                                        <Form.Group className="col-lg-6 col-md-6 col-sm-12 pb-4">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Phone Number" maxLength={13}
                                                {...register('phone', {
                                                    required: false,

                                                    onChange: (e) => setPhone(e.target.value),
                                                })}
                                                value={phone}
                                            />
                                            {errors.phone && <span className='errMsg'>Please Enter Your Phone Number</span>}
                                        </Form.Group>

                                        <Form.Group className='col-md-6 pb-4'>
                                            <div style={{ position: 'relative' }}>
                                                <label className='form-label'>Change Password</label>
                                                <input type={passShow ? "text" : "password"} style={{ paddingRight: '40px' }} value={password} autoComplete="new-password" 
                                                    {...register('pass', {
                                                        required: false, maxLength: 30,
                                                        onChange: (e) => setPassword(e.target.value),
                                                    })}
                                                    className="form-control" placeholder="Enter New Password" />
                                                <Button className='eyeButton' onClick={() => setPassShow(!passShow)}>{passShow ? <AiFillEyeInvisible className='eye_' /> : <AiFillEye className='eye_' />}</Button>
                                            </div>
                                            {errors.pass && errors.pass.type === "required" && <span className='errMsg'>Please Enter Password</span>}

                                        </Form.Group>



                                 

                                        <div>
                                            <Button className='Add_btn_ m-3' type='submit'>
                                                Update
                                            </Button>
                                        </div>

                                    </Form>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Profile;