import 'bulma/css/bulma.css';
import { useState } from 'react';
import Web3 from 'web3';
const VMachine = () => {

    const [connectionErr,setconnectionErr]=useState('')
    let web3;
    const connectWalletHandler =async ()=>{
        if(typeof window !=='undefined' && typeof window.ethereum !=='undefined') {
            //
            try {

                await window.ethereum.request({method: "eth_requestAccounts"});
                web3= new Web3(window.ethereum);

            }
            catch(err) {
                setconnectionErr(err.message)

            }
           
        }

            else {

                setconnectionErr("Please install meta mask")
            }
        
    }



    return ( 
        <div>
        <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                    <div className="content">
                    <h1>Vending Machine dApp</h1>
                    <p>placeHolder Text...</p>
                    
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