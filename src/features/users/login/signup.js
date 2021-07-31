import { Link } from "react-router-dom";

export function Signup() {
    function signupHandler(e) {
        e.preventDefault()
    }
    return (
        <div className=" flex justify-center ">
                <main className="flex flex-col p-4 justify-between  mt-4 flex-1 max-w-sm ">
            <h1 className="font-extrabold text-2xl text-white">Create your account</h1>
            <form className="flex flex-col justify-between  text-blue-light   ">
                
                <div className="flex flex-col mt-4">
                    <label>Username</label>
                    <input type="text" name="username" className="input-box" required />
                </div>
                <div className="flex flex-col">
                    <label>Email</label>
                    <input type="email" name="email" className="input-box" required /> 
                </div>
                 <div className="flex flex-col">
                    <label>Password</label>
                    <input type="password" name="password" className="input-box" required /> 
                </div>
                <div className="flex flex-col">
                    <label>Confirm Password</label>
                    <input type="password" name="password" className="input-box" required /> 
                </div>
                
                
                <input type="submit" onClick={signupHandler} value="Sign Up" className=" btn-primary text-white font-bold mt-4 "/>
                
                </form>
                <section className="flex text-blue-light justify-center mt-4">
                    {/* <Link to="#">
                        <button>Forgot Password?</button>
                    </Link>
                     */}
                    {/* <span className="pl-1 pr-1">.</span> */}
                    <Link to="/login">
                         <button>Already Have an Account?</button>
                    </Link>
                   
                </section>
        </main>
        </div>
        
    )
}