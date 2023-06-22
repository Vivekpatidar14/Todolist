import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import DataTables from "../DataTable/DataTables";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { Link, NavLink } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

const Users = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  // const [permissions, setPermissions] = useState([]);
  const [groupSet, setGroupSet] = useState([]);
  const [pending, setPending] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleUpdate = () => setShowUpdate(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [name, setName] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // update
  const [adminData, setAdminData] = useState([]);
  const [id, setId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updatePassShow, setUpdatePassShow] = useState(false);
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");

  const getData = () => {
    // allAuth
    axios
      .get("/usersList")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data);
          setNewData(response.data.data);
          setPending(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleProject = (id) => {
    handleUpdate();
    axios
      .get(`/usersList/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setAdminData(response.data.data);
          setPending(false);
          console.log(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const ParentComponent = () => {
  //     const history = useHistory();
  //     const handleViewUser = (userId) => {
  //       // Navigate to the user details page with the user ID
  //       history.push(`/users/${userId}`);
  //     };

  useEffect(() => {
    adminData?.map((data) => {
      setId(data.id);
      setUpdateName(data.name);
      setUpdateEmail(data.email);
      setUpdatePhone(data.phone);
    });
  }, [adminData]);

  useEffect(() => {
    setData(newData?.filter((data) => data.status == 0));
  }, [newData]);

  const handleShowDelete = (id) => {
    setShowDelete(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setShow(false);

    reset({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setDeleteId("");
  };

  const handleUpdateClose = () => {
    setShowUpdate(false);
    reset1({
      name: "",
      email: "",
      phone: "",
    });
  };

  const statusSuccess = () =>
    toast.info("Status Update Successfully", { position: "top-center" });
  const authSuccess = () =>
    toast.info("Authentication Update Successfully", {
      position: "top-center",
    });

  const handleStatus = (e) => {
    let id = e.target.id;
    let status = e.target.value;
    axios
      .post(
        "/userStatus",
        {
          id: id,
          status: status,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          statusSuccess();
          window.location.reload(false);
          setPending(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notify = () =>
    toast.info("User added Successfully", { position: "top-center" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setPending(true);
    axios
      .post(
        "/addUsers",
        {
          name: name,
          email: email,
          password: password,
          phone: phone,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          notify();
          setPending(false);
          handleClose();
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
      });
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { errors: errors1 },
  } = useForm();

  const onUpdate = () => {
    setPending(true);
    axios
      .post(
        "/updateUsers",
        {
          id: id,
          name: updateName,
          phone: updatePhone,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          notify();
          setPending(false);
          handleUpdateClose();
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
      });
  };

  const filterByStatus = (status) => {
    if (status == "") {
      setData(newData);
    } else {
      setData(newData?.filter((data) => data.status == status));
    }
  };

  const deleteSuccess = () =>
    toast.info("User Deleted Successfully", { position: "top-center" });

  const handleDeleteSubAdmin = () => {
    axios
      .post(
        "/deleteUsers",
        {
          id: deleteId,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          handleCloseDelete();
          deleteSuccess();
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tableData = {
    columns: [
      {
        name: "#",
        width: "80px",
        cell: (row, index) => index + 1,
      },
      {
        name: "Name",
        selector: "name",
        // width: '200px',
      },
      {
        name: "Email",
        selector: "email",
        // width: '200px',
      },
      {
        name: "Phone",
        selector: "phone",
        // width: '200px',
      },

      {
        name: "Status",
        width: "250px",
        selector: (row) => (
          <select
            className=" col-md-4 select_status"
            value={row.status}
            id={row.id}
            onChange={(e) => handleStatus(e)}
          >
            <option value="0">Active</option>
            <option value="1">In-Active</option>
          </select>
        ),
        center: true,
      },

      {
        name: "Action",
        cell: (row) => (
          <div className="d-flex" style={{ gap: "10px" }}>
            

            <Button
              className="_edit_icons "
              onClick={() => handleProject(row.id)}
            >
              <FaEdit />
            </Button>
            <Button
              className="_delete_btn_ "
              onClick={() => handleShowDelete(row.id)}
            >
              <FaTrashAlt />
            </Button>
          </div>
        ),
        right: true,
      },
    ],
  };

  return (
    <>
      <div className={pending ? "spinner_d" : "d-none"}>
        <Spinner animation="border" className="mySpinner" />
      </div>
      <section
        id="main-content"
        style={pending ? { opacity: "0.5" } : { opacity: "1" }}
      >
        <ToastContainer />
        <section class="wrapper">
          <div class="row">
            <div class="col-lg-12">
              <span className="p-3">Users</span>
              <section className="card m-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="selectoption">
                    <strong>Status :-</strong>
                    <select
                      className="status filter"
                      onChange={(e) => filterByStatus(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="0" selected>
                        Active
                      </option>
                      <option value="1">In-Active</option>
                    </select>
                  </div>

                  <div className="add_section p-2">
                    {/* <Button className='_edit_btn'
                                            onClick={() => handleManage()}
                                        >
                                            Manage User
                                        </Button> */}
                    <Button className="Add_btn_" onClick={() => handleShow()}>
                      Add User
                    </Button>
                  </div>
                </div>

                <div className="main">
                  <DataTables
                    data={data}
                    columns={tableData.columns}
                    title="Users"
                  />
                </div>
              </section>
            </div>
          </div>
        </section>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="adminpass">
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Form.Group className="pb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter name"
                value={name}
                {...register("name", {
                  required: true,
                  onChange: (e) => setName(e.target.value),
                })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="errMsg">Please Enter Name</span>
              )}
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Please enter email"
                value={email}
                {...register("email", {
                  required: true,
                  maxLength: 30,
                  onChange: (e) => setEmail(e.target.value),
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="errMsg">Please Enter email Address</span>
              )}
            </Form.Group>

            <Form.Group className="pb-4">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter phone number"
                maxLength={13}
                {...register("phone", {
                  required: true,

                  onChange: (e) => setPhone(e.target.value),
                })}
                value={phone}
              />
              {errors.phone && (
                <span className="errMsg">Please Enter Phone Number</span>
              )}
            </Form.Group>

            <Form.Group className="pb-4">
              <div style={{ position: "relative" }}>
                <label className="form-label">Password</label>
                <input
                  type={passShow ? "text" : "password"}
                  style={{ paddingRight: "40px" }}
                  value={password}
                  autoComplete="new-password"
                  {...register("pass", {
                    required: true,
                    maxLength: 30,
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  className="form-control"
                  placeholder="Please Create Password"
                />
                <Button
                  className="eyeButton "
                  style={{
                    position: "absolute",
                    top: "73%",
                    right: "1px",
                    transform: "translateY(-50%)",
                    marginLeft: "28rem",
                  }}
                  onClick={() => setPassShow(!passShow)}
                >
                  {passShow ? (
                    <AiFillEyeInvisible className="eye_" />
                  ) : (
                    <AiFillEye className="eye_" />
                  )}
                </Button>
              </div>
              {errors.pass && errors.pass.type === "required" && (
                <span className="errMsg">Please Create Password</span>
              )}
            </Form.Group>

            <div className="_add_float mt-2">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="_close_btn"
              >
                Close
              </Button>
              <Button
                className="Add_btn_"
                type="submit"
                disabled={pending ? true : false}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdate} onHide={handleUpdateClose}>
        <Modal.Header closeButton className="adminpass">
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit1(onUpdate)} autoComplete="off">
            <Form.Group className="pb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter name"
                value={updateName}
                {...register1("name", {
                  required: false,
                  onChange: (e) => setUpdateName(e.target.value),
                })}
              />
              {errors1.name && errors1.name.type === "required" && (
                <span className="errMsg">Please Enter Name</span>
              )}
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Please enter email"
                value={updateEmail}
                readOnly={true}
                {...register1("email", {
                  required: false,
                  maxLength: 30,
                  onChange: (e) => setUpdateEmail(e.target.value),
                })}
              />
              {errors1.email && errors1.email.type === "required" && (
                <span className="errMsg">Please Enter email Address</span>
              )}
            </Form.Group>

            <Form.Group className="pb-4">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter phone number"
                maxLength={13}
                {...register1("phone", {
                  required: false,

                  onChange: (e) => setUpdatePhone(e.target.value),
                })}
                value={updatePhone}
              />
              {errors1.phone && (
                <span className="errMsg">Please Enter Phone Number</span>
              )}
            </Form.Group>

            <div className="_add_float mt-2">
              <Button
                variant="secondary"
                onClick={handleUpdateClose}
                className="_close_btn"
              >
                Close
              </Button>
              <Button
                className="Add_btn_"
                type="submit"
                disabled={pending ? true : false}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton className="adminpass">
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-75" style={{ margin: "auto", height: "100px" }}>
            <h3>Are you sure to delete this User</h3>
          </div>

          <div className="_add_float mt-2">
            <Button
              variant="secondary"
              onClick={handleCloseDelete}
              className="_close_btn"
            >
              Close
            </Button>
            <Button variant="danger" onClick={() => handleDeleteSubAdmin()}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Users;
