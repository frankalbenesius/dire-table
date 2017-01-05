const defaultState = [
  [
    [[-4, 0], [-4, 5], [6, 5], [6, 0]],
    [[-3, 3], [-3, 4], [-2, 4], [-2, 3]],
  ],
  [
    [[-4, -1], [3, -1], [3, -2], [-4, -2]],
  ],
]

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default: return state
  }
}
