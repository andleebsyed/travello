import { CreatePost } from "../../../features/posts/createPost";
import { ShowPost } from "../../../features/posts/showPost";

export function Homepage() {
    return (
        <div className="flex flex-col p-4 xsm:p-0 xsm:grid xsm:grid-cols-home-middle xsm:grid-rows-home gridbreak:grid gridbreak:grid-cols-home gridbreak:grid-rows-home  text-white min-h-screen">
             <CreatePost />
            <ShowPost />
                        <div className=" xsm:col-start-1 xsm:col-end-2 xsm:row-span-full border border-red-800 ">sidebar</div>

        </div>
    )
}