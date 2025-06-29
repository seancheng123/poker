/*
    Card Object

    code: string representation
    value: number
    suit: string
*/

/*
    Player Object

    hand: card array of player's hand (two cards)
    cards: card array of hand+table cards
    bestHand: place to store bestHands (only used for probability)
    wins: number of wins (only used for probability)
    ties: number of ties (used for probability)

*/

/*
    Hand Object
    value: hierarchy value
    cards: best hand cards
*/

const hands = {
    STRAIGHTFLUSH: 0,
    FOUR: 1,
    FULLHOUSE: 2,
    FLUSH: 3,
    STRAIGHT: 4,
    THREE: 5,
    TWOPAIR: 6,
    PAIR:7,
    HIGH: 8
};

export const allCards = new Map();

//allCards.set("S1", {code: "S1", value: 1, suit: "Spades"});
allCards.set("S2", {code: "S2", value: 2, suit: "Spades", index: 0, path: "card_images/2_of_spades.png"});
allCards.set("S3", {code: "S3", value: 3, suit: "Spades", index: 1, path: "card_images/3_of_spades.png"});
allCards.set("S4", {code: "S4", value: 4, suit: "Spades", index: 2, path: "card_images/4_of_spades.png"});
allCards.set("S5", {code: "S5", value: 5, suit: "Spades", index: 3, path: "card_images/5_of_spades.png"});
allCards.set("S6", {code: "S6", value: 6, suit: "Spades", index: 4, path: "card_images/6_of_spades.png"});
allCards.set("S7", {code: "S7", value: 7, suit: "Spades", index: 5, path: "card_images/7_of_spades.png"});
allCards.set("S8", {code: "S8", value: 8, suit: "Spades", index: 6, path: "card_images/8_of_spades.png"});
allCards.set("S9", {code: "S9", value: 9, suit: "Spades", index: 7, path: "card_images/9_of_spades.png"});
allCards.set("S10", {code: "S10", value: 10, suit: "Spades", index: 8, path: "card_images/10_of_spades.png"});
allCards.set("SJ", {code: "SJ", value: 11, suit: "Spades", index: 9, path: "card_images/jack_of_spades2.png"});
allCards.set("SQ", {code: "SQ", value: 12, suit: "Spades", index: 10, path: "card_images/queen_of_spades2.png"});
allCards.set("SK", {code: "SK", value: 13, suit: "Spades", index: 11, path: "card_images/king_of_spades2.png"});
allCards.set("SA", {code: "SA", value: 14, suit: "Spades", index: 12, path: "card_images/ace_of_spades2.png"});

//allCards.set("C1", {code: "C1", value: 1, suit: "Clubs"});
allCards.set("C2", {code: "C2", value: 2, suit: "Clubs", index: 13, path: "card_images/2_of_clubs.png"});
allCards.set("C3", {code: "C3", value: 3, suit: "Clubs", index: 14, path: "card_images/3_of_clubs.png"});
allCards.set("C4", {code: "C4", value: 4, suit: "Clubs", index: 15, path: "card_images/4_of_clubs.png"});
allCards.set("C5", {code: "C5", value: 5, suit: "Clubs", index: 16, path: "card_images/5_of_clubs.png"});
allCards.set("C6", {code: "C6", value: 6, suit: "Clubs", index: 17, path: "card_images/6_of_clubs.png"});
allCards.set("C7", {code: "C7", value: 7, suit: "Clubs", index: 18, path: "card_images/7_of_clubs.png"});
allCards.set("C8", {code: "C8", value: 8, suit: "Clubs", index: 19, path: "card_images/8_of_clubs.png"});
allCards.set("C9", {code: "C9", value: 9, suit: "Clubs", index: 20, path: "card_images/9_of_clubs.png"});
allCards.set("C10", {code: "C10", value: 10, suit: "Clubs", index: 21, path: "card_images/10_of_clubs.png"});
allCards.set("CJ", {code: "CJ", value: 11, suit: "Clubs", index: 22, path: "card_images/jack_of_clubs2.png"});
allCards.set("CQ", {code: "CQ", value: 12, suit: "Clubs", index: 23, path: "card_images/queen_of_clubs2.png"});
allCards.set("CK", {code: "CK", value: 13, suit: "Clubs", index: 24, path: "card_images/king_of_clubs2.png"});
allCards.set("CA", {code: "CA", value: 14, suit: "Clubs", index: 25, path: "card_images/ace_of_clubs.png"});

