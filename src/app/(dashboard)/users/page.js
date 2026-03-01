"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
import { apiRequest } from "@/lib/apiRequest";
import { useState } from "react";

const Users = () => {
  const [form, setForm] = useState({
    name: "Hugo Quezada",
    email: "hugoaquezada@proton.me",
    role: "admin",
    password: "HelloThere",
  });

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

  const orderColumns = [
    { key: "id", header: "Name" },
    { key: "customer", header: "Email" },
    {
      key: "status",
      header: "Role",
    },
  ];

  const orderData = [
    {
      id: "Hugo Alberto Quezada",
      customer: "hquezada@qspallets.com",
      status: "Admin",
    },
    {
      id: "Anna Belen Quezada",
      customer: "aquezada@qspallets.com",
      status: "Admin",
    },
  ];
  return (
    <div className="p-8 flex justify-evenly">
      <div className="users-left">
        <Table columns={orderColumns} data={orderData} />
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
