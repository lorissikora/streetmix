import { FormattedMessage } from 'react-intl'
import { useCallback, useState } from 'react'

import { Dialog } from '../Dialog.js'
import './StreetJSONImportDialog.css'
import { useDispatch, useSelector } from '~src/store/hooks.js'
import { updateStreetData } from '~src/store/slices/street.js'

// TODO Placeholder
interface ImportedStreetJSON {
  streetConfigurations: { name: string }[]
}

export function StreetJSONImportDialog() {
  const [configurationNames, setConfigurationNames] = useState<string[]>()
  const [selectedConfigurationIndex, setSelectedConfigurationIndex] =
    useState<number>()
  const [parseError, setParseError] = useState<string>()

  const street = useSelector((state) => state.street)
  console.log(street)

  const dispatch = useDispatch()

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const contents = e.target?.result as string
          const json = JSON.parse(contents) as ImportedStreetJSON

          // TODO Some structure validation, maybe ZOD?

          const names = json.streetConfigurations.map(
            (configuration) => configuration.name
          )

          setConfigurationNames(names)
          setSelectedConfigurationIndex(names.length > 0 ? 0 : undefined)
          setParseError(undefined)
        } catch (error) {
          setConfigurationNames(undefined)
          setSelectedConfigurationIndex(undefined)
          setParseError(
            'Invalid JSON file. Please select a valid StreetJSON export.'
          )
          console.error('Error parsing JSON:', error)
        }
      }
      reader.readAsText(file)
    },
    []
  )

  const handleImport = useCallback(() => {
    if (selectedConfigurationIndex === undefined) {
      return false
    }

    // TODO Do actual conversion
    dispatch(
      updateStreetData({
        boundary: {
          left: {
            id: 'hqR5Gjiif0irqBP5nsB2a',
            variant: 'grass',
            elevation: 0.15,
            floors: 1,
          },
          right: {
            id: 'qpuWLwEQmpswxsVmQ6W2Q',
            variant: 'grass',
            elevation: 0.15,
            floors: 1,
          },
        },
        segments: [
          {
            id: 'blf3msV2lWACDiH_FcSzL',
            type: 'divider',
            variantString: 'big-tree',
            width: 5,
            elevation: 0.15,
            elevationChanged: undefined,
            slope: { on: false, values: [] },
            variant: { 'divider-type': 'big-tree' },
            warnings: [false, false, false, false, false, false, false],
            label: undefined,
          },
        ],
        width: 5,
      })
    )

    return true
  }, [dispatch, selectedConfigurationIndex])

  return (
    <Dialog>
      {(closeDialog) => (
        <div className="import-dialog">
          <div className="dialog-content dialog-content-bleed">
            <header>
              <h1>
                <FormattedMessage
                  id="dialogs.streetjson.import.heading"
                  defaultMessage="Import StreetJSON"
                />
              </h1>
            </header>
            <div className="import-dialog-content">
              <input type="file" accept=".json" onChange={handleFileChange} />

              {configurationNames !== undefined && (
                <>
                  <select
                    id="street-configuration-select"
                    value={selectedConfigurationIndex ?? ''}
                    onChange={(event) =>
                      setSelectedConfigurationIndex(Number(event.target.value))
                    }
                  >
                    {configurationNames.length === 0 && (
                      <option value="">No configurations available</option>
                    )}
                    {configurationNames.map((name, index) => (
                      <option key={`${name}-${index}`} value={index}>
                        {name}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {parseError !== undefined && (
                <p className="import-dialog-error">{parseError}</p>
              )}
              {selectedConfigurationIndex !== undefined && (
                <button
                  className="dialog-primary-action"
                  onClick={() => {
                    if (handleImport()) {
                      closeDialog()
                    }
                  }}
                  disabled={selectedConfigurationIndex === undefined}
                >
                  Import
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
