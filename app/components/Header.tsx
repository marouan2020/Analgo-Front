'use client';

import ImageLogo from '../../public/images/logo.svg';
import Image from "next/image";
import Link from 'next/link';

export default function Header() {


  return (
    <header className='col-12'>
        <div className='col-md-2 col-sm-4 text-center pt-2'>
          <Link href="/">
            <Image
              className="logo"
              src={ImageLogo}
              alt="Analgo logo"
              height={66}
              width={88}
            />
          </Link>
        </div>
    </header>
  );
}
