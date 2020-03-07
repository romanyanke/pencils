import {
  PencilListResponse,
  PencilSingleRequest,
  PencilSingleResponse,
  PencilsListRequest,
} from './Pencil.interface'
import {
  mapPencilListQueryRequestUrl,
  mapPencilsingleQueryRequestUrl,
  mapRequestToCacheId,
} from './Pencil.utils'
import apiRequest from '../../api'

export const apiRequestSinglePencil = (request: PencilSingleRequest) =>
  apiRequest<PencilSingleResponse>(mapPencilsingleQueryRequestUrl(request))

export const apiRequestPencilList = (request: PencilsListRequest) =>
  apiRequest<PencilListResponse>(mapPencilListQueryRequestUrl(request.query)).then(data => {
    data.cacheId = mapRequestToCacheId(request)

    return data
  })
