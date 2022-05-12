import React, { useContext } from 'react';
import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png';
import { EnergyTokenContext } from "../context/EnergyTokenContext";

const NavbarItem = ({ title, classProps }) => {
    return (
        <li className='mx-4 cursor-pointer ${classProps'>
            {title}
        </li>
    );
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { connectWallet, currentAccount } = useContext(EnergyTokenContext);
    return (
        <nav className='w-full flex md:justify-center justify-between items-center'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt="logo" className='w-80'>
                </img>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {[" ", " ", " ", " "].map((item, index) => (
                    <NavbarItem key={item + index} title={item} />
                ))}
                {!currentAccount && (<li className='border-[1px] border-[#fa4191] py-2 px-3 mx-4 rounded-full flex space-x-2'>
                    <div className='w-6 h-6 border-[1px] border-gray-500 rounded-full'></div>
                    <div>Not Connected</div>
                </li>
                )}
                {currentAccount && (<li className='border-[1px] border-[#fa4191] py-2 px-3 mx-4 rounded-full flex space-x-2'>
                    <div className='w-6 h-6 border-[1px] border-green-300 rounded-full flex items-center'>
                        <div className='w-3 h-3 bg-green-300 rounded-full self-center ml-[5px]'></div>
                    </div>
                    <div>Connected</div>
                </li>
                )}
            </ul>
            <div className='flex relative'>
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} />
                    : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                            <NavbarItem key={item + index} title={item} classProps='my-2 text-lg' />
                        ))}
                    </ul>
                )}
            </div>
        </nav >
    );
}

export default Navbar;