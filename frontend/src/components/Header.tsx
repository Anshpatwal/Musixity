import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 mb-8'>
                <Link to='/' className='rounded-lg'>
                    <h2 className="text-5xl text-white font-bold">Musixity</h2>
                </Link>
                {/* <div>
                    <h1 className='text-2xl font-bold'>Music Manager</h1>
                    <p className='text-zinc-400 mt-1'>Manage your music catalog</p>
                </div> */}
            </div>
            <UserButton />
        </div>
    );
};
export default Header;