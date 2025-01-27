import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/slices/authSlice"
import PhotoProfil from "./components/PhotoProfil"
import FormDetailUser from "./components/FormDetailUser"

const Profile = () => {
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <section className="w-4/5 mx-auto flex justify-center items-center mt-10">
      <div className="w-2/3 flex flex-col gap-4">
        <PhotoProfil token={token} user={user} />        

        {user ? (
         <FormDetailUser token={token} user={user}  />
        ) : (
          <p>Loading...</p>
        )}

        <Button
          className="h-10 font-semibold"
          type="primary"
          danger
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </section>
  )
}

export default Profile
