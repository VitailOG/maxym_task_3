import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useQuasar} from "quasar";

export const mainStore = defineStore('mainStore', () => {
  let data = ref([]);
  let selected_row = ref([])
  let edit_data = ref({})
  let options = ref({
    "request": {
      "limit": 50,
      "offset": 0,
      "order_by": [],
      "filter_by": []
    },
    "uselist": true
  })

  const disableButtonNext = ref(false)

  const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 3,
    rowsNumber: 10
  })

  let $q = useQuasar()

  async function getData(api, options) {
    try {
      const response = await api.list(options);
      this.data = response.data;
      console.log(response)
    } catch (e) {
      console.log(e);
    }
  }

  async function createData(api, objects, extra_data={}){
    try {
      const response = await api.create(objects)
      // data.value.unshift(response.data)
      if (Object.keys(extra_data).length === 0){
        data.value.unshift(response.data)
      } else {
        extra_data['id'] = response.data.id
        console.log(extra_data)
        data.value.unshift(extra_data)
      }
      console.log(options.value.request.limit)
      data.value = data.value.slice(0, options.value.request.limit)
      $q.notify({
        type: 'positive',
        message: 'Дані створенно'
      })
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: "Помилка в створенні"
      })
    }
  }

  async function deleteData(api, dataDelete, id){
    try {
      const response = await api.del(dataDelete)
      data.value = data.value.filter(i => i.id !== id)
      $q.notify({
        type: 'positive',
        message: 'Дані видалено'
      })
    } catch (e) {
      let timer = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
        let errors = e.response === undefined ? 'Помилка у видалені' : e.response.data.errors
        $q.notify({
          type: 'negative',
          message: errors
        })
      }, 2000)
    }
  }

  async function editData(api, objects, extra_data={}){
    try {
      const response = await api.edit(objects)
      if (Object.keys(extra_data).length === 0){
        let index = data.value.findIndex(obj => obj.id === objects.id)
        data.value[index] = response.data
      } else {
        let index = data.value.findIndex(obj => obj.id === objects.id)
        data.value[index] = extra_data
      }
      $q.notify({
        type:'positive',
        message:'Дані відредаговані'
      })
    } catch (e) {
      console.log(e)
      let timer = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
        $q.notify({
          type:'negative',
          message:'Помилка в редагуванні'
        })
      }, 2000)
    }
  }

  return{
    disableButtonNext,
    pagination,
    options,
    edit_data,
    selected_row,
    data,

    getData,
    createData,
    deleteData,
    editData
  }
})
