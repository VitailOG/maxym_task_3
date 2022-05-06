<template>
  <FilterData :api="api" :field="field"/>
  <Suspense>
    <template #default>
      <Table
        :title="'Райони'"
        :columns="columns"
        :api="api"
        @addNewElement="addNewElement"
        @deleteElement="deleteElement"
        @editElement="editElement"
      />
    </template>
    <template #fallback>
      <Skeleton/>
    </template>
  </Suspense>
</template>

<script>
import Table from "components/Table";
import Skeleton from "components/Skeleton";
import api from "../api/districts"
import FilterData from "components/FilterData";
import DistrictCreate from "components/CreateDialogs/DistrictCreate";
import DistrictEdit from "components/EditDialogs/DistrictEdit";

import {mainStore} from '../stores/mainStore'
import {useQuasar} from "quasar";
import RegionEdit from "components/EditDialogs/RegionEdit";

export default {
  name: "City",
  components:{
    Table,
    Skeleton,
    FilterData
  },
  setup(){
    const field = ['id', 'name', 'schema', 'schema_id']
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
        name:'region_id',
        label:'region_id',
        align:'left',
        sortable:true,
        field: row => row.region.name,
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

    const $q = useQuasar()

    const store = mainStore()

    const deleteElement = async (id) => {
      console.log('click ', id)
      await store.deleteData(api, {district_id: id}, id)
    }

    const addNewElement = () => {
      $q.dialog({
        component: DistrictCreate
      })
    }

    const editElement = () => {
      $q.dialog({
        component:DistrictEdit
      })
    }

    return {
      api,
      field,
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
