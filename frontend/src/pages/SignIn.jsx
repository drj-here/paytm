import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import ButtonWarning from '../components/ButtonWarning'
import Button from '../components/Button'

function SignIn() {
  return (
    <div className='h-screen bg-slate-300 flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='bg-white rounded-lg w-80 text-center p-2 h-max px-4'>
            <Heading title="Sign In"/>
            <SubHeading label={"Enter your information to access your account"}/>
            <InputBox label={"Email"} placeholder={"example@gmail.com"}/>
            <InputBox label={"Password"} placeholder={"*******"}/>
            <div className="pt-4">
            <Button label={"Sign in"} />
            </div>
            <ButtonWarning label={"Create a new account "} buttonText={"Sign Up"} to={"/signup"}/>
        </div>
      </div>
    </div>
  )
}

export default SignIn
