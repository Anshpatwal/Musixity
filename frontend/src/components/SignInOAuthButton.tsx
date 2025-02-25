
import { useSignIn } from '@clerk/clerk-react'
import { Button } from './ui/button'

const SignInOAuthButton = () => {
    const { isLoaded, signIn } = useSignIn()

    if (!isLoaded) {
        return null
    }

    const signInWithGoogle = () => {
        try {
            signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/auth-callback"
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Button onClick={signInWithGoogle} className='w-full border border-zinc-500 h-11'>Continue with Google</Button>
        </>
    )
}

export default SignInOAuthButton
