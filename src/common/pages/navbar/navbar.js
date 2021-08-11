export function Navbar() {
  return (
    <main className="fixed  xsm:static  w-screen bottom-0  xsm:w-auto bg-blue  ">
      <ul className="flex   justify-between xsm:flex-col xsm:justify-between items-end xsm:items-center gridbreak:items-start ">
        <li className="navbar-list-item  ">
          <i className="ri-home-7-line text-3xl  self-center"></i>
          <span className="navbar-list-item-name  ">Home</span>
        </li>
        <li className="navbar-list-item">
          <i className="ri-hashtag text-3xl self-center fill"></i>
          <span className="navbar-list-item-name ">Explore</span>
        </li>
        <li className="navbar-list-item">
          <i className="ri-notification-3-line text-3xl self-center"></i>
          <span className="navbar-list-item-name ">Notifications</span>
        </li>
        <li className="navbar-list-item">
          <i className="ri-user-3-line text-3xl self-center"></i>
          <span className="navbar-list-item-name ">Profile</span>
        </li>
      </ul>
    </main>
  );
}
