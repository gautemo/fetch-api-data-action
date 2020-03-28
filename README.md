# fetch-api-data-action
GitHub Action to fetch data from an API and save it to a file

## Inputs

### `url`
**Required** The url to fetch from.

### `file`
The file data is saved to. Default `actions/data.json`

## Example usage

```
uses: gautemo/fetch-api-data-action@1.0.2
with:
  url: 'https://fake-movie-database-api.herokuapp.com/api?s=batman'
  file: 'backup/data.json'
```
