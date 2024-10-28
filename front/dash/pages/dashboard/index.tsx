import useSWR, { mutate } from "swr";
import { FormEvent } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from '@/components/BootstrapClient.js';

// This doesn't work if we add more users, the backend should return the user
// name
const users = {
    1: "Joe",
    2: "Pam",
    3: "Jim"
}

interface Filter {
  page: number;
  userId: number;
  name?: string;
  reviewGreaterThan?: string | FormDataEntryValue | null;
  reviewLessThan?: string | FormDataEntryValue | null;
  contactedFrom?: string | FormDataEntryValue | null;
  contactedTo?: string | FormDataEntryValue | null;
  contactedBy?: number;
}

const filter: Filter = { page: 1, userId: 1 };

const fetcher = (url: string) => fetch(
    url,
    {
        method: 'POST',
        body: JSON.stringify(filter, (key, value) => {
            if (!isNaN(value))
                value = Number(value)
            return value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }
).then((res) => res.json());

export default function Page() {
  const {
    data: resp,
    isLoading,
    error,
  } = useSWR(
    "http://localhost:3001/list",
    fetcher,
    {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
  );

  if (error) {
    return <p>Failed to fetch</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  async function switchUser(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value
    filter.userId = Number(id)

    mutate('http://localhost:3001/list')
  }

  async function markAsContacted(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const businessId = Number((event.target as HTMLButtonElement).dataset.businessId)

    fetch(
        'http://localhost:3001/mark-as-contacted',
        {
            method: 'POST',
            body: JSON.stringify({
                businessId: businessId,
                userId: filter.userId
            }),
            headers: {
              'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        response.json()
        mutate('http://localhost:3001/list')
    })
  }

  async function previousPage(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    if (filter.page > 1) {
        filter.page = filter.page - 1
        mutate('http://localhost:3001/list')
    }
  }

  async function nextPage(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    if (resp.businesses.length > 0) {
        filter.page = filter.page + 1
        mutate('http://localhost:3001/list')
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name")
    if (name) {
        filter.name = name as string
    } else {
        delete filter.name
    }

    const reviewGreaterThan = formData.get("reviewGreaterThan")
    if (reviewGreaterThan) {
        filter.reviewGreaterThan = reviewGreaterThan
    } else {
        delete filter.reviewGreaterThan
    }

    const reviewLessThan = formData.get("reviewLessThan")
    if (reviewLessThan) {
        filter.reviewLessThan = reviewLessThan
    } else {
        delete filter.reviewLessThan
    }

    const contactedFrom = formData.get("contactedFrom")
    if (contactedFrom) {
        filter.contactedFrom = contactedFrom
    } else {
        delete filter.contactedFrom
    }

    const contactedTo = formData.get("contactedTo")
    if (contactedTo) {
        filter.contactedTo = contactedTo
    } else {
        delete filter.contactedTo
    }

    const contactedByMe = formData.get("contactedByMe")
    if (contactedByMe === "") {
        filter.contactedBy = filter.userId
    } else {
        delete filter.contactedBy
    }

    filter.page = 1
    mutate('http://localhost:3001/list')
  }

return (
    <>
      {resp.errors.length > 0 ? <div className="alert alert-danger" role="alert">Error</div> : ''}
      <h1 className="text-center">Businesses</h1>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <form className="form-inline" onSubmit={onSubmit}>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="name" placeholder="Name"/>
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="reviewLessThan" placeholder="Maximum reviews"/>
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="reviewGreaterThan" placeholder="Minimum reviews"/>
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="contactedFrom" placeholder="Contacted before"/>
            </div>
            <div className="form-group mb-2">
              <input type="text" className="form-control" name="contactedTo" placeholder="Contacted after"/>
            </div>
            <div className="form-check">
                <input className="form-check-input" name="contactedByMe" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Contacted by me
                </label>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Filter</button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <table className="table">
            <thead className="text-small">
              <tr>
                <th>Name</th>
                <th>Reviews</th>
                <th>City</th>
                <th>Contacted at</th>
                <th>Contacted by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            { // implicit any
              resp.businesses.map(business =>
                <tr key={business.id}>
                  <td className="text-right">{business.name}</td>
                  <td>{business.reviewCount}</td>
                  <td>{business.city.name}, {business.city.state}</td>
                  <td>{business.contactedAt}</td>
                  <td>{business.contactedBy ? users[business.contactedBy as keyof typeof users] : ''}</td>
                  <td>{business.contactedAt ? '' : <button type="button" className="btn btn-primary" data-business-id={business.id} onClick={markAsContacted}>Mark as contacted</button>}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 text-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a onClick={previousPage} className="page-link" href="#">Previous</a></li>
              <li className="page-item"><a onClick={nextPage} className="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        <div className="form-group mb-2">
            <label>Who am I?</label>
            <select name="userId" className="form-control" onChange={switchUser}>
                <option value="1">Joe</option>
                <option value="2">Pam</option>
                <option value="3">Jim</option>
            </select>
        </div>
        </div>
      </div>
      <BootstrapClient/>
    </>
  )
}