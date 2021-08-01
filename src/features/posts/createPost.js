export function CreatePost() {
    function newPostHandler(e) {
            e.preventDefault()
        }
    return (
        
        <div  className="p-4">
            <form className="p-4 border border-red-800 flex flex-col">
                <input type="text" name="newPost" placeholder="Write Something..." className="h-16 bg-blue outline-none" />
                <input type="submit" value="Post" onClick={newPostHandler} className="btn-primary w-16 h-9 p-0 mt-4 self-end"/>
            </form>
        </div>
    )
}