export function Navbar() {
    return (
        <main className=" xsm:col-start-1 xsm:col-end-2 xsm:row-span-full border border-red-800 ">
            <ul className="flex justify-between xsm:flex-col xsm:justify-between items-end xsm:items-center h-auto xsm:h-64 xsm:p-4">
                <li className="navbar-list-item" >
                    <i class="ri-home-7-line text-3xl self-center" ></i>
                    <span className="navbar-list-item-name  ">Home</span></li>
                <li className="navbar-list-item">
                    <i class="ri-hashtag text-3xl self-center"></i>
                    <span className="navbar-list-item-name">Explore</span></li>
                <li className="navbar-list-item"><i class="ri-notification-3-line text-3xl self-center"></i> <span className="navbar-list-item-name">Notifications</span></li>
                <li className="navbar-list-item"><i class="ri-user-3-line text-3xl self-center"></i><span className="navbar-list-item-name">Profile</span></li>
            </ul>
         </main>
    )
}