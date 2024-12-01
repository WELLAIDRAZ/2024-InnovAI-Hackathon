import React from 'react'
import { Input } from './input';

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <Input
            placeholder="Filter titles or descriptions..."
            value={filter}
            onChange={(event) => {
                setFilter(event.target.value)
            }}
            className="max-w-sm w-64"
        />
    )
}

export default GlobalFilter