//allCards.set("H1", {code: "H1", value: 1, suit: "Hearts"});
allCards.set("H2", {code: "H2", value: 2, suit: "Hearts", index: 26, path: "card_images/2_of_hearts.png"});
allCards.set("H3", {code: "H3", value: 3, suit: "Hearts", index: 27, path: "card_images/3_of_hearts.png"});
allCards.set("H4", {code: "H4", value: 4, suit: "Hearts", index: 28, path: "card_images/4_of_hearts.png"});
allCards.set("H5", {code: "H5", value: 5, suit: "Hearts", index: 29, path: "card_images/5_of_hearts.png"});
allCards.set("H6", {code: "H6", value: 6, suit: "Hearts", index: 30, path: "card_images/6_of_hearts.png"});
allCards.set("H7", {code: "H7", value: 7, suit: "Hearts", index: 31, path: "card_images/7_of_hearts.png"});
allCards.set("H8", {code: "H8", value: 8, suit: "Hearts", index: 32, path: "card_images/8_of_hearts.png"});
allCards.set("H9", {code: "H9", value: 9, suit: "Hearts", index: 33, path: "card_images/9_of_hearts.png"});
allCards.set("H10", {code: "H10", value: 10, suit: "Hearts", index: 34, path: "card_images/10_of_hearts.png"});
allCards.set("HJ", {code: "HJ", value: 11, suit: "Hearts", index: 35, path: "card_images/jack_of_hearts2.png"});
allCards.set("HQ", {code: "HQ", value: 12, suit: "Hearts", index: 36, path: "card_images/queen_of_hearts2.png"});
allCards.set("HK", {code: "HK", value: 13, suit: "Hearts", index: 37, path: "card_images/king_of_hearts2.png"});
allCards.set("HA", {code: "HA", value: 14, suit: "Hearts", index: 38, path: "card_images/ace_of_hearts.png"});

//allCards.set("D1", {code: "D1", value: 1, suit: "Diamonds"});
allCards.set("D2", {code: "D2", value: 2, suit: "Diamonds", index: 39, path: "card_images/2_of_diamonds.png"});
allCards.set("D3", {code: "D3", value: 3, suit: "Diamonds", index: 40, path: "card_images/3_of_diamonds.png"});
allCards.set("D4", {code: "D4", value: 4, suit: "Diamonds", index: 41, path: "card_images/4_of_diamonds.png"});
allCards.set("D5", {code: "D5", value: 5, suit: "Diamonds", index: 42, path: "card_images/5_of_diamonds.png"});
allCards.set("D6", {code: "D6", value: 6, suit: "Diamonds", index: 43, path: "card_images/6_of_diamonds.png"});
allCards.set("D7", {code: "D7", value: 7, suit: "Diamonds", index: 44, path: "card_images/7_of_diamonds.png"});
allCards.set("D8", {code: "D8", value: 8, suit: "Diamonds", index: 45, path: "card_images/8_of_diamonds.png"});
allCards.set("D9", {code: "D9", value: 9, suit: "Diamonds", index: 46, path: "card_images/9_of_diamonds.png"});
allCards.set("D10", {code: "D10", value: 10, suit: "Diamonds", index: 47, path: "card_images/10_of_diamonds.png"});
allCards.set("DJ", {code: "DJ", value: 11, suit: "Diamonds", index: 48, path: "card_images/jack_of_diamonds2.png"});
allCards.set("DQ", {code: "DQ", value: 12, suit: "Diamonds", index: 49, path: "card_images/queen_of_diamonds2.png"});
allCards.set("DK", {code: "DK", value: 13, suit: "Diamonds", index: 50, path: "card_images/king_of_diamonds2.png"});
allCards.set("DA", {code: "DA", value: 14, suit: "Diamonds", index: 51, path: "card_images/ace_of_diamonds.png"});

