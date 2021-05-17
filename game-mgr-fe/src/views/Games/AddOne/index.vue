<template>
<div>
<a-modal
      title="添加游戏"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >

   
       <a-form  :label-col="{ span: 6 }" >
    <a-form-item label="游戏名">
      <a-input  v-model:value="addForm.name" />
    </a-form-item>
    <a-form-item label="价格">
      <a-input-number v-model:value="addForm.price" :min="0" :max="999999999"  />
    </a-form-item>
    <a-form-item label="作者">
      <a-input v-model:value="addForm.author" />
    </a-form-item>
    <a-form-item label="发行日期">
      <a-date-picker v-model:value="addForm.publishDate" />
    </a-form-item>
    <a-form-item label="分类">
      <a-input v-model:value="addForm.classify" />
    </a-form-item>
    <a-form-item label="库存">
      <a-input v-model:value="addForm.count" />
    </a-form-item>
  </a-form>
    </a-modal>
</div>
</template>

<script src="./index.js"></script>