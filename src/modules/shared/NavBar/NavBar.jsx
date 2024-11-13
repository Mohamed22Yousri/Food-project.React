import avatar from '../../../assets/images/Ellipse 234.png'

export default function NavBar({loginData}) {
  
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
