import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {editProfileAPI} from "../../http/userAPI";
import {Context} from "../../index";
import AvatarEditor from 'react-avatar-editor'

const EditProfile = observer(() => {

    const [showEdit, setShowEdit] = useState(false)
    const {user} = useContext(Context)

    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const selectFile = e => {
        setFile(e.target.files[0])

    }

    const editProfile = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', file)
        formData.append('userId', user.userId)

        editProfileAPI(formData).then(()=>{

        })
    }

    return (
        <div>
            <button
                onClick={() => setShowEdit(prevState => !prevState)}
            >
                Edit Profile
            </button>

            {showEdit?

                <div className={'editModal'}>
                    <AvatarEditor
                        image={user.userAvatar}
                        width={250}
                        height={250}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={1.2}
                        rotate={0}
                    />

                    Edit menu
                    <div>
                        Update Avatar
                        <input
                            type={'file'}
                            accept='image/jpeg,image/png'
                            onChange={selectFile}
                        />
                    </div>
                    <div>
                        Update Name (not added now)
                        <input
                            type={'text'}
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={editProfile}
                    >
                        update!
                    </button>


                </div>
            :
                null
            }



        </div>
    );
})

export default EditProfile;