<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="formEdit.name" label="name" />
        <q-select
          v-model="formEdit.region"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          :options="options"
          option-value="id"
          option-label="name"
          @filter="setFilter"
          label="Регіони"
        />
        <q-input type="textarea" v-model="formEdit.name_aliases" label="alias" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="editData(formEdit)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {mainStore} from '../../stores/mainStore'
import api from '../../api/districts'
import { useDialogPluginComponent } from 'quasar'
import {computed, ref} from 'vue'
import http from "src/lib/http";

export default {
  name: "DistrictEdit",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const store = mainStore()

    const options = ref([])
    store.edit_data.region['schema'] = store.edit_data.schema
    console.log(store.edit_data)
    const formEdit = ref({
      id: store.edit_data.id,
      region: store.edit_data.region,
      name: store.edit_data.name,
      schema: store.edit_data.schema,
      name_aliases: store.edit_data.name_aliases.join(', ')
    })

    const editData = async (data) => {
      const infoEdit = {
        id: data.id,
        region_id: data.region.id,
        name: data.name,
        schema: data.region.schema,
        name_aliases: data.name_aliases.split(', ')
      }

      const data_district = {
        id: data.id,
        name: data.name,
        schema: data.region.schema,
        name_aliases: data.name_aliases.split(','),
        region:{
          id: data.region.id,
          name: data.region.name
        }
      }
      console.log(data_district)
      await store.editData(api, infoEdit, data_district)
      onDialogOK()
    }

    const setFilter = (data, update) => {
      update(() => {
        // if (data.length < 3) return;
        http.post('/region/region-by-name', {name:data})
          .then(response => {
            options.value = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }


    return{
      options,
      setFilter,
      editData,
      formEdit,
      store,
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>

</style>
