<template lang="pug">
.page--fixed-header
  .page__header
    van-nav-bar(
      :title="$t('routes.users')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    van-empty(v-if='list.length == 0' :description="$t('noData')")
    template(v-else)
      van-cell-group.title-basis.mb-4(inset v-for="d in list" :key="d._id")
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
            .van-ellipsis {{ $t('username') }}: {{ d.username }}
            .van-ellipsis {{ $t('name') }}: {{ d.name }}
            ._van-ellipsis {{ $t('roles') }}: {{ map(d.roles, v => lut('roles', v, false)).join('、') }}
            .van-ellipsis {{ $t('status') }}: {{ lut('status', d.status) }}
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

  DialogUpdate(v-model="showDialogUpdate" :data="user" @updated="getUsers")
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Toast, Dialog, ImagePreview } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import i18n from '@/lang'
import * as roleApi from '@/api/role'
import * as API from '@/api/user'
import store from '@/store'
import { map, without } from 'lodash'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

const list = ref([])
const user = ref({})
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

function getRoles() {
  return roleApi.getRoles().then((res) => {
    store.commit('dicts/SET_DICT', {
      key: 'roles',
      list: map(res.data, (d) => ({
        value: d.value,
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
      return API.deleteUser({ id: d._id }).then((res) => {
        Toast.success(i18n.t('deleted'))
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
getRoles()
</script>
