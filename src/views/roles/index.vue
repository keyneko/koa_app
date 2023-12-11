<template lang="pug">
.page--fixed-header
  .page__header
    van-nav-bar(
      :title="$t('routes.roles')"
      left-arrow
      @click-left="$router.back()")
      template(#right)
        van-button.px-2(
          size='mini'
          type='info'
          icon-position='right'
          @click="onCreate"
          ) {{ $t('roles.create') }}

  .page__body
    van-empty(v-if='list.length == 0' :description="$t('noData')")
    template(v-else)
      transition-group(
        tag="div"
        enter-active-class='fadeInRight'
        leave-active-class='fadeOutLeft')
        .animated.faster(v-for="d in list" :key="d._id")
          van-cell-group.title-basis.mb-4(inset)
            van-cell(center)
              template
                .van-ellipsis {{ $t('name') }}: {{ d.name }}
                .van-ellipsis {{ $t('status') }}: {{ lut('status', d.status) }}
                ._van-ellipsis {{ $t('sops') }}: {{ map(d.sops, v => lut('sops', v)).join('、') }}
            van-cell(value)
              template(#extra)
                van-button.ml-2(
                  size="small"
                  type="danger"
                  @click="onDelete(d)"
                  ) {{ $t('delete') }}
                van-button.ml-2(
                  size="small"
                  type="general"
                  @click="onUpdate(d)"
                  ) {{ $t('update') }}

  DialogCreate(v-model="showDialogCreate" @created="getRoles")
  DialogUpdate(v-model="showDialogUpdate" :data="role" @updated="getRoles")
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import i18n from '@/lang'
import * as API from '@/api/role'
import store from '@/store'
import { map, without } from 'lodash'
import DialogCreate from './components/DialogCreate'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()
const { lut } = useDicts()

const list = ref([])
const role = ref({})
const showDialogUpdate = ref(false)
const showDialogCreate = ref(false)

function getRoles() {
  return API.getRoles().then((res) => {
    list.value = res.data
  })
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('roles.deleteCfm'),
    message: i18n.t('roles.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteRole({ value: d.value }).then((res) => {
        Toast.success(i18n.t('deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onUpdate(d) {
  role.value = {}
  nextTick(() => {
    role.value = d
  })
  showDialogUpdate.value = true
}

function onCreate() {
  showDialogCreate.value = true
}

getRoles()
</script>