function checkWin(players) {
    if (players.length <= 0) {
        // ???
        return undefined;
    }
    let winners = [players[0]];
    let j = 0;
    for (let i = 1; i < players.length; i++) {
        if (players[i].bestHand.value < winners[0].bestHand.value) {
            // Better tier of hand
            winners = [players[i]];
        }
        else if (players[i].bestHand.value === winners[0].bestHand.value) {
            // Same tier of hand, must look further at any tiebreakers
            j = 0;
            // Iterate through both players until first different card is found
            while (j < players[i].bestHand.cards.length && players[i].bestHand.cards[j].value === winners[0].bestHand.cards[j].value) {
                j++;
            }

            // Same exact hand, split (tie)
            if (j === players[i].bestHand.cards.length) {
                winners.push(players[i]);
            }
            else if (players[i].bestHand.cards[j].value > winners[0].bestHand.cards[j].value) {
                // Tiebreaker determines that this hand is better than previous best hand
                winners = [players[i]];
            }
        }
    }
    
    // Only win if there is one winner
    if (winners.length === 1) {
        winners[0].wins += 1;
    }
    else if (winners.length > 1) {
        for (let i = 0; i < winners.length; i++) {
            winners[i].ties += 1;
        }
    }
    

    return winners;
}

/*  players: list of players
    combos: list of card combinations to count

    this function simulates every card combination possible determined by combos and calculates what the win percentage of each player in players

*/
export function simulate(players, tableCards) {
    if (players.length <= 0) {
        // players should be at least length 1
        return undefined;
    }

    for (let i = 0; i < tableCards.length; i++) {
        for (let j = 0; j < players.length; j++) {
            mergeHand(players[j].cards, tableCards[i])
        }
    }

    let runs = 0;

    let combos = []
    if (tableCards.length == 0) {
        combos = fiveCards;
    }
    else if (tableCards.length == 3) {
        combos = twoCards;
    }
    else if (tableCards.length == 4) {
        combos = oneCards;
    }

    
    let ignoreCards = new Set();
    for (let i = 0; i < players.length; i++) {
        players[i].wins = 0;
        players[i].ties = 0;
        for (let j = 0; j < players[i].cards.length; j++) {
            ignoreCards.add(players[i].cards[j].code);
        }
    }

    let tempCards;
    for (let i = 0; i < combos.length; i++) {
        if (!(ignored(ignoreCards, combos[i]))) {
            for (let j = 0; j < players.length; j++) {
                tempCards = players[j].cards.slice();
                for (let k = 0; k < combos[i].length; k++) {
                    mergeHand(tempCards, allCards.get(combos[i][k]));
                }
                
                players[j].bestHand = calcBestHand(tempCards);
                
            }

            checkWin(players);

            runs++;
        }
    }

    if (tableCards.length == 5) {
        for (let i = 0; i < players.length; i++) {
            players[i].bestHand = calcBestHand(players[i].cards.slice())
        }
        checkWin(players);
        runs++;
    }

    // Compute the win and tie percentages for each player
    for (let i = 0; i < players.length; i++) {
        players[i].wins = (100 * (players[i].wins / runs)).toFixed(2) + '%';
        players[i].ties = (100 * (players[i].ties / runs)).toFixed(2) + '%';
    }
}

/*  ignoreCards: a list of cards that should be ignored
    cards: a card combination

    will return true if the card combination cards has a card(s) that is in ignoreCards
    will return false otherwise (ignoreCards and cards are disjoint sets)
*/
function ignored(ignoreCards, cards) {
    for (let i = 0; i < cards.length; i++) {
        if (ignoreCards.has(cards[i])) {
            return true;
        }
    }

    return false;
}

// Adds a new card to a player's available hand in nonincreasing order
export function mergeHand(cards, newCard) {
    // Ace can be highest or lewest card in straight, so append a 1 value card to the end
    if (newCard.value === 14) {
        cards.push(allCards.get(newCard.code.charAt(0) + "1"));
        cards.unshift(newCard);
    } 
    else {
        // Insert card into player's hand in nonincreasing order
        for (let i = 0; i < cards.length; i++) {
            if (newCard.value > cards[i].value) {
                cards.splice(i,0,newCard);
                return;
            }
        }
        // Card is first card to be merged into the hand
        cards.push(newCard);
    }
    
}

