import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

const Profile = () => {
  const {
    modal,
    setModal,
    account,
  } = useContext(GlobalContext)

  const handleClose= () => {
    setModal({})
  }

  if (!account) {
    return <></>
  }

  return (
    <div className={`modal ${modal && modal.profile}`}>
      <div className="modal-box">
        <h3 className="font-bold text-xl flex">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-4 top-4" onClick={handleClose}>✕</label>
          <span className="ml-1 text-2xl mb-4">
            Account
          </span>
        </h3>
        <p className="pt-4">
          Public Key:
          <br />
          <code className="font-semibold text-xs">{account.publicKey}</code>
        </p>
        <div className="modal-action pt-5">
          <label htmlFor="my-modal" className="btn" onClick={handleClose}>Close</label>
        </div>
      </div>
    </div>
  )
}

export default Profile