<template lang="pug">
.page--fixed-header
  .page__header
    van-nav-bar(
      :title="$t('routes.users')"
      left-arrow
      @click-left="$router.back()")
      template(#right)
        van-button.px-2(
          v-perm="['barcodes:management:create']"
          size='mini'
          type='info'
          icon-position='right'
          @click="showDialogCreate = true"
          ) {{ $t('g.create') }}

  .page__body
    van-empty(v-if='list.length == 0' :description="$t('g.noData')")
    template(v-else)
      van-cell-group.title-basis.mb-4(inset v-for="d in list" :key="d.id")
        van-cell(center)
          template(#icon)
            van-image.mr-4(
              width='64'
              height='64'
              radius="5"
              lazy-load
              fit="cover"
              :src="d.avatar"
              @click.native.stop="ImagePreview([d.avatar])")
          template
            .van-ellipsis {{ $t('g.username') }}: {{ d.username }}
            .van-ellipsis {{ $t('g.name') }}: {{ d.name }}
            .van-ellipsis {{ $t('g.status') }}: {{ lut('status', d.status) }}
            ._van-ellipsis {{ $t('g.roles') }}: {{ map(d.roles, v => lut('roles', v, false)).join('、') }}
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

  DialogCreate(v-model="showDialogCreate" @created="getUsers")
  DialogUpdate(v-model="showDialogUpdate" :data="user" @updated="getUsers")
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Toast, Dialog, ImagePreview } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import i18n from '@/lang'
import { getRoles } from '@/api/role'
import * as API from '@/api/user'
import store from '@/store'
import { map, without } from 'lodash'
import DialogCreate from './components/DialogCreate'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

const list = ref([])
const user = ref({})
const showDialogCreate = ref(false)
const showDialogUpdate = ref(false)

function getUsers() {
  Toast.loading()
  return API.getUsers()
    .then((res) => {
      list.value = res.data
    })
    .finally(() => {
      Toast.clear()
    })
}

function getRoleDicts() {
  const { dicts } = store.state.dicts
  if (dicts['roles']) return

  return getRoles().then((res) => {
    store.commit('dicts/SET_DICT', {
      key: 'roles',
      list: map(res.data, (d) => ({
        value: d.id,
        name: d.name,
      })),
    })
  })
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('users.deleteCfm'),
    message: i18n.t('users.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteUser({ id: d.id }).then((res) => {
        Toast.success(i18n.t('g.deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onUpdate(d) {
  user.value = {}
  nextTick(() => {
    user.value = d
  })
  showDialogUpdate.value = true
}

getUsers()
getRoleDicts()
</script>
