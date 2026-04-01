"use client";
import Form from "@/components/Form";
import Table from "@/components/Table";
import { useState } from "react";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApiQuery";

type UsersResponse = {
  users: User[];
};

const Users = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: users, loading, error } = useApiQuery<UsersResponse>(
    "/api/users",
    {
      deps: [submitStatus],
    },
  );

  console.log(users);

  const userColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  const FormData = [
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    {
      key: "role",
      label: "Role",
      type: "select",
      options: ["employee", "admin"],
    },
    { key: "password", label: "Password", type: "password" },
  ];

  if (status === "loading") {
    return (
      <div className="h-16 bg-white border-b flex items-center px-6 justify-between">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (session.user.role === "employee") {
    router.push("/");
  }

  return (
    session.user.role === "admin" && (
      <div className="p-8 flex flex-col sm:flex-row justify-evenly space-y-4">
        <div className="users-left">
          {loading && <p>Loading users...</p>}

          {error && (
            <p className="text-red-500">Failed to fetch users: {error}</p>
          )}

          {!loading && !error && users && (
            <Table
              title={"Users"}
              columns={userColumns}
              data={users.users}
              keyField="_id"
            />
          )}
        </div>
        <div className="users-">
          <h2 className="mb-3">Add a New User</h2>
          {submitStatus === "error" && (
            <h3 className="text-red-500 ">Could Not Create New User!</h3>
          )}
          {submitStatus === "success" && (
            <h3 className="text-green-500 ">User Created Successfully!</h3>
          )}
          <Form
            inputs={FormData}
            setIsSubmitting={setIsSubmitting}
            setSubmitStatus={setSubmitStatus}
            path={"/users"}
            submitType={isSubmitting ? "Creating user..." : "Create User"}
          />
        </div>
      </div>
    )
  );
};

export default Users;
