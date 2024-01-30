import Link from 'next/link'
import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import store from '@/redux/store'
import { logoutUser, setCredentials } from '@/redux/slices/authSlice'
import { useGetUserMutation } from '@/services/userApi'
import { toast } from 'react-toastify'
import { useGetAccessTokenMutation, useLogoutMutation } from '@/services/authApi'

const Navbar = () => {
  const [getAccessToken] = useGetAccessTokenMutation()
  const user = useSelector((state) => state.auth)
  const [getUser] = useGetUserMutation()
  const [logout] = useLogoutMutation()

  const router = useRouter()

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const handleLogout = async () => {
    try {
      const refreshToken = Cookies.get('refreshToken')
      await logout(refreshToken).unwrap()
      store.dispatch(logoutUser())
      toast.success('شما خارج شدید !')
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  //This function checks if the user is logged in. If the user is logged in, it sets a new access token if expired in interceptor - used to get the user’s info. If the user is not logged in, it logs out the user and redirects them to the home page. The function also checks if the user is on the login or register page and redirects them to the home page if they are.

  const handleIsLoggedIn = async () => {
    if (typeof window !== 'undefined') {
      const refreshToken = Cookies.get('refreshToken')
      const accessToken = Cookies.get('accessToken')
      if (!refreshToken) {
        // await logout(refreshToken).unwrap()
        store.dispatch(logoutUser())
        // if (router.asPath != '/auth/register' && router.asPath != '/auth/login')
        //   router.push('/', undefined, { shallow: true })
        return
      }
      if (refreshToken) {
        // - sets a new access token if expired in interceptor - used to get the user's info
        const userInfo = await getUser().unwrap()
      //  console.log('navbar:', userInfo)
        store.dispatch(
          setCredentials({
            isLoggedIn: true,
            userId: userInfo?.user?.id,
            name: userInfo?.user?.name,
            email: userInfo?.user?.email,
            role: userInfo?.user?.role,
          })
        )
      }
      // if (router.asPath == '/auth/register' || router.asPath == '/auth/login')
      //   router.push('/', undefined, { shallow: true })
    }
  }
  useEffect(() => {
    typeof window !== 'undefined' && handleIsLoggedIn()
  }, [])

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' href='/auth/login'>
          <i className='bi bi-box-arrow-in-right'></i> ورود
        </Link>
      </li>

      <li className='nav-item'>
        <Link className='nav-link' href='/auth/register'>
          <i className='bi bi-person-add'></i> ثبت نام
        </Link>
      </li>
      <li className='nav-item d-none d-lg-block'>
        <Link className='nav-link' href='/'>
          |
        </Link>
      </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <div className=' dropdown'>
        <div
          className='btn btn-outline-danger dropdown-toggle text-white opacity-75'
          type='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
          id='dropdownMenuButton'
        >
          <figure className='avatar avatar-nav'>
            <img
              src={user.user?.avatar?.url}
              alt={user.user?.name}
              className='rounded-circle'
            />
          </figure>
          <span>{user?.name}</span>
        </div>
        <ul className='dropdown-menu text-end '>
          <li>
            <Link className='dropdown-item' href={`/accounts/${user.userId}`}>
              پروفایل کاربر
            </Link>
          </li>

          {user && user.role === 'publisher' && (
            <li>
              <Link className='dropdown-item ' href='/companies/managecompany'>
                پروفایل شرکت
              </Link>
            </li>
          )}
          <li>
            {user && user.role === 'publisher' && (
              <Link className='dropdown-item' href='/manage-reviews'>
                رسیدگی به دیدگاه ها
              </Link>
            )}
          </li>

          <li>
            <div className='dropdown-divider'></div>
            <Link className='dropdown-item' href='/' onClick={handleLogout}>
              <i className='bi bi-box-arrow-right ms-2'></i>
               خروج 
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  )

  return (
    <nav className='navbar navbar-expand-lg bg-danger navbar-dark '>
      <div className='container-fluid '>
        <button
          className='navbar-toggler ms-auto'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo03'
          aria-controls='navbarTogglerDemo03'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <Link className='navbar-brand fw-bold mb-1 text-white' href='/'>
          <i className='bi bi-truck'></i> CARGO
        </Link>
        <div className='collapse navbar-collapse ' id='navbarTogglerDemo03'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0 text-light '>
            {user.isLoggedIn ? authLinks : guestLinks}{' '}
            <li className='nav-item '>
              <Link className='nav-link' href='/companies'>
                جستجوی باربری ها و شرکتهای حمل و نقل
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='/map'>
                نمایش روی نقشه
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
