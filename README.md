# fetch-api-data-action
GitHub Action to fetch data from an API and save it to a file

## Inputs

### `file`
The file data is saved to. Default `actions/data.json`

## Example usage

```
uses: actions/...
with:
  file: 'backup/data.json'
```