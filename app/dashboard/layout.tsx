import SideNav from '@/app/ui/dashboard/sidenav';
// 0. 这个文件放在dashboard目录下，那么该目录对应的路由和子路由都会应用这个布局样式
// 1. 导出一个Layout组件，用于布局
// 2. 接受一个参数，类型是对象类型{}
// 3. 参数中有一个children属性，类型是React.ReactNode节点（组件）类型
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}
