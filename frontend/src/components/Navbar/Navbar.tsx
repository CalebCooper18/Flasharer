import { AiFillHome, AiOutlineLogin, AiOutlineLogout, AiOutlineUser, AiOutlineUserAdd, AiOutlineInfoCircle, AiOutlineEye } from 'react-icons/ai';
import { MdCreate } from 'react-icons/md'
import IconLink from './IconLink';
import Divider from './Divider';
import { User } from '../../types';

interface Props{
  user: User;
}

export default function Navbar({user}: Props) {

  function userLoggedIn()
  {
    if(user)
    {
      return(
        <>
          <Divider />
          <div className='mt-auto'>
            <IconLink icon={<AiOutlineLogout  size={22} />} text={'Logout'} linkLocation={'/'} />
            <IconLink icon={<AiOutlineUser size={22} />} text={'My Account'} linkLocation={'/me'} />
          </div>
        </>
      )
    }
    return(
      <>
        <Divider />
        <div className='mt-auto'>
          <IconLink icon={<AiOutlineLogin size={22} />} text={'Login'} linkLocation={'/login'} />
          <IconLink icon={<AiOutlineUserAdd size={22} />} text={'Create Account'} linkLocation={'/register'} />
        </div>
      </>
    )
  }


  return (
   <nav className="fixed top-0 left-0 h-screen w-16
                   flex flex-col text-secondary bg-primary shadow-lg">
    <IconLink icon={<AiFillHome size={22}/>} text={'Home'} linkLocation={'/'} />
    <Divider />
    <IconLink icon={<MdCreate size={22} />} text={'Create'} linkLocation={'/create'} />
    <IconLink icon={<AiOutlineEye size={22} />} text={'View'} linkLocation={'/view'} />
    <IconLink icon={<AiOutlineInfoCircle size={22} />} text='About' linkLocation={'/about'} />
    {userLoggedIn()}
   </nav>
  )
}
