// import { FormattedMessage } from 'react-intl'

import { Icon } from '~/src/ui/Icon.js'
import { MenuItem } from '../MenuItem.js'

export function ExportStreetJSON() {
  return (
    <MenuItem href={`https://3dstreet.app/#${window.location.href}`}>
      <Icon name="code-asterisk" className="menu-item-icon" />
      <span>Export as StreetJSON</span>
      {/* <FormattedMessage
        id=""
        defaultMessage="Export as StreetJSON"
      /> */}
    </MenuItem>
  )
}
