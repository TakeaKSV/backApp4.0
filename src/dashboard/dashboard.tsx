import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {  
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={220}></Sider>

            <Layout>
                <Header />
                <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff' }}>
                    <Outlet />
                </Content>
                <Footer />
            </Layout>
        </Layout>
    )
}

export default Dashboard;