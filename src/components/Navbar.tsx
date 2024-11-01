'use client';
import React from 'react'
import CarritoIcon from '@/app/icons/CarritoIcon.svg?url';
import ArrowDownIcon from '@/app/icons/ArrowDownIcon.svg';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <nav>
        <div>
            <Link href="/">
                    <strong>Artesanias Bogota LTDA</strong>
            </Link>
        </div>
        <div>
            <ul>
                <li>
                    <div>
                        <Link href="/">Catalogo <ArrowDownIcon/></Link>                        
                    </div>
                </li>
                <li>
                    <div>
                        <Link href="/Carrito">
                            <Image src={CarritoIcon} alt='Icono de carrito' width={50} height={50}/>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar