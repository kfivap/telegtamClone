import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {editProfileAPI} from "../../http/userAPI";
import {Context} from "../../index";

const EditProfile = observer(() => {

    const [showEdit, setShowEdit] = useState(true)
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


            <div className={'editModal'}>
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


        </div>
    );
})

export default EditProfile;