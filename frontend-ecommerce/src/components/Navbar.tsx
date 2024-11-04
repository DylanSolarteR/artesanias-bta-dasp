'use client';
import React from 'react'
import CarritoIcon from '@/app/icons/CartIcon.png';
import ArrowDownIcon from '@/app/icons/ArrowDownIcon.svg';
import Link from 'next/link';
import Image from 'next/image';
import "./Navbar.css";

function Navbar() {
    return (
        <nav className='Navbar'>
            <div className='title'>
                <Link href="/">
                    <strong>Artesanías<br/> Bogotá LTDA</strong>
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <div className='bottom'>
                            <Link href="/">Catálogo <ArrowDownIcon className="arrow-icon"/></Link>
                        </div>
                        
                    </li>
                    <li>
                        <div className='shopping-cart'>
                            <Link href="/carrito">
                                <Image src={CarritoIcon} alt='Icono de carrito' width={45} height={45} />
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar