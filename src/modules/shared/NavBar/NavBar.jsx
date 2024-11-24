import { useContext } from 'react'
import avatar from '../../../assets/images/Ellipse 234.png'
import { AuthContext } from '../../context/Authcontext'

export default function NavBar() {
  let {loginData} = useContext(AuthContext)
  return (
    <>
    <div className='container-fluid'>
    <div className="d-flex align-items-center justify-content-end py-3">
    <div>
      <img src={avatar} alt="" />
      <span className='mx-2'>{loginData?.userName}</span>
    </div>
    </div>
   
    </div>
    </>
  )
}
