import { Link } from 'react-router-dom'
import mainpageimage from '../../../assets/images/mainpageimage.svg'
// import icon from '../../../assets/images/icon.svg'
export function Landing() {
    return (
        <main className="flex min-h-screen flex-wrap-reverse justify-around items-center ">
            {/* <img className="flex-wrap" alt="landing page icon" src= {icon} /> */}
        <section className="w-full flexbreak:w-auto flex justify-center">
                <img className="sm:w-96 h-80 sm:h-auto " alt="travello" src={mainpageimage} />
            </section>
            <section className="flex flex-col w-full flexbreak:w-auto justify-between p-9">
                <div>
                    <h1 className="text-white font-extrabold text-2xl sm:text-5xl mb-12 max-w-xl">Make your adventures memorable</h1>
                    <h1 className="text-white font-extrabold  mb-12 text-2xl sm:text-4xl">Join Travello today</h1>
                </div>
                
                <div className="w-full xsm:flex ">
                    <Link to="/login">
                        <button className="border border-blue-light rounded-2xl p-4 text-blue-light font-bold mt-4 mb-4 xsm:mr-4 xsm:mt-0 w-full xsm:w-60">Log in</button>
                    </Link>
                    <Link to="#" >
                         <button className="bg-blue-light p-4 xsm:mr-4 rounded-2xl w-full text-white font-bold xsm:w-60">Sign Up</button>
                    </Link>
                   
                </div>
                
            </section>
            
        </main>
    )
}  