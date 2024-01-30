import Spinner from '@/components/Spinner/Spinner'
import Image from 'next/image'
import Link from 'next/link'

const CompanyPage = ({ company }) => {
  const {
    _id,
    name,
    description,
    averageRating,
    website,
    address,
    city,
    numOfBranches,
    branches,
    images,
  } = company.data

  const loading = false
  //const { user } = useSelector((state) => state.auth.user)

  //const dispatch = useDispatch()

  return (
    <>
      <Head>
        <title>{`شرکت ${name}`}</title>
        <meta
          name='description'
          content='شرکتهای حمل و نقل و باربری های منتخب'
        />
      </Head>
      {loading && !company ? (
        <Spinner />
      ) : (
        <section className='Company mt-5'>
          <div className='container'>
            <div className='row'>
              {/* <!-- Main col --> */}
              <div className='col-md-8'>
                <h1>{name}</h1>
                {/* <!-- Description --> */}
                <p>{description}</p>
                {/* <!-- Avg cost --> */}
                <p className='lead mb-4'>Average Truck Cost: </p>
              </div>
              {/* <!-- Sidebar --> */}
              <div className='col-md-4'>
                {/* <!-- Image --> */}
                <Image
                  src={`/uploads/no-photo.jpg`}
                  className='img-thumbnail'
                  alt='Company'
                  width={100}
                  height={100}
                />
                {/* <!-- Rating --> */}
                <h1 className='text-center my-4'>
                  Rating{' '}
                  <span className='badge badge-secondary badge-success rounded-circle p-3'>
                    {averageRating ? averageRating : 'New'}
                  </span>
                </h1>
                {/* <!-- Buttons --> */}
                <Link
                  href={`/companies/reviews/${_id}`}
                  className='btn btn-dark btn-block my-3'
                >
                  <i className='fas fa-comments'></i> Read Reviews
                </Link>

                <Link
                  href='/add-review'
                  className='btn btn-light btn-block my-3'
                  onClick={() => console.log(first)}
                >
                  <i className='fas fa-pencil-alt'></i> Write a Review
                </Link>

                {website && (
                  <Link
                    href={website}
                    target='_blank'
                    className='btn btn-secondary btn-block my-3'
                  >
                    <i className='fas fa-globe'></i> Visit Website
                  </Link>
                )}
                {/* <!-- Map --> */}
                <div id='map' style={{ width: '100%', height: '300px' }}></div>
                {/* <!-- Perks --> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:5000/api/v1/companies/${context.params._id}`
  )
  const company = await res.json()
  return {
    props: {
      company,
    },
  }
}

export default CompanyPage
