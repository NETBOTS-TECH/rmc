"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

const API_URL = `${process.env.BASE_URL}/auth/users`;
const REGISTER_URL = `${process.env.BASE_URL}/auth/register`;
const UPDATE_PASSWORD_URL = `${process.env.BASE_URL}/auth/users/update`;

interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
}

export default function Settings() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [open, setOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", userType: "user" });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user._id !== id));
      toast({ title: "Success", description: "User deleted successfully", })
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateRole = async (id: string, userType: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType }),
      });
      if (response.ok) {
        setUsers(users.map((user) => (user._id === id ? { ...user, userType } : user)));
        toast({ title: "Success", description: "role updated successfully", })
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleUpdatePassword = async () => {
    if (!selectedUser) return;
    try {
      await fetch(`${UPDATE_PASSWORD_URL}/${selectedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      setPasswordDialogOpen(false);
      setNewPassword("");
      toast({ title: "Success", description: "password updated successfully", })
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      fetchUsers();
      setOpen(false);
      setNewUser({ name: "", email: "", password: "", userType: "user" });
      toast({ title: "Success", description: "User created successfully", })
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      <div className="mb-4 flex justify-between">
        <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={() => setOpen(true)}>Add User</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <select  value={user.userType} onChange={(e) => handleUpdateRole(user._id, e.target.value)}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </TableCell>
              <TableCell>
  <div className="flex items-center gap-4">
    <Button onClick={() => { setSelectedUser(user); setPasswordDialogOpen(true); }}>
      Update Password
    </Button>
    <Button variant="destructive" onClick={() => handleDelete(user._id)}>
      <Trash /> Delete
    </Button>
  </div>
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Add New User</DialogTitle>
          <Input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <Input placeholder="Email" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <Input placeholder="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <select className="w-[30%] p-2 border" value={newUser.userType} onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button onClick={handleRegisterUser}>Create User</Button>
        </DialogContent>
      </Dialog>
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogTitle>Update password</DialogTitle>
        
          <Input placeholder="Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
         
          <Button onClick={handleUpdatePassword}>Update Password</Button>
        </DialogContent>
      </Dialog>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} variant={currentPage === index + 1 ? "default" : "outline"} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
