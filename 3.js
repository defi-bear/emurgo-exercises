/**
 * 
 * @param {
 *  accountId : string
 *  amount: number
 * } closingAccounts 
 * @param {
 *  accountId: string
 *  credit: number
 * } recipientAccounts 
 * @returns {
 *  transfers: [
 *      [fromAccountId, toAccountId, value],
 *  ],
 *  operationalFee: number,
 * }
 */

function newRebalancingTx(closingAccounts, recipientAccounts) {
    let totalAmount = 0;
    let totalCredit = recipientAccounts.length * 10;
    for (let i = 0; i < closingAccounts.length; i++) {
        totalAmount += closingAccounts[i].amount;
    }
    for (let i = 0; i < recipientAccounts.length; i++) {
        totalCredit += recipientAccounts[i].credit;
    }
    console.log(totalAmount, totalCredit)
    if (totalAmount < totalCredit) {
        console.log("Not enough funds for rebalance");
        return;
    }

    const transfers = [];
    let currentRecipent = 0;
    for (let i = 0; i < closingAccounts.length; i++) {

        if (currentRecipent === recipientAccounts.length) {
            transfers.push([
                closingAccounts[i].accountId,
                null,
                closingAccounts[i].amount - 10
            ]);
        } else {
            while (closingAccounts[i].amount > 0) {
                if (currentRecipent === recipientAccounts.length) {
                    transfers.push([
                        closingAccounts[i].accountId,
                        null,
                        closingAccounts[i].amount - 10
                    ]);
                    break;
                }
                const value = Math.min(closingAccounts[i].amount, recipientAccounts[currentRecipent].credit + 10);
                transfers.push([
                    closingAccounts[i].accountId,
                    recipientAccounts[currentRecipent].accountId,
                    value - 10
                ]);

                closingAccounts[i].amount = closingAccounts[i].amount - value;
                recipientAccounts[currentRecipent].credit = recipientAccounts[currentRecipent].credit - value + 10;
                if (recipientAccounts[currentRecipent].credit === 0) {
                    currentRecipent++;
                }
            }
        }
    }

    const returnValue = {
        transfers,
        operationalFee: transfers.length * 10
    }

    console.log(returnValue);
    return returnValue;
}

newRebalancingTx(
    [{accountId: 'acc1', amount: 950}, {accountId: 'acc1', amount: 500}],
    [{accountId: 'rec1', credit: 400}, {accountId: 'rec2', credit: 530}]
)