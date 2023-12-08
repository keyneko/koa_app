<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.positions')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    .mb-2.mx-5
      div {{ $t('positionGen.isStackable') }}
      van-tag.mr-3(
        v-for="d in [0, 1]"
        :key="d"
        :type="d === queryParams.isStackable?'primary':'default'"
        :mark="true"
        size="medium"
        @click="onStackableTagClicked(d)") {{ d == 0?'不可堆叠': '可堆叠' }}

    .mb-4.mx-5
      div {{ $t('status') }}
      van-tag.mr-3(
        v-for="d in options('position_status')"
        :key="d._id"
        :type="d.value === queryParams.status?'primary':'default'"
        :mark="true"
        size="medium"
        @click="onStatusTagClicked(d)") {{ d.name }}

    PositionList(
      ref="listRef"
      :list="list"
      :total="total"
      @fetch="getPositions"
      @delete="onDelete"
      @update="onUpdate"
      @detail="onDetail")

  DialogResult(v-model="showDialogResult" :data="position")
  DialogUpdate(v-model="showDialogUpdate" :data="position" @updated="reflashList")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import * as API from '@/api/position'
import i18n from '@/lang'
import useDicts from '@/utils/useDicts'
import { concat, without, range } from 'lodash'

import PositionList from './components/PositionList'
import DialogResult from './components/DialogResult'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()
const { options } = useDicts()

const buttonLoading = ref(false)
const showDialogResult = ref(false)
const showDialogUpdate = ref(false)

const listRef = ref(null)
const list = ref([])
const total = ref(0)
const pageSize = 10

const position = ref({})
const queryParams = reactive({
  isStackable: '',
  status: '',
})

function getPositions(pageNum = 1) {
  Toast.loading()
  return API.getPositions({ ...queryParams, pageNum, pageSize })
    .then((res) => {
      total.value = Math.ceil(res.total / pageSize)

      if (pageNum == 1) {
        list.value = res.data || []
      } else {
        list.value = concat(list.value, res.data)
      }
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('positions.deleteCfm'),
    message: i18n.t('positions.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deletePosition({ value: d.value }).then((res) => {
        Toast.success(i18n.t('deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onUpdate({ value }) {
  Toast.loading()
  return API.getPosition({ value })
    .then((res) => {
      position.value = res.data
      showDialogUpdate.value = true
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDetail({ value }) {
  Toast.loading()
  return API.getPosition({ value })
    .then((res) => {
      position.value = res.data
      showDialogResult.value = true
    })
    .finally(() => {
      Toast.clear()
    })
}

function onStackableTagClicked(value) {
  if (queryParams.isStackable === value) {
    queryParams.isStackable = ''
  } else {
    queryParams.isStackable = value
  }
  listRef.value.onRefresh()
}

function onStatusTagClicked({ value }) {
  if (queryParams.status === value) {
    queryParams.status = ''
  } else {
    queryParams.status = value
  }
  listRef.value.onRefresh()
}

async function reflashList() {
  const { pageNum } = listRef.value
  let newList = []
  let newTotal

  for (const i of range(pageNum)) {
    const res = await API.getPositions({ ...queryParams, pageNum: i + 1, pageSize })
    newList = concat(newList, res.data)
    newTotal = res.total
  }
  list.value = newList
  total.value = newTotal
}

getPositions()
</script>