// Calculates the best hand a player has based on the current cards available; updates the player's bestHand field
function calcBestHand(cards) {
    // Need to check for possible straight flush, so do a preemptive search for a suit to prioritize when constructing a straight hand
    let retFlush = checkFlush(cards);
    let retStraight;
    
    if (retFlush !== undefined) {
        // Check for straight, with possibility of straight flush
        retStraight = checkStraight(cards, retFlush[0].suit, 0);
        if (retStraight !== undefined) {
            // Formally check for straight flush
            let retFlush2 = checkFlush(retStraight);
            if (retFlush2 !== undefined) {
                // Straight flush
                return {value: hands.STRAIGHTFLUSH, cards: retStraight};
            }
            else {
                // No straight flush, so flush is highest hand
                return {value: hands.FLUSH, cards: retFlush};
            }
        }
        else {
            // No straight, so flush is highest hand
            return {value: hands.FLUSH, cards: retFlush};
        }
    }
    else {
        // Check for straight, no possible straight flush
        retStraight = checkStraight(cards, "", 0);
        if (retStraight !== undefined) {
            // Straight is best hand since flush not detected
            return {value: hands.STRAIGHT, cards: retStraight};
        }
        else {
            // No straight or flush; check for fours, threes, pairs, or high card
            let retDups = checkDups(cards);
            return {value: retDups[0], cards: retDups[1]};
        }
    }
}

// Returns undefined if straight detected, returns straight cards if straight detected
function checkStraight(cards, suit, index) {
    // Straight is minimum length 5
    if (cards.length - index < 5) {
        return undefined;
    }

    let bound = index + 4;
    let hand = [];
    let tempSwitch;

    // Iterate over next 5 cards
    for (let i = index; i < bound; i++) {
        // Skip over any duplicates
        while (i + 1 < cards.length && cards[i].value === cards[i + 1].value) {
            // Prioritize the suit passed into this function; move priority suit to front
            if (cards[i].suit == suit) {
                tempSwitch = cards[i + 1];
                cards[i + 1] = cards[i];
                cards[i] = tempSwitch;
            }

            i += 1;
            bound += 1;

            // Not enough cards to make a straight
            if (bound >= cards.length) {
                return undefined;
            }
        }
        
        if (i + 1 < cards.length && cards[i].value !== cards[i + 1].value + 1) {
            // Not a straight, so check next 5 cards
            return checkStraight(cards, suit, index + 1);
        }
        
        // Push each card into straight hand
        hand.push(cards[i]);
    }
    
    // Push last card into straight hand
    hand.push(cards[bound]);

    return hand;
}

// Returns undefined if no flush detected, returns flush cards if flush detected
function checkFlush(cards) {
    // Flushes are a minimum length 5
    if (cards.length < 5) {
        return undefined;
    }

    let flushes = new Map();
    flushes.set("Spades", []);
    flushes.set("Diamonds", []);
    flushes.set("Hearts", []);
    flushes.set("Clubs", []);

    let aceCheck = false;

    // Count how many cards in each suit
    for (let i = 0; i < cards.length; i++) {
        // If there is an Ace with value 14, ignore any cards with value 1
        if (cards[i].value === 14) {
            aceCheck = true;
        }

        // Don't count ace duplicates
        if (!(cards[i].value === 1 && aceCheck)) {
            flushes.get(cards[i].suit).push(cards[i]);
        }
    }

    // Look for any suit that has flush
    for (let e of flushes.entries()) {
        if (e[1].length >= 5) {
            // Pop any unnecessary cards (only need 5 cards to make flush)
            while (e[1].length > 5) {
                e[1].pop();
            }

            return e[1];
        }
    }

    return undefined;
}

