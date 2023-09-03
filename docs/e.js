function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
window.addEventListener('load',async function()
{
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); }, 3000);
}, false);




async function basetrip()
{
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.Web3Provider(window.ethereum);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		signer = provider.getSigner()
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		window.location.reload
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

VEABI = [{"inputs":[{"internalType":"address","name":"token_addr","type":"address"},{"internalType":"address","name":"art_proxy","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"locktime","type":"uint256"},{"indexed":false,"internalType":"enum VotingEscrow.DepositType","name":"deposit_type","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"supply","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DELEGATES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"abstain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"attach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attachments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"balanceOfAtNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"balanceOfNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"balanceOfNFTAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"block_number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkpoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"create_lock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"create_lock_for","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"deposit_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"detach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotesIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"get_last_user_slope","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"increase_unlock_time","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"isApprovedOrOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locked","outputs":[{"internalType":"int128","name":"amount","type":"int128"},{"internalType":"uint256","name":"end","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"locked__end","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"merge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownership_change","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_proxy","type":"address"}],"name":"setArtProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_team","type":"address"}],"name":"setTeam","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"setVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"slope_changes","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"split","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"team","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_tokenIndex","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"t","type":"uint256"}],"name":"totalSupplyAtT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_idx","type":"uint256"}],"name":"user_point_history__ts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

VMABI = [{"inputs":[{"internalType":"address","name":"ve","type":"address"},{"internalType":"address","name":"e","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"","type":"address"},{"indexed":true,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Deposit","type":"event"},{"inputs":[],"name":"ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"converted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eTHENA","outputs":[{"internalType":"contract IeTHENA","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"uint256","name":"_a","type":"uint256"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"d","type":"address"}],"name":"setDAO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"setID","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplied","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veTHE","outputs":[{"internalType":"contract IVotingEscrow","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

VLENDRABI = [{"inputs": [{"internalType": "address","name": "_rebase","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "rte","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "col","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "bor","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "Borrowed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "raw","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shr","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "DepositBase","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "raw","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shr","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "DepositVe","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "rte","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "cte","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "bor","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "Payment","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "raw","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shr","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "WithdrawBase","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "raw","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shr","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "WithdrawVe","type": "event"},{"inputs": [],"name": "RATE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "base","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "base_deposits_total","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_bamt","type": "uint256"}],"name": "borrow","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "borrowMax","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "borrowable","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "borrowed","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "borrowings","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_wa","type": "uint256"}],"name": "call","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "callAll","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "collateral","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "collaterals","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "corpus","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "customCall","outputs": [{"internalType": "bytes","name": "","type": "bytes"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_inc","type": "uint256"}],"name": "deposit_base","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "deposit_ve","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_u","type": "address"}],"name": "info","outputs": [{"internalType": "uint256[16]","name": "","type": "uint256[16]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "initialize","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_inc","type": "uint256"}],"name": "inject_base","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_inc","type": "uint256"}],"name": "lend","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "lendAll","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_who","type": "address"}],"name": "maxBorrowable","outputs": [{"internalType": "uint256","name": "_bmt","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "onERC721Received","outputs": [{"internalType": "bytes4","name": "","type": "bytes4"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "pledge","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "price_wrapped_base","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "price_wrapped_ve","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_wa","type": "uint256"}],"name": "redeem","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "redeemAll","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "repay","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_r","type": "uint256"}],"name": "setRate","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "ve","outputs": [{"internalType": "contract IVe","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "ve_id","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "ve_rebase","outputs": [{"internalType": "contract IRebase","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "voter","outputs": [{"internalType": "contract IVoter","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_wa","type": "uint256"}],"name": "withdraw_base","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_wa","type": "uint256"}],"name": "withdraw_ve","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "wrapped_base","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "wrapped_ve","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"}];

async function gubs() {
	ve = new ethers.Contract(VE, VEABI, provider);
	bal = await ve.balanceOf(window.ethereum.selectedAddress);
	if (bal == 0) $("nft-bal").innerHTML = "No NFTs owned!";
	else {
	  $("nft-bal").innerHTML = `${bal} ${VE_NAME}`;
	  nid=[];
	  for(i=0;i<bal;i++) {
	  	nid[i]=ve.tokenOfOwnerByIndex(window.ethereum.selectedAddress,i);
	  }
	  nids = await Promise.all(nid);
	  balid = [];
	  for(i=0;i<bal;i++) {
	  	balid[i]=ve.locked(Number(nids[i]));
	  }
	  balids = await Promise.all(balid);
	  $("nft-sel").innerHTML = '<option value="" selected>Choose a NFT</option>';
	  for(i=0;i<bal;i++) {
	  	$("nft-sel").innerHTML += `
	  	  <option value='${nids[i]}'>#${nids[i]} : ${fornum(Number(balids[i][0]),18)} </option>
	  	`
	  }
	}
}

