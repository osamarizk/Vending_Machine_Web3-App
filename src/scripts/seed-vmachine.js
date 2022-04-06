// Contract
const VendingMachine = artifacts.require("VendingMachine")
//eth value
const ether = (n) => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )
}
module.exports = async function (callback) {
  try {
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()
    // Fetch the deployed ETHPool Token
    const vendingmachine = await VendingMachine.deployed()
    console.log('VendingMachine Address fetched', vendingmachine.address)
    // get Address of buyers
    const buyer = accounts[0]
    //const receiver =accounts[1]
    const Owner = '0xCFf57279628333c6659882944b48111AAcAa9110'
    console.log('Reciever Address fetched', Owner)
    let amount = web3.utils.toWei('0.1', 'ether') 

    // get Inventory Balance
    console.log(`Inventory Balance : ${await vendingmachine.getInventoryBalance()} donuts `);
    // get Buyer Balance
    console.log(`Buyer Balance : ${await vendingmachine.VMBalances(buyer)} donuts ` );

    // // Purchase 1 Donuts

    const donutsQt=1;
    //await vendingmachine.purchase(donutsQt,{from:accounts[0] , to:Owner});
    await vendingmachine.purchase(donutsQt,{
      from:accounts[0],
      value:web3.utils.toWei('0.1','ether') * donutsQt,
      to:Owner
  });
  // get Inventory Balance
  console.log(`Inventory Balance after purchase : ${await vendingmachine.getInventoryBalance()} donuts `);
  // get Buyer Balance
  console.log(`Buyer Balance : ${await vendingmachine.VMBalances(buyer)} donuts ` );


    // await ethpool.deposit(receiver, amount, { from: sender })
    // console.log(`Transferred ${amount} ether from ${sender} to ${receiver}`)
    // // get Total ETHPool
    // let totalEth = await ethpool.totalEth()
    // console.log(`Total ETH at the Pool ${totalEth} `)

  }
  catch (error) {
    console.log(error)
  }

  callback()
}
