import http from '../lib/http'

const REGION_LIST = "/region/list";
const REGION_CREATE = "/region/create";
const REGION_DELETE = "/region/delete";
const REGION_EDIT = "/region/update";

function list(options) {
  return http.post(
    REGION_LIST,
    options
  )
}

function create(objects){
  return http.post(
    REGION_CREATE,
    objects
  )
}

function del(id){
  return http.post(
    REGION_DELETE,
    id
  )
}

function edit(object){
  return http.post(
    REGION_EDIT,
    object
  )
}

export default {
  list,
  create,
  del,
  edit
}
