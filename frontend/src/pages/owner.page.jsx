import React from "react";
import Header from "../components/owner/owner-header.component";
import AdminDashboard from "../components/admin-body/admin-body.component";

const OwnerPage = () => {
    return (
        <section>
            <Header />
            <AdminDashboard />
        </section>
    );
};

export default OwnerPage;
