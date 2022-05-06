<template>
  <FilterData :api="api" :field="field"/>
  <Suspense>
    <template #default>
      <Table
        :title="'Регіони'"
        :api="api"
        :columns="columns"
        @addNewElement="addNewElement"
        @deleteElement="deleteElement"
        @editElement="editElement"
      ></Table>
    </template>
    <template #fallback>
      <Skeleton/>
    </template>
  </Suspense>
</template>

<script>
import RegionCreate from "components/CreateDialogs/RegionCreate";
import RegionEdit from "components/EditDialogs/RegionEdit";
import FilterData from "components/FilterData";

import Table from "components/Table";
import Skeleton from "components/Skeleton";
import api from '../api/region'
import {useQuasar} from 'quasar'
import {mainStore} from '../stores/mainStore'

export default {
  name: "Region",
  components:{
    Table,
    Skeleton,
    FilterData
  },
  setup(){
    const store = mainStore()
    const $q = useQuasar()
    const field = ['id', 'name', 'schema']
    const columns = [
      {
        name:'id',
        label:'id',
        align:'left',
        sortable:true,
        field: row => row.id,
        format:val => `${val}`
      },
      {
        name:'schema',
        label:'schema',
        align:'left',
        sortable:true,
        field: row => row.schema,
        format:val => `${val}`
      },
      {
        name:'name',
        label:'name',
        align:'left',
        sortable:true,
        field: row => row.name,
        format:val => `${val}`
      },
      {
        name:'name_aliases',
        label:'name_aliases',
        align:'left',
        sortable:true,
        field: row => row.name_aliases,
        format: (val) => val.join(', ')
      },
      {
        name:'remove',
        label:'remove',
        align:'left'
      },
    ]

    const deleteElement = async (id) => {
      await store.deleteData(api, {region_id: id}, id)
    }

    const addNewElement = () => {
      $q.dialog({
        component: RegionCreate
      })
    }

    const editElement = () => {
      $q.dialog({
        component:RegionEdit
      })
    }

    return {
      field,
      api,
      columns,
      addNewElement,
      deleteElement,
      editElement
    }
  }
}
</script>

<style scoped>

</style>
