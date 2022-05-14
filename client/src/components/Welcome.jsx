import React, { useContext } from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from './';
import ButtonGroup from "./ButtonGroup";
import { EnergyTokenContext } from "../context/EnergyTokenContext";
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-black";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none text-black border-none text-sm blue-glassmorphism bg-transparent"
    />
);

const Welcome = () => {

    const { connectWallet, currentAccount, formData, handleChange, isLoading } = useContext(EnergyTokenContext);

    const handleSubmit = (e) => {
        const { addressTo, amount, state } = formData;

        e.preventDefault();

        if (!addressTo || !amount || !state) return;

    }
    return (
        <div className='flex w-full justify-center'>
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Join The <br /> Energy Chain
                    </h1>
                    <p className="text-left mt-5 text-black font-light md:w-9/12 w-11/12 text-base">
                        Earn Voltchain Token by producing energy. Buy and sell energy tokens.
                    </p>
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#fa4191] p-3 w-40 rounded-full cursor-pointer shadow-md hover:bg-[#F75A9E]"
                        >
                            <p className="text-white text-base font-semibold">Connect Wallet</p>
                        </button>
                    )}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            WEB 3.0
                        </div>
                        <div className={commonStyles}>
                            Low Fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-60 w-full my-5 eth-card drop-shadow-lg">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color='#fff' />
                                </div>
                                <BsInfoCircle fontSize={17} color='#fff' />
                            </div>
                            <div>
                                <p className='text-white text-sm'>
                                    Balance: 42
                                </p>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Voltchain Token
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <ButtonGroup /> {/* {ButtonGroup.plan.name} */}
                        <Input placeholder='Price (ETH)' name="price" type="number" handleChange={handleChange} />
                        <Input placeholder='Amount (VCT)' name="amount" type="number" handleChange={handleChange} />
                        <div className="h-[1px] w-fulll bg-gray-400 my-1"></div>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-black w-full mt-2 border-[1px] p-2 border-[#fa4191] rounded-full cursor-pointer transition duration-100 hover:bg-[#fa4191] hover:text-white"
                            >
                                Send Offer
                            </button>
                        )}
                    </div>


                </div>
            </div>

        </div>
    );
}

export default Welcome;