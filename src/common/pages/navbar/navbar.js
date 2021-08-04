export function Navbar() {
    return (
        <main className=" xsm:col-start-1 xsm:col-end-2 xsm:row-span-full border border-red-800 fixed xsm:static w-screen left-0  xsm:w-auto bg-blue bottom-0  ">

            <ul className="flex justify-between xsm:flex-col xsm:justify-between items-end xsm:items-center gridbreak:items-start     ">
                <li className="navbar-list-item  " >
                    <i class="ri-home-7-line text-3xl self-center" ></i>
                    <span className="navbar-list-item-name hidden gridbreak:block ">Home</span></li>
                <li className="navbar-list-item">
                    <i class="ri-hashtag text-3xl self-center"></i>
                    <span className="navbar-list-item-name hidden gridbreak:block">Explore</span></li>
                <li className="navbar-list-item">
                    <i class="ri-notification-3-line text-3xl self-center"></i>
                    <span className="navbar-list-item-name hidden gridbreak:block">Notifications</span>
                </li>
                <li className="navbar-list-item">
                    <i class="ri-user-3-line text-3xl self-center"></i>
                    <span className="navbar-list-item-name hidden gridbreak:block">Profile</span>
                </li>
            </ul>
         </main>
    )
}