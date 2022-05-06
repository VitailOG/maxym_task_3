<template>
  <q-card class="my-card" style="max-width: 800px; margin: 20px auto">
    <q-card-section class="justify-center">
      <div v-for="(item, index) in arrayInputFilter" :key="index" style="margin-top: 15px">
        <div style="display: flex; justify-content: center">
          <q-select v-model="item.field" :options="props.field" label="поле" class="menuSelector" dense />
          <q-select v-model="item.operator" :options="operators" label="оператор" class="menuSelector" dense />
          <q-input v-model="item.value" label="дані" class="menuInput" dense />
          <q-btn icon-right="add" @click="addArea" />
          <q-btn icon-right="remove" @click="removeArea(index)" :disable="disableButtonRemove" style="margin-left: 10px"/>
        </div>
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-actions align="right" style="margin-top: 10px" >
      <q-btn color="primary" label="Reset" @click="resetData"/>
      <q-btn color="primary" label="OK" @click="filterDataInTable(arrayInputFilter)" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {ref, watch} from 'vue'
import {useQuasar} from 'quasar'
import {mainStore} from '../stores/mainStore'


const operators = ['=', '<>', '>', '<']
export default {
  name: "FilterData",
  props:{
    api: {
      required: true
    },
    field:{
      required: true,
      type: Array
    }
  },
  setup(props){

    const store = mainStore()
    const $q = useQuasar()

    const arrayInputFilter = ref([])
    const disableButtonRemove = ref(true)
    const filterData = ref({
      field:'',
      operator:'',
      value:''
    })

    arrayInputFilter.value.push({
      field: filterData.value.field,
      operator: filterData.value.operator,
      value: filterData.value.value
    })

    watch(arrayInputFilter, value => {
      disableButtonRemove.value = value.length > 1 ? false : true
    }, {deep:true})

    const addArea = () => {
      arrayInputFilter.value.push({
        field: filterData.value.field,
        operator: filterData.value.operator,
        value: filterData.value.value
      })
    }

    const removeArea = (index) => {
        arrayInputFilter.value.splice(index, 1)
    }

    const isCheckData = (data) => {
      let emptyObjects = data.filter(i => ([i.field].includes('')))
      if (emptyObjects.length){
        store.options.request.filter_by = []
      } else {
        store.options.request.filter_by = data
      }
    }

    const filterDataInTable = async (data) => {
      isCheckData(data)
      $q.loading.show({
        message: '<span>Фільтрація...</span>',
        html: true
      })
      store.options.request.offset = 0
      store.pagination.page = 1
      await store.getData(props.api, store.options)
      store.disableButtonNext = false
      $q.loading.hide()
    }

    const resetData = () => {
      arrayInputFilter.value = []
      arrayInputFilter.value.push({
        field: filterData.value.field,
        operator: filterData.value.operator,
        value: filterData.value.value
      })
    }

    return {
      props,
      operators,
      arrayInputFilter,
      removeArea,
      disableButtonRemove,
      filterData,
      filterDataInTable,

      addArea,
      resetData
    }
  }
}
</script>

<style scoped>
.menuSelector {
  margin: 5px;
  width: 100px;
  height: 35px;
}
.menuInput {
  margin: 5px;
  width: 150px;
  height: 35px;
}
</style>
