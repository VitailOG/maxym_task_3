<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="form.name" label="name" />
        <q-input v-model="form.schema" label="schema" />
        <q-input type="textarea" v-model="form.name_aliases" label="alias" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="addNewData(form)" :disable="disableButtonOk" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {mainStore} from '../../stores/mainStore'
import api from '../../api/region'
import { useDialogPluginComponent } from 'quasar'
import {ref, computed} from 'vue'

export default {
  name: "RegionCreate",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const form = ref({
      name:'',
      schema:'',
      name_aliases:''
    })

    const store = mainStore()

    const addNewData = async () => {
      await store.createData(api, {
        name: form.value.name,
        schema: form.value.schema,
        name_aliases: form.value.name_aliases.split(',')
      })
      onDialogOK()
    }

    const disableButtonOk = computed(() => {
      return form.value.name && form.value.schema && form.value.name_aliases
    })
    return{
      disableButtonOk,
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
