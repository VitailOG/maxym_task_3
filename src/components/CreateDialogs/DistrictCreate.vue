<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="form.name" label="name" />
        <q-select
          v-model="autocomplete"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          :options="options"
          option-value="id"
          option-label="name"
          @filter="setFilter"
          label="Регіони"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Дані відсутні
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input type="textarea" v-model="form.name_aliases" label="alias" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="addNewData(form)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {mainStore} from '../../stores/mainStore'
import api from '../../api/districts'
import { useDialogPluginComponent } from 'quasar'
import {ref} from 'vue'
import http from "src/lib/http";
export default {
  name: "CreateDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const autocomplete = ref(null)
    const options = ref([])
    const form = ref({
      region_id: 1,
      name:'',
      name_aliases:''
    })

    const store = mainStore()

    const addNewData = async () => {
      const data_district = {
        name: form.value.name,
        schema: autocomplete.value.schema,
        name_aliases: form.value.name_aliases.split(','),
        region:{
          id: autocomplete.value.id,
          name: autocomplete.value.name
        }
      }
      await store.createData(api, {
        region_id: autocomplete.value.id,
        name: form.value.name,
        schema: autocomplete.value.schema,
        name_aliases: form.value.name_aliases.split(',')
      }, data_district)
      onDialogOK()
    }

    const setFilter = (data, update) => {
      update(() => {
        if (data.length < 3) return;
        http.post('/region/region-by-name', {name:data})
          .then(response => {
            options.value = response.data
          })
          .catch(error => {
            console.log(error)
          })
      })
    }

    return {
      options,
      autocomplete,
      setFilter,
      form,
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      addNewData,
      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>

</style>
