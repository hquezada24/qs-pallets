"use client";
import Form from "@/components/Form";
import Table, { Column } from "@/components/Table";
import { useState, useEffect } from "react";
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
  const [form, setForm] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    data: users,
    loading,
    error,
  } = useApiQuery<UsersResponse>("/api/users", {
    deps: [submitStatus],
  });

  const userColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ] satisfies Column<User>[];

  const FormData = [
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    {
      key: "role",
      label: "Role",
      type: "select",
      default: "employee",
      options: [
        { key: "employee", label: "Employee", value: "employee" },
        { key: "admin", label: "Admin", value: "admin" },
      ],
    },
    { key: "password", label: "Password", type: "password" },
  ];
  useEffect(() => {
    if (submitStatus === "success") {
      const timeout = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [submitStatus]);

  if (status === "loading") {
    return (
      <div className="h-16 bg-white border-b flex items-center px-6 justify-between">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (session?.user?.role === "employee") {
    router.push("/");
  }

  return (
    session.user.role === "admin" && (
      <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-8">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible px-2 py-4">
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
        <div className="w-full max-w-3xl flex flex-col items-center gap-4">
          <button
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
            onClick={() => setForm(!form)}
          >
            {form ? (
              <>
                <span>✕</span> Close Form
              </>
            ) : (
              <>
                <span>＋</span> Create New User
              </>
            )}
          </button>
          {submitStatus === "error" && (
            <div className="w-full flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              <span>✕</span>
              <span>Could not register user. Please try again.</span>
            </div>
          )}
          {submitStatus === "success" && (
            <div className="w-full flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
              <span>✓</span>
              <span>User registered successfully!</span>
            </div>
          )}
          {form && (
            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5">
                New User
              </h2>
              <div className="mt-4">
                <Form
                  products={false}
                  inputs={FormData}
                  setIsSubmitting={setIsSubmitting}
                  setSubmitStatus={setSubmitStatus}
                  path={"users"}
                  submitType={isSubmitting ? "Creating user..." : "Create User"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Users;
