import React from 'react';
import './AppAdmin.css';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from './Header/HeaderAdmin';
import SidebarPannel from './Sidebar/Sidebar';

const AdminRoutes = () => {
    return (
        <>
            <div className='fix_width'>
                <HeaderAdmin />
                <SidebarPannel />

                <Outlet />
            </div>
        </>
    )
}

export default AdminRoutes