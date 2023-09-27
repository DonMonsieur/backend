import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import api from "../../config/api";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import CreateUser from "./CreateUser";
import ViewUser from "./ViewUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import DialogBox from "../../components/Dialogbox";

const Users = () => {
    const [users, setUsers] = useState([]);

    const [updateSelectedUser, setUpdateSelectedUser] = useState();
    const [viewSelectedUser, setViewSelectedUser] = useState();
    const [deleteSelectedUser, setDeleteSelectedUser] = useState();

    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [dialogType, setDialogType] = useState();

    const getUsers = async () => {
        const response = await api.get("/users/list");

        if (response.status == 200) {
            setUsers(response.data.data);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleCreateUser = (type) => {
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleUpdateUser = (rowData, type) => {
        setUpdateSelectedUser(rowData);
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleViewUser = (rowData, type) => {
        setViewSelectedUser(rowData);
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleDeleteUser = (rowData, type) => {
        setDeleteSelectedUser(rowData.row);
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleClose = () => {
        setOpenDialogBox(false);
        getUsers();
    };

    const columns = [
        {
            field: "username",
            headerName: "Username",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "first_name",
            headerName: "First Name",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "last_name",
            headerName: "Last Name",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },

        {
            field: "action",
            headerName: "Action",
            sortable: false,
            headerAlign: "center",
            flex: 1,
            renderCell: (cellValues) => {
                return (
                    <Box sx={{ margin: "auto" }}>
                        <Tooltip title="View User">
                            <IconButton
                                color="info"
                                onClick={(e) =>
                                    handleViewUser(cellValues, "View User")
                                }
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Update User">
                            <IconButton
                                color="info"
                                onClick={(e) =>
                                    handleUpdateUser(cellValues, "Update User")
                                }
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete User">
                            <IconButton
                                color="error"
                                onClick={(e) =>
                                    handleDeleteUser(cellValues, "Delete User")
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={() => handleCreateUser("Create User")}
            >
                Add User
            </Button>
            <Box sx={{ height: 700, width: "100%" }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={15}
                    pagination
                    pageSizeOptions={[10, 25, 50, 100]}
                    disableSelectionOnClick
                />
            </Box>

            {/* --DIALOG BOX--*/}
            <DialogBox
                open={openDialogBox}
                maxWidth="md"
                onClose={handleClose}
                title={dialogType}
            >
                {dialogType === "Create User" ? (
                    <CreateUser onClose={handleClose} />
                ) : dialogType === "View User" ? (
                    <ViewUser selectedUser={viewSelectedUser} />
                ) : dialogType === "Update User" ? (
                    <UpdateUser
                        selectedUser={updateSelectedUser}
                        onClose={handleClose}
                    />
                ) : (
                    <DeleteUser
                        selectedUser={deleteSelectedUser}
                        onClose={handleClose}
                    />
                )}
            </DialogBox>
        </Fragment>
    );
};

export default Users;