// Check cards for four of kind, three of kinds, or any pairs; will return a list consisting of the hand enum and a list of the best hand detected
function checkDups(cards) {
    let four = [];
    let three = [];
    let two = [];

    let i = 0;
    let ret;
    while (i < cards.length) {
        ret = helpDup(cards.slice(i + 1), cards[i].value, [cards[i]]);
        if (ret.length === 4) {
            four.push(ret);
        }
        else if (ret.length === 3) {
            three.push(ret);
        }
        else if (ret.length === 2) {
            two.push(ret);
        }
        i += ret.length;
    }

    if (four.length > 0) {
        // 4 of a kind cannot have ties, so no need to pad the hand
        return [hands.FOUR, four[0]];
    }
    else if (three.length > 0) {
        // Checking for full house...
        if (three.length == 1) {
            // Find pair
            if (two.length > 0) {
                return [hands.FULLHOUSE, three[0].concat(two[0])];
            }
            else {
                // No pairs, only three of kind, pad the hand 2 times
                return [hands.THREE, padDups(cards, padDups(cards, three[0]))];
            }
        }
        else if (three.length == 2) {
            // There is another three of kind, so check if that can complete a higher order full house
            if (two.length > 0) {
                if (three[1][0].value > two[0][0].value) {
                    // The other three of kind has higher value
                    three[0].push(three[1][0], three[1][1]);
                    return [hands.FULLHOUSE, three[0]];
                }
                else {
                    // A pair has higher value
                    three[0].push(two[0][0], two[0][1]);
                    return [hands.FULLHOUSE, three[0]];
                }
            }
            else {
                // No pairs, so just add in two of the other three of kind cards
                three[0].push(three[1][0], three[1][1]);
                return [hands.FULLHOUSE, three[0]];
            }
        }
    }
    else if (two.length > 0) {
        // Has pair(s); either one pair or two pair
        if (two.length >= 2) {
            // Two pair detected, 4 cards, so pad the hand one time
            return [hands.TWOPAIR, padDups(cards, two[0].concat(two[1]))];
        }
        else {
            // One pair detected, only 2 cards, so pad the hand 3 times
            return [hands.PAIR, padDups(cards, padDups(cards, padDups(cards, two[0])))];
        }
    }
    else {
        // Best hand is high card, return highest value card
        let i = 0;
        let ret = [];
        while (i < cards.length && i < 5) {
            ret.push(cards[i]);
            i++;
        }
        return [hands.HIGH, ret];
    }
}

// Helps find duplicate cards (four of kind, three of kind, pairs); will return a list of duplicate cards
function helpDup(cards, value, acc) {
    // Aces have two values: 14 and 1; if this hand had aces, then the ace duplicates have already been processed at the beginning with value 14
    if (value === 1) {
        return acc;
    }

    // base case - empty hand
    if (cards.length <= 0) {
        return acc;
    }

    // recursively finds a noncontiguous sequence of duplicate cards
    if (value === cards[0].value) {
        acc.push(cards[0]);
        return helpDup(cards.slice(1), value, acc);
    }
    else {
        return acc;
    }
}

// For tie breaker purposes, each bestHand should have 5 cards, so padDups finds the highest order card that's not part dups to pad the hand
function padDups(cards, dups) {
    let i = 0;
    while (i < cards.length) {
        if (dups.indexOf(cards[i]) === -1) {
            dups.push(cards[i]);
            return dups;
        }

        i++;
    }

    return dups;
}

// ******************************************************************************************************************************************************************

let keyList = [];
for (let e of allCards.keys()) {
    keyList.push(e);
}

allCards.set("S1", {code: "S1", value: 1, suit: "Spades"});
allCards.set("H1", {code: "H1", value: 1, suit: "Hearts"});
allCards.set("C1", {code: "C1", value: 1, suit: "Clubs"});
allCards.set("D1", {code: "D1", value: 1, suit: "Diamonds"});

const combinations = (n, k) => {
    const combos = [];
    
    let head, tail;
    
    if (k === 1) {
        return n;
    }

    for (let i = 0; i < n.length; i++) {
        head = n.slice(i, i + 1);

        tail = combinations(n.slice(i + 1), k - 1);

        for (let j = 0; j < tail.length; j++) {
            let combo = head.concat(tail[j]);
            combos.push(combo);
        }
    }

    return combos; 
}


let fiveCards = combinations(keyList, 5);
let twoCards = combinations(keyList, 2);

let oneCards = []
for (let e of allCards.keys()) {
    oneCards.push([e]);
}

//console.log("Start");

/*
    Card Object

    code: string representation
    value: number
    suit: string
*/

/*
    Player Object

    hand: card array of player's hand (two cards)
    cards: card array of hand+table cards
    bestHand: place to store bestHands (only used for probability)
    wins: number of wins (only used for probability)
    ties: number of ties (used for probability)

*/

/*
    Hand Object
    value: hierarchy value
    cards: best hand cards
*/

/* 
    SQL SERVER INFO:
    database name: poker_combinations
    table names:
        five_cards
        two_cards
        one_card
*/

/*
let player = {cards: [], bestHand: undefined, wins: 0};
mergeHand(player.cards,allCards.get("CK"));
mergeHand(player.cards,allCards.get("SA"));


let player2 = {cards: [], bestHand: undefined, wins: 0};
mergeHand(player2.cards,allCards.get("DA"));
mergeHand(player2.cards,allCards.get("CQ"));




let players = [player, player2];
simulate(players, fiveCards);
console.log(player);
console.log(player2);
*/

