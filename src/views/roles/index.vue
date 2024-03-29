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
          @click="showDialogCreate = true"
          ) {{ $t('g.create') }}

  .page__body
    van-empty(v-if='list.length == 0' :description="$t('g.noData')")
    template(v-else)
      transition-group(
        tag="div"
        enter-active-class='fadeInRight'
        leave-active-class='fadeOutLeft')
        .animated.faster(v-for="d in list" :key="d.id")
          van-cell-group.title-basis.mb-4(inset)
            van-cell(center)
              template
                .van-ellipsis {{ $t('g.name') }}: {{ d.name }}
                .van-ellipsis {{ $t('g.status') }}: {{ lut('status', d.status) }}
                ._van-ellipsis.ignore {{ $t('g.permissions') }}: {{ d.permissions.join('、') }}
                //- ._van-ellipsis {{ $t('g.sops') }}: {{ map(d.sops, v => lut('sops', v)).join('、') }}
            van-cell(value)
              template(#extra)
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

  DialogCreate(v-model="showDialogCreate" @created="() => { getRoles(); resetRoleDicts() }")
  DialogUpdate(v-model="showDialogUpdate" :data="role" @updated="() => { getRoles(); resetRoleDicts() }")
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import i18n from '@/lang'
import * as API from '@/api/role'
import { getPermissions } from '@/api/permission'
import store from '@/store'
import { map, without } from 'lodash'
import DialogCreate from './components/DialogCreate'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()
const { lut } = useDicts()

const list = ref([])
const role = ref({})
const showDialogCreate = ref(false)
const showDialogUpdate = ref(false)

function getRoles() {
  Toast.loading()
  return API.getRoles({ sortOrder: 'desc' })
    .then((res) => {
      list.value = res.data
    })
    .finally(() => {
      Toast.clear()
    })
}

function getPermissionDicts() {
  const { dicts } = store.state.dicts
  if (dicts['permissions']) return

  return getPermissions().then((res) => {
    store.commit('dicts/SET_DICT', {
      key: 'permissions',
      list: map(res.data, (d) => ({
        value: d.pattern,
        name: d.name,
      })),
    })
  })
}

function resetRoleDicts() {
  store.commit('dicts/REMOVE_DICT', 'roles')
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('roles.deleteCfm'),
    message: i18n.t('roles.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteRole({ id: d.id }).then((res) => {
        Toast.success(i18n.t('g.deleted'))
        list.value = without(list.value, d)
        resetRoleDicts()
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

getRoles()
getPermissionDicts()
</script>
