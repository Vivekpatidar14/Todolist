import React, { useEffect, useState } from 'react';
import './Header.css';
import Logo from '../Assets/Home Page Assets/Logo.png';

import { FaRegUserCircle, FaBars } from 'react-icons/fa';
import { useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbUsers } from 'react-icons/tb';
import { GrUserAdmin } from 'react-icons/gr';
import axios from 'axios';



const HeaderAdmin = () => {
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();

    const logoutSuccess = () => toast.info('Successfully Logout', {
        position: "top-center",
        autoClose: 5023,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleLogOut = () => {
        localStorage.setItem("adminEmail", "");
        logoutSuccess();
        navigate('/admin');
        window.location.reload(false);
    }

    const [logoImg, setLogoImg] = useState('');

    const getData = () => {
        axios.post("/adminProfile", {
            admin_type: localStorage.getItem("adminType"),
            email: localStorage.getItem("adminEmail")
        }, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            let logo = response.data.data[0].logo
            setLogoImg(logo);
          
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <>

            <div className='sticky_navBar'>
                <div style={{ width: "100%", borderBottom: "1px solid lightgray", padding: '12px' }}>
                    <ToastContainer />
                    <div className='nav_bar'>

                        <div className='nav_tabs'>
                            <div className='sticky_sidebar'>
                                <div className='d-flex logo'>
                                    <img src={Logo}  height="100px"/>
                                </div>
                            </div>
                        </div>
                        <div className='nav_tabs'>

                            <ul style={{ listStyle: 'none' }}>
                                {/* <li className={localStorage.getItem("adminType") == 0 ? 'd-block' : 'd-none'}>
                                    <Link className='navbartext' to={localStorage.getItem("adminType") == 0 ? '/admin/subadmin' : '/admin'}><TbUsers size={"38px"} color="#146FB7" /></Link>
                                </li> */}

                                <li>
                                    <Link className='navbartext' to='/admin/Profile'><FaRegUserCircle size={"38px"} color="#146FB7" /></Link>
                                </li>
                                <li>
                                    <RiLogoutCircleRLine size={"40px"} onClick={handleLogOut} style={{ cursor: 'pointer' }} />
                                </li>
                                <li>
                                    <button onClick={() => collapseSidebar()} className='collapse_btn btn p-0'>
                                        <FaBars color='#146FB7' size={"36px"} />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderAdmin
