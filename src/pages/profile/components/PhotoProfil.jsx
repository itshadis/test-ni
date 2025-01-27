/* eslint-disable react/prop-types */
import { FaPen } from "react-icons/fa"
import { BASE_URL } from "../../../utils/constant"
import photoProfile from "../../../assets/image/photo_profile.png"
import { useDispatch } from "react-redux"
import { detailUser } from "../../../store/slices/authSlice"

const PhotoProfil = ({ user, token }) => {
  const dispatch = useDispatch()

   const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (file) {
      const fileType = file.type
      const fileSize = file.size

      // Validate file format and size
      const allowedFormats = ["image/png", "image/jpeg"]
      if (!allowedFormats.includes(fileType)) {
        alert("Format foto hanya boleh PNG atau JPG")
        return
      }

      const maxFileSize = 100 * 1024 // 100 KB
      if (fileSize > maxFileSize) {
        alert("Ukuran file maksimal 100 KB")
        return
      }

      try {
        const imageData = new FormData()
        imageData.append("file", file)

        const response = await fetch(`${BASE_URL}/profile/image`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageData,
        })

        const data = await response.json()
        if (response.ok) {
          dispatch(detailUser(data.data))
        } else {
          console.error("Upload gagal:", data);
        }
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <img
          className="w-32 rounded-full"
          src={user?.profile_image || photoProfile}
          alt="Profile"
        />
        <label className="absolute bottom-0 right-0 rounded-full border-2 border-gray-300 p-2 cursor-pointer">
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <FaPen />
        </label>
      </div>
      <p className="text-3xl font-semibold">
        {`${user?.first_name || ""} ${user?.last_name || ""}`}
      </p>
    </div>
  )
}

export default PhotoProfil