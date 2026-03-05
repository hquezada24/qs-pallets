"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
import { apiRequest } from "@/lib/apiRequest";
import { useState, useEffect } from "react";

const Users = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [users, setUsers] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await apiRequest("/api/users", {
      //   method: "POST",
      //   body: JSON.stringify(form),
      // });

      await apiRequest("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.error("User registration error: ", error.message);
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await apiRequest("/api/users");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("User fetching error: ", error.message);
      }
    }
    fetchUsers();
  }, []);

  const userColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  return (
    <div className="p-8 flex justify-evenly">
      <div className="users-left">
        {users && <Table columns={userColumns} data={users.users} />}
      </div>
      <div className="users-">
        <h2 className="mb-3">Add a New User</h2>
        <Form
          form={form}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newUser={true}
        />
      </div>
    </div>
  );
};

export default Users;
