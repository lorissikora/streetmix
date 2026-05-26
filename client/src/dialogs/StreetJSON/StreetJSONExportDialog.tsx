import { FormattedMessage } from 'react-intl'
import { useCallback, useMemo } from 'react'

import { Dialog } from '../Dialog.js'
import './StreetJSONExportDialog.css'
import { useSelector } from '~src/store/hooks.js'

export function StreetJSONExportDialog() {
  const street = useSelector((state) => state.street)

  const converted = useMemo(() => {
    // TODO Do actual conversion
    return { foo: 'bar' }
  }, [street])

  const handleExport = useCallback(() => {
    // TODO How do we do this properly
    const blob = new Blob([JSON.stringify(converted, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'street.json'
    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }, [converted])

  return (
    <Dialog>
      {(closeDialog) => (
        <div className="export-dialog">
          <div className="dialog-content dialog-content-bleed">
            <header>
              <h1>
                <FormattedMessage
                  id="dialogs.streetjson.import.heading"
                  defaultMessage="Export StreetJSON"
                />
              </h1>
            </header>
            <div className="export-dialog-content">
              <button
                className="dialog-primary-action"
                onClick={() => {
                  handleExport()
                  closeDialog()
                }}
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
