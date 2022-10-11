import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState'
import { ethers } from 'ethers';
import myEpicGame from '../utils/MyEpicGame.json'
import { transformCharacterData } from '../utils/character'

/*
 * We pass in our characterNFT metadata so we can show a cool card in our UI
 */
const Arena = ({ characterNFT, setCharacterNFT, currentAccount }) => {
  const {
    CONTRACT_ADDRESS
  } = useContext(GlobalContext)

  // State
  const [gameContract, setGameContract] = useState(null);
  const [boss, setBoss] = useState(null);
  const [playerHp, setPlayerHp] = useState(null);
  const [attackState, setAttackState] = useState('');


  // UseEffects
  useEffect(() => {
    setPlayerHp(characterNFT.hp)

    const fetchBoss = async () => {
        const bossTxn = await gameContract.getBigBoss();
        console.log('Boss:', bossTxn);
        setBoss(transformCharacterData(bossTxn));
    };

    /*
    * Setup logic when this event is fired off
    */
    const onAttackComplete = (from, newBossHp, newPlayerHp) => {
        const bossHp = newBossHp.toNumber();
        const playerHpNum = newPlayerHp.toNumber();
        const sender = from.toString();

        console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHpNum}`);
        setPlayerHp(playerHpNum)

        /*
        * If player is our own, update both player and boss Hp
        */
        if (currentAccount === sender.toLowerCase()) {

          setBoss((prevState) => {
              return { ...prevState, hp: bossHp };
          });
          setCharacterNFT((prevState) => {
              return { ...prevState, hp: playerHp };
          });
        }
        /*
        * If player isn't ours, update boss Hp only
        */
        else {
          setBoss((prevState) => {
              return { ...prevState, hp: bossHp };
          });
        }
    }

    if (gameContract) {
        fetchBoss();
        gameContract.on('AttackComplete', onAttackComplete);
    }

    /*
    * Make sure to clean up this event when this component is removed
    */
    return () => {
        if (gameContract) {
            gameContract.off('AttackComplete', onAttackComplete);
        }
    }
  }, [gameContract]);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, []);

  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState('attacking');
        console.log('Attacking boss...');
        const attackTxn = await gameContract.attackBoss();
        await attackTxn.wait();
        console.log('attackTxn:', attackTxn);
        setAttackState('hit');
      }
    } catch (error) {
      console.error('Error attacking boss:', error);
      setAttackState('');
    }
  };

  return (
    <div className="text-center">
      {/* Boss */}
      {boss && (
      <div className="">
        <div className={`boss-content ${attackState}`}>
          <h2>🔥 {boss.name} 🔥</h2>
          <div className="text-center mx-auto">
            <img src={boss.imageURI} alt={`Boss ${boss.name}`} className="h-80 object-scale-down mx-auto mb-2" />
            <div className="">
              <progress value={boss.hp} max={boss.maxHp} />
              <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
            </div>
          </div>
        </div>
        <div className="">
          <button className="btn" onClick={runAttackAction}>
            {`💥 Attack ${boss.name}`}
          </button>
        </div>
      </div>
    )}

      {/* Character NFT */}
      {characterNFT && (
      <div className="">
        <div className="">
          <h2>Your Character</h2>
          <div className="">
            <div className="">
              <h2>{characterNFT.name}</h2>
              <img
                className="h-40 object-scale-down mx-auto mb-2"
                src={characterNFT.imageURI}
                alt={`Character ${characterNFT.name}`}
              />
              <div className="">
                <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                <p>{`${playerHp} / ${characterNFT.maxHp} HP`}</p>
              </div>
            </div>
            <div className="">
              <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Arena;