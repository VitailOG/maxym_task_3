import http from '../lib/http'


const DISTRICTS_LIST = "/district/list";
const DISTRICTS_CREATE = "/district/create";
const DISTRICTS_UPDATE = "/district/update";
const DISTRICTS_DELETE = "/district/delete";


function list(options) {
  return http.post(
    DISTRICTS_LIST,
    options
  )
}


function create(object) {
  return http.post(
    DISTRICTS_CREATE,
    object
  )
}

function edit(object) {
  return http.post(
    DISTRICTS_UPDATE,
    object
  )
}

function del(object_id) {
  return http.post(
    DISTRICTS_DELETE,
    object_id
  )
}

export default {
  list,
  create,
  edit,
  del
}
