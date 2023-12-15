<template lang="pug">
.page--fixed-header
  .page__header
    van-nav-bar(
      :title="$t('routes.permissions')"
      left-arrow
      @click-left="$router.back()")
      template(#right)
        van-button.px-2(
          size='mini'
          type='info'
          icon-position='right'
          @click="showDialogCreate = true"
          ) {{ $t('g.create') }}

  .page__body
    van-empty(v-if='list.length == 0' :description="$t('g.noData')")
    template(v-else)
      van-cell-group(inset)
        van-collapse(v-model='activeName' accordion)
          van-collapse-item(v-for="d in list" :key="d._id" :name='d._id')
            template(#title)
              b {{ d.pattern }}
            template
              .van-ellipsis {{ $t('g.name') }}: {{ d.name }}
              .van-ellipsis {{ $t('g.description') }}: {{ d.description }}
              .van-ellipsis {{ $t('g.status') }}: {{ lut('status', d.status) }}
              .text-right
                van-button.ml-2(
                  size="small"
                  type="danger"
                  @click="onDelete(d)"
                  ) {{ $t('g.delete') }}
                van-button.ml-2(
                  size="small"
                  type="general"
                  @click="onUpdate(d)"
                  ) {{ $t('g.update') }}

  DialogCreate(v-model="showDialogCreate" @created="(id) => { getPermissions(); activeName = id || '' }")
  DialogUpdate(v-model="showDialogUpdate" :data="permission" @updated="getPermissions")
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import i18n from '@/lang'
import * as API from '@/api/permission'
import { without } from 'lodash'
import DialogCreate from './components/DialogCreate'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

const buttonLoading = ref(false)
const showDialogCreate = ref(false)
const showDialogUpdate = ref(false)

const list = ref([])
const permission = ref({})
const activeName = ref('')

function getPermissions() {
  Toast.loading()
  return API.getPermissions()
    .then((res) => {
      list.value = res.data
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('permissions.deleteCfm'),
    message: i18n.t('permissions.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deletePermission({ _id: d._id }).then((res) => {
        Toast.success(i18n.t('g.deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onUpdate(d) {
  permission.value = {}
  nextTick(() => {
    permission.value = d
  })
  showDialogUpdate.value = true
}

getPermissions()
</script>
