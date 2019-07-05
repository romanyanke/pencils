import { isUndefined } from 'lodash'
import React, { SFC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNormalizedPencils, usePecnilRequestStatus, usePencilCache } from './Pancil.hooks'
import { requestPencilList, requestSinglePencil } from './Pencil.actions'
import { Pencil as PencilInterface, PencilProps, PencilQuery } from './Pencil.interface'
import { getPencilsFromCacheByQuery, mapRequestToCacheId } from './Pencil.utils'

// tslint:disable: no-shadowed-variable
const Pencil: SFC<PencilProps> = ({ id, query, queries, children }) => {
  const dispatch = useDispatch()
  const requestStatus = usePecnilRequestStatus()
  const cache = usePencilCache()
  const normalized = useNormalizedPencils()
  const pencil = id ? normalized[id] : undefined
  const targetQueries = query ? [query] : queries ? queries : []
  const pencils = targetQueries.reduce<PencilInterface[]>((acc, query) => {
    return [...acc, ...getPencilsFromCacheByQuery(query, cache, normalized)]
  }, [])
  // console.log(queries, pencils)

  useEffect(() => {
    const isNotCached = (query: PencilQuery) => isUndefined(cache[mapRequestToCacheId({ query })])
    if (id && !pencil) {
      dispatch(requestSinglePencil.request({ id }))
    } else if (query && isNotCached(query)) {
      dispatch(requestPencilList.request({ query }))
    } else if (queries) {
      queries.filter(isNotCached).forEach(query => {
        dispatch(requestPencilList.request({ query }))
      })
    }
  }, [dispatch, id, query, queries, pencil, cache])

  return <>{children({ requestStatus, pencil, pencils })} </>
}

export default Pencil
