import Link from 'next/link'
import { useCallback } from 'react';

const Latest = (props) => {
    const { companies } = props;



    return (
      <section className='latest py-5 bg-light'>
        <div className='container'>
          <h3>جدید ترین شرکتهای عضو:</h3>
          <div className='card-group'>
            {companies.length > 0
              ? companies.map((company) => (
                  <div className='card' key={companies.id}>
                    {company?.images?.map((image) => (
                      <img
                        src={image.url}
                        className='card-img-top'
                        alt={company.companyName}
                      />
                    ))}

                    <div className='card-body'>
                      <h5 className='card-title'>
                        <Link href={`/company/${company._id}`}>
                          {company.companyName}
                          <span className='float-right badge badge-success'>
                            {company.averageRating}
                          </span>
                        </Link>
                      </h5>

                      <span className='badge badge-dark mb-2'>
                        {(`${company.city}`, `${company.province}`)}
                      </span>

                      <p className='card-text'>{company.description}</p>

                      <p className='card-text'>
                        <small className='text-muted'>
                          {company.branches.join(', ')}
                        </small>
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>
    )
}

export default Latest;