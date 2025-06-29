"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect, useCallback } from 'react';
import { allCards, mergeHand, simulate } from "./index.js";

/*
function GlobalKeyListener({ updatePercentages, moveSelectLeft, moveSelectRight }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key == "Enter") {
        updatePercentages()
      }
      else if (event.key == "ArrowLeft") {
        moveSelectLeft()
      }
      else if (event.key == "ArrowRight") {
        moveSelectRight()
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component doesn’t render anything visible
}
  */

function Card({ name, show, swap}) {
  function handleClick() {
    swap()
  }

  return (
    <button onClick={handleClick} style={{ border: 'none', background: 'transparent', padding: 1 }}>
      <img src={show ? name : "card_images/card_back.png"} width="60" height="90"/>
    </button>
  )
}



function CommCard({ selected, setSelected, show }) {
  function handleClick() {
    setSelected()
  }

  return (
    <button onClick={handleClick} style={selected ? { border: 'none', outline: '5px outset #EFBF04', background: 'transparent', margin: '5px 3px'} : { border: 'none', background: 'transparent', margin: '5px 3px'}}>
      <img src= { show == null ? "card_images/card_back.png" : allCards.get(show).path } width="60" height="90"/>
    </button>
  )
}

function Player({ showState, incPlayerShow, decPlayerShow, swapBack, selected1, selected2, setSelected1, setSelected2, show1, show2, text, percents }) {
  function handlePlusClick() {
    incPlayerShow()
  }

  function handleXClick() {
    decPlayerShow()
    swapBack()
  }

  if (showState == 0)
    return (
      <p style={{ border: 'none', background: 'transparent', color: '#EFBF04', fontSize: '64px', padding: '100px 50px'}}>
           
      </p>
    )
  else if (showState == 1) {
    return (
      <button onClick={handlePlusClick} style={{ border: 'none', background: 'transparent', color: '#EFBF04', fontSize: '96px', marginTop: '40px'}}>
        +
      </button>
    )
  }
  else if (showState == 2) {
    return (
      <>
        <button onClick={handleXClick}
          style={{ position: 'absolute', padding: '0px 7px', top: '-18px', right: '-18px', borderRadius: '10px', border: 'none', background: '#EFBF04', fontSize: '32px', cursor: 'pointer' }}><b>X</b></button>
        <p>{text}</p>
        <CommCard selected={selected1} setSelected={setSelected1} show={show1}/>
        <CommCard selected={selected2} setSelected={setSelected2} show={show2}/>
        <p>Win: {percents[0]}<br/> Tie: {percents[1]}</p>
      </>
    )
  }
  else {
    return (
      <>
        <p>{text}</p>
        <CommCard selected={selected1} setSelected={setSelected1} show={show1}/>
        <CommCard selected={selected2} setSelected={setSelected2} show={show2}/>
        <p>Win: {percents[0]}<br/> Tie: {percents[1]}</p>
      </>
    )
  }
}



function LoadingScreen({ showLoading }) {
  return (
    showLoading ? 
      <div className="loading-screen" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(239,191,4,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '9999', backdropFilter: 'blur(10px)'}}>
        <header style={{ fontFamily: 'Courier New, monospace', fontSize: '128px' }}><b>Loading...</b></header>
      </div>
      :
      <></>
  )
}



