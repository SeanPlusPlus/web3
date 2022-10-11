import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { GlobalContext } from '../context/GlobalState'
import { truncatePublicKey } from '../utils/wallet'

// components
import About from './modals/About'
import Profile from './modals/Profile'
import NetworkWarning from './modals/NetworkWarning'

const Nav = () => {
  const router = useRouter()
  const pathname = router.pathname
  const isAdmin = (pathname === '/admin')

  const {
    setModal,
    account,
    setAccount,
    networkVersion,
    setNetworkVersion,
    CONTRACT_NETWORK,
  } = useContext(GlobalContext)
 
  const handleOpenProfile = () => {
    setModal({profile: 'modal-open'})
  }

  const handleOpenAbout = () => {
    setModal({about: 'modal-open'})
  }

  const connectWalletAction = async () => {
    if (networkVersion !== CONTRACT_NETWORK.id) {
      setModal({networkVersionWarning: 'modal-open'})
      return
    }

    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      setAccount({
        publicKey: accounts[0],
      })
      console.log('Wallet connect successful');
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    setNetworkVersion(window.ethereum.networkVersion)
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          setAccount({
            publicKey: accounts[0],
          })
          console.log('check connected pass')
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    console.log('account updated', account);
  }, [account]);

  return (
    <>
      <div className="navbar shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link href="/">
            <button className="btn btn-outline normal-case text-xl ml-2">
              <span className="text-slate-300">Web3</span>
            </button>
          </Link>
        </div>
        <div className="flex-none gap-2">
          { account ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-outline text-stone-50">
                  {truncatePublicKey(account.publicKey)}
                </label>
                <ul tabIndex="0" className="p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52">
                  <li>
                    <button onClick={handleOpenProfile} className="justify-between">
                      Profile
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button
                className="mr-2 btn btn-outline"
                onClick={connectWalletAction}
              >
                Connect Wallet
              </button>
            </>
          )}
        </div>
      </div>

      <About />
      <Profile />
      <NetworkWarning />
    </>
  )
}

export default Nav 
