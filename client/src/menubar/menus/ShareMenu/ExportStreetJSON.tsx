import { FormattedMessage } from 'react-intl'
import { showDialog } from '~/src/store/slices/dialogs.js'
import { Icon } from '~/src/ui/Icon.js'
import { MenuItem } from '../MenuItem.js'
import { useDispatch } from '~/src/store/hooks.js'

export function ExportStreetJSON() {
  const dispatch = useDispatch()

  return (
    <MenuItem onClick={() => dispatch(showDialog('EXPORT_STREETJSON'))}>
      <Icon name="code-asterisk" className="menu-item-icon" />
      <FormattedMessage
        id="menu.share.streetjson"
        defaultMessage="Export to StreetJSON"
      />
    </MenuItem>
  )
}
