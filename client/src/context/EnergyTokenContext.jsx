import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const EnergyTokenContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);

    return tokenContract;
}

export const EnergyTokenProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [formData, setFormData] = useState({ addressFrom: "", amount: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [productionCount, setProductionCount] = useState(localStorage.getItem('productionCount'));
    const [productions, setProductions] = useState([])
    const [balance, setBalance] = useState("")

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAll = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const energyTokenContract = getEthereumContract();

            const availableProductions = await energyTokenContract.getAll();

            const structuredProductions = availableProductions.map((production) => ({
                userAddress: production.userAddress,
                amount: parseInt(production.energyProduced._hex), // / (10 ** 18) for big number decimals
                timestamp: new Date(production.timestamp.toNumber() * 1000).toLocaleString()
            }))

            console.log(structuredProductions);

            setProductions(structuredProductions);
        } catch (error) {
            console.log(error);
        }
    }

    // const getBalance = async () => {
    //     const energyTokenContract = getEthereumContract();

    //     const userBalance = await energyTokenContract.balanceOf(currentAccount);
    //     setBalance(userBalance);

    // }

    const checkIfWalletIsConnect = async () => {

        try {
            if (!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAll();
                getBalance();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    // const checkIfproductionsExist = async () => {
    //     try {
    //         const energyTokenContract = getEthereumContract();
    //         const productionCount = await energyTokenContract.getproductionCount();

    //         window.localStorage.setItem("productionCount", productionCount)
    //     } catch (error) {
    //         console.log(error);

    //         throw new Error("No ethereum object.")
    //     }
    // }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")

        }
    }

    useEffect(() => {
        checkIfWalletIsConnect();
        // checkIfproductionsExist();
    }, [])

    return (
        <EnergyTokenContext.Provider value={{ connectWallet, currentAccount, balance, formData, setFormData, handleChange, productions, isLoading }}>
            {children}
        </EnergyTokenContext.Provider >
    );
}
