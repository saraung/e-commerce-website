import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
// import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box
      sx={{
        marginLeft: "70px", // Accounts for the navbar width
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // backgroundColor: "rgba(255, 255, 255)"
      }}
    >
         <AdminMenu/>
      <Typography variant="h4" gutterBottom color="white">
        Users
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        
          // toast(error?.data?.message || error.error)
          <h1>error</h1>
       
      ) : (
        <Table sx={{ maxWidth: "80%", margin: "0 auto" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}  >ID</TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }} >NAME</TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}  >EMAIL</TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}  >ADMIN</TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}  >ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ color: "white"}}  >{user._id}</TableCell>
                <TableCell sx={{ color: "white"}} >
                  {editableUserId === user._id ? (
                    <TextField
                      value={editableUserName}
                      onChange={(e) => setEditableUserName(e.target.value)}
                      size="small"
                    />
                  ) : (
                    user.username
                  )}
                </TableCell>
                <TableCell sx={{ color: "white"}} >
                  {editableUserId === user._id ? (
                    <TextField
                      value={editableUserEmail}
                      onChange={(e) => setEditableUserEmail(e.target.value)}
                      size="small"
                    />
                  ) : (
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  )}
                </TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell>
                  {
                    !user.isAdmin   && (
                        editableUserId === user._id ? (
                            <IconButton
                              onClick={() => updateHandler(user._id)}
                              color="primary"
                            >
                              <FaCheck />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                              color="secondary"
                            >
                              <FaEdit />
                            </IconButton>
                          )
                    )
                  }
                  {!user.isAdmin && (
                    <IconButton
                      onClick={() => deleteHandler(user._id)}
                      color="error"
                    >
                      <FaTrash />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default UserList;
