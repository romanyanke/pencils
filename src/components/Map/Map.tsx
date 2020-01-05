import classNames from 'classnames'
import { isUndefined } from 'lodash'
import React from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import { getEmptyFilter } from '../Filter/Filter.utils'
import { useCached } from '../Pencil/Pencil.hooks'
import { useCountriesNormalizedBy } from '../Taxonomy/Taxonomy.hooks'
import { mapHeight, mapWidth, topologies } from './Map.utils'

const Map = () => {
  const [, setFilter] = useFilter()
  const normalizedIds = useCountriesNormalizedBy('id')
  const cached = useCached()
  const geoIds = cached?.geoIds ?? []

  return (
    <div className="Map">
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="Map-block"
      >
        {topologies.map(topology => {
          const geoId = topology.id as string
          const country = geoId ? normalizedIds[geoId]?.name : undefined
          const hasPencil = !isUndefined(country)
          const isSelected = geoIds.includes(geoId)
          const className = classNames(
            'Map-country',
            hasPencil && 'Map-has-pencil',
            isSelected && 'Map-selected',
          )
          const onClick = () => {
            if (isSelected) {
              setFilter(getEmptyFilter())
            } else if (country) {
              setFilter({ country, tag: '' })
            }
          }

          return (
            <path
              data-testid={geoId}
              key={geoId}
              className={className}
              d={topology.pathD}
              onClick={onClick}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default Map
