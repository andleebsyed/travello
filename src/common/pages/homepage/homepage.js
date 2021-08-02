import { CreatePost } from "../../../features/posts/createPost";
import { ShowPost } from "../../../features/posts/showPost";
import { Navbar } from "../navbar/navbar";

export function Homepage() {
    return (
        <div className="flex flex-col p-4 xsm:p-0 xsm:grid xsm:grid-cols-home-middle xsm:grid-rows-home gridbreak:grid gridbreak:grid-cols-home gridbreak:grid-rows-home  text-white min-h-screen">
             <CreatePost />
            <ShowPost />
                       <Navbar />

        </div>
    )
}