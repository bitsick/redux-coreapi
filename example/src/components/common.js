import React from 'react'


export function Error({ error }) {
  let details
  if (error.content) {
    details = (
      <ul className="error-details">
        {
          Object.keys(error.content).map(key => {
            return (
              <li key={key}>
                {key}
                <ul className="error-detail">
                  {error.content[key].map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </li>
            )
          })
        }
      </ul>
    )
  }

  return (
    <div className="error">
      <div>{error.message}</div>
      {details}
    </div>
  )
}


export function Loading() {
  return (
    <div className="loading">Loading…</div>
  )
}


export function NotFound({ id }) {
  return (
    <div className="not-found">Could not find to-do {id}.</div>
  )
}
