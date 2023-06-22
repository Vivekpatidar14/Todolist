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
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";

const Subtasks = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  // const [permissions, setPermissions] = useState([]);
  const [groupSet, setGroupSet] = useState([]);
  const [pending, setPending] = useState(true);
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
      .get("/subtaskList")
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
      .get(`/subtaskList/${id}`)
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
        name: "Subtask ",
        selector: "title",
        // width: '200px',
      },
      {
        name: "Description",
        selector: "description",
        // width: '200px',
      },
      {
        name: "priority",
        selector: "priority",
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
            <option value="0">Pending</option>
            <option value="1">Progress</option>
            <option value="1">Completed</option>
          </select>
        ),
        center: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="d-flex" style={{ gap: "10px" }}>
            
            <Button
              className="_edit_icons"
              onClick={() => handleProject(row.id)}
            >
              <FaEdit />
            </Button>
            <Button
              className="_delete_btn_"
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
              <span className="p-3">SubTask</span>
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
                        pending
                      </option>
                      <option value="0">progress</option>
                      <option value="1">completed</option>
                    </select>
                  </div>

                  <div className="add_section p-2">
                    {/* <Button className='_edit_btn'
                                            onClick={() => handleManage()}
                                        >
                                            Manage User
                                        </Button> */}
                    <Button className="Add_btn_" onClick={() => handleShow()}>
                      Add SubTask
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
          <Modal.Title>Add SubTask</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Form.Group className="pb-4">
              <Form.Label>Sub-Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add-Sub-Task"
                value={name}
                {...register("name", {
                  required: true,
                  onChange: (e) => setName(e.target.value),
                })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="errMsg">Please Enter Sub-Task</span>
              )}
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label htmlFor="taskdescription">
                Task-Description
              </Form.Label>
              <Form.Control
                as="textarea"
                id="Textarea"
                placeholder="Task Description"
              />
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
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdate} onHide={handleUpdateClose}>
        <Modal.Header closeButton className="adminpass">
          <Modal.Title>Update Sub-Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit1(onUpdate)} autoComplete="off">
            <Form.Group className="pb-4">
              <Form.Label>Sub-Task</Form.Label>
              <Form.Control
                type="text"
                placeholder=" Enter Subtask "
                value={updateName}
                // {...register1("name", {
                //   required: false,
                //   onChange: (e) => setUpdateName(e.target.value),
                // })}
              />
             
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label htmlFor="taskdescription">
                Task-Description
              </Form.Label>
              <Form.Control
                as="textarea"
                id="Textarea"
                placeholder="Task Description"
              />
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
                Update
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
            <h3>Are you sure you want to delete this Subtask</h3>
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

export default Subtasks;
