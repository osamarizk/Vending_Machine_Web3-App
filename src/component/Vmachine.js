import 'bulma/css/bulma.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import VMContract from '../abis/VendingMachine.json'
const VMachine = () => {

    const [connectionErr,setconnectionErr]=useState('')
    const [inventory,setInventory]=useState('');
    const [myDonuts,setMyDonuts]=useState('');
    let web3;
    web3= new Web3(window.ethereum);
    const vmContract = new web3.eth.Contract(VMContract.abi, '0xCFf57279628333c6659882944b48111AAcAa9110')
    const connectWalletHandler =async ()=>{
        if(typeof window !=='undefined' && typeof window.ethereum !=='undefined') {
            //
            try {
                await window.ethereum.request({method: "eth_requestAccounts"});
                myDonutsHandler()
            }
            catch(err) {
                setconnectionErr(err.message)
            }
           
        }
            else {

                setconnectionErr("Please install meta mask")
            }
    }

    const inventoryHandler= async() => {
        try {
            const inventory =await vmContract.methods.getInventoryBalance().call();
            setInventory(inventory);

        }
        catch (err) {
            setconnectionErr(err.message)

        }
    }

    const myDonutsHandler = async()=> {
        try {
            //const accounts=  await web3.eth.getAccounts();
           const count= await vmContract.methods.getBuyerBalance().call();
            //console.log(accounts[0]);
           // console.log(count);
            setMyDonuts(count);

        }
        catch(err) {
            setconnectionErr(err.message)
        }
        
    }
    
    useEffect (()=>{
        inventoryHandler();

    },[])



    return ( 
        <div>
        <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                    <div className="content">
                    <h1>Vending Machine dApp</h1>
                    <p>Vending Machine Inventory : {inventory}</p>
                    <p>My Donuts : {myDonuts}</p>
                    
                    <p>{connectionErr}</p>
                    
                    </div>
                    
                </div>
                <div className="navbar-end">
                    <button onClick={connectWalletHandler} className='button is-primary'  >Connect Wallet</button>
                </div>
            </div>
            
        </nav>

        <section >
            <div className='container has-text-danger'>
           
            </div>
            

        </section>

       

              

     
        
        </div>
     );
}
 
export default VMachine;