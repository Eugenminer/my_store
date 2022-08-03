<template>
<label class="form__label" for="#"><!-- нельзя поле от лайбл отделить -->
  <BaseFormField :error="error" :title="title">
    <textarea class="form__input form__input--area" v-model="dataValue"
    :placeholder="placeholder"></textarea>
  </BaseFormField>
</label>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
