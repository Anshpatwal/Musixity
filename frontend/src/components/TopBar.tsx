import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import SignInOAuthButton from './SignInOAuthButton'
import { useAuthStore } from '@/store/useAuthStore'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from './ui/button'

const TopBar = () => {
    const { isAdmin } = useAuthStore()
    return (
        <div className='flex items-center p-4 justify-between sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
            <div className='flex gap-2 items-center text-3xl font-semibold'>
                <h2>Musixity</h2>
            </div>
            <div className='flex items-center gap-4'>
                {isAdmin && <Link to={'/admin'} className={cn(buttonVariants({ variant: 'outline' }))}>
                    <LayoutDashboardIcon className='size-4 mr-2' />
                    Admin Dashboard
                </Link>}
                <SignedIn>
                    <Button className={cn(buttonVariants({ variant: 'outline' }))}>
                        <LogOut/>
                        <SignOutButton />
                    </Button>
                </SignedIn>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInOAuthButton />
                </SignedOut>
            </div>
        </div>
    )
}

export default TopBar
