import { ADD_AREA, REMOVE_AREA } from '../../constants/actions'
import { mergeArea, removeArea } from '../../../utilities/map'

const defaultAreas = []
export default function reducer(state = defaultAreas, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_AREA: return mergeArea(state, payload.area)
    case REMOVE_AREA: return removeArea(state, payload.area)
    default: return state
  }
}

export const getAreas = state => ([...state])
