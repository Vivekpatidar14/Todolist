
import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import DataTables from '../DataTable/DataTables';
import { AiFillCodepenSquare } from 'react-icons/ai';
import { MdMarkEmailUnread } from 'react-icons/md';
import { BsFillPersonLinesFill, BsCreditCard } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Helmet } from 'react-helmet';
import { GiVacuumCleaner } from 'react-icons/gi';
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaUsers } from 'react-icons/fa';


const Dashboard = () => {

    const [pending, setPending] = useState(true);
    const [bookingData, setBookingData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [enqData, setEnqData] = useState([]);
    const [bookings, setBookings] = useState('');
    const [enquiries, setEnquiries] = useState('');
    const [services, setServices] = useState('')
    const [customers, setCustomers] = useState('');
    // booking
    const [showBooking, setShowBooking] = useState(false);
    const [bookingId, setBookingId] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    // cancel
    const [show, setShow] = useState(false);
    const [cancelId, setCancelId] = useState('');

    const getData = () => {

        axios.get('/getCount').then((response) => {
            setBookings(response.data.Booking);
            setEnquiries(response.data.Enquiry);
            setServices(response.data.SubService);
            setCustomers(response.data.ActiveCustomer);
        }).catch((err) => {
            console.log(err)
        })

 
        axios.get('/taskList').then((response) => {
            setEnqData(response.data.data);
            setPending(false);
            console.log(response.data.data)
        }).catch((err) => {
            setPending(false);
            console.log(err)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setBookingData(newData?.filter(data => data.booking_status == 0));

    }, [newData]);

    const handleBookingClose = () => {
        setShowBooking(false);
        setBookingId('');
        setBookingStatus('');
    }

    const handleShowBooking = (e) => {

        let id = e.target.id;
        let status = e.target.value;
        if (status == 3) {
            setShow(true);
            setCancelId(id);

        } else {
            setShowBooking(true);
            setBookingId(id);
            setBookingStatus(status);
        }

    }

    const handleClose = () => {
        setShow(false);
    };


    const statusSuccess = () =>
        toast.info("Status Update Successfully", { position: "top-center" });








    const enqTable = {
        columns: [
            {
                name: '#',
                width: '80px',
                cell: (row, index) => index + 1
            },
            {
                name: "title",
                selector: "title",
                // width: '200px',
                sortable: true
            },
            {
                name: "Email",
                selector: "email",
                // width: '200px',
                sortable: true
            },
            {
                name: "Phone",
                selector: "phone",
                // width: '200px',
                sortable: true
            },
            {
                name: "Address",
                selector: "address",
                // width: '200px',
                sortable: true,
                // cell: d => <span>{d.genres.join(", ")}</span>
            },
            {
                name: "Message",
                selector: "message",
                // width: '100px',
                sortable: true
            },

        ],

    };


    return (
        <>

            <Helmet>

                <title>To Do List | Dashboard</title>

            </Helmet>


            <div className={pending ? 'spinner_d' : 'd-none'}>
                <Spinner animation="border" className='mySpinner' />
            </div>


            <section id="main-content" style={pending ? { opacity: "0.5" } : { opacity: "1" }} >
                <section class="wrapper">
                    <div class="row">
                        <div class="col-lg-12">
                            <span className='p-3'>Dashboard</span>

                            <section>
                                <div className='dashboard_card m-4'>

                                    <Link to="/admin/tasks">
                                        <Card style={{ width: '14rem' }}>
                                            <Card.Body>
                                                <div>
                                                    <h1>{bookings}</h1>
                                                    <Card.Title>Tasks</Card.Title>
                                                    <h6>(Pending)</h6>
                                                </div>
                                                <BsFillPersonLinesFill className='c_icon' />
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                    <Link to="/admin/subtasks">
                                        <Card style={{ width: '14rem' }}>
                                            <Card.Body>
                                                <div>
                                                    <h1>{enquiries}</h1>
                                                    <Card.Title>Subtasks</Card.Title>
                                                    <h6>(Pending)</h6>
                                                </div>
                                                <MdMarkEmailUnread className='c_icon' />

                                            </Card.Body>
                                        </Card>
                                    </Link>
                                    <Link to="/admin/tasks">
                                        <Card style={{ width: '14rem' }}>
                                            <Card.Body>
                                                <div>
                                                    <h1>{services}</h1>
                                                    <Card.Title>Total Tasks</Card.Title>
                                                    <h6>(Completed)</h6>
                                                </div>
                                                <GiVacuumCleaner className='c_icon' />
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                    <Link to="/admin/users">
                                        <Card style={{ width: '14rem' }}>
                                            <Card.Body>
                                                <div>
                                                    <h1>{customers}</h1>
                                                    <Card.Title>Total Users</Card.Title>
                                                    <h6>(Active)</h6>
                                                </div>
                                                <FaUsers className='c_icon' />
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>

                            </section>

                            <section class="card m-3 mt-5">
                                <div className='main'>
                                    <Link to='/admin/tasks'><Button className='Add_btn_'>
                                        View All
                                    </Button></Link>
                                    <DataTables data={enqData?.slice(0, 5)} title="Tasks List" columns={enqTable.columns} pending={pending} />

                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </section>



        </>
    )
}

export default Dashboard
