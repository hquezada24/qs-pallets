"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
import { apiRequest } from "@/lib/apiRequest";
import { useState, useEffect } from "react";

const Users = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "employee",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // await apiRequest("/api/users", {
      //   method: "POST",
      //   body: JSON.stringify(form),
      // });

      const res = await apiRequest("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      });

      console.log("response: ", res.ok);
      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      console.log("submitted successfully");
      setForm({
        name: "",
        email: "",
        role: "employee",
        password: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("User registration error: ", error.message);
    } finally {
      setIsSubmitting(false);
      await fetchUsers();
    }
  };

  async function fetchUsers() {
    try {
      setLoading(true);
      setSubmitStatus(null);
      setError(null);

      const res = await apiRequest("/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
      console.error("User fetching error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const userColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  return (
    <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
      <div className="users-left">
        {loading && <p>Loading users...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <Table title={"Users"} columns={userColumns} data={users.users} />
        )}
      </div>
      <div className="users-">
        <h2 className="mb-3">Add a New User</h2>
        {submitStatus === "error" && (
          <h3 className="text-red-500 ">Could Not Create New User!</h3>
        )}
        <Form
          form={form}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newUser={true}
          submitType={isSubmitting ? "Creating user..." : "Create User"}
        />
      </div>
    </div>
  );
};

export default Users;
