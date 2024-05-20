import CreateProduct from "@/components/Pages/Profile/CreateProduct";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageProducts from "@/components/Pages/Profile/ManageProducts";
import EditProducts from "@/components/Pages/Profile/EditProducts";

const AdminPage = () => {
  return (
    <div className="py-10 min-h-screen px-4">
      <Tabs defaultValue="account" className=" mx-auto">
        <TabsList>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateProduct />
        </TabsContent>
        <TabsContent value="manage">
          <ManageProducts />
        </TabsContent>
        <TabsContent value="edit">
          <EditProducts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
