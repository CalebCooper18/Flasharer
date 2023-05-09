import { AiFillHome, AiOutlineLogin, AiOutlineLogout, AiOutlineUser, AiOutlineUserAdd, AiOutlineInfoCircle, AiOutlineEye, AiOutlineCloseCircle} from 'react-icons/ai';
import { MdCreate } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import IconLink from './IconLink';
import Divider from './Divider';
import { User } from '../../types';
import { useState } from 'react';

interface Props{
  user: User | null;
}

export default function Navbar({user}: Props) {
  
  const [isOpen, setIsOpen] = useState(false);
  

  function userLoggedIn()
  {
    if(user)
    {
      return(
        <>
          <Divider />
          <div className='mt-auto'>
            <IconLink icon={<AiOutlineLogout  size={22} />} text={'Logout'} linkLocation={'/'} setIsOpen={setIsOpen} />
            <IconLink icon={<AiOutlineUser size={22} />} text={'My Account'} linkLocation={'/me'} setIsOpen={setIsOpen} />
          </div>
        </>
      )
    }
    return(
      <>
        <Divider />
        <div className='xss:mt-auto flex flex-col items-center'>
          <IconLink icon={<AiOutlineLogin size={22} />} text={'Login'} linkLocation={'/login'} setIsOpen={setIsOpen} />
          <IconLink icon={<AiOutlineUserAdd size={22} />} text={'Create Account'} linkLocation={'/register'} setIsOpen={setIsOpen} />
        </div>
      </>
    )
  }


  return (
   <nav className={`fixed z-50 top-0 left-0 h-screen ${isOpen ? 'w-full' : 'w-10'} text-green-500 bg-primary shadow-lg xss:w-16 transition-all duration-300 flex flex-col items-center`}>
    {!isOpen && 
    <button className='icon-btn mt-3 flex xss:hidden' onClick={() => setIsOpen(true)}>
      <GiHamburgerMenu size={22} />
    </button>
    }
    <div className={`m-0 mt-5 p-0 h-full flex-col items-center ${isOpen ? 'flex' : 'hidden'} xss:flex xss:mt-2 transition-all duration-300`}>
    <IconLink icon={<AiFillHome size={22}/>} text={'Home'} linkLocation={'/'} setIsOpen={setIsOpen} />
    <Divider />
    <IconLink icon={<MdCreate size={22} />} text={'Create'} linkLocation={'/create'} setIsOpen={setIsOpen} />
    <IconLink icon={<AiOutlineEye size={22} />} text={'View'} linkLocation={'/view'} setIsOpen={setIsOpen} />
    <IconLink icon={<AiOutlineInfoCircle size={22} />} text='About' linkLocation={'/about'} setIsOpen={setIsOpen} />
    {userLoggedIn()}
    {isOpen &&
      <button className='icon-btn mt-3 flex xss:hidden' onClick={() => setIsOpen(false)}>
        <AiOutlineCloseCircle size={22} />
      </button> 
    }
    </div>
   </nav>
  )
}
