import { ADD_AREA } from '../../constants/actions'
import { mergeArea } from '../../../utilities/map'

const defaultAreas = []
export default function reducer(state = defaultAreas, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_AREA: return mergeArea(state, payload.area)
    default: return state
  }
}

export const getAreas = state => ([...state])
