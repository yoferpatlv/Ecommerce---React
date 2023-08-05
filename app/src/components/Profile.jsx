// const {useRef} = React
import {useRef} from 'react'
import './Profile.css'
import IconButton from './Buttons/IconButton'
import IconButtonBackStyle from './Buttons/IconButtonBackStyle'
import updateUserPassword from '../logic/updateUserPassword'
import updateUserEmail from '../logic/updateUserEmail'
import updateUserName from '../logic/updateUserName'
import withContext from '../utils/withContext'

function Profile({ onLogoutClick,onCloseClick, email, onUpdateEmail, onUpdateName,context: {handleFeedback} }) {

    //ref
    // const settDoc = useRef(null)
    let settDoc = useRef(null)
    const handleLogoutClick =()=>{
        
        onLogoutClick()
    }

    const handleFormSubmitPassword = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            oldPassword: { value: oldPassword },
            newPassword: { value: newPassword },
            newPasswordRepeat: { value: newPasswordRepeat }
        } = form

        try {
            updateUserPassword(sessionStorage.token, oldPassword, newPassword, newPasswordRepeat, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'warning' })
            

                    return
                }

                handleFeedback({ message: "Password Update", level: 'success' })
                onCloseClick()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'warning' })
    
        }
    }

    const handleFormSubmitEmail = event => {
        event.preventDefault()
        const { target: form } = event

        const {
            newEmail: { value: newEmail },
        } = form

        try {
            updateUserEmail(sessionStorage.token, newEmail, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'warning' })
            
                    return
                }
                onUpdateEmail(newEmail)
                handleFeedback({ message: "Email Update", level: 'success' })

                onCloseClick()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'warning' })
    
        }

    }

    const handleFormSubmitUsername = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            newName: { value: newName },
        } = form

        try {
            updateUserName(sessionStorage.token, newName, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'warning' })
            
                    return
                }

                onUpdateName(newName)

                handleFeedback({ message: "User Name Update", level: 'success' })

                onCloseClick()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'warning' })
    
        }
    }

    const onScrollTop = () =>{
        settDoc.scroll({ 'top': 0, 'behavior': "smooth" })
    }
   

    return <>
        {/* <div className="settings-panel formSettings"  ref={settDoc}> */}
        <div className="settings-panel formSettings"  ref={node=>settDoc=node}>
            <IconButtonBackStyle text='close' onClick={onCloseClick} />
            <form className="formPassword contSettings" onSubmit={handleFormSubmitPassword}>
                <div className="nameSettings">UPDATE PASSWORD: </div>
                <div className="contButtonsSettings">
                    <label className="label__movil">CURRENT PASSWORD</label>
                    <input className="oldPassword updatePass" type="password" name="oldPassword" placeholder="current password" />
                    <label className="label__movil">NEW PASSWORD</label>
                    <input className="newPassword updatePass" type="password" name="newPassword" placeholder="new password" />
                    <label className="label__movil">REPEAT NEW PASSWORD</label>
                    <input className="newPasswordRepeat updatePass" type="password" name="newPasswordRepeat" placeholder="new password repeat" />
                </div>
                <button className="btn-update" type="submit">Update Password</button>
            </form>
            <form className="formEmail contSettings" onSubmit={handleFormSubmitEmail}>
                <div className="nameSettings">UPDATE EMAIL</div>
                <div className="contButtonsSettings">
                    <div className="divEmail">
                        <h1 className="normalMessageEmail">Email : </h1><h1 className="messageEmail"> {email}</h1>
                    </div>

                    <input className="updateEmail" type="email" name="newEmail" placeholder="New Email" />
                </div>

                <button className="btn-update" type="submit">Update Email</button>
            </form>
            <form className="formUserName contSettings" onSubmit={handleFormSubmitUsername}>
                <div className="nameSettings">UPDATE USER NAME</div>
                <div className="contButtonsSettings">
                    <input className="updateEmail" type="text" name="newName" placeholder="new user name" />
                </div>

                <button className="btn-update" type="submit">Update Username</button>
            </form>
        </div>
        <div className="contLogout">
        <button className='btn-logout' onClick={handleLogoutClick}>LOGOUT</button>
        </div>
        <button className="btn-scrollTop"><IconButton addClass='expand_less' text='expand_less' onClick={onScrollTop}/></button>
    </>
}
export default withContext(Profile)