export default function Home() {
  // show array tracks what cards are available/showing
  const [show, setShow] = useState(Array(52).fill(true))



  // selected array tracks which community/player card is selected
  let temp = Array(25).fill(false)
  temp[0] = true
  const [selected, setSelect] = useState(temp)

  function changeSelected(i) {
    let index = selected.indexOf(true)
    let temp;

    // If selecting a different location, just change selected location
    if (i != index) {
      temp = selected.slice()
      temp = temp.fill(false)
      temp[i] = true
      setSelect(temp)
    }
    // Clicking same location, pop out the card that might be there
    else {
      // pop original card out
      if (commCards[index] != null) {
        temp = show.slice()
        temp[allCards.get(commCards[index]).index] = true
        setShow(temp)

        temp = commCards.slice()
        temp[index] = null
        setCommCards(temp)

      }
    }
  }

  function moveSelectLeft() {
    let temp = selected.slice()
    let index = temp.indexOf(true)
    temp[index] = false

    let end = playerShow.indexOf(1) == -1 ? playerShow.length : playerShow.indexOf(1)
    temp[(index - 1) % ((end * 2) + 5)] = true
    setSelect(temp)
  }

  function moveSelectRight() {
    let temp = selected.slice()
    let index = temp.indexOf(true)
    temp[index] = false

    let end = playerShow.indexOf(1) == -1 ? playerShow.length : playerShow.indexOf(1)
    temp[(index + 1) % ((end * 2) + 5)] = true
    setSelect(temp)
  }



  // commCards array tracks which card a community card location is displaying at the moment
  const [commCards, setCommCards] = useState(Array(25).fill(null))

  // i is the index of the CommCard in the show array, id is the card code of the card being swapped
  function swapCommCard(i, id) {
    let index = selected.indexOf(true)

    let temp = show.slice()
    // Swapping same card at same location, so swap the other way
    if(commCards[index] == id) {
      temp[i] = true
      setShow(temp)

      temp = commCards.slice()
      temp[index] = null
      setCommCards(temp)

    }
    // Swapping different card; check show[i] == true to make sure a card can't be pushed into multiple locations at once
    else if (show[i] == true) { 
      // pop original card out
      if (commCards[index] != null) {
        temp[allCards.get(commCards[index]).index] = true
      }
      temp[i] = false
      setShow(temp)
      
      // push in new card
      temp = commCards.slice()
      temp[index] = id
      setCommCards(temp)

      // Move selected location along for convenience
      moveSelectRight()
    }
  }

  function swapBack(first, second) {
    let tempShow = show.slice()
    let tempComm = commCards.slice()
    if (commCards[first] != null) {
      tempShow[allCards.get(commCards[first]).index] = true
      tempComm[first] = null
    }
    if (commCards[second] != null) {
      tempShow[allCards.get(commCards[second]).index] = true
      tempComm[second] = null
    }

    setShow(tempShow)
    setCommCards(tempComm)

    // Move selected location back to the original point
    if (selected[first] == true || selected[second] == true) {
      temp = selected.slice()
      temp[first] = false
      temp[second] = false
      temp[0] = true
      setSelect(temp)
    }
  }



  // playerShow array tracks which players are invisible, visible, and in play at the moment, the first two will always be in play and can't be deleted
  // 3 means in play with no x button; 2 means in play with x button, 1 means visible but no in play (add button), 0 means invisible
  temp = Array(10).fill(0)
  temp[0] = 3
  temp[1] = 3
  temp[2] = 1
  const [playerShow, setPlayerShow] = useState(temp)

  function incPlayerShow(i) {
    if (i != 0 && i != 1) {
      let temp = playerShow.slice()
      temp[i - 1] = 3
      temp[i] = 2
      if (i + 1 < temp.length) {
        temp[i + 1] = 1
      }
      
      setPlayerShow(temp)

      temp = selected.slice()
      temp = temp.fill(false)
      temp[5 + (i * 2)] = true
      setSelect(temp)
    }
  }

  function decPlayerShow(i) {
    if (i != 0 && i != 1) {
      let temp = playerShow.slice()
      if (i - 1 >= 2) {
        temp[i - 1] = 2
      }
      temp[i] = 1
      if (i + 1 < temp.length) {
        temp[i + 1] = 0
      }

      setPlayerShow(temp)
    }
  }


  // percentages array used to store win and tie percentages of players
  const [percentages, setPercentages] = useState(Array(10).fill(["0.00%", "0.00%"]))

  function clearPercentages() {
    let temp = Array(10).fill(["0.00%", "0.00%"])
    setPercentages(temp)
  }

  async function updatePercentages() {
    // Check community cards are valid
    if (!((commCards[0] == null && commCards[1] == null && commCards[2] == null && commCards[3] == null && commCards[4] == null)
      || (commCards[0] != null && commCards[1] != null && commCards[2] != null && commCards[3] == null && commCards[4] == null)
      || (commCards[0] != null && commCards[1] != null && commCards[2] != null && commCards[3] != null && commCards[4] == null)
      || (commCards[0] != null && commCards[1] != null && commCards[2] != null && commCards[3] != null && commCards[4] != null))) {
      
      return clearPercentages()
    }

    let numOfPlayers = playerShow.indexOf(1) == -1 ? 10 : playerShow.indexOf(1)

    // check if all player cards are filled in
    for (let i = 5; i < 5 + (numOfPlayers * 2); i++) {
      if (commCards[i] == null) {
        return clearPercentages()
      }
    }

    let players = []
    let newPlayer;
    for (let i = 0; i < numOfPlayers; i++) {
      newPlayer = {cards: [], bestHand: undefined, wins: 0}
      mergeHand(newPlayer.cards, allCards.get(commCards[5 + (i * 2)]))
      mergeHand(newPlayer.cards, allCards.get(commCards[5 + (i * 2) + 1]));
      
      players.push(newPlayer);
    }

    
    let i = 0;
    let tableCards = []
    while (i < 5 && commCards[i] != null) {
      tableCards.push(allCards.get(commCards[i]))
      i++;
    }

    setLoadingScreen(true);
    await wrappedSimulatePromise(players, tableCards);
    setLoadingScreen(false);

    let newPercents = percentages.slice()
    for (let i = 0; i < players.length; i++) {
      newPercents[i] = [players[i].wins, players[i].ties]
    }
    setPercentages(newPercents)
  }

  function wrappedSimulatePromise(players, tableCards) {
    return new Promise((resolve) => {
      setTimeout(() => {
        simulate(players, tableCards);
        resolve();
      }, 0);
    });
  }

  const [showLoadingScreen, setLoadingScreen] = useState(false);

  const erm = useCallback(() => moveSelectRight(), [selected, playerShow])

  return (
    <main>
      <LoadingScreen showLoading={showLoadingScreen}/>
      <header style={{ textAlign: 'center', fontFamily: 'Courier New, monospace', fontSize: '32px', color: '#EFBF04'}}> 
        <h1>
          Poker Hand Probabilities
        </h1>
      </header>
      <main className="card-row" style={{ textAlign: 'center' }}>
        <Card name="card_images/ace_of_spades2.png" show={show[12]} setShow={() => changeShow(12)} swap={() => swapCommCard(12, "SA")}/>
        <Card name="card_images/2_of_spades.png" show={show[0]} setShow={() => changeShow(0)} swap={() => swapCommCard(0, "S2")}/>
        <Card name="card_images/3_of_spades.png" show={show[1]} setShow={() => changeShow(1)} swap={() => swapCommCard(1, "S3")}/>
        <Card name="card_images/4_of_spades.png" show={show[2]} setShow={() => changeShow(2)} swap={() => swapCommCard(2, "S4")}/>
        <Card name="card_images/5_of_spades.png" show={show[3]} setShow={() => changeShow(3)} swap={() => swapCommCard(3, "S5")}/>
        <Card name="card_images/6_of_spades.png" show={show[4]} setShow={() => changeShow(4)} swap={() => swapCommCard(4, "S6")}/>
        <Card name="card_images/7_of_spades.png" show={show[5]} setShow={() => changeShow(5)} swap={() => swapCommCard(5, "S7")}/>
        <Card name="card_images/8_of_spades.png" show={show[6]} setShow={() => changeShow(6)} swap={() => swapCommCard(6, "S8")}/>
        <Card name="card_images/9_of_spades.png" show={show[7]} setShow={() => changeShow(7)} swap={() => swapCommCard(7, "S9")}/>
        <Card name="card_images/10_of_spades.png" show={show[8]} setShow={() => changeShow(8)} swap={() => swapCommCard(8, "S10")}/>
        <Card name="card_images/jack_of_spades2.png" show={show[9]} setShow={() => changeShow(9)} swap={() => swapCommCard(9, "SJ")}/>
        <Card name="card_images/queen_of_spades2.png" show={show[10]} setShow={() => changeShow(10)} swap={() => swapCommCard(10, "SQ")}/>
        <Card name="card_images/king_of_spades2.png" show={show[11]} setShow={() => changeShow(11)} swap={() => swapCommCard(11, "SK")}/>

        <Card name="card_images/ace_of_clubs.png" show={show[25]} setShow={() => changeShow(25)} swap={() => swapCommCard(25, "CA")}/>
        <Card name="card_images/2_of_clubs.png" show={show[13]} setShow={() => changeShow(13)} swap={() => swapCommCard(13, "C2")}/>
        <Card name="card_images/3_of_clubs.png" show={show[14]} setShow={() => changeShow(14)} swap={() => swapCommCard(14, "C3")}/>
        <Card name="card_images/4_of_clubs.png" show={show[15]} setShow={() => changeShow(15)} swap={() => swapCommCard(15, "C4")}/>
        <Card name="card_images/5_of_clubs.png" show={show[16]} setShow={() => changeShow(16)} swap={() => swapCommCard(16, "C5")}/>
        <Card name="card_images/6_of_clubs.png" show={show[17]} setShow={() => changeShow(17)} swap={() => swapCommCard(17, "C6")}/>
        <Card name="card_images/7_of_clubs.png" show={show[18]} setShow={() => changeShow(18)} swap={() => swapCommCard(18, "C7")}/>
        <Card name="card_images/8_of_clubs.png" show={show[19]} setShow={() => changeShow(19)} swap={() => swapCommCard(19, "C8")}/>
        <Card name="card_images/9_of_clubs.png" show={show[20]} setShow={() => changeShow(20)} swap={() => swapCommCard(20, "C9")}/>
        <Card name="card_images/10_of_clubs.png" show={show[21]} setShow={() => changeShow(21)} swap={() => swapCommCard(21, "C10")}/>
        <Card name="card_images/jack_of_clubs2.png" show={show[22]} setShow={() => changeShow(22)} swap={() => swapCommCard(22, "CJ")}/>
        <Card name="card_images/queen_of_clubs2.png" show={show[23]} setShow={() => changeShow(23)} swap={() => swapCommCard(23, "CQ")}/>
        <Card name="card_images/king_of_clubs2.png" show={show[24]} setShow={() => changeShow(24)} swap={() => swapCommCard(24, "CK")}/>
      </main>
      <main className="card-row" style={{ textAlign: 'center' }}>
        <Card name="card_images/ace_of_hearts.png" show={show[38]} setShow={() => changeShow(38)} swap={() => swapCommCard(38, "HA")}/>
        <Card name="card_images/2_of_hearts.png" show={show[26]} setShow={() => changeShow(26)} swap={() => swapCommCard(26, "H2")}/>
        <Card name="card_images/3_of_hearts.png" show={show[27]} setShow={() => changeShow(27)} swap={() => swapCommCard(27, "H3")}/>
        <Card name="card_images/4_of_hearts.png" show={show[28]} setShow={() => changeShow(28)} swap={() => swapCommCard(28, "H4")}/>
        <Card name="card_images/5_of_hearts.png" show={show[29]} setShow={() => changeShow(29)} swap={() => swapCommCard(29, "H5")}/>
        <Card name="card_images/6_of_hearts.png" show={show[30]} setShow={() => changeShow(30)} swap={() => swapCommCard(30, "H6")}/>
        <Card name="card_images/7_of_hearts.png" show={show[31]} setShow={() => changeShow(31)} swap={() => swapCommCard(31, "H7")}/>
        <Card name="card_images/8_of_hearts.png" show={show[32]} setShow={() => changeShow(32)} swap={() => swapCommCard(32, "H8")}/>
        <Card name="card_images/9_of_hearts.png" show={show[33]} setShow={() => changeShow(33)} swap={() => swapCommCard(33, "H9")}/>
        <Card name="card_images/10_of_hearts.png" show={show[34]} setShow={() => changeShow(34)} swap={() => swapCommCard(34, "H10")}/>
        <Card name="card_images/jack_of_hearts2.png" show={show[35]} setShow={() => changeShow(35)} swap={() => swapCommCard(35, "HJ")}/>
        <Card name="card_images/queen_of_hearts2.png" show={show[36]} setShow={() => changeShow(36)} swap={() => swapCommCard(36, "HQ")}/>
        <Card name="card_images/king_of_hearts2.png" show={show[37]} setShow={() => changeShow(37)} swap={() => swapCommCard(37, "HK")}/>

        <Card name="card_images/ace_of_diamonds.png" show={show[51]} setShow={() => changeShow(51)} swap={() => swapCommCard(51, "DA")}/>
        <Card name="card_images/2_of_diamonds.png" show={show[39]} setShow={() => changeShow(39)} swap={() => swapCommCard(39, "D2")}/>
        <Card name="card_images/3_of_diamonds.png" show={show[40]} setShow={() => changeShow(40)} swap={() => swapCommCard(40, "D3")}/>
        <Card name="card_images/4_of_diamonds.png" show={show[41]} setShow={() => changeShow(41)} swap={() => swapCommCard(41, "D4")}/>
        <Card name="card_images/5_of_diamonds.png" show={show[42]} setShow={() => changeShow(42)} swap={() => swapCommCard(42, "D5")}/>
        <Card name="card_images/6_of_diamonds.png" show={show[43]} setShow={() => changeShow(43)} swap={() => swapCommCard(43, "D6")}/>
        <Card name="card_images/7_of_diamonds.png" show={show[44]} setShow={() => changeShow(44)} swap={() => swapCommCard(44, "D7")}/>
        <Card name="card_images/8_of_diamonds.png" show={show[45]} setShow={() => changeShow(45)} swap={() => swapCommCard(45, "D8")}/>
        <Card name="card_images/9_of_diamonds.png" show={show[46]} setShow={() => changeShow(46)} swap={() => swapCommCard(46, "D9")}/>
        <Card name="card_images/10_of_diamonds.png" show={show[47]} setShow={() => changeShow(47)} swap={() => swapCommCard(47, "D10")}/>
        <Card name="card_images/jack_of_diamonds2.png" show={show[48]} setShow={() => changeShow(48)} swap={() => swapCommCard(48, "DJ")}/>
        <Card name="card_images/queen_of_diamonds2.png" show={show[49]} setShow={() => changeShow(49)} swap={() => swapCommCard(49, "DQ")}/>
        <Card name="card_images/king_of_diamonds2.png" show={show[50]} setShow={() => changeShow(50)} swap={() => swapCommCard(50, "DK")}/>
      </main>
      <main style={{ textAlign: 'center'}}>
        <button onClick={() => updatePercentages()} style={{ justifyContent: 'center', fontFamily: 'Courier New, monospace', fontSize: '24px', border: 'none', background: '#EFBF04', padding: '10px', borderRadius: '25px', marginTop: '16px'}}><b>Calculate (Enter)</b></button>
      </main>
      <main className="community-cards" style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px', margin: '0 auto', maxWidth: '1100px', textAlign: 'center', fontFamily: 'Courier New, monospace', fontSize: '24px' }}>
        <div style={{ flex: '2', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px' }}>
          <p>Flop</p>
          <CommCard selected={selected[0]} setSelected={() => changeSelected(0)} show={commCards[0]}/>
          <CommCard selected={selected[1]} setSelected={() => changeSelected(1)} show={commCards[1]}/>
          <CommCard selected={selected[2]} setSelected={() => changeSelected(2)} show={commCards[2]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px' }}>
          <p>Turn</p>
          <CommCard selected={selected[3]} setSelected={() => changeSelected(3)} show={commCards[3]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px' }}>
          <p>River</p>
          <CommCard selected={selected[4]} setSelected={() => changeSelected(4)} show={commCards[4]}/>
        </div>
      </main>
      <main className="players" style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px', margin: '0 auto', maxWidth: '1100px', textAlign: 'center', fontFamily: 'Courier New, monospace', fontSize: '24px'}}>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative'  }}>
          <Player showState={playerShow[0]} incPlayerShow={() => incPlayerShow(0)} decPlayerShow={() => decPlayerShow(0)} swapBack={() => swapBack(5, 6)}
            selected1={selected[5]} selected2= {selected[6]} 
            setSelected1={() => changeSelected(5)} setSelected2={() => changeSelected(6)} 
            show1={commCards[5]} show2={commCards[6]} 
            text="Player 1" percents={percentages[0]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative' }}>
          <Player showState={playerShow[1]} incPlayerShow={() => incPlayerShow(1)} decPlayerShow={() => decPlayerShow(1)} swapBack={() => swapBack(7, 8)}
            selected1={selected[7]} selected2= {selected[8]} 
            setSelected1={() => changeSelected(7)} setSelected2={() => changeSelected(8)} 
            show1={commCards[7]} show2={commCards[8]} 
            text="Player 2" percents={percentages[1]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative' }}>
          <Player showState={playerShow[2]} incPlayerShow={() => incPlayerShow(2)} decPlayerShow={() => decPlayerShow(2)} swapBack={() => swapBack(9, 10)}
            selected1={selected[9]} selected2= {selected[10]} 
            setSelected1={() => changeSelected(9)} setSelected2={() => changeSelected(10)} 
            show1={commCards[9]} show2={commCards[10]} 
            text="Player 3" percents={percentages[2]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative'  }}>
          <Player showState={playerShow[3]} incPlayerShow={() => incPlayerShow(3)} decPlayerShow={() => decPlayerShow(3)} swapBack={() => swapBack(11, 12)}
            selected1={selected[11]} selected2= {selected[12]} 
            setSelected1={() => changeSelected(11)} setSelected2={() => changeSelected(12)} 
            show1={commCards[11]} show2={commCards[12]} 
            text="Player 4" percents={percentages[3]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative' }}>
          <Player showState={playerShow[4]} incPlayerShow={() => incPlayerShow(4)} decPlayerShow={() => decPlayerShow(4)} swapBack={() => swapBack(13, 14)}
            selected1={selected[13]} selected2= {selected[14]} 
            setSelected1={() => changeSelected(13)} setSelected2={() => changeSelected(14)} 
            show1={commCards[13]} show2={commCards[14]} 
            text="Player 5" percents={percentages[4]}/>
        </div>
      </main>
      <main className="players" style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px', margin: '0 auto', maxWidth: '1100px', textAlign: 'center', fontFamily: 'Courier New, monospace', fontSize: '24px'}}>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative'  }}>
          <Player showState={playerShow[5]} incPlayerShow={() => incPlayerShow(5)} decPlayerShow={() => decPlayerShow(5)} swapBack={() => swapBack(15, 16)}
            selected1={selected[15]} selected2= {selected[16]} 
            setSelected1={() => changeSelected(15)} setSelected2={() => changeSelected(16)} 
            show1={commCards[15]} show2={commCards[16]} 
            text="Player 6" percents={percentages[5]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative' }}>
          <Player showState={playerShow[6]} incPlayerShow={() => incPlayerShow(6)} decPlayerShow={() => decPlayerShow(6)} swapBack={() => swapBack(17, 18)}
            selected1={selected[17]} selected2= {selected[18]} 
            setSelected1={() => changeSelected(17)} setSelected2={() => changeSelected(18)} 
            show1={commCards[17]} show2={commCards[18]} 
            text="Player 7" percents={percentages[6]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative' }}>
          <Player showState={playerShow[7]} incPlayerShow={() => incPlayerShow(7)} decPlayerShow={() => decPlayerShow(7)} swapBack={() => swapBack(19, 20)}
            selected1={selected[19]} selected7= {selected[20]} 
            setSelected1={() => changeSelected(19)} setSelected2={() => changeSelected(20)} 
            show1={commCards[19]} show2={commCards[20]} 
            text="Player 8" percents={percentages[7]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative'  }}>
          <Player showState={playerShow[8]} incPlayerShow={() => incPlayerShow(8)} decPlayerShow={() => decPlayerShow(8)} swapBack={() => swapBack(21, 22)}
            selected1={selected[21]} selected2= {selected[22]} 
            setSelected1={() => changeSelected(21)} setSelected2={() => changeSelected(22)} 
            show1={commCards[21]} show2={commCards[22]} 
            text="Player 9" percents={percentages[8]}/>
        </div>
        <div style={{ flex: '1', textAlign: 'center', border: '1px solid #EFBF04', padding: '5px', borderRadius: '25px', position: 'relative' }}>
          <Player showState={playerShow[9]} incPlayerShow={() => incPlayerShow(9)} decPlayerShow={() => decPlayerShow(9)} swapBack={() => swapBack(23, 24)}
            selected1={selected[23]} selected2= {selected[24]} 
            setSelected1={() => changeSelected(23)} setSelected2={() => changeSelected(24)} 
            show1={commCards[23]} show2={commCards[24]} 
            text="Player 10" percents={percentages[9]}/>
        </div>
      </main>
      
    </main>
  )
}
