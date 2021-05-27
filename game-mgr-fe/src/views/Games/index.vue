<template>
<div>
<a-card>
<h2>游戏列表</h2>

<a-divider />

<space-between>
<div class="search">
<a-input-search
      placeholder="根据游戏名搜索"
      enter-button
      v-model:value="keyword"
      @search="onSearch"
    />

    <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
    </div>

    <a-button @click="show = true" v-only-admin>添加一条</a-button>
    </space-between>
    
    <a-divider />

  <a-table 
  :columns="columns" 
  :data-source="list" 
  :pagination="false"
  bordered>
  <template #publishDate="data">
 {{ formatTimestamp(data.record.publishDate) }}
  </template>

   <template #count="data">
   <a href="javascript:;" @click="updateCount('IN_COUNT',data.record)">入库</a>
 {{ data.record.count }}
 <a href="javascript:;" @click="updateCount('OUT_COUNT',data.record)">出库</a>
  </template>

  <template #actions="record">
  <a href="javascript:;" @click="toDetail(record)">详情</a>
  &nbsp;
  <a v-only-admin href="javascript:;" @click="update(record)">编辑</a>
  &nbsp;
 <a v-only-admin href="javascript:;" @click="remove(record)">删除</a>
  </template>
   </a-table>
   <space-between style="margin-top: 23px">
   <div />
<a-pagination 
v-model:current="curPage"
 :total="total"
 :page-size="10"
 @change="setPage"
/>
</space-between>
</a-card>

<add-one 
v-model:show="show"
 />

 <update
v-model:show="showUpdateModal"
:game="curEditGame"
@update="updateCurGame"
 />

</div>
</template>

<script src="./index.jsx"></script>


<style lang="scss" scoped>
@import './index.scss';
</style>