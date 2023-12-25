<template lang="pug">
.page--fixed-header
  .page__header
    van-nav-bar(
      :title="$t('routes.dictionaries')"
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
    van-sticky(:offset-top='54')
      van-cell-group.mb-4(inset)
        van-search(
          v-model='queryParams.key'
          show-action=''
          :placeholder="$t('dictionary.plhrSearch')"
          @search='onSearch')
          template(#action)
            div(@click='onSearch') {{ $t('g.search') }}

    List(
      :list='list'
      :total='total'
      @fetch="getList"
      @delete="onDelete"
      @update="onUpdate")

  DialogCreate(v-model="showDialogCreate" @created="getList()")
  DialogUpdate(v-model="showDialogUpdate" :data="selDictionary" @updated="getList")
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import { concat, without } from 'lodash'
import * as API from '@/api/dicts'
import i18n from '@/lang'

import List from './components/List'
import DialogCreate from './components/DialogCreate'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()

const buttonLoading = ref(false)
const showDialogCreate = ref(false)
const showDialogUpdate = ref(false)

const pageSize = 20
const queryParams = reactive({
  key: undefined,
})

const list = ref([])
const selDictionary = ref({})
const total = ref(1)

function getList(pageNum = 1) {
  Toast.loading()
  return API.getDictionaries({ pageNum, pageSize, ...queryParams })
    .then((res) => {
      total.value = Math.ceil(res.total / pageSize)
      if (pageNum == 1) {
        list.value = res.data || []
      }
      else {
        list.value = concat(list.value, res.data)
      }
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('dictionary.deleteCfm'),
    message: i18n.t('dictionary.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteDictionary({ _id: d._id }).then((res) => {
        Toast.success(i18n.t('g.deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onUpdate(d) {
  selDictionary.value = {}
  nextTick(() => {
    selDictionary.value = d
  })
  showDialogUpdate.value = true
}

function onSearch() {
  getList()
}

getList()
</script>
