import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

const NetworkWarning = () => {
  const {
    modal,
    CONTRACT_NETWORK,
  } = useContext(GlobalContext)

  const handleRefresh = () => {
    window.location.reload(false);
  }

  return (
    <div className={`modal ${modal && modal.networkVersionWarning}`}>
      <div className="modal-box relative">
        <h3 className="font-bold text-xl flex">
          <div className="alert alert-warning shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Heads Up</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </h3>
        <div>
          <ul className="pt-6 pl-8">
            <li className="list-disc pb-2">
              Connect your wallet to the <code className="border p-1 rounded font-bold">{CONTRACT_NETWORK.name}</code> network
            </li>
            <li className="list-disc bb-2">
              Then refresh the page
            </li>
            <li className="list-disc bb-2">
              Then connect your wallet
            </li>
          </ul>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={handleRefresh}>Refresh</button>
        </div>
      </div>
    </div>
  )
}

export default NetworkWarning