async function quote() {
	_id = $("nft-sel").value;
	ve = new ethers.Contract(VENFT,VEABI,provider);
	vl = new ethers.Contract(VLENDR,VLENDRABI,provider);
	qd = await Promise.all([
		ve.locked(_id),
		vl.info(window.ethereum.selectedAddress)
	]);
	console.log("sell.quoted: ",qd);
	_inc = Number(qd[0].amount);
	_pwv = Number(qd[1][7]);
	_amt = _inc / _pwv * 1e18;
	console.log("quoted: ",qd);

	$("nft-offer").innerHTML = fornum(_amt,18) + " " + W_VE_NAME;
}

function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
}

async function dexstats() {
	typeof window.ethereum == 'undefined'
		? fetchInfo('0x0000000000000000000000000000000000000000')
		: typeof window.ethereum.selectedAddress == 'null'
			? fetchInfo('0x0000000000000000000000000000000000000000')
			: fetchInfo(window.ethereum.selectedAddress)
	return;
}

async function fetchInfo(_a) {
	VL = new ethers.Contract(VLENDR,VLENDRABI,_a=='0x0000000000000000000000000000000000000000'?provider:signer);
	_info = await VL.info(_a);

/*


		_info[0 ] = RATE;
		_info[1 ] = ve_id;

		_info[2 ] = base_deposits_total;
		_info[3 ] = corpus();

		_info[4 ] = borrowed;
		_info[5 ] = collateral;

		_info[6 ] = price_wrapped_base();
		_info[7 ] = price_wrapped_ve();

		_info[8 ] = borrowable();

		_info[9 ] = base.balanceOf(_u);
		_info[10] = ve.balanceOf(_u);
		_info[11] = wrapped_base.balanceOf(_u);
		_info[12] = wrapped_ve.balanceOf(_u);

		_info[13] = borrowings[_u];
		_info[14] = collaterals[_u];

		_info[15] = maxBorrowable(_u);

		_info[16] = BasePrice();

*/

	$("met-lend-tvl").innerHTML = ( Number(_info[2]) / 1e18 ).toLocaleString() + " " + BASE_NAME;

	$("met-ple-tvl").innerHTML = ( Number(_info[3]) / 1e18 ).toLocaleString() + " " + VE_NAME;

	$("met-borr-avl").innerHTML = ( Number(_info[8]) / 1e18 ).toLocaleString() + " " + BASE_NAME;
	$("met-borr-lent").innerHTML = ( Number(_info[4]) / 1e18 ).toLocaleString() + " " + BASE_NAME;
	$("met-borr-ltv").innerHTML = ( 1e18 / ( Number(_info[0]) * Number(_info[7]) / Number(_info[6]) ) * 100 ).toLocaleString() + "%";


	if( _a != '0x0000000000000000000000000000000000000000') {
		$("avl-lend-bbal").innerHTML = ( Number(_info[9]) / 1e18 ).toLocaleString() + " " + BASE_NAME;
		$("avl-call-wbbal").innerHTML = ( Number(_info[11]) / 1e18 ).toLocaleString() + " " + BASE_NAME;

		$("avl-repay-bmax").innerHTML = ( Number(_info[15]) / 1e18 ).toLocaleString() + " " + BASE_NAME;
		$("avl-repay-borr").innerHTML = ( Number(_info[13]) / 1e18 ).toLocaleString() + " " + BASE_NAME;
		$("avl-repay-coll").innerHTML = ( Number(_info[14]) / 1e18 ).toLocaleString() + " " + W_VE_NAME;
		$("avl-repay-hf").innerHTML = Number(_info[13]) > 0 ? ( Number(_info[14]) * Number(_info[7]) / Number(_info[13]) / 1e18 ).toFixed(4) : "You are Debt-Free.";

	}


}









