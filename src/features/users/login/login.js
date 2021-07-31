

export function Login() {
    function signinHandler(e) {
        e.preventDefault()
    }
    return (
        <main className=" flex justify-center ">
                <main className="flex flex-col p-4 justify-between  mt-4 flex-1 max-w-sm ">
            <h1 className="font-extrabold text-2xl text-white">Login to Travello</h1>
            <form className="flex flex-col justify-between  text-blue-light h-80 flex-shrink-0 ">
                
                <div className="flex flex-col mt-4">
                    <label>Username</label>
                    <input type="text" name="username" className="input-box" />
                </div>
                 <div className="flex flex-col">
                    <label>Password</label>
                    <input type="password" name="password" className="input-box" /> 
                </div>
                
                
                <input type="submit" onClick={signinHandler} value="Login" className=" btn-primary text-white font-bold "/>
                
                </form>
                <section className="flex text-blue-light justify-center mt-4">
                    <button>Forgot Password?</button>
                    <span className="p-1">.</span>
                    <button>Sign Up</button>
                </section>
        </main>
        </main>
        
    )
}