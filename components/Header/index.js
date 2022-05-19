import DateHours from './DateHours'
import DropDown from './DropDown'
import Link from 'next/link'

function Header() {
    return (
        <>
            <div className='container pt-8 md:flex items-center justify-between hidden'>
                <div className='flex items-center'>
                    <Link href="/">
                        <a>
                            <img src="/images/logo.svg" alt="logo" />
                        </a>
                    </Link>
                    <DropDown />
                </div>
                <DateHours />
            </div>
            <div className='container pt-8 md:hidden items-center justify-between flex-col'>
                <div className='flex items-center justify-between'>
                    <img src="/images/logo.svg" alt="logo" />
                    <DateHours />
                </div>
                <DropDown />
            </div>
        </>

    )
}

export default Header