import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans text-[#0f172a]">
            {/* Navigation Layer */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Secondary Background Layer for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-20"></div>

                <Header />

                <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative z-10">
                    <div className="max-w-[1600px] mx-auto min-h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
