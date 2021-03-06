import React, { useContext } from "react";

import { EnergyTokenContext } from "../context/EnergyTokenContext";

import dummyData from '../utils/dummyData';
import { shortenAddress } from "../utils/shortenAddress";

const ProductionCard = ({ userAddress, timestamp, amount }) => {

    return (
        <div className="bg-[#181918] m-4 flex flex-1 
        2xl:min-w-[450px] 2xl:max-w-[500px]
        sm:min-w-[270px] sm:max-w-[300px]
        flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://rinkeby.etherscan.io/address/${userAddress}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">Producer: {shortenAddress(userAddress)}
                        </p>
                    </a>
                    <p className="text-white text-base">Amount: {amount} VCT (kW)
                    </p>
                </div>
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
            </div>

        </div >
    )
}

const Productions = () => {
    const { currentAccount, productions } = useContext(EnergyTokenContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Energy Producers
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see the latest energy productions
                    </h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {productions.reverse().map((production, i) => (
                        <ProductionCard key={i} {...production} />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Productions;