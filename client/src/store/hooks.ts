import {
  useDispatch as useBaseDispatch,
  useSelector as useBaseSelector,
} from 'react-redux'
import type { RootState, Dispatch } from './index'
import type { UserSettings, UserState } from '~src/types'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = useBaseDispatch.withTypes<Dispatch>()
// export const useSelector = useBaseSelector.withTypes<RootState>()

const MOCK_USER_STATE: UserState = {
  signInData: {
    userId: 'mock-user',
    token: '', // hmm
    refreshToken: '', // hmm
    details: {
      id: 'mock-user',
      displayName: 'Mock User',
      profileImageUrl: '',
      flags: {},
      roles: [],
      data: {} as UserSettings, // trust bro
    },
  },
  signedIn: true,
  isSubscriber: true,
  isCoilPluginSubscriber: true,
  geolocation: {
    attempted: true,
    data: null,
    error: null,
  },
}

export const useSelector = <Selected>(
  selector: (state: RootState) => Selected
): Selected => {
  return useBaseSelector((state: RootState) =>
    selector({ ...state, user: MOCK_USER_STATE })
  )
}
