import 'bulma/css/bulma.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import VMContract from '../abis/VendingMachine.json'
const VMachine = () => {

    const [Err,setErr]=useState('')
    const [inventory,setInventory]=useState('');
    const [myDonuts,setMyDonuts]=useState('');
    const[donutsQt,setdonutsQt]=useState('');
    const [success,setSuccess]=useState('');
   
    let web3;
    web3= new Web3(window.ethereum);
    const vmContract = new web3.eth.Contract(VMContract.abi, '0xCFf57279628333c6659882944b48111AAcAa9110')
    

    const connectWalletHandler =async ()=>{

        if(typeof window !=='undefined' && typeof window.ethereum !=='undefined') {
            //
            try {
                await window.ethereum.request({method: "eth_requestAccounts"});
               
               // myDonutsHandler()
            }
            catch(err) {
                setErr(err.message)
            }
           
        }
            else {

                setErr("Please install meta mask")
            }
    }
    const inventoryHandler= async() => {
        try {
            const inventory =await vmContract.methods.getInventoryBalance().call();
            setInventory(inventory);

        }
        catch (err) {
            setErr(err.message)

        }
    }

    const myDonutsHandler = async()=> {
        try {
            const accounts=  await web3.eth.getAccounts();
            console.log(accounts[0])
           const count= await vmContract.methods.VMBalances(accounts[0]).call();
           console.log(count)
            setMyDonuts(count);

        }
        catch(err) {
            setErr(err.message)
        }
        
    }
    
    const donutsChangeHandler = (event) =>{
        setdonutsQt(event.target.value)
    }

    const buyDonutsHandler = async() =>{
        try {
            const accounts=  await web3.eth.getAccounts();
            await vmContract.methods.purchase(donutsQt).send({
                from:accounts[0],
                value:web3.utils.toWei('0.1','ether') * donutsQt
            });

            setSuccess(`${donutsQt} : are purchased`)
            inventoryHandler();
            myDonutsHandler();
            
        }
        catch (err) {
            setErr(err.message)
        }
       


    }
    useEffect (async()=>{
        if(vmContract) inventoryHandler();
        const addresses=  await web3.eth.getAccounts();
        if(addresses[0])  myDonutsHandler();
    },[
        
    ])



    return ( 
        <div>
        <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                    <div className="content">
                    <h1>Vending Machine dApp</h1>
                    <p>Vending Machine Inventory : {inventory}</p>
                    <p>My Donuts : {myDonuts}</p>
                    <p>{Err}</p>
                    <p>{success}</p>

                    <div className="field">
                        <label className="label"> buy Donuts </label>
                        <div className="control">
                            <input type="text" onChange={donutsChangeHandler} className="input" placeholder='Enter Amount..' />
                        </div>
                        <button className='button is-primary' onClick={buyDonutsHandler} >Buy </button>

                        </div>

                   
                    
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