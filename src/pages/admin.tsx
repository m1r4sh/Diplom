import CreateProduct from "@/components/Pages/Profile/CreateProduct";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageProducts from "@/components/Pages/Profile/ManageProducts";
import EditProducts from "@/components/Pages/Profile/EditProducts";
import DisplayMessages from "@/components/Pages/Profile/DisplayMessages";

const AdminPage = () => {
  return (
    <div className="py-10 min-h-screen px-4">
      <Tabs defaultValue="account" className=" mx-auto">
        <TabsList>
          <TabsTrigger value="create">Створення</TabsTrigger>
          <TabsTrigger value="manage">Управління</TabsTrigger>
          <TabsTrigger value="edit">Редагувати</TabsTrigger>
          <TabsTrigger value="message">Повідомлення</TabsTrigger>
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
        <TabsContent value="message">
          <DisplayMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
