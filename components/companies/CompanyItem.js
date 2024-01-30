import Image from 'next/image'
import Link from 'next/link'

const CompanyItem = ({ company }) => {
  //console.log('CompanyItem:', company)


  return (
    <div className='card mb-3'>
      <div className='row g-0'>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-header '>
              <i className='bi bi-building-check ms-2 text-success'></i>
              <Link
                href={`/companies/${company?.state}/${company?.city}/${company?._id}`}
                className='text-muted text-decoration-none'
              >
                {company?.companyName}
                <span className='float-start badge bg-success mx-3'>
                  {company?.averageRating ? company?.averageRating : 'New'}
                </span>
              </Link>
            </h5>

            <div className='d-flex '>
              <i className='bi bi-signpost text-success'></i>
              <p className='card-text text-bg-light mx-2'>آدرس:</p>
              <span className='badge text-bg-success mb-3'>
                {' '}
                {company?.address}
              </span>
            </div>
            <p className='card-text text-bg-light'>
              <i className='bi bi-telephone-fill ms-2 text-success'></i>
              شماره تماس : {company?.phone}
            </p>
            <p className='card-text text-bg-light'>
              <i className='bi bi-houses ms-2 text-success'></i>
              تعداد شعب فعال : {company?.numOfBranches}
            </p>
            <p className='card-text text-bg-light'>
              <i className='bi bi-house-exclamation ms-2 text-success'></i>
              شعب فعال : {company?.branches[0]}
            </p>
            <p className='card-text text-bg-light'>
              <i className='bi bi-person-fill-exclamation ms-2 text-success'></i>{' '}
              نام مدیرعامل : {company?.ceoName}
            </p>
            <p className='card-text text-bg-light'>
              <i className='bi bi-truck-flatbed ms-2 text-success'></i>
              تعداد ناوگان ملکی : {company?.numOfTrucks}
            </p>
            <p className='card-text text-bg-light'>
              <i className='bi bi-globe-americas ms-2 text-success'></i>
              استان : {company?.state}
            </p>
            <p className='card-text text-bg-light'>
              <i className='bi bi-geo-alt ms-2 text-success'></i>
              شهر : {company?.city}
            </p>
            <p className='badge card-text text-bg-success'>
              <i className='bi bi-arrows-angle-contract ms-2 text-success'></i>
              وضعیت فعالیت :{company?.active ? 'فعال' : 'غیرفعال'}
            </p>
            <p className='card-text text-bg-light fs-6 lh-lg'>
              <i className='bi bi-globe ms-2 text-success'></i>
              <Link
                href={`${company?.website}`}
                className='text-bg-light text-decoration-none font-monospace fw-lighter'
              >
                آدرس وب سایت: {company?.website}
              </Link>
            </p>

            <p className='card-text text-bg-light'>
              <i className='bi bi-card-checklist ms-2 text-success'></i>
              توضیحات : {company?.description}
            </p>
          </div>
        </div>
        <div className='col-md-2'>
          <Image
            src={`/uploads/no-photo.jpg`}
            className='img-thumbnail'
            alt='company'
            width={100}
            height={140}
          />
        </div>
      </div>
    </div>
  )
}

export default CompanyItem
