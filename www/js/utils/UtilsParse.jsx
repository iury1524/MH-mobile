import Parse from 'parse'
import ParseReact from 'parse-react'
import {_PARSE_APP_ID, _PARSE_SERVER_URL} from '../constants/config'

export function initParseServer () {
  Parse.initialize(_PARSE_APP_ID)
  Parse.serverURL = _PARSE_SERVER_URL
}