async function pledge() {
	_id = $("nft-sel").value;
	ve = new ethers.Contract(VENFT, VEABI, signer);
	vl = new ethers.Contract(VLENDR,VLENDRABI,signer);
	alvo = await Promise.all([
		ve.isApprovedOrOwner(VLENDR,_id),
		ve.voted(_id)
	]);
	console.log("alvo: ",alvo);
	if(alvo[0]==false) {
		notice(`
			<h3>Approval required</h3>
			Depositor requires your approval to complete this conversion.<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await ve.approve(VLENDR,_id);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br><br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the Trade at your wallet provider now.
		`);
	}
	if(alvo[1]==true) {
		notice(`
			<h3>Vote-Reset required</h3>
			Depositor requires your veNFT to be in a non-voted state to complete this conversion.
			<br><br>
			Resetting your Votes..
			<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		voter = new ethers.Contract(VOTER, ["function reset(uint)"], signer);
		let _tr = await voter.reset(_id);
		console.log(_tr);
		notice(`
			<h3>Submitting Vote-Reset Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Vote-Reset Completed!</h3>
			<br><br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the Trade at your wallet provider now.
		`);
	}
	qd = await Promise.all([
		ve.locked(_id),
		vl.info(window.ethereum.selectedAddress)
	]);
	console.log("sell.quoted: ",qd);
	_inc = Number(qd[0].amount);
	_pwv = Number(qd[1][7]);
	_amt = _inc / _pwv * 1e18;

	notice(`
		<h3>Pledge Summary</h3>
		<b>Depositing your ${VE_NAME} NFT #${_id} as Collateral.</b>
		<br>You will be issued ${W_VE_NAME} receipt tokens which can be used to take out a ${BASE_NAME} loan against your ${VE_NAME} collaterals.<br>

		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> NFT Token ID: <u>#<b>${_id}</b></u><br>
		<img style='height:20px;position:relative;top:4px' src="img/lock.svg"> Amount Locked: <u>${ fornum(_inc,18).toLocaleString() } ${BASE_NAME}</u><br>
		<b>Expected to Get:</b><br>
		<img style='height:20px;position:relative;top:4px' src="${W_VE_LOGO}"> <u>${ fornum(_amt,18).toLocaleString() } ${W_VE_NAME}</u><br>
		(1 ${W_VE_NAME} = ${(_pwc/1e18).toFixed(4)} ${VE_NAME})<br>
		NOTE: Your veNFT will get Max-Locked!
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await vl.pledge(_id);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<br><h4>Minting ${W_VE_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${W_VE_LOGO}"> <u>${ fornum(_amt,18).toLocaleString() } ${W_VE_NAME}</u><br>
		(1 ${W_VE_NAME} = ${(_pwc/1e18).toFixed(4)} ${VE_NAME})<br><br><br>
		<br><h4>Locking ${VE_NAME} NFT #${_id}</h4>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>veNFT #<b>${_id}</b></u>,<br>Containing <u>${ fornum(_inc,18).toLocaleString() } ${BASE_NAME}</u>.<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		Minted <img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> <u>${fornum(_amt,18)} ${W_VE_NAME}</u> for <img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>veNFT #<b>${_id}</b></u>.
		<br><br>
		These ${W_VE_NAME} tokens are needed to get back your veNFT! Keep them safely!
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`)
	await dexstats();
	await gubs();
}



async function redeem() {

	let amt = 0;
	am = $("inp-redeem").value;
	if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please increase ${W_VE_NAME} amount!</h2>You have entered an invalid or zero amount.<br><br>Your input: ${am}`);return;}
	amt = BigInt(Math.floor(am*1e18));

	w_ve = new ethers.Contract(W_VE, ["function balanceOf(address) public view returns(uint)","function allowance(address,address) public view returns(uint)","function approve(address,uint)"], signer);
	vl = new ethers.Contract(VLENDR,VLENDRABI,signer);

	notice(`
		<h3>Redeeming ${W_VE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${fornum(amt,18).toLocaleString()} ${W_VE_NAME}</u>
		<br>
		<br>Please confirm the Redeem Transaction at your wallet provider now.
	`);
	let _tr = await vl.redeem(amt);
	console.log(_tr);
	notice(`
		<h3>Redeeming ${W_VE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${fornum(amt,18).toLocaleString()} ${W_VE_NAME}</u>
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Redeemed ${W_VE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${fornum(amt,18).toLocaleString()} ${W_VE_NAME}</u>
		<h3>Minted new ${VE_NAME} NFT</h3>
		NFT ID :
		<br>Locked Amount : ${""} ${BASE_NAME}
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	await gubs();
	await fetchInfo();
}





















async function lend() {

	let amt = 0;
	am = $("inp-lend").value;
	if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please increase ${BASE_NAME} amount!</h2>You have entered an invalid or zero amount.<br><br>Your input: ${am}`);return}
	amt = BigInt(Math.floor(am*1e18));

	base = new ethers.Contract(BASE, ["function balanceOf(address) public view returns(uint)","function allowance(address,address) public view returns(uint)","function approve(address,uint)"], signer);
	alvo = await Promise.all([
		base.allowance(window.ethereum.selectedAddress,VLENDR),
		base.balanceOf(window.ethereum.selectedAddress)
	]);

	console.log("alvo,inp: ",alvo,am);

	if(Number(amt)>Number(alvo[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired:</h3>${amt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${BASE_NAME}.`);}

	if( Number(alvo[0]) < Number(alvo[1]) ) {
		notice(`
			<h3>Approval required</h3>
			We require your ${BASE_NAME} approval to facilitate lending.<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await base.approve(VLENDR,ethers.constants.MaxUint256);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approved ${BASE_NAME}!</h3>
			<br><br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the final Lending Transaction at your wallet provider now.
		`);
	}

	vl = new ethers.Contract(VLENDR,VLENDRABI,signer);
	notice(`
		<h3>Lending ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u><br>
		<br>Please confirm the final Lending Transaction at your wallet provider now.
	`);
	let _tr = await vl.lend(amt);
	console.log(_tr);
	notice(`
		<h3>Lending ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Deposited ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u>
		<h3>Minted ${W_BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(Number(_tw.logs[1].data),18).toLocaleString() } ${W_BASE_NAME}</u><br>
		<br>
		${W_BASE_NAME} tokens are receipt tokens for ${BASE_NAME} lenders.They can be used as ordinary ERC20 assets in other external protocols.
		<br>
		<br><b>${W_BASE_NAME} are required to Withdraw ("Call back your Loan") your original ${BASE_NAME} tokens. Keep them safe!</b>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	//gubs();
	await fetchInfo();
}


async function call() {

	let amt = 0;
	am = $("inp-call").value;
	if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please increase ${W_BASE_NAME} amount!</h2>You have entered an invalid or zero amount.<br><br>Your input: ${am}`);return}
	amt = BigInt(Math.floor(am*1e18));

	base = new ethers.Contract(BASE, ["function balanceOf(address) public view returns(uint)","function allowance(address,address) public view returns(uint)","function approve(address,uint)"], signer);
	vl = new ethers.Contract(VLENDR,VLENDRABI,signer);

	_info = await vl.info(window.ethereum.selectedAddress);
	_wbbal = Number(_info[11]);
	_avail = Number(_info[8 ]);
	_price = Number(_info[6 ]);
	_depos = BigInt(_wbbal) * BigInt(_price) / BigInt(1e18);
	_desir = BigInt(_amt) * BigInt(_price) / BigInt(1e18);
	_wdmax = BigInt(_avail) * BigInt(1e18) / BigInt(_price);

	if( _desir > _avail + 1  ) {
		notice(`
			<h3>Withdrawal Limit Reached!</h3>
			The desired amount of ${fornum(amt,18).toLocaleString()} ${W_BASE_NAME} cannot be redeemed for ${fornum(_desir,18).toLocaleString()} ${BASE_NAME} at the moment due to unavailability of ${BASE_NAME}, as it has been borrowed by ${VE_NAME} depositors.
			<h4>Please try after some time.</h4>
			<b>Your Lending Postion:</b>
			<br>${fornum(_depos,18).toLocaleString()} ${BASE_NAME}
			<br>${fornum(_wbbal,18).toLocaleString()} ${W_BASE_NAME}
			<br>
			<b>Currently available for withdrawals:</b>
			<br>${fornum(_avail,18).toLocaleString()} ${BASE_NAME}
			<br>${fornum(_wdmax,18).toLocaleString()} ${W_BASE_NAME}
		`);
		return;
	}

	notice(`
		<h3>Calling back ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${fornum(_desir,18).toLocaleString()} ${BASE_NAME}</u>
		<br>(${fornum(amt,18).toLocaleString()} ${W_BASE_NAME})
		<br>
		<br>Please confirm the Loan Call Back Transaction at your wallet provider now.
	`);
	let _tr = await vl.call(amt);
	console.log(_tr);
	notice(`
		<h3>Calling back ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${fornum(_desir,18).toLocaleString()} ${BASE_NAME}</u>
		<br>(${fornum(amt,18).toLocaleString()} ${W_BASE_NAME})
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Called back ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${fornum(_desir,18).toLocaleString()} ${BASE_NAME}</u>
		<br>(${fornum(amt,18).toLocaleString()} ${W_BASE_NAME})
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	//gubs();
	await fetchInfo();
}








async function borrow() {
	let amt = 0;
	am = $("inp-borrow").value;
	if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please increase ${W_VE_NAME} amount!</h2>You have entered an invalid or zero amount.<br><br>Your input: ${am}`);return}
	amt = BigInt(Math.floor(am*1e18));

	w_ve = new ethers.Contract(W_VE, ["function balanceOf(address) public view returns(uint)","function allowance(address,address) public view returns(uint)","function approve(address,uint)"], signer);
	alvo = await Promise.all([
		w_ve.allowance(window.ethereum.selectedAddress,VLENDR),
		w_ve.balanceOf(window.ethereum.selectedAddress)
	]);

	console.log("alvo,inp: ",alvo,am);

	if(Number(amt)>Number(alvo[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired:</h3>${amt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or mint some more ${W_VE_NAME}.`);}

	if( Number(alvo[0]) < Number(alvo[1]) ) {
		notice(`
			<h3>Approval required</h3>
			We require your ${W_VE_NAME} approval to facilitate this Loan.<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await w_ve.approve(VLENDR,ethers.constants.MaxUint256);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approved ${W_VE_NAME}!</h3>
			<br><br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the final Loan Transaction at your wallet provider now.
		`);
	}

	vl = new ethers.Contract(VLENDR,VLENDRABI,signer);
	notice(`
		<h3>Borrowing ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u><br>
		<br>Please confirm the final Loan Transaction at your wallet provider now.
	`);
	let _tr = await vl.borrow(amt);
	console.log(_tr);
	notice(`
		<h3>Borrowing ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Borrowed ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u>
		<h3>Locked ${W_VE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(Number(_tw.logs[0].data),18).toLocaleString() } ${W_VE_NAME}</u><br>
		<br>
		You must repay your Loan with ${BASE_NAME} tokens to get back your ${W_VE_NAME} tokens & redeem it to get back your ${VE_NAME} collateral.
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	//gubs();
	await fetchInfo();
}

async function repay() {
	let amt = 0;

	base = new ethers.Contract(BASE, ["function balanceOf(address) public view returns(uint)","function allowance(address,address) public view returns(uint)","function approve(address,uint)"], signer);
	vl = new ethers.Contract(VLENDR,VLENDRABI,signer);
	alvo = await Promise.all([
		base.allowance(window.ethereum.selectedAddress,VLENDR),
		base.balanceOf(window.ethereum.selectedAddress),
		vl.borrowings(window.ethereum.selectedAddress)
	]);

	console.log("alvo,inp: ",alvo,am);

	amt = alvo[2];

	if(Number(amt)>Number(alvo[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired:</h3>${amt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or mint some more ${BASE_NAME}.`);}

	if( Number(alvo[0]) < Number(alvo[1]) ) {
		notice(`
			<h3>Approval required</h3>
			We require your ${BASE_NAME} approval to facilitate this Loan.<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await base.approve(VLENDR,ethers.constants.MaxUint256);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approved ${BASE_NAME}!</h3>
			<br><br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the final Loan Transaction at your wallet provider now.
		`);
	}

	notice(`
		<h3>Repaying ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u><br>
		<br>Please confirm the final Loan Transaction at your wallet provider now.
	`);
	let _tr = await vl.repay();
	console.log(_tr);
	notice(`
		<h3>Repaying ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Repaid ${BASE_NAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> <u>${ fornum(amt,18).toLocaleString() } ${BASE_NAME}</u>
		<br>
		You can now redeem your ${W_VE_NAME} tokens to get back your ${VE_NAME} collateral.
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
	await fetchInfo();
}
