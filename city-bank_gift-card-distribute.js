// This file has created and written by SR TAMIM

/*
‘City Bank’ is planning gifts for the newly registered credit user on this International
`Mother Language Day` from 21 February to 28 February. They need to distribute the card to
their user. You need to help to generate their card number and gift.

You will have to take each person's info to register them. For creating their card number:
    1. take first 2 characters from the district name and make it capital letter.
        Example-from Dhaka , take DH,
    2. From current year pick last two number
    3. Concat first two numbers of the user postal number.
    4. Add user birthdate 4 digit year
    5. After that generate serial number with padding 0 in left from each user
    6. Total character length will be 16
Create a function named ‘cardDistribution()’ which will take an array of objects. Each
object will have each person's information. (You must use exact function name, or your
test case may fail)
While distributing sort data alphabetically with fist characters. Sort them with priority
numbers. If the user has priority number 1 will be given first.
If the last number of the card is even, give the user Red Rose , if odd give white Rose.
    R = red rose
    W = white rose
*/

function cardDistribution(users) {
    const giftCards = users.map((user, index) => {
        const serialNo = index + 1
        const { birthYear, currentYear, district, postNo, priority } = user
        const currentYearString = currentYear.toString()
        const postNoString = postNo.toString()
        function addZeroes() {
            const remainingLength = 6 - serialNo.toString().length
            let zeroes = ''
            for (let i = 0; i < remainingLength; i++) { zeroes += '0' }
            return zeroes
        }
        return {
            cardNumber: district.substring(0, 2).toUpperCase() +
                currentYearString.substring(currentYearString.length - 2) +
                postNoString.substring(0, 2) + birthYear + addZeroes() + serialNo,
            gift: serialNo % 2 ? 'W' : 'R',
            priority

        }
    })

    const sortedCards = giftCards.sort((a, b) => a.priority > b.priority ? 1 :
        b.priority > a.priority ? -1 :
            (a.cardNumber > b.cardNumber) ? 1 :
                (b.cardNumber > a.cardNumber) ? -1 : 0)

    return sortedCards
}